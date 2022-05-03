import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { useDashboardTournamentVideoEditPageUpdateMutation, loadingState } from '@/lib';

export const useUpdate = (onUpdate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useDashboardTournamentVideoEditPageUpdateMutation({
    onCompleted: () => {
      toast.success('大会動画を更新しました。');
      onUpdate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { update };
};
