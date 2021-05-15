import React from 'react';
import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';

interface ParentProps {
  name: string;
  url: string;
}

export interface BreadcrumbsProps {
  parents?: ParentProps[];
  current: string;
  dashboard?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ parents, current, dashboard = false }) => {
  return (
    <ul className={styles.breadcrumbs}>
      {!dashboard && <Parent name="TOP" url="/" />}
      {parents && parents.map(({ name, url }, i) => <Parent key={i} name={name} url={url} />)}
      <li className={styles.item}>{current}</li>
    </ul>
  );
};

const Parent: React.FC<ParentProps> = ({ name, url }) => (
  <li className={styles.item}>
    <Link href={url}>
      <a>{name}</a>
    </Link>
  </li>
);
