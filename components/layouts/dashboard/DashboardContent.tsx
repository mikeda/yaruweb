import React from 'react';
import { GlobalHeader } from '../GlobalHeader';

import styles from './Content.module.scss';
import { Tabs, TabKey } from './Tabs';

interface Props {
  activeTab: TabKey;
}

export const DashboardContent: React.FC<Props> = ({ activeTab, children }) => {
  return (
    <>
      <GlobalHeader />

      <div className={styles.container}>
        <Tabs activeTab={activeTab} />

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
