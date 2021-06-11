import React from 'react';

import { TournamentAttributes, useCreateTournamentMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { TournamentForm } from '@/components/TournamentForm';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [createTournament, { loading }] = useCreateTournamentMutation({
    onCompleted: () => {
      toast.success('大会情報を登録しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: TournamentAttributes) => {
    createTournament({ variables: { attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="tournament">
      <Head title="大会情報作成" />

      <PageHeader title="大会情報作成" />

      <TournamentForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
