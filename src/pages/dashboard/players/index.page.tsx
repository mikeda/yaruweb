import React from 'react';

import { DashboardContent, AdminBreadcrumbs, CreatePlayerButton } from '@/components';
import { PlayerTable } from '@/components/dashboard/PlayerTable';

const Page: React.FC = () => {
  return (
    <DashboardContent
      title="プレイヤー"
      breadcrumb={<AdminBreadcrumbs to="players" />}
      actions={<CreatePlayerButton />}
    >
      <PlayerTable />
    </DashboardContent>
  );
};

export default Page;
