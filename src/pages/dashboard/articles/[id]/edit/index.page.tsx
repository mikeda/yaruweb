import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ArticleForm, DashboardBreadcrumbs, DashboardContent } from '@/components';
import {
  ArticleAttributes,
  ArticleFormArticleFragment,
  useDashboardArticlePageQuery,
  useUpdateArticleMutation,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { id } = router.query;
  const { data, loading } = useDashboardArticlePageQuery({
    variables: { articleId: id as string },
    skip: !id,
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  });

  setLoading(loading);

  return (
    <DashboardContent
      title='記事編集'
      breadcrumb={data && <DashboardBreadcrumbs to='articleEdit' article={data.article} />}
    >
      {data && <Content article={data.article} />}
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
    onError: handleApolloError,
  });

  const onSubmit = (attributes: ArticleAttributes) => {
    updateArticle({ variables: { articleId: article.id, attributes } });
  };

  setLoading(loading);

  return <ArticleForm article={article} onSubmit={onSubmit} />;
};

export default Page;
