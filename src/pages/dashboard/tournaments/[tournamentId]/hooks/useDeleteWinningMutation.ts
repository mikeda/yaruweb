import { useDashboardTournamentPageDeleteWinningMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

interface Props {
  onDelete: () => void;
}

export const useDeleteWinningMutation = ({ onDelete }: Props) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useDashboardTournamentPageDeleteWinningMutation({
    onCompleted: data => {
      const winning = data.deleteWinning?.winning;
      if (!winning) return;

      onDelete();
      toast.success('順位を削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
