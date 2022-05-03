import { useDeleteComboCategoryMutation } from '@/lib';
import { loadingState } from '@/lib';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

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
