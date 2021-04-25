import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useCurrentPlayerLazyQuery } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form/FormGroup';
import { Routes } from '@/lib/Routes';
import { signInFirebaseWithEmail } from '@/lib/firebase';
import { currentPlayerState } from 'states/currentPlayer';
import { useSetRecoilState } from 'recoil';

export const LoginWithEmailForm: React.FC = () => {
  const router = useRouter();
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

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('メールアドレスの形式が正しくありません。')
          .required('メールアドレスを入力して下さい。'),
        password: Yup.string().required('パスワードを入力して下さい。'),
      })}
      onSubmit={({ email, password }) => {
        signInFirebaseWithEmail(email, password)
          .then(() => {
            getCurrentPlayer();
          })
          .catch(e => {
            toast.error(e.message);
          });
      }}
    >
      {({ isValid }) => (
        <Form>
          <FormGroup name="email" type="email" placeholder="メールアドレス" />
          <FormGroup name="password" type="password" placeholder="パスワード" />
          <Link href={Routes.session.passwordReset()}>
            <a className="el_option_link">パスワードを忘れたかた</a>
          </Link>
          <div className="el_form_submit">
            <button type="submit" disabled={loading || !isValid} className="el_btn">
              ログインする
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
