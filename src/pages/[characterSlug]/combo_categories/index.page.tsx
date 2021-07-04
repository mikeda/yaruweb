import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterPathsDocument,
  CharacterPathsQuery,
  PageCharacterComboCategoriesDocument,
  PageCharacterComboCategoriesQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { CharacterCard } from '@/components/CharacterCard';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Box, Paper } from '@material-ui/core';
import { CharacterPageTabs, ComboCategoryList } from '@/components';

const Page: React.FC<PageCharacterComboCategoriesQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="comboCategories" character={character} />}>
      <Head title={character.longName} />

      <CharacterCard character={character} />

      <Box mt={2}>
        <CharacterPageTabs characterSlug={character.slug} activeTab="combos" />
      </Box>

      <Paper>
        <ComboCategoryList comboCategories={character.comboCategories} />
      </Paper>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<PageCharacterComboCategoriesQuery> = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: PageCharacterComboCategoriesQuery = await fetchGraphql(PageCharacterComboCategoriesDocument, {
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
