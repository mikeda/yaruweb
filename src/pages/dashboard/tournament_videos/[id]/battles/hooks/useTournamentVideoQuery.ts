import { useDashboardBattlesPageQuery } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';
import { useSetRecoilState } from 'recoil';

export const useTournamentVideoQuery = (tournamentVideoId: string | undefined) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = useDashboardBattlesPageQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);

  return { data, refetch };
};
