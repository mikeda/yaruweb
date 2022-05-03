import { useSetRecoilState } from 'recoil';

import { useDashboardBattlesPageBattlesQuery, loadingState } from '@/lib';

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
