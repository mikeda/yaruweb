import React from 'react';

import styles from './Operations.module.scss';

export const Wrapper: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
