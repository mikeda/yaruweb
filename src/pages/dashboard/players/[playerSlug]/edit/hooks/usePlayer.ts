import { useDashboardPlayerEditPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

export const usePlayer = (playerSlug?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useDashboardPlayerEditPageQuery({
    variables: { playerSlug: playerSlug as string },
    skip: !playerSlug,
  });
  setLoading(loading);

  return { player: data?.player };
};
