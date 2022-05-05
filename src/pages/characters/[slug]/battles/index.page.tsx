import React, { useState } from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Box, Button, List, Paper } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticPaths, GetStaticProps } from 'next';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';

import { BattleListItem, Breadcrumbs, Content, Head, SelectChipContainer, PlayerBattleCountChip } from '@/components';
import {
  BattleListItemFragment,
  CharacterBattlesPageDocument,
  CharacterBattlesPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
  PagingFragment,
  useCharacterBattlesPageBattlesLazyQuery,
} from '@/generated/graphql';
import { fetchGraphql, loadingState, theme } from '@/lib';

const useStyles = makeStyles(() =>
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

  const fetchFirst = (playerSlug: string | undefined) => {
    setLoading(true);
    setState(prev => ({ ...prev, battles: [], playerSlug }));
    fetchBattles({ variables: { playerSlug, characterSlug: character.slug, page: 1 } });
  };

  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterBattles" character={character} />}>
      <Head title={`${character.longName}の対戦動画`} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="battles" />
      </Box>

      <Paper className={classes.content}>
        <SelectChipContainer>
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
        </SelectChipContainer>

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
  slug: string;
}

export const getStaticProps: GetStaticProps<CharacterBattlesPageQuery, Params> = async ({ params }) => {
  const characterSlug = params?.slug;
  const data: CharacterBattlesPageQuery = await fetchGraphql(CharacterBattlesPageDocument, { characterSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
