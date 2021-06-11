import React from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { Routes } from '@/lib/Routes';
import { useDeleteTournamentMutation, usePageDashboardTournamentsQuery, Tournament } from '@/lib/graphql/types';
import { DashboardContent, PageHeader, Breadcrumbs, Head, Paging, ObjectCardList } from '@/components';
import { loadingState } from 'states/loading';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { query } = router;
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading, refetch } = usePageDashboardTournamentsQuery({
    variables: { page },
    fetchPolicy: 'network-only',
    skip: !router.isReady,
  });

  setLoading(loading);
  if (!data) return null;

  const {
    tournaments: { records: tournaments, paging },
  } = data;

  setLoading(loading);

  const title = '大会';

  return (
    <DashboardContent activeTab="tournament">
      <Head title={title} />
      <Breadcrumbs current={title} />
      <PageHeader title={title} />
      <PageContent tournaments={tournaments} refetch={refetch} />
      <Paging paging={paging} url={Routes.dashboard.tournament.index} />
    </DashboardContent>
  );
};

type TournamentFragment = Pick<Tournament, 'id' | 'name'>;

interface PageContentProps {
  tournaments: TournamentFragment[];
  refetch: () => void;
}

const PageContent: React.FC<PageContentProps> = ({ tournaments, refetch }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [deleteTournament, { loading: deleteLoading }] = useDeleteTournamentMutation({
    onCompleted: data => {
      const tournament = data.deleteTournament?.tournament;
      if (!tournament) return;
      refetch();
      toast.success('大会情報を削除しました。');
    },
  });

  setLoading(deleteLoading);

  return (
    <ObjectCardList
      items={tournaments.map(tournament => ({
        id: tournament.id,
        title: tournament.name,
        links: [
          { text: '編集する', url: Routes.dashboard.tournament.edit(tournament.id) },
          {
            text: '削除する',
            onClick: () => {
              if (window.confirm('大会情報を削除します。')) {
                deleteTournament({ variables: { tournamentId: tournament.id } });
              }
            },
          },
        ],
      }))}
    />
  );
};

export default Page;
