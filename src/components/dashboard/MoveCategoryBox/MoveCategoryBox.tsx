import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Stack, Typography } from '@mui/material';

import { UpdateButton } from './UpdateButton';

import { MoveTable } from '@/components';
import {
  MoveCategoryAttributes,
  MoveCategoryBoxFragment,
  MoveCategoryPositionSelectFragment,
} from '@/generated/graphql';

interface Props {
  moveCategory: MoveCategoryBoxFragment;
  moveCategories: MoveCategoryPositionSelectFragment[];
  onClickUpdate: (moveCategoryId: string, attributes: MoveCategoryAttributes) => void;
  onClickDelete: (moveCategoryId: string) => void;
}

export const MoveCategoryBox: React.FC<Props> = ({ moveCategory, moveCategories, onClickUpdate, onClickDelete }) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h2">{moveCategory.name}</Typography>

        <UpdateButton moveCategoryId={moveCategory.id} moveCategories={moveCategories} onClickUpdate={onClickUpdate} />

        <IconButton
          onClick={() => {
            if (window.confirm('削除します。')) {
              onClickDelete(moveCategory.id);
            }
          }}
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>

      <MoveTable moveCategoryId={moveCategory.id} />
    </Stack>
  );
};
