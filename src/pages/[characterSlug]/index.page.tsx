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
import { CharacterCard } from '@/components/CharacterCard';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import theme from '@/theme';
import { CharacterPageTabs } from '@/components/dashboard';

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
    <Content title={character.longName} breadcrumb={<Breadcrumbs to="character" character={character} />}>
      <Head title={character.longName} />

      <CharacterCard character={character} />

      <Box mt={2}>
        <CharacterPageTabs characterSlug={character.slug} activeTab="profile" />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: PageCharacterQuery = await fetchGraphql(PageCharacterDocument, { characterSlug });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.map(c => ({ params: { characterSlug: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
