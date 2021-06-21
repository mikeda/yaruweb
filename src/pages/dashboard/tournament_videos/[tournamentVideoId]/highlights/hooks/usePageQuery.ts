import { usePageDashboardHighlightsQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

export const usePageQuery = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { tournamentVideoId } = router.query;
  const { data, loading, refetch } = usePageDashboardHighlightsQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);

  return { data, refetch };
};
