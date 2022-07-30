import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useAdminTournamentPageDeleteStandingMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  onDelete: () => void;
}

export const useDeleteStandingMutation = ({ onDelete }: Props) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useAdminTournamentPageDeleteStandingMutation({
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
