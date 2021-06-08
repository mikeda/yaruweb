import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useCurrentPlayerLazyQuery } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { signInFirebaseWithEmail } from '@/lib/firebase';
import { currentPlayerState } from 'states/currentPlayer';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { PlayerValidator } from '@/lib/validators/PlayerValidator';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/blocks/Button';
import { loadingState } from 'states/loading';

interface SignUpInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: PlayerValidator.email,
});

export const LoginWithEmailForm: React.FC = () => {
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

  const [getCurrentPlayer, { loading }] = useCurrentPlayerLazyQuery({
    onCompleted: data => {
      if (!data.currentPlayer) return;

      setCurrentPlayer(data.currentPlayer);
      toast.success('ログインしました。');
      router.push(Routes.top());
    },
    onError: e => {
      toast.error(e.message);
    },
    fetchPolicy: 'network-only',
  });

  const onSubmit = (attributes: SignUpInput) => {
    signInFirebaseWithEmail(attributes.email, attributes.password)
      .then(() => {
        getCurrentPlayer();
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  setLoading(loading || isSubmitting);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="メールアドレス">
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
