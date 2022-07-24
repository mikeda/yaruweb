import React, { useCallback } from 'react';

import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { CreateButton } from './CreateButton';
import { MoveTableRow } from './MoveTableRow';

import { DashboardTable } from '@/components';
import { MoveTableRowFragment, useDeleteMoveMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  moveCategoryId: string;
  moves: MoveTableRowFragment[];
}

export const MoveTable: React.FC<Props> = ({ moveCategoryId, moves }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [del, { loading: deleteLoading }] = useDeleteMoveMutation({
    onCompleted: () => {
      toast.success('コマンドを削除しました。');
    },
  });

  setLoading(deleteLoading);

  const onClickDelete = useCallback((moveId: string) => {
    del({ variables: { moveId } });
  }, []);

  return (
    <>
      <DashboardTable>
        {moves.map(move => (
          <MoveTableRow key={move.id} move={move} onClickDelete={onClickDelete} />
        ))}
      </DashboardTable>

      <Box display="flex" justifyContent="center" mt={2}>
        <CreateButton moveCategoryId={moveCategoryId} moves={moves} />
      </Box>
    </>
  );
};
