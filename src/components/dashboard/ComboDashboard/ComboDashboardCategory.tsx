import React, { useCallback } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { UpdateButton } from './UpdateButton';

import { ComboTable } from '@/components';
import {
  ComboDashboardCategoryFragment,
  ComboCategoryPositionSelectFragment,
  useDeleteComboCategoryMutation,
  MoveSelectOptionFragment,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  comboCategory: ComboDashboardCategoryFragment;
  comboCategories: ComboCategoryPositionSelectFragment[];
  moveCategories: MoveSelectOptionFragment[];
}

export const ComboDashboardCategory: React.FC<Props> = ({ comboCategory, comboCategories, moveCategories }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [del, { loading }] = useDeleteComboCategoryMutation({
    variables: { comboCategoryId: comboCategory.id },
    onCompleted: () => toast.success('カテゴリを削除しました。'),
    onError: e => toast.error(e.message),
  });

  const onClickDelete = useCallback(() => {
    if (window.confirm('削除します。')) {
      del();
    }
  }, []);

  setLoading(loading);

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h2">{comboCategory.name}</Typography>

        <UpdateButton comboCategoryId={comboCategory.id} comboCategories={comboCategories} />

        <IconButton onClick={onClickDelete} size="large">
          <DeleteIcon />
        </IconButton>
      </Stack>

      <ComboTable comboCategoryId={comboCategory.id} combos={comboCategory.combos} moveCategories={moveCategories} />
    </Stack>
  );
};
