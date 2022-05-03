import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCreateUserMutation } from '@/lib/$types';
import { signInFirebaseWithTwitter } from '@/lib/firebase';
import { currentUserState } from '@/lib/states/currentUserState';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { colors } from '@/colors';
import { pagesPath } from '@/lib/$path';

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
