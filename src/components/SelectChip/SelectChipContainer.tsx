import React from 'react';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

import { theme } from '@/lib';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

interface Props {
  children: React.ReactNode;
}

export const SelectChipContainer: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
