import React, { useCallback } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { CopyButton } from './CopyButton';
import { UpdateButton } from './UpdateButton';

import { Command } from '@/components';

import { VideoUploadButton } from './VideoUploadButton';

import {
  ComboPositionSelectFragment,
  ComboTableRowFragment,
  MoveSelectOptionFragment,
  useDeleteComboMutation,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  combo: ComboTableRowFragment;
  comboCategoryId: string;
  combos: ComboPositionSelectFragment[];
  moveCategories: MoveSelectOptionFragment[];
}

export const ComboTableRow: React.FC<Props> = ({ combo, comboCategoryId, combos, moveCategories }) => {
  const setLoading = useSetRecoilState(loadingState);

  const [del, { loading: deleteLoading }] = useDeleteComboMutation({
    onCompleted: () => toast.success('コンボを削除しました。'),
    onError: handleApolloError,
  });

  const onClickDelete = useCallback(() => {
    if (window.confirm('削除します。')) {
      del({ variables: { comboId: combo.id } });
    }
  }, []);

  setLoading(deleteLoading);

  return (
    <TableRow>
      <TableCell scope="row">
        <Command command={combo.command} />
      </TableCell>

      <TableCell align="right" scope="row">
        <VideoUploadButton combo={combo} />

        <UpdateButton comboId={combo.id} combos={combos} moveCategories={moveCategories} />

        <CopyButton
          comboId={combo.id}
          comboCategoryId={comboCategoryId}
          combos={combos}
          moveCategories={moveCategories}
        />

        <IconButton onClick={onClickDelete} size="large">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
