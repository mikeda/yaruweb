import React from 'react';

import { ArticleAttributes, ArticleFragment, useMyArticleQuery, useUpdateArticleMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import ArticleForm from '@/components/ArticleForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { articleId } = router.query;
  const { data, loading } = useMyArticleQuery({
    variables: { articleId: articleId as string },
    skip: !articleId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <DashboardContent activeTab="article">
      <Head title="記事編集" />
      <Breadcrumbs parents={[{ name: '記事', url: Routes.dashboard.article.index() }]} current="記事編集" />

      <PageHeader title="記事編集" />

      {data && <Content article={data.myArticle} />}
    </DashboardContent>
  );
};

const Content: React.FC<{ article: ArticleFragment }> = ({ article }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateArticle, { loading }] = useUpdateArticleMutation({
    onCompleted: () => {
      toast.success('記事を更新しました。');
      router.push(Routes.dashboard.article.index());
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ArticleAttributes) => {
    updateArticle({ variables: { articleId: article.id, attributes } });
  };

  setLoading(loading);

  return <ArticleForm article={article} onSubmit={onSubmit} />;
};

export default Page;
