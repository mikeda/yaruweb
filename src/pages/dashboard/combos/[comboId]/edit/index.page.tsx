import React from 'react';

import {
  ComboAttributes,
  PageDashboardComboEditQuery,
  usePageDashboardComboEditQuery,
  useUpdateComboMutation,
} from '@/lib/graphql/types';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { ComboForm } from '@/components/ComboForm';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { comboId } = router.query;
  const { data, loading } = usePageDashboardComboEditQuery({
    variables: { comboId: comboId as string },
    skip: !comboId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { combo } = data;

  return (
    <DashboardContent title="コンボ編集" breadcrumb={<DashboardBreadcrumbs to="comboEdit" combo={combo} />}>
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
  return <ComboForm combo={combo} states={combo.comboCategory.character.states} onSubmit={onSubmit} />;
};

export default Page;
