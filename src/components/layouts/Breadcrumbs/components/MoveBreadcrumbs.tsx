import React from 'react';
import { useBreadcrumbsMoveQuery } from '@/lib/graphql/types';
import { DashboardBreadcrumbs } from '..';

interface Props {
  moveId: string;
}

export const MoveBreadcrumbs: React.FC<Props> = ({ moveId }) => {
  const { data } = useBreadcrumbsMoveQuery({ variables: { moveId } });
  if (!data) return null;

  return <DashboardBreadcrumbs to="move" move={data.move} />;
};
