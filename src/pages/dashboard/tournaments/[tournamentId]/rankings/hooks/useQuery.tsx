import { useDashboardTournamentRankingsPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

export const useQuery = (tournamentId?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = useDashboardTournamentRankingsPageQuery({
    variables: { tournamentId: tournamentId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentId,
  });
  setLoading(loading);

  return {
    data,
    refetch,
  };
};
