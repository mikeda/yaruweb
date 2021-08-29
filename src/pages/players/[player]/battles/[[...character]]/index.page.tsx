import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs, BattleListItem, PlayerPageTabs } from '@/components';
import { Box, Button, List, Paper, Typography } from '@material-ui/core';
import {
  PlayerBattlesPageDocument,
  PlayerBattlesPageQuery,
  usePlayerBattlesPageBattlesLazyQuery,
} from '@/lib/graphql/types';
import { path } from '@/lib';
import { useRouter } from 'next/router';
import { Profile } from '../../components/Profile';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { CharacterBattleCountChip, BattleSelector } from '@/components/BattleSelector';

interface Props {
  data: PlayerBattlesPageQuery;
  params: {
    playerSlug: string;
    characterSlug: string | null;
  };
}

const Page: React.FC<Props> = ({
  data: {
    player,
    battles: { records: initBattles, paging: initPaging },
    battleCounts,
  },
  params: { playerSlug, characterSlug },
}) => {
  const [battles, setBattles] = useState(initBattles);
  const [paging, setPaging] = useState(initPaging);
  const [fetchBattles] = usePlayerBattlesPageBattlesLazyQuery({
    onCompleted: data => {
      setBattles(prev => [...prev, ...data.battles.records]);
      setPaging(data.battles.paging);
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
  });
  const setLoading = useSetRecoilState(loadingState);

  const router = useRouter();

  useEffect(() => {
    setBattles(initBattles);
    setPaging(initPaging);
  }, [characterSlug, playerSlug]);

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { characterSlug, playerSlug, page: paging.currentPage + 1 } });
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
                if (characterSlug === bc.character.slug) {
                  router.push(path({ to: 'playerBattles', player: player.slug }));
                } else {
                  router.push(path({ to: 'playerBattles', player: player.slug, characterSlug: bc.character.slug }));
                }
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const playerSlug = query.player as string;
  const characterSlugs = query.character as string[] | undefined;
  const characterSlug = characterSlugs ? characterSlugs[0] : null;
  const data: PlayerBattlesPageQuery = await fetchGraphql(PlayerBattlesPageDocument, {
    playerSlug,
    characterSlug,
  });

  return { props: { data, params: { playerSlug, characterSlug } } };
};

export default Page;
