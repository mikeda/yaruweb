import React from 'react';
import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';
import { ChainParam as DashboardChainParam, breadcrumbChain as dashboardChain } from './DashboardDefinition';
import { breadcrumbChain, ChainParam } from './Definition';

export type BreadcrumbChainItem = {
  name: string;
  url?: string;
  parent?: BreadcrumbChainItem;
};

type BreadcrumbsItem = { name: string; url?: string };

export const Breadcrumbs: React.FC<ChainParam> = props => {
  let current = breadcrumbChain(props);
  const items: BreadcrumbsItem[] = [{ name: current.name }];

  while (current) {
    if (!current.parent) break;

    current = current.parent;
    items.unshift({ name: current.name, url: current.url });
  }

  return <BreadcrumbList items={items} />;
};

export const DashboardBreadcrumbs: React.FC<DashboardChainParam> = props => {
  let current = dashboardChain(props);
  const items: BreadcrumbsItem[] = [{ name: current.name }];

  while (current) {
    if (!current.parent) break;

    current = current.parent;
    items.unshift({ name: current.name, url: current.url });
  }

  return <BreadcrumbList items={items} />;
};

const BreadcrumbList: React.FC<{ items: BreadcrumbsItem[] }> = ({ items }) => {
  return (
    <ul className={styles.breadcrumbs}>
      <Item name="TOP" url="/" />
      {items.map(({ name, url }, i) => (
        <Item key={i} name={name} url={url} />
      ))}
    </ul>
  );
};

const Item: React.FC<BreadcrumbsItem> = ({ name, url }) => (
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
