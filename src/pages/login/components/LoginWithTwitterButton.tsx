import React from 'react';

import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useCurrentUserLazyQuery, signInFirebaseWithTwitter, currentUserState, colors, pagesPath } from '@/lib';

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
