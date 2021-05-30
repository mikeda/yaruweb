import React from 'react';

import {
  ArticleStatus,
  useMyArticlesQuery,
  usePublishArticleMutation,
  useStopArticleMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import Link from 'next/link';
import { ArticleStatusText } from '@/lib/graphql/enum_texts';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { useRouter } from 'next/router';
import { Paging } from '@/components/blocks/Paging';

const Page: React.FC = () => {
  return (
    <DashboardContent activeTab="article">
      <Head title="記事" />
      <Breadcrumbs current="記事" />
      <PageHeader title="記事" addPageUrl={Routes.dashboard.article.new()} />

      <ArticleList />
    </DashboardContent>
  );
};

const ArticleList: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading, refetch } = useMyArticlesQuery({
    variables: { page },
    fetchPolicy: 'network-only',
    skip: !router.isReady,
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

  const url = (page: number) => Routes.dashboard.article.index({ page });

  setLoading(loading || publishLoading || stopLoading);

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
            {data?.myArticles.records.map(article => {
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

      {data && <Paging paging={data.myArticles.paging} url={url} />}
    </>
  );
};

export default Page;
