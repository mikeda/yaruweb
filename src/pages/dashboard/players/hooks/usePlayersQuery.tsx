import { useDashboardPlayersPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

export const usePlayersQuery = () => {
  const { query } = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const page = query.page ? Number(query.page as string) : 1;
  const { data, loading, refetch } = useDashboardPlayersPageQuery({
    variables: { page },
    fetchPolicy: 'network-only',
    skip: !page,
  });
  setLoading(loading);

  return {
    players: data?.players.records,
    paging: data?.players.paging,
    refetch,
  };
};
