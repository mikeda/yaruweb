import React from 'react';

import { AdminContent, AdminBreadcrumbs, CreatePlayerButton } from '@/components';
import { PlayerTable } from '@/components/dashboard/PlayerTable';

const Page: React.FC = () => {
  return (
    <AdminContent title="プレイヤー" breadcrumb={<AdminBreadcrumbs to="players" />} actions={<CreatePlayerButton />}>
      <PlayerTable />
    </AdminContent>
  );
};

export default Page;
