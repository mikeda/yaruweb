import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ComboForm, AdminContent, AdminBreadcrumbs } from '@/components';
import {
  ComboAttributes,
  PageAdminComboEditQuery,
  usePageAdminComboEditQuery,
  useUpdateComboMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { id } = router.query;
  const { data, loading } = usePageAdminComboEditQuery({
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
    <AdminContent
      title="コンボ編集"
      breadcrumb={<AdminBreadcrumbs to="comboEdit" comboCategory={combo.comboCategory} />}
    >
      <ComboContent {...data} />
    </AdminContent>
  );
};

const ComboContent: React.FC<PageAdminComboEditQuery> = ({ combo }) => {
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
