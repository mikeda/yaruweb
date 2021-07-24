import { useDashboardPlayersPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

interface Props {
  page: number;
  keyword?: string;
}

export const usePlayersQuery = ({ page, keyword }: Props) => {
  const { isReady } = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = useDashboardPlayersPageQuery({
    variables: { page, keyword },
    fetchPolicy: 'network-only',
    skip: !isReady,
  });
  setLoading(loading);

  return {
    players: data?.players.records,
    paging: data?.players.paging,
    refetch,
  };
};
