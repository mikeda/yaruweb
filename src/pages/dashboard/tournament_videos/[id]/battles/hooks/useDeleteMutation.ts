import { useDeleteBattleMutation } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useDeleteMutation = (onDestroy: () => void) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useDeleteBattleMutation({
    onCompleted: () => {
      onDestroy();
      toast.success('対戦動画を削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
