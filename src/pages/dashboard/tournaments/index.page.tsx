import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import { DashboardContent, AdminBreadcrumbs } from '@/components';
import { TournamentTable } from '@/components/dashboard/TournamentTable';
import { pagesPath } from '@/generated/$path';
import { resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <DashboardContent
      title="大会"
      breadcrumb={<AdminBreadcrumbs to="tournaments" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.dashboard.tournaments.new.$url())}
        >
          登録する
        </Button>
      }
    >
      <TournamentTable />
    </DashboardContent>
  );
};

export default Page;
