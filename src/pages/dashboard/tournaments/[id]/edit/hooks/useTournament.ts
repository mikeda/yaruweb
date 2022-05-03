import { useSetRecoilState } from 'recoil';

import { useDashboardTournamentEditPageQuery, loadingState } from '@/lib';

export const useTournament = (tournamentId?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useDashboardTournamentEditPageQuery({
    variables: { tournamentId: tournamentId as string },
    skip: !tournamentId,
  });
  setLoading(loading);

  return { tournament: data?.tournament };
};
