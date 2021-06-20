import React from 'react';

import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import {
  AttackActionAttributes,
  PageDashboardActionNewQuery,
  useCreateAttackActionMutation,
  usePageDashboardActionNewQuery,
} from '@/lib/graphql/types';
import { AttackActionForm } from '@/components/AttackActionForm';
import { DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const { moveId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardActionNewQuery({
    variables: { moveId: moveId as string },
    fetchPolicy: 'network-only',
    skip: !moveId,
  });

  setLoading(loading);
  if (!data) return null;

  const { move } = data;

  return (
    <DashboardContent activeTab="character">
      <Head title="判定登録" />
      <DashboardBreadcrumbs to="attackActionsNew" move={move} />
      <PageHeader title="判定登録" />

      <PageContent {...data} />
    </DashboardContent>
  );
};

const PageContent: React.FC<PageDashboardActionNewQuery> = ({ move }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createAttackAction, { loading }] = useCreateAttackActionMutation({
    onCompleted: () => {
      toast.success('判定を登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: AttackActionAttributes) => {
    createAttackAction({ variables: { moveId: move.id, attributes } });
  };

  setLoading(loading);

  return <AttackActionForm onSubmit={onSubmit} />;
};

export default Page;
