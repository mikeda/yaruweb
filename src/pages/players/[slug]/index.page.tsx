import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Box, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { PlayerPageDocument, PlayerPageQuery, PlayerSlugsDocument, PlayerSlugsQuery } from '@/lib/graphql/types';
import theme from '@/theme';

import { Head, Content, Breadcrumbs, PlayerPageTabs } from '@/components';
import { Profile } from './components/Profile';

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

      <Profile player={player} />

      <PlayerPageTabs activeTab="profile" player={player} />

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
  const playerSlug = params?.slug;
  const data: PlayerPageQuery = await fetchGraphql(PlayerPageDocument, { playerSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: PlayerSlugsQuery = await fetchGraphql(PlayerSlugsDocument, { per: 50 });

  return {
    paths: data.players.records.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export default Page;
