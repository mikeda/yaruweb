import React from 'react';

import { StageAttributes, useCreateStageMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { StageForm } from '@/components/StageForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createStage, { loading }] = useCreateStageMutation({
    onCompleted: () => {
      toast.success('ステージを登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: StageAttributes) => {
    createStage({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="stage">
      <Head title="ステージ作成" />

      <PageHeader title="ステージ作成" />

      <StageForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
