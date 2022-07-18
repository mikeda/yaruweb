import React from 'react';

import { Box } from '@mui/material';

import { LoginWithEmailForm } from './LoginWithEmailForm';
import { LoginWithTwitterButton } from './LoginWithTwitterButton';

import { Link } from '@/components';
import { pagesPath } from '@/generated/$path';

export const LoginForm: React.FC = () => {
  return (
    <>
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
    </>
  );
};
