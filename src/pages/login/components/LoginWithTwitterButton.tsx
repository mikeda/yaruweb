import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCurrentUserLazyQuery } from '@/lib/$types';
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

export const LoginWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [getCurrentUser] = useCurrentUserLazyQuery({
    onCompleted: data => {
      if (!data.currentUser) return;

      setCurrentUser(data.currentUser);
      toast.success('ログインしました。');
      router.push(pagesPath.$url());
    },
    onError: e => {
      toast.error(e.message);
    },
    fetchPolicy: 'network-only',
  });
  const classes = useStyles();

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
    <Button variant="contained" onClick={onLogin} className={classes.root}>
      Twitterでログイン
    </Button>
  );
};
