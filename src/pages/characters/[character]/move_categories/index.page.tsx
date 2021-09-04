import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterPathsDocument,
  CharacterPathsQuery,
  PageCharacterMoveCategoriesDocument,
  PageCharacterMoveCategoriesQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, Paper } from '@material-ui/core';
import { MoveCategoryList } from '@/components';
import { Profile } from '../components/Profile';
import { Tabs } from '../components/Tabs';

const Page: React.FC<PageCharacterMoveCategoriesQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="moveCategories" character={character} />}>
      <Head title={`${character.longName}のコマンドリスト`} />

      <Profile character={character} />

      <Box mt={2}>
        <Tabs character={character} activeTab="moves" />
      </Box>

      <Paper>
        <MoveCategoryList moveCategories={character.moveCategories} />
      </Paper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<PageCharacterMoveCategoriesQuery> = async ({ params }) => {
  const characterSlug = params?.character as string;
  const data: PageCharacterMoveCategoriesQuery = await fetchGraphql(PageCharacterMoveCategoriesDocument, {
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
