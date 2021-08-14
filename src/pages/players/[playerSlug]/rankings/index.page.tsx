import React from 'react';
import { GetServerSideProps } from 'next';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head, Content, Breadcrumbs } from '@/components';
import { Box, Grid, Typography } from '@material-ui/core';
import { PlayerRankingsPageDocument, PlayerRankingsPageQuery } from '@/lib/graphql/types';
import { path } from '@/lib';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { Profile } from '../components/Profile';
import { RankingCard } from '../components/RankingCard';

const Page: React.FC<PlayerRankingsPageQuery> = ({
  player,
  tournamentRankings: { records: tournamentRankings, paging },
}) => {
  const router = useRouter();

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerRankings" player={player} />}>
      <Head title={`${player.name}の大会戦績`} />

      <Profile player={player} />

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          大会戦績
        </Typography>

        <Grid container spacing={2}>
          {tournamentRankings.map(ranking => (
            <Grid item key={ranking.id} xs={12} sm={6}>
              <RankingCard ranking={ranking} />
            </Grid>
          ))}
        </Grid>

        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            page={paging.currentPage}
            count={paging.totalPages}
            color="primary"
            onChange={(e, page) => {
              router.push(path({ to: 'playerRankings', playerSlug: player.slug, page }));
            }}
          />
        </Box>
      </Box>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<PlayerRankingsPageQuery> = async ({ params, query }) => {
  const playerSlug = params?.playerSlug as string;
  const page = query?.page ? Number(query.page) : 1;
  const data: PlayerRankingsPageQuery = await fetchGraphql(PlayerRankingsPageDocument, {
    playerSlug,
    page: page ? Number(page) : 1,
  });

  return { props: data };
};

export default Page;
