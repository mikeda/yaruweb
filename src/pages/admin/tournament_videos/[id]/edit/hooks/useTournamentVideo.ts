import { useSetRecoilState } from 'recoil';

import { useAdminTournamentVideoEditPageQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useTournamentVideo = (tournamentVideoId?: string) => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading } = useAdminTournamentVideoEditPageQuery({
    variables: { tournamentVideoId: tournamentVideoId as string },
    skip: !tournamentVideoId,
  });
  setLoading(loading);

  return { tournamentVideo: data?.tournamentVideo };
};
