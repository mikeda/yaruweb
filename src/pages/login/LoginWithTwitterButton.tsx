import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCurrentUserLazyQuery } from '@/lib/graphql/types';
import { signInFirebaseWithTwitter } from '@/lib/firebase';
import { currentUserState } from '@/states/currentUser';
import { useSetRecoilState } from 'recoil';
import { path } from '@/lib';
import { Button, makeStyles } from '@material-ui/core';
import { colors } from '@/colors';

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
      router.push(path({ to: 'top' }));
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
