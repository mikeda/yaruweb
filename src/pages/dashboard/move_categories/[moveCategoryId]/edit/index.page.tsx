import React from 'react';

import {
  MoveCategoryAttributes,
  MoveCategoryFragment,
  usePageDashboardMoveCategoryEditQuery,
  useUpdateMoveCategoryMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MoveCategoryForm } from '@/components/MoveCategoryForm';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { moveCategoryId } = router.query;
  const { data, loading } = usePageDashboardMoveCategoryEditQuery({
    variables: { moveCategoryId: moveCategoryId as string },
    skip: !moveCategoryId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { moveCategory } = data;

  return (
    <DashboardContent activeTab="character">
      <Head title="技データカテゴリ更新" />

      <PageHeader title="技データカテゴリ更新" />

      <PageContent moveCategory={moveCategory} />
    </DashboardContent>
  );
};

export const PageContent: React.FC<{ moveCategory: MoveCategoryFragment }> = ({ moveCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateMoveCategory, { loading }] = useUpdateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('技データカテゴリを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: MoveCategoryAttributes) => {
    updateMoveCategory({ variables: { moveCategoryId: moveCategory.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="技データカテゴリ更新" />

      <PageHeader title="技データカテゴリ更新" />

      <MoveCategoryForm moveCategory={moveCategory} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
