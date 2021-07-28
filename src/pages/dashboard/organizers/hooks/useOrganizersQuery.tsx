import { useDashboardOrganizersPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

interface Props {
  page: number;
  keyword?: string;
}

export const useOrganizersQuery = ({ page, keyword }: Props) => {
  const { isReady } = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = useDashboardOrganizersPageQuery({
    variables: { page, keyword },
    fetchPolicy: 'network-only',
    skip: !isReady,
  });
  setLoading(loading);

  return {
    organizers: data?.organizers.records,
    paging: data?.organizers.paging,
    refetch,
  };
};
