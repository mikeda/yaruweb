import React from 'react';

import { StageAttributes, StageDocument, StageFragment, StageQuery, useUpdateStageMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { StageForm } from '@/components/StageForm';

interface Props {
  stage: StageFragment;
}

const Page: React.FC<Props> = ({ stage }) => {
  const router = useRouter();
  const [updateStage] = useUpdateStageMutation({
    onCompleted: () => {
      toast.success('ステージを更新しました。');
      router.push(Routes.dashboard.stage.index());
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: StageAttributes) => {
    updateStage({ variables: { stageId: stage.id, attributes } });
  };

  return (
    <DashboardContent activeTab="stage">
      <Head title="ステージ更新" />

      <PageHeader title="ステージ更新" />

      <StageForm stage={stage} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const stageId = params?.stageId as string;
  const data: StageQuery = await fetchGraphql(StageDocument, { stageId });

  return { props: { stage: data.stage } };
};

export default Page;
