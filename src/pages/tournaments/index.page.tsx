import React from 'react';

import { Box, Button, Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import { useSetRecoilState } from 'recoil';

import { Head, Content, Breadcrumbs, TournamentCard } from '@/components';
import {
  TournamentCardFragment,
  TournamentsPageDocument,
  TournamentsPageQuery,
  useTournamentCardsQuery,
} from '@/generated/graphql';
import { loadingState, fetchGraphql, handleApolloError } from '@/lib';

const Page: React.FC<TournamentsPageQuery> = ssrData => {
  const { data, loading, fetchMore } = useTournamentCardsQuery({ onError: handleApolloError });
  const setLoading = useSetRecoilState(loadingState);
  setLoading(loading);

  const tournaments = data ? data.tournaments.edges.map(e => e.node) : ssrData.tournaments.nodes;
  const pageInfo = data?.tournaments.pageInfo;

  return (
    <Content activeTab="tournaments" title="大会" breadcrumb={<Breadcrumbs to="tournaments" />}>
      <Head title="鉄拳7の大会情報" />

      <Grid container spacing={2}>
        {tournaments.map(tournament => (
          <Grid item key={tournament.id} xs={12} sm={6} md={4}>
            <TournamentCard tournament={tournament} />
          </Grid>
        ))}
      </Grid>

      {pageInfo?.hasNextPage && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => {
              fetchMore({ variables: { after: pageInfo.endCursor } });
            }}
          >
            もっとみる
          </Button>
        </Box>
      )}
    </Content>
  );
};

export const getStaticProps: GetStaticProps<TournamentsPageQuery> = async () => {
  const data: TournamentsPageQuery = await fetchGraphql(TournamentsPageDocument, { page: 1 });

  return { props: data, revalidate: 300 };
};

export default Page;
