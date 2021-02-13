import React from 'react';

import styles from './Paragraph.module.scss';

interface Props {
  attributes: { [key: string]: unknown };
}

export const Paragraph: React.FC<Props> = ({ attributes, children }) => {
  return (
    <p className={styles.paragraph} {...attributes}>
      {children}
    </p>
  );
};
