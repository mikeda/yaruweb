import React from 'react';

import styles from './TabLinkGroup.module.scss';

export const TabLinkGroup: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
