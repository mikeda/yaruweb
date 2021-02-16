import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { PlayerValidator } from '@/lib/validators/PlayerValidator';
import { useCreatePlayerWithEmailMutation } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form/FormGroup';
import { Routes } from '@/lib/Routes';
import { createFirebaseUserWithEmail } from '@/lib/firebase';
import { currentPlayerState } from 'states/currentPlayer';
import { useSetRecoilState } from 'recoil';

export const SignUpWithEmailForm: React.FC = () => {
  const router = useRouter();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const [createPlayerWithEmail] = useCreatePlayerWithEmailMutation({
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

  return (
    <Formik
      initialValues={{ email: '', name: '', slug: '', password: '' }}
      validationSchema={Yup.object({
        email: PlayerValidator.email,
        name: PlayerValidator.name,
        slug: PlayerValidator.slug,
        password: PlayerValidator.password,
      })}
      onSubmit={values => {
        createFirebaseUserWithEmail(values.email, values.password).then(() => {
          createPlayerWithEmail({ variables: { slug: values.slug, name: values.name } });
        });
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <FormGroup name="name" label="プレイヤー名" type="text" placeholder="テケナー" />
          <FormGroup
            name="slug"
            label="プレイヤーID"
            type="text"
            placeholder="tekkener(半角英数とアンダースコアのみ)"
          />
          <FormGroup name="email" label="メール" type="email" placeholder="tekkener@example.com" />
          <FormGroup name="password" label="パスワード" type="password" placeholder="8文字以上" />
          <div className="el_form_submit">
            <button type="submit" disabled={isSubmitting || !dirty || !isValid} className="el_btn">
              登録する
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
