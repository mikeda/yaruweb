import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useDashboardPlayerEditPageUpdatePlayerMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useUpdate = (onUpdate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useDashboardPlayerEditPageUpdatePlayerMutation({
    onCompleted: () => {
      toast.success('プレイヤーを更新しました。');
      onUpdate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { update };
};
