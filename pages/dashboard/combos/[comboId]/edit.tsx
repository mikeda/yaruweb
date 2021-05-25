import React from 'react';

import {
  ComboAttributes,
  PageDashboardComboEditQuery,
  usePageDashboardComboEditQuery,
  useUpdateComboMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { ComboForm } from '@/components/ComboForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

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

  const title = '判定編集';

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `コンボ(${combo.comboCategory.character.name})`,
            url: Routes.dashboard.comboCategory.index(combo.comboCategory.character.slug),
          },
          {
            name: combo.comboCategory.name,
            url: Routes.dashboard.combo.index(combo.comboCategory.id),
          },
        ]}
        current={title}
      />
      <PageHeader title={title} />

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
      router.push(Routes.dashboard.combo.index(combo.comboCategory.id));
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
      states={combo.comboCategory.character.states}
      conditions={combo.comboCategory.character.conditions}
      onSubmit={onSubmit}
    />
  );
};

export default Page;
