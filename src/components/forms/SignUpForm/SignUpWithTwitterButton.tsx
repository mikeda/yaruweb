import React from 'react';

import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { pagesPath } from '@/generated/$path';
import { useCreateUserMutation } from '@/generated/graphql';
import { signInFirebaseWithTwitter, currentUserState, colors } from '@/lib';

const useStyles = makeStyles({
  root: {
    color: 'white',
    backgroundColor: colors.twitter,
  },
});

export const SignUpWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [createUserWithTwitter] = useCreateUserMutation({
    onCompleted: data => {
      const currentUser = data.createUser?.currentUser;
      if (!currentUser) return;
      setCurrentUser(currentUser);
      toast.success('ユーザー登録が完了しました。');

      router.push(pagesPath.$url());
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  const classes = useStyles();

  const onSignUp = () => {
    signInFirebaseWithTwitter().then(() => {
      createUserWithTwitter();
    });
  };

  return (
    <Button variant="contained" onClick={onSignUp} className={classes.root}>
      Twitterで登録
    </Button>
  );
};
