import React from 'react';

import { ActionFragment, usePageDashboardActionsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import Link from 'next/link';
import { parseAction } from '@/lib/graphql/parseAction';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardBreadcrumbs } from '@/components';
import { dashboardPath } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardActionsQuery({
    variables: { moveId: moveId as string },
    fetchPolicy: 'network-only',
    skip: !moveId,
  });

  setLoading(loading);
  if (!data) return null;

  const { move } = data;
  const title = move.name;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <DashboardBreadcrumbs to="actions" move={move} />
      <PageHeader
        title={title}
        addButtons={[
          { label: '打撃を登録', url: dashboardPath({ to: 'attackActionsNew', moveId: move.id }) },
          { label: '投げを登録', url: dashboardPath({ to: 'throwActionsNew', moveId: move.id }) },
        ]}
      />

      <PageContent actions={move.actions} />
    </DashboardContent>
  );
};

const PageContent: React.FC<{ actions: ActionFragment[] }> = ({ actions }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>判定(投げ抜け)</th>
            <th>ダメージ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {actions.map(a => {
            const action = parseAction(a);
            return (
              <tr key={action.id}>
                <td>
                  {action.type}
                  {action.escape && `(${action.escape})`}
                </td>
                <td>{action.damage}</td>
                <td>
                  {a.__typename === 'AttackAction' && (
                    <Link href={dashboardPath({ to: 'attackActionEdit', actionId: action.id })}>
                      <a>編集</a>
                    </Link>
                  )}
                  {a.__typename === 'ThrowAction' && (
                    <Link href={dashboardPath({ to: 'throwActionEdit', actionId: action.id })}>
                      <a>編集</a>
                    </Link>
                  )}
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
