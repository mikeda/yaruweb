import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useUpdateBattleMutation } from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

export const useUpdateMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useUpdateBattleMutation({
    onCompleted: () => {
      toast.success('対戦動画を更新しました。');
    },
    onError: handleApolloError,
  });
  setLoading(loading);

  return { update };
};
