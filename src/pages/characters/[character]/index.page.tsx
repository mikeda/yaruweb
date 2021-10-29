import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterPathsDocument,
  CharacterPathsQuery,
  PageCharacterDocument,
  PageCharacterQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '@/theme';
import { ParsedUrlQuery } from 'querystring';
import { Profile } from './components/Profile';
import { Tabs } from './components/Tabs';

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  body: {
    whiteSpace: 'pre-line',
  },
});

const Page: React.FC<PageCharacterQuery> = ({ character }) => {
  const classes = useStyles();

  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="character" character={character} />}>
      <Head title={character.longName} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="profile" />
      </Box>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          ストーリー
        </Typography>
        <Typography className={classes.body}>{character.story}</Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          キャラ解説
        </Typography>
        <Typography className={classes.body}>{character.description}</Typography>
      </Paper>
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  character: string;
}

export const getStaticProps: GetStaticProps<PageCharacterQuery, Params> = async ({ params }) => {
  const characterSlug = params?.character;
  const data: PageCharacterQuery = await fetchGraphql(PageCharacterDocument, { characterSlug });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(c => ({ params: { character: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
