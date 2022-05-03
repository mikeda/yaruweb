import { useSetRecoilState } from 'recoil';
import { useDashboardTournamentVideoEditPageQuery, loadingState } from '@/lib';

export const useTournamentVideo = (tournamentVideoId?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useDashboardTournamentVideoEditPageQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    skip: !tournamentVideoId,
  });
  setLoading(loading);

  return { tournamentVideo: data?.tournamentVideo };
};
