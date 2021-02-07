import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Routes } from '@/lib/Routes';
import { Heading } from '@/components/Heading';
import { LoginWithEmailForm } from '@/pages-lib/login/LoginWithEmailForm';
import { LoginWithTwitterButton } from '@/pages-lib/login/LoginWithTwitterButton';

const Page: React.FC = () => (
  <>
    <Heading lv="h1">ログイン</Heading>

    <LoginWithEmailForm />
    <hr />
    <LoginWithTwitterButton />

    <div className="el_txt el_txt__c hp_mg_t_md">
      <Link href={Routes.signup()}>
        <a className="el_option_link">新規登録はこちら</a>
      </Link>
    </div>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  return { props: { contentSize: 'xs' } };
};

export default Page;
