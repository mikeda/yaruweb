import * as React from 'react';
import clsx from 'clsx';

import styles from './Grid.module.scss';

export const Grid: React.FC = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export const GridItem: React.FC<{ md?: number; sm: number }> = ({ md, sm, children }) => {
  return <div className={clsx(styles.item, styles[`sm-${sm}`], { [styles[`md-${md}`]]: md })}>{children}</div>;
};
