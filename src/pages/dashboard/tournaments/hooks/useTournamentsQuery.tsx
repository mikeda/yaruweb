import { useDashboardTournamentsPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

interface Props {
  page: number;
  keyword?: string;
}

export const useTournamentsQuery = ({ page, keyword }: Props) => {
  const { isReady } = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = useDashboardTournamentsPageQuery({
    variables: { page, keyword },
    fetchPolicy: 'network-only',
    skip: !isReady,
  });
  setLoading(loading);

  return {
    tournaments: data?.tournaments.records,
    paging: data?.tournaments.paging,
    refetch,
  };
};
