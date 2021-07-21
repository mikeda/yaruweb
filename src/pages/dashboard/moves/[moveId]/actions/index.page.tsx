import React from 'react';

import { ActionFragment, usePageDashboardActionsQuery } from '@/lib/graphql/types';
import Link from 'next/link';
import { parseAction } from '@/lib/graphql/parseAction';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';
import { dashboardPath } from '@/lib';
import { Button, Menu, MenuItem } from '@material-ui/core';

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

  return (
    <DashboardContent
      title={move.name}
      breadcrumb={<DashboardBreadcrumbs to="actions" move={move} />}
      actions={<AddButton moveId={move.id} />}
    >
      <PageContent actions={move.actions} />
    </DashboardContent>
  );
};

const AddButton: React.FC<{ moveId: string }> = ({ moveId }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        作成する
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} href={dashboardPath({ to: 'attackActionsNew', moveId })}>
          打撃判定
        </MenuItem>
        <MenuItem onClick={handleClose} href={dashboardPath({ to: 'throwActionsNew', moveId })}>
          投げ判定
        </MenuItem>
      </Menu>
    </div>
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
