import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ComboCategoryDocument, ComboCategoryFragment, ComboCategoryQuery, useCombosQuery } from '@/lib/graphql/types';
import { CharacterPageLayout } from '@/components/layouts/CharacterPageLayout';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Head } from '@/components/layouts/Head';
import { ComboList } from '@/pages-lib/characters/[slug]/combos/ComboList';
import { NotFound } from '@/components/NotFound';

interface Props {
  comboCategory: ComboCategoryFragment;
}

const Page: React.FC<Props> = ({ comboCategory }) => {
  const { data, loading, error } = useCombosQuery({ variables: { comboCategoryId: comboCategory.id } });

  if (loading) return <NotFound>読み込み中...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;

  const combos = data?.combos;
  if (!combos) return <NotFound>データの読み込みに失敗しました。</NotFound>;

  if (combos.length === 0) return <NotFound>コンボが登録されていません。</NotFound>;

  return (
    <>
      <Head
        title={`${comboCategory.character.longName}/${comboCategory.name}のコンボ一覧`}
        description={`${comboCategory.character.longName}/${comboCategory.name}のコンボ一覧です。`}
      />

      <CharacterPageLayout character={comboCategory.character} activeTab="combos">
        <ComboList comboCategoryId={comboCategory.id} />
      </CharacterPageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;
  const data: ComboCategoryQuery = await fetchGraphql(ComboCategoryDocument, { comboCategoryId });

  return { props: { comboCategory: data.comboCategory } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
