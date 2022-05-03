import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useDashboardOrganizerEditPageUpdateOrganizerMutation, loadingState } from '@/lib';

export const useUpdate = (onUpdate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useDashboardOrganizerEditPageUpdateOrganizerMutation({
    onCompleted: () => {
      toast.success('オーガナイザーを更新しました。');
      onUpdate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { update };
};
