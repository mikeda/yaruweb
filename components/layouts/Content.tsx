import React from 'react';

import styles from './Content.module.scss';

interface Props {
  size?: 'xs';
}

export const Content: React.FC<Props> = ({ size, children }) => {
  const className = size === 'xs' ? styles.contentXs : styles.content;

  return <div className={className}>{children}</div>;
};
