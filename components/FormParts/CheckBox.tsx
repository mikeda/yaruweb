import React from 'react';

import styles from './CheckBox.module.scss';

type Props = {
  name: string;
  label: string;
};

export const CheckBox: React.FC<Props> = ({ name, label, children }) => {
  return (
    <div className={styles.checkbox}>
      {children}

      <label htmlFor={name}>
        <span className={styles.check}></span>
        <span >{label}</span>
      </label>
    </div>
  );
};
