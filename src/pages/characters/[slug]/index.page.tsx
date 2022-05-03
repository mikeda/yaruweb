import { ParsedUrlQuery } from 'querystring';

import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticPaths, GetStaticProps } from 'next';



import { Profile } from './components/Profile';
import { Tabs } from './components/Tabs';

import { Breadcrumbs, Content, Head } from '@/components';
import {
  CharacterPathsDocument,
  CharacterPathsQuery,
  PageCharacterDocument,
  PageCharacterQuery,
  fetchGraphql,
  theme,
} from '@/lib';

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
  slug: string;
}

export const getStaticProps: GetStaticProps<PageCharacterQuery, Params> = async ({ params }) => {
  const characterSlug = params?.slug;
  const data: PageCharacterQuery = await fetchGraphql(PageCharacterDocument, { characterSlug });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
