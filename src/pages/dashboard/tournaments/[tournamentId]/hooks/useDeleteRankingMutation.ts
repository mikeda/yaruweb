import { useDashboardTournamentPageDeleteRankingMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

interface Props {
  onDelete: () => void;
}

export const useDeleteRankingMutation = ({ onDelete }: Props) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useDashboardTournamentPageDeleteRankingMutation({
    onCompleted: data => {
      const tournamentRanking = data.deleteTournamentRanking?.tournamentRanking;
      if (!tournamentRanking) return;

      onDelete();
      toast.success('順位を削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
