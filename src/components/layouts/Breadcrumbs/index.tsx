import React from 'react';

import { UrlObject } from 'url';

import { Typography } from '@mui/material';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';

import { DashboardBreadcrumbParams, breadcrumbChain as dashboardChain } from './DashboardDefinition';
import { breadcrumbChain, ChainParam } from './Definition';

import { Link } from '@/components';

export type BreadcrumbChainItem = {
  name: string;
  url?: UrlObject;
  parent?: BreadcrumbChainItem;
};

type BreadcrumbsItem = { name: string; url?: UrlObject };

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
      {items.map(({ name, url }, i) =>
        url ? (
          <Link href={url} color="inherit" key={i}>
            {name}
          </Link>
        ) : (
          <Typography key={i}>{name}</Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
};
