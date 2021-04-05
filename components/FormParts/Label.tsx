import React from 'react';

import styles from './Label.module.scss';

interface Props {
  name: string;
}

export const Label: React.FC<Props> = ({ name, children }) => (
  <label htmlFor={name} className={styles.label}>
    {children}
  </label>
);
