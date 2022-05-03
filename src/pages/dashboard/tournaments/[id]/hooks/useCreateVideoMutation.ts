import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useDashboardTournamentPageCreateVideoMutation, loadingState } from '@/lib';

interface Props {
  onCreate: () => void;
}

export const useCreateVideoMutation = ({ onCreate }: Props) => {
  const setLoading = useSetRecoilState(loadingState);
  const [create, { loading }] = useDashboardTournamentPageCreateVideoMutation({
    onCompleted: () => {
      toast.success('動画を登録しました。');
      onCreate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { create };
};
