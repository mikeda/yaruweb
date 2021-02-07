import React from 'react';
import { GetStaticProps } from 'next';

import { Heading } from '@/components/Heading';
import { SignUpWithEmailForm } from '@/pages-lib/signup/SignUpWithEmailForm';
import { SignUpWithTwitterButton } from '@/pages-lib/signup/SignUpWithTwitterButton';

const Page: React.FC = () => (
  <>
    <Heading lv="h1">プレイヤー登録</Heading>

    <SignUpWithEmailForm />
    <hr />
    <SignUpWithTwitterButton />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  return { props: { contentSize: 'xs' } };
};

export default Page;
