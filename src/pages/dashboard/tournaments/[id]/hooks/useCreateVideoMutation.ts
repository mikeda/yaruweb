import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useAdminTournamentPageCreateVideoMutation } from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  onCreate: () => void;
}

export const useCreateVideoMutation = ({ onCreate }: Props) => {
  const setLoading = useSetRecoilState(loadingState);
  const [create, { loading }] = useAdminTournamentPageCreateVideoMutation({
    onCompleted: () => {
      toast.success('動画を登録しました。');
      onCreate();
    },
    onError: handleApolloError,
  });
  setLoading(loading);

  return { create };
};
