import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Breadcrumbs, Content, Head, CharacterProfile, CharacterTabs, BattleList } from '@/components';
import {
  CharacterBattlesPageDocument,
  CharacterBattlesPageQuery,
  CharacterPathsDocument,
  CharacterPathsQuery,
} from '@/generated/graphql';
import { fetchGraphql } from '@/lib';

const Page: React.FC<CharacterBattlesPageQuery> = ({ character }) => {
  return (
    <Content activeTab="characters" breadcrumb={<Breadcrumbs to="characterBattles" character={character} />}>
      <Head title={`${character.longName}の対戦動画`} />

      <CharacterProfile character={character} />

      <CharacterTabs character={character} activeTab="battles" />

      <BattleList characterSlug={character.slug} />
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<CharacterBattlesPageQuery, Params> = async ({ params }) => {
  const characterSlug = params?.slug;
  const data: CharacterBattlesPageQuery = await fetchGraphql(CharacterBattlesPageDocument, { characterSlug });

  return { props: data, revalidate: 300 };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: CharacterPathsQuery = await fetchGraphql(CharacterPathsDocument);

  const paths = data.characters.records.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export default Page;
