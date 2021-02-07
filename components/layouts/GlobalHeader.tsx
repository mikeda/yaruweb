import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons';

import { HeaderNav } from './HeaderNav';
import { Routes } from '@/lib/Routes';
import { PlayerMenu } from './PlayerMenu';

import styles from './GlobalHeader.module.scss';

export const GlobalHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div>
            <Link href={Routes.top()}>
              <a className={styles.logo}>
                <FontAwesomeIcon icon={faFistRaised} />
                {' 鉄拳やろうよ.com'}
              </a>
            </Link>

            <div className={styles.shoulder}>格闘ゲーム 鉄拳7を楽しむためのサイト</div>
          </div>

          <PlayerMenu />
        </div>

        <HeaderNav />
      </div>
    </header>
  );
};
