import { ArticleParam } from './params';

import { BreadcrumbChainItem } from '.';

import { pagesPath } from '@/generated/$path';

export type DashboardBreadcrumbParams =
  | { to: 'articles' }
  | { to: 'article'; article: ArticleParam }
  | { to: 'articlesNew' }
  | { to: 'articleEdit'; article: ArticleParam }
  | { to: 'profileEdit' };

export const breadcrumbChain = (props: DashboardBreadcrumbParams): BreadcrumbChainItem => {
  switch (props.to) {
    case 'articles':
      return { name: '記事', url: pagesPath.dashboard.articles.$url() };
    case 'article':
      return { name: props.article.title, parent: breadcrumbChain({ to: 'articles' }) };
    case 'articlesNew':
      return { name: '記事を登録', parent: breadcrumbChain({ to: 'articles' }) };
    case 'articleEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'article', article: props.article }) };
    case 'profileEdit':
      return { name: 'プロフィール編集' };
  }
};
