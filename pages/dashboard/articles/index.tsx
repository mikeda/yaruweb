import React from 'react';

import {
  Article,
  ArticleStatus,
  useDeleteArticleMutation,
  usePageDashboardArticlesQuery,
  usePublishArticleMutation,
  useStopArticleMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { useRouter } from 'next/router';
import { Paging } from '@/components/blocks/Paging';
import { ObjectCardList } from '@/components/ObjectCardList';
import { ObjectCardLinkProps } from '@/components/ObjectCard';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading, refetch } = usePageDashboardArticlesQuery({
    variables: { page },
    fetchPolicy: 'network-only',
    skip: !router.isReady,
  });

  setLoading(loading);
  if (!data) return null;

  const {
    myArticles: { records: articles, paging },
  } = data;

  return (
    <DashboardContent activeTab="article">
      <Head title="記事" />
      <Breadcrumbs current="記事" />
      <PageHeader title="記事" addPageUrl={Routes.dashboard.article.new()} />

      <PageContent articles={articles} refetch={refetch} />

      <Paging paging={paging} url={Routes.dashboard.article.index} />
    </DashboardContent>
  );
};

type ArticleFragment = Pick<Article, 'id' | 'title' | 'status'>;

interface PageContentProps {
  articles: ArticleFragment[];
  refetch: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ articles, refetch }) => {
  const setLoading = useSetRecoilState(loadingState);

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
  const [deleteArticle, { loading: deleteLoading }] = useDeleteArticleMutation({
    onCompleted: data => {
      const article = data.deleteArticle?.article;
      if (!article) return;
      refetch();
      toast.success('記事を削除しました。');
    },
  });

  setLoading(publishLoading || stopLoading || deleteLoading);

  return (
    <ObjectCardList
      items={articles.map(article => {
        const links: ObjectCardLinkProps[] = [{ text: '編集する', url: Routes.dashboard.article.edit(article.id) }];

        if (article.status === ArticleStatus.Draft) {
          links.push(
            { text: '公開する', onClick: () => publishArticle({ variables: { articleId: article.id } }) },
            {
              text: '削除する',
              onClick: () => {
                if (window.confirm('記事を削除します。')) {
                  deleteArticle({ variables: { articleId: article.id } });
                }
              },
            },
          );
        } else {
          links.push({ text: '停止する', onClick: () => stopArticle({ variables: { articleId: article.id } }) });
        }

        return {
          id: article.id,
          title: article.status === ArticleStatus.Draft ? `[下書き] ${article.title}` : article.title,
          links,
        };
      })}
    />
  );
};

export default Page;
