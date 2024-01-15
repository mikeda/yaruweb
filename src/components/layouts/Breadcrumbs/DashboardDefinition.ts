import { BreadcrumbChainItem } from '.';

export type DashboardBreadcrumbParams =
  | { to: 'profileEdit' };

export const breadcrumbChain = (props: DashboardBreadcrumbParams): BreadcrumbChainItem => {
  switch (props.to) {
    case 'profileEdit':
      return { name: 'プロフィール編集' };
  }
};
