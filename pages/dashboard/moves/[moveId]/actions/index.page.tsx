import React from 'react';

import { ActionFragment, usePageDashboardActionsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Routes } from '@/lib/Routes';
import Link from 'next/link';
import { parseAction } from '@/lib/graphql/parseAction';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

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
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `技データ(${move.moveCategory.character.name})`,
            url: Routes.dashboard.moveCategory.index(move.moveCategory.character.slug),
          },
          {
            name: move.moveCategory.name,
            url: Routes.dashboard.move.index(move.moveCategory.id),
          },
        ]}
        current={title}
      />
      <PageHeader
        title={title}
        addButtons={[
          { label: '打撃を登録', url: Routes.dashboard.move.attack_actions.new(move.id) },
          { label: '投げを登録', url: Routes.dashboard.move.throw_actions.new(move.id) },
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
                    <Link href={Routes.dashboard.attack_action.edit(action.id)}>
                      <a>編集</a>
                    </Link>
                  )}
                  {a.__typename === 'ThrowAction' && (
                    <Link href={Routes.dashboard.throw_action.edit(action.id)}>
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
