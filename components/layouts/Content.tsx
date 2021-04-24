import React from 'react';

import styles from './Content.module.scss';
import { GlobalHeader } from './GlobalHeader';

interface Props {
  size?: 'xs';
}

export const Content: React.FC<Props> = ({ size, children }) => {
  const className = size === 'xs' ? styles.contentXs : styles.content;

  return (
    <>
      <GlobalHeader />
      <div className={className}>{children}</div>;
    </>
  );
};
