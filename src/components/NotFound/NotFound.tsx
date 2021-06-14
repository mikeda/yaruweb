import React from 'react';

import styles from './NotFound.module.scss';

export const NotFound: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
