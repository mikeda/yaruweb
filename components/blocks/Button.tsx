import React from 'react';

import styles from './Button.module.scss';

export const Button: React.FC = ({ children }) => {
  return <div className={styles.button}>{children}</div>;
};
