import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCurrentPlayerLazyQuery } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { signInFirebaseWithTwitter } from '@/lib/firebase';
import { CurrentPlayerContext } from '@/lib/contexts/CurrentPlayerContext';

export const LoginWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const { setCurrentPlayer } = useContext(CurrentPlayerContext);
  const [getCurrentPlayer] = useCurrentPlayerLazyQuery({
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
