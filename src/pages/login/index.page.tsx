import React from 'react';

import { Box } from '@mui/material';



import { LoginWithEmailForm } from './components/LoginWithEmailForm';
import { LoginWithTwitterButton } from './components/LoginWithTwitterButton';

import { Breadcrumbs, Content, Head, Link } from '@/components';
import { pagesPath } from '@/lib';

const Page: React.FC = () => {
  return (
    <Content activeTab="top" title="ログイン" breadcrumb={<Breadcrumbs to="login" />}>
      <Head title="ログイン" />

      <LoginWithEmailForm />

      <Box p={2} display="flex" justifyContent="center" alignItems="center">
        <Box>
          <LoginWithTwitterButton />
        </Box>
        <Box ml={2}>
          <Link href={pagesPath.signup.$url()} color="inherit">
            新規登録はこちら
          </Link>
        </Box>
      </Box>
    </Content>
  );
};

export default Page;
