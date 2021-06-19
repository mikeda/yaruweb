import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterPathsDocument,
  CharacterPathsQuery,
  PageCharacterDocument,
  PageCharacterQuery,
} from '@/lib/graphql/types';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Heading } from '@/components/Heading';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';
import { Routes } from '@/lib/Routes';
import { CategoryCardList } from '@/components/CategoryCardList';
import { CharacterCard } from '@/components/CharacterCard';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC<PageCharacterQuery> = ({ character }) => {
  return (
    <Content>
      <Head title={character.longName} />
      <Breadcrumbs parents={[{ name: 'キャラクター', url: Routes.character.index() }]} current={character.longName} />

      <div className="bl_box">
        <CharacterCard character={character} />
      </div>

      <Heading lv="h3">コマンドリスト</Heading>
      <CategoryCardList
        categories={character.moveCategories.map(moveCategory => ({
          ...moveCategory,
          href: Routes.moveCategory.detail(moveCategory.id),
        }))}
      />

      <Heading lv="h3">コンボ</Heading>
      <CategoryCardList
        categories={character.comboCategories.map(comboCategory => ({
          ...comboCategory,
          href: Routes.comboCategory.detail(comboCategory.id),
        }))}
      />

      <Heading lv="h3">ストーリー</Heading>
      <p className="hp_preLine">{character.story}</p>

      <Heading lv="h3">キャラ解説</Heading>
      <p className="hp_preLine">{character.description}</p>
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
