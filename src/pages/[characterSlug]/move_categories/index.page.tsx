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
import { CharacterCard } from '@/components/CharacterCard';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box } from '@material-ui/core';
import { CharacterPageTabs } from '@/components/dashboard';
import { MoveCategoryList } from '@/components/MoveCategoryList';

const Page: React.FC<PageCharacterMoveCategoriesQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="moveCategories" character={character} />}>
      <Head title={character.longName} />

      <CharacterCard character={character} />

      <Box mt={2}>
        <CharacterPageTabs characterSlug={character.slug} activeTab="moves" />
      </Box>

      <MoveCategoryList moveCategories={character.moveCategories} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps<PageCharacterMoveCategoriesQuery> = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: PageCharacterMoveCategoriesQuery = await fetchGraphql(PageCharacterMoveCategoriesDocument, {
    characterSlug,
  });

  return { props: data };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.map(c => ({ params: { characterSlug: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
