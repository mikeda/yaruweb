import React from 'react';

import styles from './FormInline.module.scss';

export const FormInline: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
