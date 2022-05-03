import { useDashboardBattlesPageBattlesQuery } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';
import { useSetRecoilState } from 'recoil';

export const useBattlesQuery = (tournamentVideoId: string | undefined) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = useDashboardBattlesPageBattlesQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);

  return { battles: data?.battles?.records, refetch };
};
