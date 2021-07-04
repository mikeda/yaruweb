import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCurrentUserLazyQuery } from '@/lib/graphql/types';
import { signInFirebaseWithTwitter } from '@/lib/firebase';
import { currentUserState } from '@/states/currentUser';
import { useSetRecoilState } from 'recoil';
import { path } from '@/lib';

export const LoginWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [getCurrentUser] = useCurrentUserLazyQuery({
    onCompleted: data => {
      if (!data.currentUser) return;

      setCurrentUser(data.currentUser);
      toast.success('ログインしました。');
      router.push(path({ to: 'top' }));
    },
    onError: e => {
      toast.error(e.message);
    },
    fetchPolicy: 'network-only',
  });

  const onLogin = () => {
    signInFirebaseWithTwitter()
      .then(() => {
        getCurrentUser();
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  return (
    <button className="el_btn el_btn__twitter" onClick={onLogin}>
      Twitterでログイン
    </button>
  );
};
