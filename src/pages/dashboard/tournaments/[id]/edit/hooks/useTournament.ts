import { useDashboardTournamentEditPageQuery } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';
import { useSetRecoilState } from 'recoil';

export const useTournament = (tournamentId?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useDashboardTournamentEditPageQuery({
    variables: { tournamentId: tournamentId as string },
    skip: !tournamentId,
  });
  setLoading(loading);

  return { tournament: data?.tournament };
};
