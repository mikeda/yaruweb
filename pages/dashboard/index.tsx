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
import { Heading } from '@/components/Heading';

const Page: React.FC = () => (
  <DashboardContent activeTab="article">
    <Head title="記事一覧" />

    <Heading lv="h1">記事</Heading>

    <ArticleList />
  </DashboardContent>
);

const ArticleList: React.FC = () => {
  const { data, loading, refetch } = useMyArticlesQuery();
  const [publishArticle] = usePublishArticleMutation({ onCompleted: () => refetch() });
  const [stopArticle] = useStopArticleMutation({ onCompleted: () => refetch() });
  if (loading) return <NotFound>読み込み中</NotFound>;

  const articles = data?.myArticles.nodes;
  if (!(articles && articles.length > 0)) return <NotFound>記事がありません。</NotFound>;

  return (
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
                  <a href={`/articles/${article.id}`} target="_blank" rel="noreferrer">
                    {article.title}
                  </a>
                </td>
                <td>{ArticleStatusText[article.status]}</td>
                <td>
                  <Link href={Routes.updateArticle(article.id)}>
                    <a>編集</a>
                  </Link>
                  /
                  {article.status === ArticleStatus.Draft ? (
                    <a
                      onClick={() => {
                        publishArticle({ variables: { id: article.id } });
                      }}
                    >
                      公開する
                    </a>
                  ) : (
                    <a
                      onClick={() => {
                        stopArticle({ variables: { id: article.id } });
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
  );
};

export default Page;
