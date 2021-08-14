import React from 'react';
import { GetServerSideProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs } from '@/components';
import { Avatar, Box, Chip, createStyles, List, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { PlayerBattlesPageDocument, PlayerBattlesPageQuery } from '@/lib/graphql/types';
import { path } from '@/lib';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { Profile } from '../components/Profile';
import { BattleListItem } from '../components/BattleListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const Page: React.FC<PlayerBattlesPageQuery> = ({
  player,
  tournamentBattles: { records: tournamentBattles, paging },
}) => {
  const router = useRouter();
  const characterSlug = router.query.character as string | undefined;
  const classes = useStyles();

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerBattles" player={player} />}>
      <Head title={`${player.name}の対戦動画`} />

      <Profile player={player} />

      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          対戦動画
        </Typography>

        <div className={classes.characterSelector}>
          {player.battleCounts.map(bc => (
            <Chip
              key={bc.character.id}
              variant="outlined"
              avatar={<Avatar src={bc.character.faceImageUrl} />}
              label={`${bc.character.name} (${bc.count})`}
              color={characterSlug === bc.character.slug ? 'primary' : undefined}
              onClick={() => {
                if (characterSlug === bc.character.slug) {
                  router.push(path({ to: 'playerBattles', player: player.slug }));
                } else {
                  router.push(path({ to: 'playerBattles', player: player.slug, characterSlug: bc.character.slug }));
                }
              }}
            />
          ))}
        </div>

        <Paper>
          <List>
            {tournamentBattles.map((battle, i) => (
              <BattleListItem key={battle.id} battle={battle} last={tournamentBattles.length === i + 1} />
            ))}
          </List>
        </Paper>

        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            page={paging.currentPage}
            count={paging.totalPages}
            color="primary"
            onChange={(e, page) => {
              router.push(path({ to: 'playerBattles', player: player.slug, characterSlug, page }));
            }}
          />
        </Box>
      </Box>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<PlayerBattlesPageQuery> = async ({ params, query }) => {
  const playerSlug = params?.playerSlug as string;
  const page = query.page ? Number(query.page) : 1;
  const characterSlug = query.character as string | undefined;

  const data: PlayerBattlesPageQuery = await fetchGraphql(PlayerBattlesPageDocument, {
    playerSlug,
    characterSlug,
    page: page ? Number(page) : 1,
  });

  return { props: data };
};

export default Page;
