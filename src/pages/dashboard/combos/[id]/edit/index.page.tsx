import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import {
  ComboAttributes,
  PageDashboardComboEditQuery,
  usePageDashboardComboEditQuery,
  useUpdateComboMutation,
  loadingState,
} from '@/lib';

import { ComboForm, DashboardContent, DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { id } = router.query;
  const { data, loading } = usePageDashboardComboEditQuery({
    variables: { comboId: id as string },
    skip: !id,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { combo } = data;

  return (
    <DashboardContent
      title="コンボ編集"
      breadcrumb={<DashboardBreadcrumbs to="comboEdit" comboCategory={combo.comboCategory} />}
    >
      <ComboContent {...data} />
    </DashboardContent>
  );
};

const ComboContent: React.FC<PageDashboardComboEditQuery> = ({ combo }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateCombo, { loading }] = useUpdateComboMutation({
    onCompleted: () => {
      toast.success('コンボを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboAttributes) => {
    updateCombo({ variables: { comboId: combo.id, attributes } });
  };

  setLoading(loading);
  return (
    <ComboForm
      combo={combo}
      combos={combo.comboCategory.combos}
      moveCategories={combo.comboCategory.character.moveCategories}
      onSubmit={onSubmit}
    />
  );
};

export default Page;
