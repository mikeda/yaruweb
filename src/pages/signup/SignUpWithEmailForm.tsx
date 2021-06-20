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
import { useForm } from 'react-hook-form';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/Button';
import { FormGroup } from '@/components/form/FormGroup';
import { loadingState } from '@/states/loading';
import { path } from '@/lib';

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
    register,
    handleSubmit,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="メールアドレスx">
        <Input {...register('email')} />
        {errors.email?.message && <span>{errors.email.message}</span>}
      </FormGroup>

      <FormGroup label="パスワード">
        <Input type="password" {...register('password')} placeholder="8文字以上" />
        {errors.password?.message && <span>{errors.password.message}</span>}
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" />
        </Button>
      </FormGroup>
    </form>
  );
};
