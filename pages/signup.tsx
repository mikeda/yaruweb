import React from 'react';

import { Heading } from '@/components/Heading';
import { SignUpWithEmailForm } from '@/pages-lib/signup/SignUpWithEmailForm';
import { SignUpWithTwitterButton } from '@/pages-lib/signup/SignUpWithTwitterButton';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => (
  <Content size="xs">
    <Head title="プレイヤー登録" />
    <Breadcrumbs current="プレイヤー登録" />

    <Heading lv="h1">プレイヤー登録</Heading>

    <SignUpWithEmailForm />
    <hr />
    <SignUpWithTwitterButton />
  </Content>
);

export default Page;
