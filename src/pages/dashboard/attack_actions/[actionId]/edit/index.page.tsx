import React from 'react';

import {
  AttackActionAttributes,
  PageDashboardAttackActionEditQuery,
  usePageDashboardAttackActionEditQuery,
  useUpdateAttackActionMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { AttackActionForm } from '@/components/AttackActionForm';
import { DashboardBreadcrumbs } from '@/components';

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

  return (
    <DashboardContent
      title="判定編集"
      breadcrumb={<DashboardBreadcrumbs to="attackActionEdit" move={attackAction.move} />}
    >
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
