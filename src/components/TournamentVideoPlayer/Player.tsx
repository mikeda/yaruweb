import React from 'react';

import { Avatar, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

import { theme } from '@/lib';

const useStyles = makeStyles({
  root: {
    marginBottom: theme.spacing(1),
  },
  round: {
    width: 32,
    height: 32,
    textDecoration: 'none',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(1),
  },
  win: {
    backgroundColor: '#D6AF36',
  },
  vs: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: 32,
  },
});

interface Props {
  name: string;
  rounds: number;
  faceImageUrl: string;
}

export const Player: React.FC<Props> = ({ name, rounds, faceImageUrl }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.root}>
      <Avatar className={clsx(classes.avatar, rounds === 3 && classes.win)}>{rounds}</Avatar>
      <Avatar className={classes.avatar} src={faceImageUrl} />
      <Typography component="div">{name}</Typography>
    </Box>
  );
};
