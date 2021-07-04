import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons';

import { UserMenu } from '../UserMenu';

import styles from './GlobalHeader.module.scss';
import { path } from '@/lib';

export const GlobalHeader: React.FC = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div>
            <Link href={path({ to: 'top' })}>
              <a className={styles.logo}>
                <FontAwesomeIcon icon={faFistRaised} />
                {' 鉄拳やろうよ.com'}
              </a>
            </Link>

            <div className={styles.shoulder}>格闘ゲーム 鉄拳7を楽しむためのサイト</div>
          </div>

          <UserMenu />
        </div>

        {children}
      </div>
    </header>
  );
};
