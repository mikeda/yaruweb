import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useAdminTournamentPageDeleteVideoMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  onDelete: () => void;
}

export const useDeleteVideoMutation = ({ onDelete }: Props) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useAdminTournamentPageDeleteVideoMutation({
    onCompleted: data => {
      const tournamentVideo = data.deleteTournamentVideo?.tournamentVideo;
      if (!tournamentVideo) return;

      onDelete();
      toast.success('動画を削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
