import { useSetRecoilState } from 'recoil';

import { useAdminBattlesPageBattlesQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useBattlesQuery = (tournamentVideoId: string | undefined) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = useAdminBattlesPageBattlesQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);

  return { battles: data?.battles?.nodes, refetch };
};
