import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Divider, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';

import { pagesPath } from '@/generated/$path';
import { useViewerLazyQuery } from '@/generated/graphql';
import { signInFirebaseWithEmail, viewerState, UserValidator, loadingState, handleApolloError } from '@/lib';

interface SignUpInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: UserValidator.email,
});

export const LoginWithEmailForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const setViewer = useSetRecoilState(viewerState);

  const [getViewer, { loading }] = useViewerLazyQuery({
    onCompleted: data => {
      if (!data.viewer) return;

      setViewer(data.viewer);
      toast.success('ログインしました。');
      router.push(pagesPath.$url());
    },
    onError: handleApolloError,
    fetchPolicy: 'network-only',
  });

  const onSubmit = (attributes: SignUpInput) => {
    signInFirebaseWithEmail(attributes.email, attributes.password)
      .then(() => {
        getViewer();
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  setLoading(loading || isSubmitting);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='メールアドレス'
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
        </CardContent>

        <CardContent>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type='password['
                label='パスワード'
                placeholder='8文字以上'
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
        </CardContent>

        <Divider />

        <Box m={2} justifyContent='flex-end'>
          <Button type='submit' variant='contained'>
            ログインする
          </Button>
        </Box>
      </form>
    </Card>
  );
};
