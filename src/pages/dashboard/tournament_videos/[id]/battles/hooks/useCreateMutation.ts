import { useCreateBattleMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

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
