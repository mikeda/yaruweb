import React from 'react';

import { LoginWithEmailForm } from './LoginWithEmailForm';
import { LoginWithTwitterButton } from './LoginWithTwitterButton';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { path } from '@/lib';
import { Box } from '@mui/material';
import { Link } from '@/components';

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
          <Link href={path({ to: 'signup' })} color="inherit">
            新規登録はこちら
          </Link>
        </Box>
      </Box>
    </Content>
  );
};

export default Page;
