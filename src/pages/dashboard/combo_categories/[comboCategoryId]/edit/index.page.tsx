import React from 'react';

import {
  ComboCategoryAttributes,
  ComboCategoryFragment,
  usePageDashboardComboCategoryEditQuery,
  useUpdateComboCategoryMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ComboCategoryForm } from '@/components/ComboCategoryForm';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { comboCategoryId } = router.query;
  const { data, loading } = usePageDashboardComboCategoryEditQuery({
    variables: { comboCategoryId: comboCategoryId as string },
    skip: !comboCategoryId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { comboCategory } = data;

  return (
    <DashboardContent activeTab="character">
      <Head title="コンボカテゴリ更新" />

      <PageHeader title="コンボカテゴリ更新" />

      <PageContent comboCategory={comboCategory} />
    </DashboardContent>
  );
};

export const PageContent: React.FC<{ comboCategory: ComboCategoryFragment }> = ({ comboCategory }) => {
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

  return (
    <DashboardContent activeTab="character">
      <Head title="コンボカテゴリ更新" />

      <PageHeader title="コンボカテゴリ更新" />

      <ComboCategoryForm comboCategory={comboCategory} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
