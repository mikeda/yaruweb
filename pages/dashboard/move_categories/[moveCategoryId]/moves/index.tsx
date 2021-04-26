import React from 'react';

import { ComboCategoryDocument, ComboCategoryFragment, ComboCategoryQuery, useCombosQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  comboCategory: ComboCategoryFragment;
}

const Page: React.FC<Props> = ({ comboCategory }) => {
  const title = `コンボ(${comboCategory.character.longName}/${comboCategory.name})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />

      <Heading lv="h1">{title}</Heading>

      <PageContent comboCategory={comboCategory} />
    </DashboardContent>
  );
};

const PageContent: React.FC<Props> = ({ comboCategory }) => {
  const { data, loading, error } = useCombosQuery({ variables: { comboCategoryId: comboCategory.id } });

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>エラーが発生しました。{error.message}</NotFound>;
  const combos = data?.combos;
  if (!(combos && combos.length > 0)) return <NotFound>キャラクターが登録されていません。</NotFound>;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>名前</th>
          </tr>
        </thead>
        <tbody>
          {combos.map(combo => {
            return (
              <tr key={combo.id}>
                <td>{combo.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const comboCategoryId = params?.comboCategoryId as string;
  const data: ComboCategoryQuery = await fetchGraphql(ComboCategoryDocument, { comboCategoryId });

  return { props: { comboCategory: data.comboCategory } };
};

export default Page;
