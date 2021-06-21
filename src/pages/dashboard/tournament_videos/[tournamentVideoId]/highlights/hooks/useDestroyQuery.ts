import { useDeleteHighlightMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useDestroyQuery = (onDestroy: () => void) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useDeleteHighlightMutation({
    onCompleted: data => {
      const highlight = data.deleteTournamentVideoHighlight?.tournamentVideoHighlight;
      if (!highlight) return;

      onDestroy();
      toast.success('ハイライトを削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
