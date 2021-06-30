import { useDashboardTournamentCardsQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

export const useTournamentsQuery = () => {
  const { query } = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading, refetch } = useDashboardTournamentCardsQuery({
    variables: { page },
    fetchPolicy: 'network-only',
    skip: !page,
  });
  setLoading(loading);

  return {
    tournaments: data?.tournaments.records,
    paging: data?.tournaments.paging,
    refetch,
  };
};
