import React from 'react';

import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
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
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const { comboCategoryId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardComboNewQuery({
    variables: { comboCategoryId: comboCategoryId as string },
    fetchPolicy: 'network-only',
    skip: !comboCategoryId,
  });

  setLoading(loading);
  if (!data) return null;

  const { comboCategory } = data;
  const title = 'コンボ登録';

  return (
    <DashboardContent activeTab="character">
      <Head title="コンボ登録" />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `コンボ(${comboCategory.character.name})`,
            url: Routes.dashboard.comboCategory.index(comboCategory.character.slug),
          },
          {
            name: comboCategory.name,
            url: Routes.dashboard.combo.index(comboCategory.id),
          },
        ]}
        current={title}
      />
      <PageHeader title="コンボ登録" />

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
      states={comboCategory.character.states}
      conditions={comboCategory.character.conditions}
      onSubmit={onSubmit}
    />
  );
};

export default Page;
