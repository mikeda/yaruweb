import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useCreateArticleMutation } from '@/lib/graphql/types';
import { Routes } from '@/lib/Routes';

import dynamic from 'next/dynamic';
import { Heading } from '@/components/Heading';
const ArticleForm = dynamic(() => import('../../components/ArticleForm'), {
  ssr: false,
});

const Page: React.FC = () => {
  const router = useRouter();

  const [createArticle, { loading }] = useCreateArticleMutation({
    onCompleted: () => {
      router.push(Routes.mypageArticles());
      toast.success('記事を作成しました。');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Heading lv="h1">記事作成</Heading>

      <ArticleForm
        onSubmit={attributes => {
          createArticle({ variables: { attributes } });
        }}
        loading={loading}
      />
    </>
  );
};

export default Page;
