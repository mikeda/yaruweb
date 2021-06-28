import React from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { useDeleteTournamentMutation, usePageDashboardTournamentsQuery, Tournament } from '@/lib/graphql/types';
import { DashboardContent, DashboardBreadcrumbs, Paging, ObjectCardList } from '@/components';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';

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

  return (
    <DashboardContent title="大会" breadcrumb={<DashboardBreadcrumbs to="tournaments" />}>
      <PageContent tournaments={tournaments} refetch={refetch} />
      <Paging paging={paging} url={page => dashboardPath({ to: 'tournaments', params: { page } })} />
    </DashboardContent>
  );
};

type TournamentFragment = Pick<Tournament, 'id' | 'name' | 'videosCount'>;

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
          { text: '編集する', url: dashboardPath({ to: 'tournamentEdit', tournamentId: tournament.id }) },
          {
            text: `動画(${tournament.videosCount})`,
            url: dashboardPath({ to: 'tournamentVideos', tournamentId: tournament.id }),
          },
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
