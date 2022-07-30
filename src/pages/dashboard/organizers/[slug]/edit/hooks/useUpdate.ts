import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useAdminOrganizerEditPageUpdateOrganizerMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useUpdate = (onUpdate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useAdminOrganizerEditPageUpdateOrganizerMutation({
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
