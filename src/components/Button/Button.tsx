import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

type ColorType = 'primary' | 'info';

interface Props {
  type?: ColorType;
}

export const Button: React.FC<Props> = ({ type = 'primary', children }) => {
  return <div className={clsx(styles.button, styles[type])}>{children}</div>;
};

export const ButtonListInline: React.FC = ({ children }) => {
  return <div className={styles.listInline}>{children}</div>;
};
