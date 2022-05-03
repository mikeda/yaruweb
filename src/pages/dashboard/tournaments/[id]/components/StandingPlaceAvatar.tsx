import React from 'react';
import { Avatar } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  first: {
    backgroundColor: '#D6AF36',
  },
  second: {
    backgroundColor: '#A7A7AD',
  },
  third: {
    backgroundColor: '#824A02',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

interface Props {
  place: number;
}

export const StandingPlaceAvatar: React.FC<Props> = ({ place }) => {
  const classes = useStyles();

  switch (place) {
    case 1:
      return <Avatar className={classes.first}>1</Avatar>;
    case 2:
      return <Avatar className={classes.second}>2</Avatar>;
    case 3:
      return <Avatar className={classes.third}>3</Avatar>;
    default:
      return <Avatar>{place}</Avatar>;
  }
};
