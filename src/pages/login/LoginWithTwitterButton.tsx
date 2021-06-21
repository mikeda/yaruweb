import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCurrentPlayerLazyQuery } from '@/lib/graphql/types';
import { signInFirebaseWithTwitter } from '@/lib/firebase';
import { currentPlayerState } from '@/states/currentPlayer';
import { useSetRecoilState } from 'recoil';
import { path } from '@/lib';

export const LoginWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const [getCurrentPlayer] = useCurrentPlayerLazyQuery({
    onCompleted: data => {
      if (!data.currentPlayer) return;

      setCurrentPlayer(data.currentPlayer);
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
        getCurrentPlayer();
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
