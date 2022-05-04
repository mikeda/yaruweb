import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useDeleteComboCategoryMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const useDeleteMutation = (onDestroy: () => void) => {
  const setLoading = useSetRecoilState(loadingState);

  const [destroy, { loading: deleteLoading }] = useDeleteComboCategoryMutation({
    onCompleted: data => {
      const comboCategory = data.deleteComboCategory?.comboCategory;
      if (!comboCategory) return;

      onDestroy();
      toast.success('カテゴリを削除しました。');
    },
  });

  setLoading(deleteLoading);

  return { destroy };
};
