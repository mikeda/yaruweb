import React from 'react';

import { CharacterDocument, CharacterFragment, CharacterQuery, useMoveCategoriesQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { PageHeader } from '@/components/layouts/PageHeader';

interface Props {
  character: CharacterFragment;
}

const Page: React.FC<Props> = ({ character }) => {
  const title = `技データ(${character.longName})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />

      <PageHeader title={title} addPageUrl={Routes.dashboard.moveCategory.new(character.slug)} />

      <PageContent character={character} />
    </DashboardContent>
  );
};

const PageContent: React.FC<Props> = ({ character }) => {
  const { data, loading, error } = useMoveCategoriesQuery({
    variables: { characterSlug: character.slug },
    fetchPolicy: 'network-only',
  });

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;
  const moveCategories = data?.moveCategories;
  if (!(moveCategories && moveCategories.length > 0)) return <NotFound>カテゴリが登録されていません。</NotFound>;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {moveCategories.map(moveCategory => {
            return (
              <tr key={moveCategory.id}>
                <td>{moveCategory.name}</td>
                <td>
                  <Link href={Routes.dashboard.move.index(moveCategory.id)}>
                    <a>技データを登録</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterSlug = params?.characterSlug as string;
  const data: CharacterQuery = await fetchGraphql(CharacterDocument, { characterSlug });

  return { props: { character: data.character } };
};

export default Page;
