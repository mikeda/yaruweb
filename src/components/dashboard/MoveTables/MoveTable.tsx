import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { MovesNewButton } from './MovesNewButton';
import { MoveTableRow } from './MoveTableRow';

import { DashboardTable } from '@/components';
import { pagesPath } from '@/generated/$path';
import { MoveTableFragment } from '@/generated/graphql';
import { resolveUrlObject } from '@/lib';

interface Props {
  moveCategory: MoveTableFragment;
  onClickDeleteCategory: (moveCategoryId: string) => void;
  onClickDelete: (moveId: string) => void;
}

export const MoveTable: React.FC<Props> = ({ moveCategory, onClickDeleteCategory, onClickDelete }) => {
  const router = useRouter();

  return (
    <Box mb={8}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h3" gutterBottom>
          {moveCategory.name}
        </Typography>

        <div>
          <MovesNewButton moveCategoryId={moveCategory.id} />

          <IconButton
            href={resolveUrlObject(router, pagesPath.admin.move_categories._id(moveCategory.id).edit.$url())}
            size="large"
          >
            <EditIcon />
          </IconButton>

          {moveCategory.moves.length == 0 && (
            <IconButton
              onClick={() => {
                if (window.confirm('削除します。')) {
                  onClickDeleteCategory(moveCategory.id);
                }
              }}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </Box>

      <DashboardTable>
        {moveCategory.moves.map(move => (
          <MoveTableRow key={move.id} move={move} afterDelete={onClickDelete} />
        ))}
      </DashboardTable>
    </Box>
  );
};
