import React from 'react';
import { default as MuiBreadcrumbs } from '@material-ui/core/Breadcrumbs';
import { default as MuiLink } from '@material-ui/core/Link';

import { ChainParam as DashboardChainParam, breadcrumbChain as dashboardChain } from './DashboardDefinition';
import { breadcrumbChain, ChainParam } from './Definition';
import { Typography } from '@material-ui/core';
import Link from 'next/link';

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
    <MuiBreadcrumbs>
      <Link href="/">TOP</Link>
      {items.map(({ name, url }) => (url ? <Link href={url}>{name}</Link> : <Typography>{name}</Typography>))}
    </MuiBreadcrumbs>
  );
};
