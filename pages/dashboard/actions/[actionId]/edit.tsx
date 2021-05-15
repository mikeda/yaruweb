import React from 'react';

import {
  AttackActionAttributes,
  AttackActionFragment,
  usePageDashboardActionEditQuery,
  useUpdateAttackActionMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { AttackActionForm } from '@/components/AttackActionForm';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { actionId } = router.query;
  const { data, loading } = usePageDashboardActionEditQuery({
    variables: { actionId: actionId as string },
    skip: !actionId,
    fetchPolicy: 'network-only',
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <DashboardContent activeTab="character">
      <Head title="アクション更新" />

      <PageHeader title="アクション更新" />

      {data?.action.__typename === 'AttackAction' && <AttackActionContent attackAction={data.action} />}
    </DashboardContent>
  );
};

const AttackActionContent: React.FC<{ attackAction: AttackActionFragment }> = ({ attackAction }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateAction, { loading }] = useUpdateAttackActionMutation({
    onCompleted: () => {
      toast.success('アクションを更新しました。');
      router.push(Routes.dashboard.move.actions.index(attackAction.id));
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
