import React from 'react';
import Link from 'next/link';

import { LoginWithEmailForm } from './LoginWithEmailForm';
import { LoginWithTwitterButton } from './LoginWithTwitterButton';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { path } from '@/lib';

const Page: React.FC = () => {
  return (
    <Content activeTab="top" title="ログイン" breadcrumb={<Breadcrumbs to="login" />}>
      <Head title="ログイン" />

      <LoginWithEmailForm />
      <hr />
      <LoginWithTwitterButton />

      <div className="el_txt el_txt__c hp_mg_t_md">
        <Link href={path({ to: 'signup' })}>
          <a className="el_option_link">新規登録はこちら</a>
        </Link>
      </div>
    </Content>
  );
};

export default Page;
