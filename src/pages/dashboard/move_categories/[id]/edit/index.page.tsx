import React from 'react';

import {
  MoveCategoryAttributes,
  MoveCategoryFragment,
  usePageDashboardMoveCategoryEditQuery,
  useUpdateMoveCategoryMutation,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MoveCategoryForm } from '@/components/MoveCategoryForm';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { id } = router.query;
  const { data, loading } = usePageDashboardMoveCategoryEditQuery({
    variables: { moveCategoryId: id as string },
    skip: !id,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { moveCategory } = data;

  return (
    <DashboardContent title="カテゴリ編集">
      <PageContent moveCategory={moveCategory} moveCategories={moveCategory.character.moveCategories} />
    </DashboardContent>
  );
};

export const PageContent: React.FC<{ moveCategory: MoveCategoryFragment; moveCategories: MoveCategoryFragment[] }> = ({
  moveCategory,
  moveCategories,
}) => {
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

  return <MoveCategoryForm moveCategory={moveCategory} moveCategories={moveCategories} onSubmit={onSubmit} />;
};

export default Page;
