import React from 'react';

import { ArticleAttributes, useCreateArticleMutation } from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { ArticleForm } from '@/components/ArticleForm';
import { DashboardBreadcrumbs } from '@/components';

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
