import React from 'react';

import { PageDashboardCommandsQuery, usePageDashboardCommandsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Routes } from '@/lib/Routes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Command } from '@/components/Command';
import Link from 'next/link';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardCommandsQuery({
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
      <PageHeader title={title} addButtons={[{ label: '登録', url: Routes.dashboard.move.commands.new(move.id) }]} />

      <PageContent {...data} />
    </DashboardContent>
  );
};

const PageContent: React.FC<PageDashboardCommandsQuery> = ({ move: { commands } }) => {
  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>コマンド</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {commands.map(command => {
            return (
              <tr key={command.id}>
                <td>
                  <Command command={command} />
                </td>
                <td>
                  <Link href={Routes.dashboard.command.edit(command.id)}>
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
