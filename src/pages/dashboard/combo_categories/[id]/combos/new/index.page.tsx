import React from 'react';

import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import {
  ComboAttributes,
  PageDashboardComboNewQuery,
  useCreateComboMutation,
  usePageDashboardComboNewQuery,
} from '@/lib/graphql/types';
import { ComboForm } from '@/components/ComboForm';
import { DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardComboNewQuery({
    variables: { comboCategoryId: id as string },
    fetchPolicy: 'network-only',
    skip: !id,
  });

  setLoading(loading);
  if (!data) return null;

  const { comboCategory } = data;

  return (
    <DashboardContent
      title="コンボ登録"
      breadcrumb={<DashboardBreadcrumbs to="combosNew" comboCategory={comboCategory} />}
    >
      <PageContent {...data} />
    </DashboardContent>
  );
};

const PageContent: React.FC<PageDashboardComboNewQuery> = ({ comboCategory }) => {
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
