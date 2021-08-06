import { useUpdateTournamentBattleMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useUpdateMutation = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [update, { loading }] = useUpdateTournamentBattleMutation({
    onCompleted: () => {
      toast.success('対戦動画を更新しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { update };
};
