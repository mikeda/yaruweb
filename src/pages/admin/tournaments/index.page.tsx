import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import { AdminContent, AdminBreadcrumbs } from '@/components';
import { TournamentTable } from '@/components/dashboard/TournamentTable';
import { pagesPath } from '@/generated/$path';
import { resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <AdminContent
      title="大会"
      breadcrumb={<AdminBreadcrumbs to="tournaments" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.admin.tournaments.new.$url())}
        >
          登録する
        </Button>
      }
    >
      <TournamentTable />
    </AdminContent>
  );
};

export default Page;
