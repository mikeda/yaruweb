import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Box, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Head, Content, Breadcrumbs, PlayerProfile, PlayerTabs } from '@/components';
import {
  PlayerPageDocument,
  PlayerPageQuery,
  PlayerPageQueryVariables,
  PlayerSlugsDocument,
  PlayerSlugsQuery,
} from '@/generated/graphql';
import { fetchGraphql, theme } from '@/lib';

const useStyles = makeStyles({
  description: {
    marginTop: theme.spacing(1),
    whiteSpace: 'pre-line',
  },
});

const Page: React.FC<PlayerPageQuery> = ({ player }) => {
  const classes = useStyles();

  return (
    <Content activeTab="players" breadcrumb={<Breadcrumbs to="player" player={player} />}>
      <Head title={player.name} />

      <PlayerProfile player={player} />

      <PlayerTabs activeTab="profile" player={player} />

      <Paper>
        <Box p={2}>
          <Typography variant="h2" gutterBottom>
            プロフィール
          </Typography>

          <Typography className={classes.description}>
            {player.description || 'プロフィールが登録されていません。'}
          </Typography>
        </Box>
      </Paper>
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<PlayerPageQuery, Params> = async ({ params }) => {
  const playerSlug = params?.slug as string;
  const variables: PlayerPageQueryVariables = { playerSlug };
  const data: PlayerPageQuery = await fetchGraphql(PlayerPageDocument, variables);

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
