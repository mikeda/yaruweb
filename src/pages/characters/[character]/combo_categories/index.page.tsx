import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterPathsDocument,
  CharacterPathsQuery,
  PageCharacterComboCategoriesDocument,
  PageCharacterComboCategoriesQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Box, Paper } from '@material-ui/core';
import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';
import { Content, Head, Breadcrumbs, ComboCategoryList } from '@/components';

const Page: React.FC<PageCharacterComboCategoriesQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="comboCategories" character={character} />}>
      <Head title={`${character.longName}のコンボ`} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="combos" />
      </Box>

      <Paper>
        <ComboCategoryList comboCategories={character.comboCategories} />
      </Paper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<PageCharacterComboCategoriesQuery> = async ({ params }) => {
  const characterSlug = params?.character as string;
  const data: PageCharacterComboCategoriesQuery = await fetchGraphql(PageCharacterComboCategoriesDocument, {
    characterSlug,
  });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(c => ({ params: { character: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
