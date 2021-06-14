import React from 'react';

import {
  TournamentAttributes,
  TournamentDocument,
  TournamentFragment,
  TournamentQuery,
  useUpdateTournamentMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { TournamentForm } from '@/components/TournamentForm';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

interface Props {
  tournament: TournamentFragment;
}

const Page: React.FC<Props> = ({ tournament }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [updateTournament, { loading }] = useUpdateTournamentMutation({
    onCompleted: () => {
      toast.success('大会情報を更新しました。');
      router.back();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: TournamentAttributes) => {
    updateTournament({ variables: { tournamentId: tournament.id, attributes } });
  };

  setLoading(loading);

  return (
    <DashboardContent activeTab="tournament">
      <Head title="大会情報更新" />

      <PageHeader title="大会情報更新" />

      <TournamentForm tournament={tournament} onSubmit={onSubmit} />
    </DashboardContent>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const tournamentId = params?.tournamentId as string;
  const data: TournamentQuery = await fetchGraphql(TournamentDocument, { tournamentId });

  return { props: { tournament: data.tournament } };
};

export default Page;
