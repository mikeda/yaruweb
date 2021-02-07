import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterPathsDocument,
  CharacterPathsQuery,
  CharacterQuery,
} from '@/lib/graphql/types';
import { ComboList } from '@/pages-lib/characters/[slug]/combos/ComboList';
import { CharacterPageLayout } from '@/components/layouts/CharacterPageLayout';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => (
  <CharacterPageLayout character={character} activeTab="combos">
    <ComboList slug={character.slug} />
  </CharacterPageLayout>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.character as string;
  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { slug });

  return { props: { character: data.character } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.map(c => ({
    params: {
      character: c.slug,
    },
  }));

  return { paths, fallback: false };
};

export default Page;
