import React from 'react';

import { Breadcrumbs, Content, Head, LoginForm } from '@/components';

const Page: React.FC = () => {
  return (
    <Content activeTab="top" title="ログイン" breadcrumb={<Breadcrumbs to="login" />}>
      <Head title="ログイン" />

      <LoginForm />
    </Content>
  );
};

export default Page;
