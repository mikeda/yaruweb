import React from 'react';

import { PageDashboardMovesQuery, usePageDashboardMovesQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Routes } from '@/lib/Routes';
import Link from 'next/link';
import { ActionList } from '@/components/ActionList';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveCategoryId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardMovesQuery({
    variables: { moveCategoryId: moveCategoryId as string },
    fetchPolicy: 'network-only',
    skip: !moveCategoryId,
  });

  setLoading(loading);
  if (!data) return null;

  const { moveCategory } = data;
  const title = moveCategory.name;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `技データ(${moveCategory.character.name})`,
            url: Routes.dashboard.moveCategory.index(moveCategory.character.slug),
          },
        ]}
        current={title}
      />
      <PageHeader title={title} addPageUrl={Routes.dashboard.move.new(moveCategory.id)} />

      <PageContent data={data} />
    </DashboardContent>
  );
};

const PageContent: React.FC<{ data: PageDashboardMovesQuery }> = ({ data }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>判定</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.moveCategory.moves.map(move => {
            return (
              <tr key={move.id}>
                <td>{move.name}</td>
                <td>
                  <ActionList actions={move.actions} />
                  <Link href={Routes.dashboard.move.actions.index(move.id)}>
                    <a>詳細</a>
                  </Link>
                </td>
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

export default Page;
