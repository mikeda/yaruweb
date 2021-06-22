import { usePd_Highlights_TournamentVideoQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

export const useTournamentVideoQuery = (tournamentVideoId: string | undefined) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, refetch } = usePd_Highlights_TournamentVideoQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    fetchPolicy: 'network-only',
    skip: !tournamentVideoId,
  });

  setLoading(loading);

  return { tournamentVideo: data?.tournamentVideo, refetch };
};
