import React from 'react';

import { PageDashboardCommandsQuery, usePageDashboardCommandsQuery } from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardBreadcrumbs } from '@/components';
import { Command } from '@/components/Command';
import Link from 'next/link';
import { dashboardPath } from '@/lib';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

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

  return (
    <DashboardContent
      title={move.name}
      breadcrumb={<DashboardBreadcrumbs to="commands" move={move} />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          href={dashboardPath({ to: 'commandsNew', moveId: move.id })}
        >
          作成する
        </Button>
      }
    >
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
