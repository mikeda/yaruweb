import React from 'react';

import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';

const Page: React.FC = () => (
  <DashboardContent activeTab="article">
    <Head title="ダッシュボード" />
    <PageHeader title="ダッシュボード" />
  </DashboardContent>
);

export default Page;
