import { useDashboardTournamentVideoEditPageQuery } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

export const useTournamentVideo = (tournamentVideoId?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useDashboardTournamentVideoEditPageQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    skip: !tournamentVideoId,
  });
  setLoading(loading);

  return { tournamentVideo: data?.tournamentVideo };
};
