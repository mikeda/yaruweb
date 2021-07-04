import React from 'react';

import { SignUpWithEmailForm } from './SignUpWithEmailForm';
import { SignUpWithTwitterButton } from './SignUpWithTwitterButton';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

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
