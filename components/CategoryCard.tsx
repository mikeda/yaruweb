import Link from 'next/link';
import React from 'react';

import styles from './CategoryCard.module.scss';

export interface Category {
  id: string;
  name: string;
  href: string;
}

export const CategoryCard: React.FC<Category> = ({ name, href }) => {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <div className={styles.body}>
          <p className={styles.ttl}>{name}</p>
        </div>
      </a>
    </Link>
  );
};
