import React from 'react';

import { SignUpWithEmailForm, SignUpWithTwitterButton } from './components';

import { Breadcrumbs, Content, Head } from '@/components';

const Page: React.FC = () => {
  const title = 'プレイヤー登録';

  return (
    <Content activeTab="top" title={title} breadcrumb={<Breadcrumbs to="signup" />}>
      <Head title={title} />

      <SignUpWithEmailForm />
      <hr />
      <SignUpWithTwitterButton />
    </Content>
  );
};

export default Page;
