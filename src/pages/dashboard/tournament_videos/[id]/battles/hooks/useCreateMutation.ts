import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useCreateBattleMutation } from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

export const useCreateMutation = (onCreate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [create, { loading }] = useCreateBattleMutation({
    onCompleted: () => {
      toast.success('対戦動画を登録しました。');
      onCreate();
    },
    onError: handleApolloError,
  });
  setLoading(loading);

  return { create };
};
