import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

import { useMyArticleQuery, useUpdateArticleMutation } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { Head } from '@/components/layouts/Head';

const ArticleForm = dynamic(() => import('../../../components/ArticleForm'), {
  ssr: false,
});

const Content: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [updateArticle, { loading: updateLoading }] = useUpdateArticleMutation({
    onCompleted: () => {
      router.push(Routes.mypageArticles());
      toast.success('記事を作成しました。');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { data, loading, error } = useMyArticleQuery({ variables: { id }, fetchPolicy: 'network-only' });
  if (loading) return <NotFound>読み込み中</NotFound>;
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data) return <NotFound>データの読み込みに失敗しました。</NotFound>;

  const article = data.myArticle;

  return (
    <ArticleForm
      initialAttributes={article}
      onSubmit={attributes => {
        updateArticle({ variables: { id, attributes } });
      }}
      loading={updateLoading}
    />
  );
};

const Page: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Head title="記事編集" />

      <Heading lv="h1">記事編集</Heading>

      {id && <Content id={id} />}
    </>
  );
};
export default Page;
