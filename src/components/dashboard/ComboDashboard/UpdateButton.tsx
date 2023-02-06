import React, { useCallback, useState } from 'react';

import { Edit as EditIcon } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ComboCategoryForm } from '@/components';
import {
  ComboCategoryAttributes,
  ComboCategoryFormFragment,
  ComboCategoryPositionSelectFragment,
  useComboCategoryFormLazyQuery,
  useUpdateComboCategoryMutation,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  comboCategoryId: string;
  comboCategories: ComboCategoryPositionSelectFragment[];
}

export const UpdateButton: React.FC<Props> = ({ comboCategoryId, comboCategories }) => {
  const [open, setOpen] = useState(false);
  const [comboCategory, setComboCategory] = useState<ComboCategoryFormFragment>();
  const setLoading = useSetRecoilState(loadingState);

  const [fetch, { loading }] = useComboCategoryFormLazyQuery({
    variables: { comboCategoryId },
    onCompleted: data => {
      setComboCategory(data.comboCategory);
    },
    onError: handleApolloError,
  });

  const [update, { loading: updateLoading }] = useUpdateComboCategoryMutation({
    onCompleted: () => toast.success('カテゴリを更新しました。'),
    onError: handleApolloError,
  });

  const onClickUpdate = useCallback((attributes: ComboCategoryAttributes) => {
    update({ variables: { comboCategoryId, attributes } });
    setOpen(false);
  }, []);

  setLoading(loading || updateLoading);

  return (
    <>
      <IconButton
        size='large'
        onClick={() => {
          fetch().then(() => setOpen(true));
        }}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <ComboCategoryForm comboCategory={comboCategory} comboCategories={comboCategories} onSubmit={onClickUpdate} />
      </Dialog>
    </>
  );
};
