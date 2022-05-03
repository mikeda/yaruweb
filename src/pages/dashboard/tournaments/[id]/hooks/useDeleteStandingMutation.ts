import { useDashboardTournamentPageDeleteStandingMutation } from '@/lib/$types';
import { loadingState } from '@/lib/states/loadingState';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

interface Props {
  onDelete: () => void;
}

export const useDeleteStandingMutation = ({ onDelete }: Props) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useDashboardTournamentPageDeleteStandingMutation({
    onCompleted: data => {
      const standing = data.deleteStanding?.standing;
      if (!standing) return;

      onDelete();
      toast.success('順位を削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
