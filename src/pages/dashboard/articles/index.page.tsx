import React from 'react';

import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import { ArticleTable, DashboardBreadcrumbs, DashboardContent } from '@/components';
import { pagesPath } from '@/generated/$path';
import { resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <DashboardContent
      title="記事一覧"
      breadcrumb={<DashboardBreadcrumbs to="articles" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          href={resolveUrlObject(router, pagesPath.dashboard.articles.new.$url())}
        >
          記事を書く
        </Button>
      }
    >
      <ArticleTable />
    </DashboardContent>
  );
};

export default Page;
