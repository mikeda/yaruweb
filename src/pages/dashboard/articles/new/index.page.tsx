import React from 'react';

import { ArticleAttributes, useCreateArticleMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { ArticleForm } from '@/components/ArticleForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { dashboardPath } from '@/lib';

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
    <DashboardContent activeTab="article">
      <Head title="記事登録" />
      <Breadcrumbs items={[{ name: '記事', url: dashboardPath({ to: 'articles' }) }, { name: '記事登録' }]} />
      <PageHeader title="記事登録" />

      <ArticleForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
