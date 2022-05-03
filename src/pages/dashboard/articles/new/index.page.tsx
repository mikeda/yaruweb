import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ArticleAttributes, useCreateArticleMutation, loadingState } from '@/lib';

import { ArticleForm, DashboardBreadcrumbs, DashboardContent } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createArticle, { loading }] = useCreateArticleMutation({
    onCompleted: () => {
      toast.success('記事を作成しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ArticleAttributes) => {
    createArticle({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent title="記事登録" breadcrumb={<DashboardBreadcrumbs to="articlesNew" />}>
      <ArticleForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
