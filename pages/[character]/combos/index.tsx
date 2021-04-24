import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  CharacterDocument,
  CharacterFragment,
  CharacterPathsDocument,
  CharacterPathsQuery,
  CharacterQuery,
  ComboCategoryFragment,
  useComboCategoriesQuery,
} from '@/lib/graphql/types';
import { CharacterPageLayout } from '@/components/layouts/CharacterPageLayout';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { NotFound } from '@/components/NotFound';
import { Media } from '@/components/Media';
import { Routes } from '@/lib/Routes';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => {
  const { data, loading, error } = useComboCategoriesQuery({ variables: { characterSlug: character.slug } });

  if (loading) return <NotFound>読み込み中...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;

  const comboCategories = data?.comboCategories;
  if (!comboCategories) return <NotFound>データの読み込みに失敗しました。</NotFound>;

  if (comboCategories.length === 0) return <NotFound>コンボが登録されていません。</NotFound>;

  return (
    <>
      <Head title={`${character.longName}のコンボ一覧`} description={`${character.longName}のコンボ一覧です。`} />

      <CharacterPageLayout character={character} activeTab="combos">
        {comboCategories.map(comboCategory => (
          <Media
            key={comboCategory.id}
            href={Routes.comboCategory(comboCategory.id)}
            imageUrl={comboCategory.thumbnailUrl}
            title={comboCategory.name}
            text={`${comboCategory.name}状態からのコンボ`}
          />
        ))}
      </CharacterPageLayout>
    </>
  );
};

export const ComboCategoryMedia: React.FC<{ comboCategory: ComboCategoryFragment }> = ({ comboCategory }) => (
  <div>{comboCategory.name}</div>
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
