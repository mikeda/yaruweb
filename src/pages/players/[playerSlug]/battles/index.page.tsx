import React from 'react';
import { GetServerSideProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs } from '@/components';
import { Box, List, Paper, Typography } from '@material-ui/core';
import { PlayerBattlesPageDocument, PlayerBattlesPageQuery } from '@/lib/graphql/types';
import { path } from '@/lib';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { Profile } from '../components/Profile';
import { BattleListItem } from '../components/BattleListItem';

const Page: React.FC<PlayerBattlesPageQuery> = ({
  player,
  tournamentBattles: { records: tournamentBattles, paging },
}) => {
  const router = useRouter();

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerBattles" player={player} />}>
      <Head title={`${player.name}の対戦動画`} />

      <Profile player={player} />

      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          対戦動画
        </Typography>

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
              router.push(path({ to: 'playerBattles', player: player.slug, page }));
            }}
          />
        </Box>
      </Box>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<PlayerBattlesPageQuery> = async ({ params, query }) => {
  const playerSlug = params?.playerSlug as string;
  const page = query?.page ? Number(query.page) : 1;
  const data: PlayerBattlesPageQuery = await fetchGraphql(PlayerBattlesPageDocument, {
    playerSlug,
    page: page ? Number(page) : 1,
  });

  return { props: data };
};

export default Page;
