import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { useCreateBattleMutation, loadingState } from '@/lib';

export const useCreateMutation = (onCreate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [create, { loading }] = useCreateBattleMutation({
    onCompleted: () => {
      toast.success('対戦動画を登録しました。');
      onCreate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { create };
};
