import React from 'react';
import Link from 'next/link';

import { Routes } from '@/lib/Routes';
import { PlayerMenu } from './PlayerMenu';

import styles from './GlobalHeader.module.scss';

export const GlobalHeader: React.FC = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div>
            <Link href={Routes.top()}>
              <a className={styles.logo}>
                <img src="https://yarouyo.s3-ap-northeast-1.amazonaws.com/site/service_logo.png" />
              </a>
            </Link>

            <div className={styles.shoulder}>格闘ゲーム 鉄拳7を楽しむためのサイト</div>
          </div>

          <PlayerMenu />
        </div>

        {children}
      </div>
    </header>
  );
};
