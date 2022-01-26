import { useDashboardTournamentEditPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
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
