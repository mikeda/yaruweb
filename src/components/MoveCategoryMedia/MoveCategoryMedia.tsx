import React from 'react';

import { MoveCategoryFragment } from '@/lib/graphql/types';

import styles from './MoveCategoryMedia.module.scss';

type Props = {
  moveCategory: MoveCategoryFragment;
};

export const MoveCategoryMedia: React.FC<Props> = ({ moveCategory }) => {
  return (
    <div className={styles.container}>
      <div className={styles.ttl}>{moveCategory.name}</div>
    </div>
  );
};
