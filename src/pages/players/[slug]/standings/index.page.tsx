import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Box, Button, Grid, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSetRecoilState } from 'recoil';

import { Head, Content, Breadcrumbs, PlayerStandingCard, PlayerProfile, PlayerTabs } from '@/components';
import {
  PlayerSlugsDocument,
  PlayerSlugsQuery,
  PlayerStandingsPageDocument,
  PlayerStandingsPageQuery,
  usePlayerStandingCardsQuery,
} from '@/generated/graphql';
import { fetchGraphql, handleApolloError, loadingState } from '@/lib';

const Page: React.FC<PlayerStandingsPageQuery> = ssrData => {
  const { data, loading, fetchMore } = usePlayerStandingCardsQuery({
    variables: { playerSlug: ssrData.player.slug },
    onError: handleApolloError,
  });
  const setLoading = useSetRecoilState(loadingState);
  setLoading(loading);

  const player = ssrData.player;
  const standings = data ? data.standings.edges.map(e => e.node) : ssrData.standings.nodes;
  const pageInfo = data?.standings.pageInfo;

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="playerStandings" player={player} />}>
      <Head title={`${player.name}の大会戦績`} />

      <PlayerProfile player={player} />

      <PlayerTabs activeTab="standings" player={player} />

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          大会戦績
        </Typography>

        <Grid container spacing={2}>
          {standings.map(standing => (
            <Grid item key={standing.id} xs={12} sm={6}>
              <PlayerStandingCard standing={standing} />
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
      </Box>
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<PlayerStandingsPageQuery, Params> = async ({ params }) => {
  const playerSlug = params?.slug;
  const data: PlayerStandingsPageQuery = await fetchGraphql(PlayerStandingsPageDocument, { playerSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: PlayerSlugsQuery = await fetchGraphql(PlayerSlugsDocument, { per: 50 });

  return {
    paths: data.players.nodes.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export default Page;
