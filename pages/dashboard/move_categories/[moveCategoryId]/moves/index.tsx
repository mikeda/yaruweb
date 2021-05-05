import React from 'react';

import { MoveCategoryDetailDocument, MoveCategoryDetailFragment, MoveCategoryDetailQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Routes } from '@/lib/Routes';
import Link from 'next/link';

interface Props {
  moveCategory: MoveCategoryDetailFragment;
}

const Page: React.FC<Props> = ({ moveCategory }) => {
  const title = `コマンドリスト(${moveCategory.character.longName}/${moveCategory.name})`;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />

      <PageHeader title={title} addPageUrl={Routes.dashboard.move.new(moveCategory.id)} />

      <PageContent moveCategory={moveCategory} />
    </DashboardContent>
  );
};

const PageContent: React.FC<Props> = ({ moveCategory }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {moveCategory.moves.map(move => {
            return (
              <tr key={move.id}>
                <td>{move.name}</td>
                <td>
                  <Link href={Routes.dashboard.move.edit(move.id)}>
                    <a>編集</a>
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
  const moveCategoryId = params?.moveCategoryId as string;
  const data: MoveCategoryDetailQuery = await fetchGraphql(MoveCategoryDetailDocument, { moveCategoryId });

  return { props: { moveCategory: data.moveCategory } };
};

export default Page;
