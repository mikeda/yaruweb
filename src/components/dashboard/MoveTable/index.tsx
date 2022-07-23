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
import { useMoveTableRowsQuery } from '@/generated/graphql';
import { loadingState, resolveUrlObject } from '@/lib';

interface Props {
  moveCategoryId: string;
}

export const MoveTable: React.FC<Props> = ({ moveCategoryId }) => {
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, updateQuery } = useMoveTableRowsQuery({
    variables: { moveCategoryId },
    notifyOnNetworkStatusChange: true,
  });

  setLoading(loading);

  if (!data) return null;
  const { moves } = data;

  return (
    <DashboardTable>
      {moves.map(move => (
        <MoveTableRow
          key={move.id}
          move={move}
          afterDelete={deletedMoveId => {
            updateQuery(prev => ({
              ...prev,
              moves: prev.moves.filter(move => move.id !== deletedMoveId),
            }));
          }}
        />
      ))}
    </DashboardTable>
  );
};
