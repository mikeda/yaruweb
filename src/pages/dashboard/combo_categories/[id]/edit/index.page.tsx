import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import {
  ComboCategoryAttributes,
  ComboCategoryFragment,
  usePageDashboardComboCategoryEditQuery,
  useUpdateComboCategoryMutation,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';

import { DashboardContent, ComboCategoryForm } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { id } = router.query;
  const { data, loading } = usePageDashboardComboCategoryEditQuery({
    variables: { comboCategoryId: id as string },
    skip: !id,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { comboCategory } = data;

  return (
    <DashboardContent title="カテゴリ編集">
      <PageContent comboCategory={comboCategory} comboCategories={comboCategory.character.comboCategories} />
    </DashboardContent>
  );
};

export const PageContent: React.FC<{
  comboCategory: ComboCategoryFragment;
  comboCategories: ComboCategoryFragment[];
}> = ({ comboCategory, comboCategories }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateComboCategory, { loading }] = useUpdateComboCategoryMutation({
    onCompleted: () => {
      toast.success('コンボカテゴリを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboCategoryAttributes) => {
    updateComboCategory({ variables: { comboCategoryId: comboCategory.id, attributes } });
  };

  setLoading(loading);

  return <ComboCategoryForm comboCategory={comboCategory} comboCategories={comboCategories} onSubmit={onSubmit} />;
};

export default Page;
