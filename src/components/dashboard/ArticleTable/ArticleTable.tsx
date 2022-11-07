import React, { useCallback } from 'react';

import { useSetRecoilState } from 'recoil';

import { ArticleTableRow } from './ArticleTableRow';

import { DashboardTable, DashboardTablePaging, DashboardTableSearch } from '@/components';
import { useArticleTableRowsQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const ArticleTable: React.FC = () => {
  const { data, loading, fetchMore, refetch } = useArticleTableRowsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const setLoading = useSetRecoilState(loadingState);

  const onClickSearch = useCallback((keyword: string) => {
    refetch({ keyword });
  }, []);

  if (!data) return null;
  const { edges, pageInfo } = data.myArticles;
  const articles = edges.map(edge => edge.node);

  const onClickMore = () => {
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  setLoading(loading);
  return (
    <>
      <DashboardTableSearch onClickSearch={onClickSearch} />

      <DashboardTable>
        {articles.map(article => (
          <ArticleTableRow key={article.id} article={article} />
        ))}
      </DashboardTable>

      {pageInfo.hasNextPage && <DashboardTablePaging onClick={onClickMore} />}
    </>
  );
};
