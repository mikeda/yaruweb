import { useDeleteTournamentBattleMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useDeleteMutation = (onDestroy: () => void) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useDeleteTournamentBattleMutation({
    onCompleted: () => {
      onDestroy();
      toast.success('ハイライトを削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
