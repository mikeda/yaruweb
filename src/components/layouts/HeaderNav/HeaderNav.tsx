import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './HeaderNav.module.scss';
import { path } from '@/lib';

const links = [
  { name: 'TOP', path: path({ to: 'top' }) },
  { name: 'キャラクター', path: path({ to: 'characters' }) },
  { name: '記事', path: path({ to: 'articles' }) },
  { name: '大会', path: path({ to: 'tournaments' }) },
];

const isActive = (linkPath: string, currentPath: string): boolean => {
  if (linkPath === '/') {
    return currentPath === '/';
  } else {
    return currentPath.startsWith(linkPath);
  }
};

export const HeaderNav: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <nav>
      <ul className={styles.container}>
        {links.map(link => {
          const className = isActive(link.path, currentPath) ? styles.itemActive : styles.item;

          return (
            <li className={className} key={link.path}>
              <Link href={link.path}>
                <a className={styles.link}>{link.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
