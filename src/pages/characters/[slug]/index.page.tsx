import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Box, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Breadcrumbs, Content, Head, CharacterProfile, CharacterTabs } from '@/components';
import {
  SsgCharacterPathsDocument,
  SsgCharacterPathsQuery,
  CharacterPageDocument,
  CharacterPageQuery,
  CharacterPageQueryVariables,
} from '@/generated/graphql';
import { fetchGraphql, theme } from '@/lib';

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

const Page: React.FC<CharacterPageQuery> = ({ character }) => {
  const classes = useStyles();

  return (
    <Content activeTab='characters' breadcrumb={<Breadcrumbs to='character' character={character} />}>
      <Head title={character.longName} />

      <CharacterProfile character={character} />

      <Box mt={2}>
        <CharacterTabs character={character} activeTab='profile' />
      </Box>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant='h5'>
          ストーリー
        </Typography>
        <Typography className={classes.body}>{character.story}</Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant='h5'>
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

export const getStaticProps: GetStaticProps<CharacterPageQuery, Params> = async ({ params }) => {
  const characterSlug = params?.slug as string;
  const variables: CharacterPageQueryVariables = { characterSlug };
  const data: CharacterPageQuery = await fetchGraphql(CharacterPageDocument, variables);

  return { props: data };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: SsgCharacterPathsQuery = await fetchGraphql(SsgCharacterPathsDocument);

  const paths = data.characters.nodes.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
