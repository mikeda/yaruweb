import React from 'react';

import styles from './FormGroup.module.scss';

interface Props {
  label?: string;
  required?: boolean;
}

export const FormGroup: React.FC<Props> = ({ label, required, children }) => (
  <div className={styles.container}>
    {label && <label className={required ? styles.labelRequired : styles.label}>{label}</label>}
    {children}
  </div>
);
