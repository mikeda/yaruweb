import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import { AdminBreadcrumbs, AdminContent, CharacterTable } from '@/components';
import { pagesPath } from '@/generated/$path';
import { resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <AdminContent
      title="キャラクター"
      breadcrumb={<AdminBreadcrumbs to="characters" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.admin.characters.new.$url())}
        >
          作成する
        </Button>
      }
    >
      <CharacterTable />
    </AdminContent>
  );
};

export default Page;
