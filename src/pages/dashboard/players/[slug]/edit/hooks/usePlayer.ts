import { useSetRecoilState } from 'recoil';

import { useDashboardPlayerEditPageQuery, loadingState } from '@/lib';

export const usePlayer = (playerSlug?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useDashboardPlayerEditPageQuery({
    variables: { playerSlug: playerSlug as string },
    fetchPolicy: 'network-only',
    skip: !playerSlug,
  });
  setLoading(loading);

  return { player: data?.player };
};
