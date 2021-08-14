import { useDashboardBattlesPageBattlesQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
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
