import React from 'react';

import styles from './CheckBox.module.scss';

type Props = {
  id: string;
  label: string;
};

export const CheckBox: React.FC<Props> = ({ id, label, children }) => {
  return (
    <div className={styles.checkbox}>
      {children}
      <label htmlFor={id}>
        <span className={styles.check}></span>
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};
