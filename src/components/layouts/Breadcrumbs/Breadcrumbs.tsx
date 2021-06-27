import React from 'react';
import { default as MuiBreadcrumbs } from '@material-ui/core/Breadcrumbs';

import { DashboardBreadcrumbParams, breadcrumbChain as dashboardChain } from './DashboardDefinition';
import { breadcrumbChain, ChainParam } from './Definition';
import { Typography } from '@material-ui/core';
import { Link } from '@/components/Link';

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

export const DashboardBreadcrumbs: React.FC<DashboardBreadcrumbParams> = props => {
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
      <Link href="/" color="inherit">
        TOP
      </Link>
      {items.map(({ name, url }) =>
        url ? (
          <Link href={url} color="inherit">
            {name}
          </Link>
        ) : (
          <Typography>{name}</Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
};
