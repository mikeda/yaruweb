import React from 'react';

import { Breadcrumbs, Content, Head, SignUpForm } from '@/components';

const Page: React.FC = () => {
  const title = 'プレイヤー登録';

  return (
    <Content activeTab='top' title={title} breadcrumb={<Breadcrumbs to='signup' />}>
      <Head title={title} />

      <SignUpForm />
    </Content>
  );
};

export default Page;
