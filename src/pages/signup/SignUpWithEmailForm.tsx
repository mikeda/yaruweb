import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { UserValidator } from '@/lib/validators/UserValidator';
import { useCreateUserMutation } from '@/lib/graphql/types';
import { createFirebaseUserWithEmail } from '@/lib/firebase';
import { currentUserState } from '@/states/currentUser';
import { useSetRecoilState } from 'recoil';
import { Controller, useForm } from 'react-hook-form';
import { loadingState } from '@/states/loading';
import { Box, Button, Card, CardContent, Divider, TextField } from '@mui/material';
import { pagesPath } from '@/lib/$path';

interface SignUpInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: UserValidator.email,
  password: UserValidator.password,
});

export const SignUpWithEmailForm: React.FC = () => {
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
  const [createUser, { loading }] = useCreateUserMutation({
    onCompleted: data => {
      const currentUser = data.createUser?.currentUser;
      if (!currentUser) return;
      setCurrentUser(currentUser);
      toast.success('ユーザー登録が完了しました。');

      router.push(pagesPath.$url());
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (attributes: SignUpInput) => {
    createFirebaseUserWithEmail(attributes.email, attributes.password)
      .then(() => {
        createUser({ variables: {} });
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  setLoading(isSubmitting || loading);

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
            登録する
          </Button>
        </Box>
      </form>
    </Card>
  );
};
