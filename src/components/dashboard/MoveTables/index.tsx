import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { MovesNewButton } from './MovesNewButton';
import { MoveTableRow } from './MoveTableRow';

import { DashboardTable } from '@/components';
import { pagesPath } from '@/generated/$path';
import { useMoveTablesQuery, useDeleteMoveCategoryMutation } from '@/generated/graphql';
import { loadingState, resolveUrlObject } from '@/lib';

interface Props {
  characterSlug: string;
}

export const MoveTables: React.FC<Props> = ({ characterSlug }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, updateQuery } = useMoveTablesQuery({
    variables: { characterSlug },
  });

  const [destroy, { loading: deleteLoading }] = useDeleteMoveCategoryMutation({
    onCompleted: data => {
      const moveCategory = data.deleteMoveCategory?.moveCategory;
      if (!moveCategory) return;

      updateQuery(prev => ({
        ...prev,
        moveCategories: prev.moveCategories.filter(t => t.id !== moveCategory.id),
      }));
      toast.success('カテゴリを削除しました。');
    },
  });

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const { moveCategories } = data;

  return (
    <>
      {moveCategories.map(moveCategory => (
        <Box key={moveCategory.id} mb={8}>
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
                      destroy({ variables: { moveCategoryId: moveCategory.id } });
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
              <MoveTableRow
                key={move.id}
                move={move}
                afterDelete={deletedMoveId => {
                  updateQuery(prev => ({
                    ...prev,
                    moveCategories: prev.moveCategories.map(moveCategory => ({
                      ...moveCategory,
                      moves: moveCategory.moves.filter(move => move.id !== deletedMoveId),
                    })),
                  }));
                }}
              />
            ))}
          </DashboardTable>
        </Box>
      ))}
    </>
  );
};
