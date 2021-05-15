import React from 'react';

import {
  ArticleStatus,
  useMyArticlesQuery,
  usePublishArticleMutation,
  useStopArticleMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { ArticleStatusText } from '@/lib/graphql/enum_texts';
import { Routes } from '@/lib/Routes';
import { ReadMore } from '@/components/blocks/ReadMore';
import { PageHeader } from '@/components/layouts/PageHeader';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { useCurrentPlayer } from 'hooks/useCurrentPlayer';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';

const Page: React.FC = () => (
  <DashboardContent activeTab="article">
    <Head title="記事" />
    <Breadcrumbs current="記事" />

    <PageHeader title="記事" addPageUrl={Routes.dashboard.article.new()} />

    <ArticleList />
  </DashboardContent>
);

const ArticleList: React.FC = () => {
  const { currentPlayer } = useCurrentPlayer();
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, fetchMore, refetch } = useMyArticlesQuery({
    variables: { first: 10 },
    fetchPolicy: 'network-only',
    skip: !currentPlayer,
  });
  const [publishArticle, { loading: publishLoading }] = usePublishArticleMutation({
    onCompleted: data => {
      const article = data.publishArticle?.article;
      if (!article) return;
      refetch();
      toast.success('記事を公開しました。');
    },
  });
  const [stopArticle, { loading: stopLoading }] = useStopArticleMutation({
    onCompleted: data => {
      const article = data.stopArticle?.article;
      if (!article) return;
      refetch();
      toast.success('公開を停止しました。');
    },
  });

  setLoading(loading || publishLoading || stopLoading);

  if (!data) return <NotFound>記事がありません。</NotFound>;

  const articles = data.myArticles.nodes;
  if (!(articles && articles.length > 0)) return <NotFound>記事がありません。</NotFound>;
  const pageInfo = data.myArticles.pageInfo;

  return (
    <>
      <div className="bl_horizTable">
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>ステータス</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => {
              if (!article) return;

              return (
                <tr key={article.id}>
                  <td>
                    <a href={Routes.article.detail(article.id)} target="_blank" rel="noreferrer">
                      {article.title}
                    </a>
                  </td>
                  <td>{ArticleStatusText[article.status]}</td>
                  <td>
                    <Link href={Routes.dashboard.article.edit(article.id)}>
                      <a>編集</a>
                    </Link>
                    /
                    {article.status === ArticleStatus.Draft ? (
                      <a
                        onClick={() => {
                          publishArticle({ variables: { articleId: article.id } });
                        }}
                      >
                        公開する
                      </a>
                    ) : (
                      <a
                        onClick={() => {
                          stopArticle({ variables: { articleId: article.id } });
                        }}
                      >
                        停止する
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.myArticles.pageInfo?.hasNextPage && (
        <ReadMore
          onClick={() => {
            fetchMore({
              variables: { after: pageInfo.endCursor },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                const prevNodes = prev.myArticles.nodes;
                const nodes = fetchMoreResult.myArticles.nodes;
                if (!(prevNodes && nodes)) return prev;

                return {
                  ...fetchMoreResult,
                  myArticles: {
                    ...fetchMoreResult.myArticles,
                    nodes: [...prevNodes, ...nodes],
                  },
                };
              },
            });
          }}
        />
      )}
    </>
  );
};

export default Page;
