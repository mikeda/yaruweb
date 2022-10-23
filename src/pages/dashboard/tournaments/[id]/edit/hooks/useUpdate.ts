import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useUpdateTournamentMutation } from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

export const useUpdate = (onUpdate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useUpdateTournamentMutation({
    onCompleted: () => {
      toast.success('大会情報を更新しました。');
      onUpdate();
    },
    onError: handleApolloError,
  });
  setLoading(loading);

  return { update };
};
