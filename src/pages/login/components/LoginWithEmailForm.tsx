import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Divider, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';

import {
  useCurrentUserLazyQuery,
  signInFirebaseWithEmail,
  currentUserState,
  UserValidator,
  loadingState,
  pagesPath,
} from '@/lib';

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
  const setCurrentUser = useSetRecoilState(currentUserState);

  const [getCurrentUser, { loading }] = useCurrentUserLazyQuery({
    onCompleted: data => {
      if (!data.currentUser) return;

      setCurrentUser(data.currentUser);
      toast.success('ログインしました。');
      router.push(pagesPath.$url());
    },
    onError: e => {
      toast.error(e.message);
    },
    fetchPolicy: 'network-only',
  });

  const onSubmit = (attributes: SignUpInput) => {
    signInFirebaseWithEmail(attributes.email, attributes.password)
      .then(() => {
        getCurrentUser();
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
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="メールアドレス"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
        </CardContent>

        <CardContent>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password["
                label="パスワード"
                placeholder="8文字以上"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
        </CardContent>

        <Divider />

        <Box m={2} justifyContent="flex-end">
          <Button type="submit" variant="contained">
            ログインする
          </Button>
        </Box>
      </form>
    </Card>
  );
};
