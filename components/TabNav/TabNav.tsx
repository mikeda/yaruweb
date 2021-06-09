import Link from 'next/link';
import React from 'react';

import styles from './TabNav.module.scss';

interface Tab {
  key: string;
  href: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  activeTabKey: string;
}

export const TabNav: React.FC<Props> = ({ tabs, activeTabKey }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {tabs.map(({ key, href, label }) => {
          const linkClass = key === activeTabKey ? styles.linkActive : styles.link;

          return (
            <Link key={key} href={href}>
              <a className={linkClass}>{label}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
