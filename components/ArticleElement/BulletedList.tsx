import React from 'react';

import styles from './BulletedList.module.scss';

interface Props {
  attributes: { [key: string]: unknown };
}

export const BulletedList: React.FC<Props> = ({ attributes, children }) => {
  return (
    <ul className={styles.list} {...attributes}>
      {children}
    </ul>
  );
};
