import React from 'react';

import styles from './HeadingOne.module.scss';

interface Props {
  attributes: { [key: string]: unknown };
}

export const HeadingOne: React.FC<Props> = ({ attributes, children }) => {
  return (
    <h2 className={styles.heading} {...attributes}>
      {children}
    </h2>
  );
};
