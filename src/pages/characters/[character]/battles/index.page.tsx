import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  BattleListItemFragment,
  CharacterBattlesPageDocument,
  CharacterBattlesPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
  PagingFragment,
  useCharacterBattlesPageBattlesLazyQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, Button, createStyles, List, makeStyles, Paper, Theme } from '@material-ui/core';
import { BattleListItem, CharacterPageTabs } from '@/components';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { BattleSelector, PlayerBattleCountChip } from '@/components/BattleSelector';
import { ParsedUrlQuery } from 'querystring';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(2),
    },
  }),
);

interface State {
  battles: BattleListItemFragment[];
  paging: PagingFragment;
  playerSlug?: string;
}

const Page: React.FC<CharacterBattlesPageQuery> = ({
  character,
  battles: { records: initBattles, paging: initPaging },
  battleCounts,
}) => {
  const [state, setState] = useState<State>({
    battles: initBattles,
    paging: initPaging,
  });
  const [fetchBattles] = useCharacterBattlesPageBattlesLazyQuery({
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

  const { battles, paging, playerSlug } = state;
  const classes = useStyles();

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { playerSlug, characterSlug: character.slug, page: paging.currentPage + 1 } });
  };

  const fetchFirst = (characterSlug: string | undefined) => {
    setLoading(true);
    setState(prev => ({ ...prev, battles: [], characterSlug }));
    fetchBattles({ variables: { playerSlug, characterSlug: character.slug, page: 1 } });
  };

  return (
    <Content
      activeTab="characters"
      title={character.longName}
      breadcrumb={<Breadcrumbs to="character" character={character} />}
    >
      <Head title={character.longName} />

      <Box mt={2}>
        <CharacterPageTabs characterSlug={character.slug} activeTab="battles" />
      </Box>

      <Paper className={classes.content}>
        <BattleSelector>
          {battleCounts.records.map(bc => (
            <PlayerBattleCountChip
              key={bc.id}
              battleCount={bc}
              active={playerSlug === bc.player.slug}
              onClick={() => {
                fetchFirst(playerSlug === bc.player.slug ? undefined : bc.player.slug);
              }}
            />
          ))}
        </BattleSelector>

        <List>
          {battles.map((battle, i) => (
            <BattleListItem key={battle.id} battle={battle} last={battles.length === i + 1} />
          ))}
        </List>

        {paging.hasNext && (
          <Box pt={2} pb={2} display="flex" justifyContent="center">
            <Button variant="outlined" onClick={fetchMore}>
              もっとみる
            </Button>
          </Box>
        )}
      </Paper>
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  character: string;
}

export const getStaticProps: GetStaticProps<CharacterBattlesPageQuery, Params> = async ({ params }) => {
  const characterSlug = params?.character;
  const data: CharacterBattlesPageQuery = await fetchGraphql(CharacterBattlesPageDocument, { characterSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(c => ({ params: { character: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
