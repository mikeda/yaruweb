import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Routes } from '@/lib/Routes';

import styles from './HeaderNav.module.scss';

const links = [
  { name: 'TOP', path: Routes.top() },
  { name: 'キャラクター', path: Routes.character.index() },
  { name: '記事', path: Routes.article.index() },
  { name: '動画', path: Routes.video.index() },
  { name: 'イベント', path: Routes.event.index() },
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
