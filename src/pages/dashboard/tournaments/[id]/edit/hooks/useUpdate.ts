import { useDashboardTournamentEditPageUpdateTournamentMutation } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useUpdate = (onUpdate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useDashboardTournamentEditPageUpdateTournamentMutation({
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
