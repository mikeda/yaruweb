import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useAdminTournamentEditPageUpdateTournamentMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useUpdate = (onUpdate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useAdminTournamentEditPageUpdateTournamentMutation({
    onCompleted: () => {
      toast.success('大会情報を更新しました。');
      onUpdate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { update };
};
