import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCreatePlayerMutation } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { signInFirebaseWithTwitter } from '@/lib/firebase';
import { currentPlayerState } from '@/states/currentPlayer';
import { useSetRecoilState } from 'recoil';

export const SignUpWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const [createPlayerWithTwitter] = useCreatePlayerMutation({
    onCompleted: data => {
      const currentPlayer = data.createPlayer?.currentPlayer;
      if (!currentPlayer) return;
      setCurrentPlayer(currentPlayer);
      toast.success('ユーザー登録が完了しました。');

      router.push(Routes.top());
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSignUp = () => {
    signInFirebaseWithTwitter().then(() => {
      createPlayerWithTwitter();
    });
  };

  return (
    <button className="el_btn el_btn__twitter" onClick={onSignUp}>
      Twitterで登録
    </button>
  );
};
