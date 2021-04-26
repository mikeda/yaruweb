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
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => (
  <Content>
    <Head title={character.longName} />

    <CharacterPageLayout character={character} activeTab="profile">
      <Heading lv="h3">ストーリー</Heading>
      <p className="hp_preLine">{character.story}</p>

      <Heading lv="h3">キャラ解説</Heading>
      <p className="hp_preLine">{character.description}</p>
    </CharacterPageLayout>
  </Content>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { characterSlug });

  return { props: { character: data.character } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = (await fetchGraphql(CharacterPathsDocument)) as CharacterPathsQuery;

  const paths = data.characters.map(c => ({ params: { characterSlug: c.slug } }));

  return { paths, fallback: false };
};

export default Page;
