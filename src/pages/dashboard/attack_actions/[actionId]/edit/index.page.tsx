import React from 'react';

import {
  AttackActionAttributes,
  PageDashboardAttackActionEditQuery,
  usePageDashboardAttackActionEditQuery,
  useUpdateAttackActionMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { AttackActionForm } from '@/components/AttackActionForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { actionId } = router.query;
  const { data, loading } = usePageDashboardAttackActionEditQuery({
    variables: { actionId: actionId as string },
    skip: !actionId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);
  if (!data) return null;
  const { attackAction } = data;

  const title = '判定編集';

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `技データ(${attackAction.move.moveCategory.character.name})`,
            url: Routes.dashboard.moveCategory.index(attackAction.move.moveCategory.character.slug),
          },
          {
            name: attackAction.move.moveCategory.name,
            url: Routes.dashboard.move.index(attackAction.move.moveCategory.id),
          },
          {
            name: attackAction.move.name,
            url: Routes.dashboard.move.actions.index(attackAction.move.id),
          },
        ]}
        current={title}
      />
      <PageHeader title={title} />

      <AttackActionContent {...data} />
    </DashboardContent>
  );
};

const AttackActionContent: React.FC<PageDashboardAttackActionEditQuery> = ({ attackAction }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateAction, { loading }] = useUpdateAttackActionMutation({
    onCompleted: () => {
      toast.success('アクションを更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: AttackActionAttributes) => {
    updateAction({ variables: { actionId: attackAction.id, attributes } });
  };

  setLoading(loading);
  return <AttackActionForm attackAction={attackAction} onSubmit={onSubmit} />;
};

export default Page;
