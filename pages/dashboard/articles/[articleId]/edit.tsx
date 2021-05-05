import React from 'react';

import {
  ArticleAttributes,
  ArticleFragment,
  MyArticleDocument,
  MyArticleQuery,
  useUpdateArticleMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import ArticleForm from '@/components/ArticleForm';

interface Props {
  article: ArticleFragment;
}

const Page: React.FC<Props> = ({ article }) => {
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

  return (
    <DashboardContent activeTab="article">
      <Head title="記事更新" />

      <PageHeader title="記事更新" />

      <ArticleForm
        initialAttributes={{ category: article.category, title: article.title, content: article.content }}
        onSubmit={onSubmit}
      />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const articleId = params?.articleId as string;
  const data: MyArticleQuery = await fetchGraphql(MyArticleDocument, { articleId });

  return { props: { article: data.myArticle } };
};

export default Page;
