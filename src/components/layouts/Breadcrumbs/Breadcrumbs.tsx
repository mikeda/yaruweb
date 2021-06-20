import React from 'react';
import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';

interface ItemProps {
  name: string;
  url?: string;
}
export interface BreadcrumbsProps {
  items: ItemProps[];
  dashboard?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, dashboard = false }) => {
  return (
    <ul className={styles.breadcrumbs}>
      {!dashboard && <Item name="TOP" url="/" />}
      {items && items.map(({ name, url }, i) => <Item key={i} name={name} url={url} />)}
    </ul>
  );
};

const Item: React.FC<ItemProps> = ({ name, url }) => (
  <li className={styles.item}>
    {url ? (
      <Link href={url}>
        <a>{name}</a>
      </Link>
    ) : (
      <span>{name}</span>
    )}
  </li>
);
