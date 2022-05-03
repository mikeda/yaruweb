import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { TournamentAttributes, useCreateTournamentMutation } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';

import { DashboardBreadcrumbs, DashboardContent, TournamentForm } from '@/components';

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
    <DashboardContent title="大会登録" breadcrumb={<DashboardBreadcrumbs to="tournamentsNew" />}>
      <TournamentForm onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export default Page;
