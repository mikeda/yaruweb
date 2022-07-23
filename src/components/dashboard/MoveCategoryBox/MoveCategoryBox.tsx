import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { MoveTable } from '@/components';
import { pagesPath } from '@/generated/$path';
import { MoveCategoryBoxFragment } from '@/generated/graphql';
import { resolveUrlObject } from '@/lib';

interface Props {
  moveCategory: MoveCategoryBoxFragment;
  onClickDelete: (moveCategoryId: string) => void;
}

export const MoveCategoryBox: React.FC<Props> = ({ moveCategory, onClickDelete }) => {
  const router = useRouter();

  return (
    <Box mb={8}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h3" gutterBottom>
          {moveCategory.name}
        </Typography>

        <div>
          <IconButton
            href={resolveUrlObject(router, pagesPath.admin.move_categories._id(moveCategory.id).edit.$url())}
            size="large"
          >
            <EditIcon />
          </IconButton>

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
        </div>
      </Box>

      <MoveTable moveCategoryId={moveCategory.id} />
    </Box>
  );
};
