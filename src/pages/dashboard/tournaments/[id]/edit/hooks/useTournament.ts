import { useSetRecoilState } from 'recoil';

import { useAdminTournamentEditPageQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useTournament = (tournamentId?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useAdminTournamentEditPageQuery({
    variables: { tournamentId: tournamentId as string },
    skip: !tournamentId,
  });
  setLoading(loading);

  return { tournament: data?.tournament };
};
