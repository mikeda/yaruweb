import { useDashboardTournamentRankingsPageCreateMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

interface Props {
  onCreate: () => void;
}

export const useCreateMutation = ({ onCreate }: Props) => {
  const setLoading = useSetRecoilState(loadingState);
  const [create, { loading }] = useDashboardTournamentRankingsPageCreateMutation({
    onCompleted: () => {
      toast.success('順位を登録しました。');
      onCreate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { create };
};
