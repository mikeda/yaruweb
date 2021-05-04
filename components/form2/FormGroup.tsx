import React from 'react';

import styles from './FormGroup.module.scss';

interface Props {
  label?: string;
}

export const FormGroup: React.FC<Props> = ({ label, children }) => (
  <div className={styles.container}>
    {label && <label className={styles.label}>{label}</label>}
    {children}
  </div>
);
