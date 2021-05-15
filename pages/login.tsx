import React from 'react';
import Link from 'next/link';

import { Routes } from '@/lib/Routes';
import { LoginWithEmailForm } from '@/pages-lib/login/LoginWithEmailForm';
import { LoginWithTwitterButton } from '@/pages-lib/login/LoginWithTwitterButton';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';

const Page: React.FC = () => {
  const title = 'ログイン';

  return (
    <Content size="xs">
      <Head title={title} />
      <Breadcrumbs current={title} />
      <PageHeader title={title} />

      <LoginWithEmailForm />
      <hr />
      <LoginWithTwitterButton />

      <div className="el_txt el_txt__c hp_mg_t_md">
        <Link href={Routes.session.signup()}>
          <a className="el_option_link">新規登録はこちら</a>
        </Link>
      </div>
    </Content>
  );
};

export default Page;
