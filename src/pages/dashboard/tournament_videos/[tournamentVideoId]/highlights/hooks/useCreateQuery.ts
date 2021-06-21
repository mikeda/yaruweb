import { useCreateTournamentVideoHighlightMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useCreateQuery = (onCreate: () => void) => {
  const setLoading = useSetRecoilState(loadingState);
  const [create, { loading }] = useCreateTournamentVideoHighlightMutation({
    onCompleted: () => {
      toast.success('ハイライトを登録しました。');
      onCreate();
    },
    onError: e => {
      toast.error(e.message);
    },
  });
  setLoading(loading);

  return { create };
};
