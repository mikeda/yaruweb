import React from 'react';

import styles from './FormGrid.module.scss';

export const FormGrid: React.FC = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};
