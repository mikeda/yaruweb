import React, { useState } from 'react';
import { GetServerSideProps } from 'next';

import { BattlesPageDocument, BattlesPageQuery, useBattlesPageBattlesLazyQuery } from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Avatar, Box, Button, Chip, createStyles, List, makeStyles, Paper, Theme } from '@material-ui/core';
import { BattleListItem } from '@/components';
import { path } from '@/lib';
import { DEFAULT_AVATAR_URL } from '@/lib/Assets';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(2),
    },
    characterSelector: {
      marginBottom: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
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
        <div className={classes.characterSelector}>
          {players.records.map(player => (
            <Chip
              key={player.id}
              variant="outlined"
              avatar={<Avatar src={player.avatarUrl || DEFAULT_AVATAR_URL} />}
              label={`${player.name} (${player.battlesCount})`}
              onClick={() => {
                router.push(path({ to: 'playerBattles', player: player.slug }));
              }}
            />
          ))}
          {characters.records.map(character => (
            <Chip
              key={character.id}
              variant="outlined"
              avatar={<Avatar src={character.faceImageUrl} />}
              label={`${character.name} (${character.battlesCount})`}
              onClick={() => {
                router.push(path({ to: 'characterBattles', characterSlug: character.slug }));
              }}
            />
          ))}
        </div>

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

export const getServerSideProps: GetServerSideProps<BattlesPageQuery> = async () => {
  const data: BattlesPageQuery = await fetchGraphql(BattlesPageDocument);

  return { props: data };
};

export default Page;
