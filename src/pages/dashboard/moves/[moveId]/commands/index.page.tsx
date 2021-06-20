import React from 'react';

import { PageDashboardCommandsQuery, usePageDashboardCommandsQuery } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardBreadcrumbs } from '@/components';
import { Command } from '@/components/Command';
import Link from 'next/link';
import { dashboardPath } from '@/lib';

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
      <DashboardBreadcrumbs to="commands" move={move} />
      <PageHeader
        title={title}
        addButtons={[{ label: '登録', url: dashboardPath({ to: 'commandsNew', moveId: move.id }) }]}
      />

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
                  <Link href={dashboardPath({ to: 'commandEdit', commandId: command.id })}>
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
