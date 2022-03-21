import React, { ReactNode } from 'react';

import { GlobalHeader, HeaderNav, TabValue } from '@/components';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '@/theme';

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    maxWidth: 730,
    padding: 16,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(1),
  },
});

interface Props {
  title?: string;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
  activeTab: TabValue;
}

export const Content: React.FC<Props> = ({ title, breadcrumb, activeTab, children }) => {
  const classes = useStyles();

  return (
    <>
      <GlobalHeader>
        <HeaderNav activeTab={activeTab} />
      </GlobalHeader>
      <div className={classes.root}>
        <div className={classes.header}>
          {breadcrumb}
          {title && (
            <Typography className={classes.title} variant="h1">
              {title}
            </Typography>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
