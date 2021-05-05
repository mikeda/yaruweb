import React from 'react';

import { CharacterDocument, CharacterFragment, CharacterQuery, useComboCategoriesQuery } from '@/lib/graphql/types';
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
  const title = `コンボ(${character.longName})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />

      <PageHeader title={title} addPageUrl={Routes.dashboard.comboCategory.new(character.slug)} />

      <PageContent character={character} />
    </DashboardContent>
  );
};

const PageContent: React.FC<Props> = ({ character }) => {
  const { data, loading, error } = useComboCategoriesQuery({
    variables: { characterSlug: character.slug },
    fetchPolicy: 'network-only',
  });

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;
  const comboCategories = data?.comboCategories;
  if (!(comboCategories && comboCategories.length > 0)) return <NotFound>カテゴリが登録されていません。</NotFound>;

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
          {comboCategories.map(comboCategory => {
            return (
              <tr key={comboCategory.id}>
                <td>{comboCategory.name}</td>
                <td>
                  <Link href={Routes.dashboard.comboCategory.edit(comboCategory.id)}>
                    <a>編集</a>
                  </Link>
                  /
                  <Link href={Routes.dashboard.combo.index(comboCategory.id)}>
                    <a>コンボを登録</a>
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
