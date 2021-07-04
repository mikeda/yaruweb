import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCreateUserMutation } from '@/lib/graphql/types';
import { signInFirebaseWithTwitter } from '@/lib/firebase';
import { currentUserState } from '@/states/currentUser';
import { useSetRecoilState } from 'recoil';
import { path } from '@/lib';

export const SignUpWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [createUserWithTwitter] = useCreateUserMutation({
    onCompleted: data => {
      const currentUser = data.createUser?.currentUser;
      if (!currentUser) return;
      setCurrentUser(currentUser);
      toast.success('ユーザー登録が完了しました。');

      router.push(path({ to: 'top' }));
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSignUp = () => {
    signInFirebaseWithTwitter().then(() => {
      createUserWithTwitter();
    });
  };

  return (
    <button className="el_btn el_btn__twitter" onClick={onSignUp}>
      Twitterで登録
    </button>
  );
};
