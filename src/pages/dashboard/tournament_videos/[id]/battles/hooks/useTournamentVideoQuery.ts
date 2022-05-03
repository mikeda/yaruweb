import { useSetRecoilState } from 'recoil';

import { useDashboardBattlesPageQuery, loadingState } from '@/lib';

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
