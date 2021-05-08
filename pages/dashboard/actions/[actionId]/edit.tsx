import React from 'react';

import {
  AttackActionAttributes,
  AttackActionFragment,
  PageDashboardActionEditDocument,
  PageDashboardActionEditQuery,
  useUpdateAttackActionMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { loadingState } from 'states/loading';
import { useSetRecoilState } from 'recoil';
import { AttackActionForm } from '@/components/AttackActionForm';

interface Props {
  data: PageDashboardActionEditQuery;
}

const Page: React.FC<Props> = ({ data: { action } }) => {
  return (
    <DashboardContent activeTab="character">
      <Head title="技データカテゴリ更新" />

      <PageHeader title="技データカテゴリ更新" />

      {action.__typename === 'AttackAction' && <AttackActionContent attackAction={action} />}
    </DashboardContent>
  );
};

const AttackActionContent: React.FC<{ attackAction: AttackActionFragment }> = ({ attackAction }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateAction, { loading }] = useUpdateAttackActionMutation({
    onCompleted: () => {
      toast.success('技データカテゴリを更新しました。');
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const actionId = params?.actionId as string;
  const data: PageDashboardActionEditQuery = await fetchGraphql(PageDashboardActionEditDocument, { actionId });

  return { props: { data } };
};

export default Page;
