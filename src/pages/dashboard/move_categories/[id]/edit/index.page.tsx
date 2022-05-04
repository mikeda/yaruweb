import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { DashboardContent, MoveCategoryForm } from '@/components';
import {
  MoveCategoryAttributes,
  MoveCategoryFragment,
  usePageDashboardMoveCategoryEditQuery,
  useUpdateMoveCategoryMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

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
