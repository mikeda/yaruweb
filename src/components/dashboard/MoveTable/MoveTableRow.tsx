import React, { useCallback } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { CopyButton } from './CopyButton';
import { UpdateButton } from './UpdateButton';

import { Command } from '@/components';

import { VideoUploadButton } from './VideoUploadButton';

import { MovePositionSelectFragment, MoveTableRowFragment, useDeleteMoveMutation } from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  move: MoveTableRowFragment;
  moveCategoryId: string;
  moves: MovePositionSelectFragment[];
}

export const MoveTableRow: React.FC<Props> = ({ move, moveCategoryId, moves }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [del, { loading: deleteLoading }] = useDeleteMoveMutation({
    onCompleted: () => toast.success('コマンドを削除しました。'),
    onError: handleApolloError,
  });

  const onClickDelete = useCallback(() => {
    if (window.confirm('削除します。')) {
      del({ variables: { moveId: move.id } });
    }
  }, []);

  setLoading(deleteLoading);

  return (
    <TableRow>
      <TableCell scope="row">
        <Typography>{move.name}</Typography>

        <Command command={move.command} />
      </TableCell>

      <TableCell align="right" scope="row">
        <VideoUploadButton move={move} />

        <UpdateButton moveId={move.id} moves={moves} />

        <CopyButton moveId={move.id} moveCategoryId={moveCategoryId} moves={moves} />

        <IconButton onClick={onClickDelete} size="large">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
