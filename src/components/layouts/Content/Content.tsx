import React, { ReactNode } from 'react';

import { GlobalHeader, HeaderNav, TabValue } from '@/components';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    maxWidth: 730,
    padding: 16,
    marginRight: 'auto',
    marginLeft: 'auto',
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
        {title && <Typography variant="h5">{title}</Typography>}
        {breadcrumb}
        {children}
      </div>
      ;
    </>
  );
};
