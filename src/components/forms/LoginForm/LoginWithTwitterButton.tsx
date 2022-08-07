import React from 'react';

import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { pagesPath } from '@/generated/$path';
import { useViewerLazyQuery } from '@/generated/graphql';
import { signInFirebaseWithTwitter, viewerState, colors, handleApolloError } from '@/lib';

const useStyles = makeStyles({
  root: {
    color: 'white',
    backgroundColor: colors.twitter,
  },
});

export const LoginWithTwitterButton: React.FC = () => {
  const router = useRouter();
  const setViewer = useSetRecoilState(viewerState);
  const [getViewer] = useViewerLazyQuery({
    onCompleted: data => {
      if (!data.viewer) return;

      setViewer(data.viewer);
      toast.success('ログインしました。');
      router.push(pagesPath.$url());
    },
    onError: handleApolloError,
    fetchPolicy: 'network-only',
  });
  const classes = useStyles();

  const onLogin = () => {
    signInFirebaseWithTwitter()
      .then(() => {
        getViewer();
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
