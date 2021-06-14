import React from 'react';
import { useRecoilValue } from 'recoil';
import { loadingState } from '@/states/loading';

import styles from './Loading.module.scss';

export const Loading: React.FC = () => {
  const loading = useRecoilValue(loadingState);
  if (!loading) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.inner}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
