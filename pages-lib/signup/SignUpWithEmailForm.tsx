import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PlayerValidator } from '@/lib/validators/PlayerValidator';
import { useCreatePlayerWithEmailMutation } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { createFirebaseUserWithEmail } from '@/lib/firebase';
import { currentPlayerState } from 'states/currentPlayer';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/form2/Input';
import { Button } from '@/components/blocks/Button';
import { FormGroup } from '@/components/form2/FormGroup';
import { loadingState } from 'states/loading';

interface SignUpInput {
  email: string;
  name: string;
  slug: string;
  password: string;
}

const schema = yup.object().shape(PlayerValidator);

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
  const [createPlayerWithEmail, { loading }] = useCreatePlayerWithEmailMutation({
    onCompleted: data => {
      const currentPlayer = data.createPlayerWithEmail?.currentPlayer;
      if (!currentPlayer) return;
      setCurrentPlayer(currentPlayer);
      toast.success('ユーザー登録が完了しました。');

      router.push(Routes.top());
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (attributes: SignUpInput) => {
    createFirebaseUserWithEmail(attributes.email, attributes.password).then(() => {
      createPlayerWithEmail({ variables: { name: attributes.name, slug: attributes.slug } });
    });
  };

  setLoading(isSubmitting || loading);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前">
        <Input {...register('name')} />
        {errors.name?.message && <span>{errors.name.message}</span>}
      </FormGroup>

      <FormGroup label="ID(URLに使われます)">
        <Input {...register('slug')} placeholder="半角英数とアンダースコアのみ" />
        {errors.slug?.message && <span>{errors.slug.message}</span>}
      </FormGroup>

      <FormGroup label="メールアドレス">
        <Input {...register('email')} />
        {errors.email?.message && <span>{errors.email.message}</span>}
      </FormGroup>

      <FormGroup label="パスワード">
        <Input {...register('password')} placeholder="8文字以上" />
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
