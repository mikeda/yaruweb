import React from 'react';

import {
  ArticleAttributes,
  ArticleFormArticleFragment,
  useMyArticleQuery,
  useUpdateArticleMutation,
} from '@/lib/graphql/types';
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
  const { id } = router.query;
  const { data, loading } = useMyArticleQuery({
    variables: { articleId: id as string },
    skip: !id,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <DashboardContent
      title="記事編集"
      breadcrumb={data && <DashboardBreadcrumbs to="articleEdit" article={data.myArticle} />}
    >
      {data && <Content article={data.myArticle} />}
    </DashboardContent>
  );
};

const Content: React.FC<{ article: ArticleFormArticleFragment }> = ({ article }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateArticle, { loading }] = useUpdateArticleMutation({
    onCompleted: () => {
      toast.success('記事を更新しました。');
      router.back();
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
