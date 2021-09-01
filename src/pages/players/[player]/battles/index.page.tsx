import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs, BattleListItem, PlayerPageTabs } from '@/components';
import { Box, Button, List, Paper, Typography } from '@material-ui/core';
import {
  BattleListItemFragment,
  PagingFragment,
  PlayerBattlesPageDocument,
  PlayerBattlesPageQuery,
  PlayerSlugsDocument,
  PlayerSlugsQuery,
  usePlayerBattlesPageBattlesLazyQuery,
} from '@/lib/graphql/types';
import { Profile } from '../components/Profile';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { CharacterBattleCountChip, BattleSelector } from '@/components/BattleSelector';
import { ParsedUrlQuery } from 'querystring';

interface State {
  battles: BattleListItemFragment[];
  paging: PagingFragment;
  characterSlug?: string;
}

const Page: React.FC<PlayerBattlesPageQuery> = ({
  player,
  battles: { records: initBattles, paging: initPaging },
  battleCounts,
}) => {
  const [state, setState] = useState<State>({
    battles: initBattles,
    paging: initPaging,
  });
  const [fetchBattles] = usePlayerBattlesPageBattlesLazyQuery({
    onCompleted: data => {
      setState(prev => ({
        ...prev,
        battles: [...prev.battles, ...data.battles.records],
        paging: data.battles.paging,
      }));
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
    fetchPolicy: 'network-only',
  });
  const setLoading = useSetRecoilState(loadingState);

  const { battles, paging, characterSlug } = state;

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { characterSlug, playerSlug: player.slug, page: paging.currentPage + 1 } });
  };

  const fetchFirst = (characterSlug: string | undefined) => {
    setLoading(true);
    setState(prev => ({ ...prev, battles: [], characterSlug }));
    fetchBattles({ variables: { characterSlug, playerSlug: player.slug, page: 1 } });
  };

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerBattles" player={player} />}>
      <Head title={`${player.name}の対戦動画`} />

      <Profile player={player} />

      <PlayerPageTabs activeTab="battles" player={player} />

      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          対戦動画
        </Typography>

        <BattleSelector>
          {battleCounts.records.map(bc => (
            <CharacterBattleCountChip
              key={bc.id}
              battleCount={bc}
              active={characterSlug === bc.character.slug}
              onClick={() => {
                fetchFirst(characterSlug === bc.character.slug ? undefined : bc.character.slug);
              }}
            />
          ))}
        </BattleSelector>

        <Paper>
          <List>
            {battles.map((battle, i) => (
              <BattleListItem key={battle.id} battle={battle} last={battles.length === i + 1} />
            ))}
          </List>
        </Paper>

        {paging.hasNext && (
          <Box pt={2} pb={2} display="flex" justifyContent="center">
            <Button variant="outlined" onClick={fetchMore}>
              もっとみる
            </Button>
          </Box>
        )}
      </Box>
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  player: string;
}

export const getStaticProps: GetStaticProps<PlayerBattlesPageQuery, Params> = async ({ params }) => {
  const playerSlug = params?.player;
  const data: PlayerBattlesPageQuery = await fetchGraphql(PlayerBattlesPageDocument, { playerSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: PlayerSlugsQuery = await fetchGraphql(PlayerSlugsDocument, { per: 50 });

  return {
    paths: data.players.records.map(({ slug }) => ({ params: { player: slug } })),
    fallback: 'blocking',
  };
};

export default Page;
