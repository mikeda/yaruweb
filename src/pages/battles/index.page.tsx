import React, { useState } from 'react';

import { Box, Button, List, Paper } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { BattleListItem, Breadcrumbs, Content, Head } from '@/components';
import { BattleSelector, CharacterChip, PlayerChip } from '@/components/BattleSelector';
import { pagesPath } from '@/generated/$path';
import { BattlesPageDocument, BattlesPageQuery, useBattlesPageBattlesLazyQuery } from '@/generated/graphql';
import { fetchGraphql, loadingState, theme } from '@/lib';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      paddingTop: theme.spacing(2),
    },
  }),
);

const Page: React.FC<BattlesPageQuery> = ({
  battles: { records: initBattles, paging: initPaging },
  characters,
  players,
}) => {
  const [battles, setBattles] = useState(initBattles);
  const [paging, setPaging] = useState(initPaging);
  const [fetchBattles] = useBattlesPageBattlesLazyQuery({
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
  const classes = useStyles();

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetchBattles({ variables: { page: paging.currentPage + 1 } });
  };

  return (
    <Content activeTab="battles" title="対戦動画" breadcrumb={<Breadcrumbs to="battles" />}>
      <Head title="対戦動画" />

      <Paper className={classes.content}>
        <BattleSelector>
          {players.records.map(player => (
            <PlayerChip
              key={player.id}
              player={player}
              onClick={() => {
                router.push(pagesPath.players._slug(player.slug).battles.$url());
              }}
            />
          ))}
          {characters.records.map(character => (
            <CharacterChip
              key={character.id}
              character={character}
              onClick={() => {
                router.push(pagesPath.characters._slug(character.slug).battles.$url());
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

export const getStaticProps: GetStaticProps<BattlesPageQuery> = async () => {
  const data: BattlesPageQuery = await fetchGraphql(BattlesPageDocument);

  return { props: data, revalidate: 300 };
};

export default Page;
