import React from 'react';

import { SignUpWithEmailForm } from '@/pages-lib/signup/SignUpWithEmailForm';
import { SignUpWithTwitterButton } from '@/pages-lib/signup/SignUpWithTwitterButton';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';

const Page: React.FC = () => {
  const title = 'プレイヤー登録';

  return (
    <Content size="xs">
      <Head title={title} />
      <Breadcrumbs current={title} />
      <PageHeader title={title} />

      <SignUpWithEmailForm />
      <hr />
      <SignUpWithTwitterButton />
    </Content>
  );
};

export default Page;
