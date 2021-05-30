import React from 'react';

import {
  ThrowActionAttributes,
  PageDashboardThrowActionEditQuery,
  usePageDashboardThrowActionEditQuery,
  useUpdateThrowActionMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { ThrowActionForm } from '@/components/ThrowActionForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { actionId } = router.query;
  const { data, loading } = usePageDashboardThrowActionEditQuery({
    variables: { actionId: actionId as string },
    skip: !actionId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { throwAction } = data;

  const title = '判定編集';

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `技データ(${throwAction.move.moveCategory.character.name})`,
            url: Routes.dashboard.moveCategory.index(throwAction.move.moveCategory.character.slug),
          },
          {
            name: throwAction.move.moveCategory.name,
            url: Routes.dashboard.move.index(throwAction.move.moveCategory.id),
          },
          {
            name: throwAction.move.name,
            url: Routes.dashboard.move.actions.index(throwAction.move.id),
          },
        ]}
        current={title}
      />
      <PageHeader title={title} />

      <ThrowActionContent {...data} />
    </DashboardContent>
  );
};

const ThrowActionContent: React.FC<PageDashboardThrowActionEditQuery> = ({ throwAction }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateAction, { loading }] = useUpdateThrowActionMutation({
    onCompleted: () => {
      toast.success('アクションを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: ThrowActionAttributes) => {
    updateAction({ variables: { actionId: throwAction.id, attributes } });
  };

  setLoading(loading);
  return <ThrowActionForm throwAction={throwAction} onSubmit={onSubmit} />;
};

export default Page;
