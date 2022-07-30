import { useSetRecoilState } from 'recoil';

import { useAdminPlayerEditPageQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const usePlayer = (playerSlug?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useAdminPlayerEditPageQuery({
    variables: { playerSlug: playerSlug as string },
    fetchPolicy: 'network-only',
    skip: !playerSlug,
  });
  setLoading(loading);

  return { player: data?.player };
};
