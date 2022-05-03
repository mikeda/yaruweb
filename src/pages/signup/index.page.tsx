import React from 'react';


import { SignUpWithEmailForm } from './components/SignUpWithEmailForm';
import { SignUpWithTwitterButton } from './components/SignUpWithTwitterButton';

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
