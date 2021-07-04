import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PlayerValidator } from '@/lib/validators/PlayerValidator';
import { useCreatePlayerMutation } from '@/lib/graphql/types';
import { createFirebaseUserWithEmail } from '@/lib/firebase';
import { currentPlayerState } from '@/states/currentPlayer';
import { useSetRecoilState } from 'recoil';
import { Controller, useForm } from 'react-hook-form';
import { loadingState } from '@/states/loading';
import { path } from '@/lib';
import { Box, Button, Card, CardContent, Divider, TextField } from '@material-ui/core';

interface SignUpInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: PlayerValidator.email,
  password: PlayerValidator.password,
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
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const [createPlayer, { loading }] = useCreatePlayerMutation({
    onCompleted: data => {
      const currentPlayer = data.createPlayer?.currentPlayer;
      if (!currentPlayer) return;
      setCurrentPlayer(currentPlayer);
      toast.success('ユーザー登録が完了しました。');

      router.push(path({ to: 'top' }));
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (attributes: SignUpInput) => {
    createFirebaseUserWithEmail(attributes.email, attributes.password)
      .then(() => {
        createPlayer({ variables: {} });
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
