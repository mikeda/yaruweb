import React from 'react';
import Link from 'next/link';

import { Routes } from '@/lib/Routes';
import { Heading } from '@/components/Heading';
import { LoginWithEmailForm } from '@/pages-lib/login/LoginWithEmailForm';
import { LoginWithTwitterButton } from '@/pages-lib/login/LoginWithTwitterButton';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';

const Page: React.FC = () => (
  <Content size="xs">
    <Head title="ログイン" />

    <Heading lv="h1">ログイン</Heading>

    <LoginWithEmailForm />
    <hr />
    <LoginWithTwitterButton />

    <div className="el_txt el_txt__c hp_mg_t_md">
      <Link href={Routes.signup()}>
        <a className="el_option_link">新規登録はこちら</a>
      </Link>
    </div>
  </Content>
);

export default Page;
