import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ComboForm, AdminBreadcrumbs, AdminContent } from '@/components';
import {
  ComboAttributes,
  PageAdminComboNewQuery,
  useCreateComboMutation,
  usePageAdminComboNewQuery,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageAdminComboNewQuery({
    variables: { comboCategoryId: id as string },
    fetchPolicy: 'network-only',
    skip: !id,
  });

  setLoading(loading);
  if (!data) return null;

  const { comboCategory } = data;

  return (
    <AdminContent title="コンボ登録" breadcrumb={<AdminBreadcrumbs to="combosNew" comboCategory={comboCategory} />}>
      <PageContent {...data} />
    </AdminContent>
  );
};

const PageContent: React.FC<PageAdminComboNewQuery> = ({ comboCategory }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createCombo, { loading }] = useCreateComboMutation({
    onCompleted: () => {
      toast.success('コンボを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ComboAttributes) => {
    createCombo({ variables: { comboCategoryId: comboCategory.id, attributes } });
  };

  setLoading(loading);

  return (
    <ComboForm
      combos={comboCategory.combos}
      moveCategories={comboCategory.character.moveCategories}
      onSubmit={onSubmit}
    />
  );
};

export default Page;
