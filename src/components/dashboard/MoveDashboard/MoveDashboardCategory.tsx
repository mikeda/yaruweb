import React, { useCallback } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { UpdateButton } from './UpdateButton';

import { MoveTable } from '@/components';
import {
  MoveDashboardCategoryFragment,
  MoveCategoryPositionSelectFragment,
  useDeleteMoveCategoryMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  moveCategory: MoveDashboardCategoryFragment;
  moveCategories: MoveCategoryPositionSelectFragment[];
}

export const MoveDashboardCategory: React.FC<Props> = ({ moveCategory, moveCategories }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [del, { loading }] = useDeleteMoveCategoryMutation({
    variables: { moveCategoryId: moveCategory.id },
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
        <Typography variant="h2">{moveCategory.name}</Typography>

        <UpdateButton moveCategoryId={moveCategory.id} moveCategories={moveCategories} />

        <IconButton onClick={onClickDelete} size="large">
          <DeleteIcon />
        </IconButton>
      </Stack>

      <MoveTable moveCategoryId={moveCategory.id} moves={moveCategory.moves} />
    </Stack>
  );
};
