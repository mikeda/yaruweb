import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useAdminTournamentPageCreateStandingMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  onCreate: () => void;
}

export const useCreateStandingMutation = ({ onCreate }: Props) => {
  const setLoading = useSetRecoilState(loadingState);
  const [create, { loading }] = useAdminTournamentPageCreateStandingMutation({
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
