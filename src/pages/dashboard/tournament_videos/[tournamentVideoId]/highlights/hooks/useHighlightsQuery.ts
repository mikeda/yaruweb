import { usePd_Highlights_HighlightsQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

export const useHighlightsQuery = (tournamentVideoId: string | undefined) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = usePd_Highlights_HighlightsQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);

  return { highlights: data?.tournamentVideoHighlights, refetch };
};
