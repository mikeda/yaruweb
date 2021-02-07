import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterPathsDocument,
  CharacterPathsQuery,
  CharacterQuery,
} from '@/lib/graphql/types';
import { CharacterPageLayout } from '@/components/layouts/CharacterPageLayout';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Heading } from '@/components/Heading';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => {
  return (
    <CharacterPageLayout character={character} activeTab="profile">
      <Heading lv="h3">ストーリー</Heading>
      <p className="hp_preLine">{character.story}</p>

      <Heading lv="h3">キャラ解説</Heading>
      <p className="hp_preLine">{character.description}</p>
    </CharacterPageLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.character as string;
  const data = (await fetchGraphql(CharacterDocument, { slug })) as CharacterQuery;

  return { props: { character: data.character } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = (await fetchGraphql(CharacterPathsDocument)) as CharacterPathsQuery;

  const paths = data.characters.map(c => ({
    params: {
      character: c.slug,
    },
  }));

  return { paths, fallback: false };
};

export default Page;
