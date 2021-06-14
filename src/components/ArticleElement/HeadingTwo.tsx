import React from 'react';

import styles from './HeadingTwo.module.scss';

interface Props {
  attributes: { [key: string]: unknown };
}

export const HeadingTwo: React.FC<Props> = ({ attributes, children }) => {
  return (
    <h2 className={styles.heading} {...attributes}>
      {children}
    </h2>
  );
};
