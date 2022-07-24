import React, { useCallback, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Dialog, IconButton, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ComboForm } from '@/components';
import {
  ComboPositionSelectFragment,
  useCreateComboMutation,
  ComboAttributes,
  MoveSelectOptionFragment,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  comboCategoryId: string;
  combos: ComboPositionSelectFragment[];
  moveCategories: MoveSelectOptionFragment[];
}

export const CreateButton: React.FC<Props> = ({ comboCategoryId, combos, moveCategories }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [open, setOpen] = useState(false);

  const [create, { loading }] = useCreateComboMutation({
    onCompleted: () => {
      setOpen(false);
      toast.success('コンボを登録しました。');
    },
    onError: e => toast.error(e.message),
  });
  const onClickCreate = useCallback((attributes: ComboAttributes) => {
    create({ variables: { comboCategoryId, attributes } });
  }, []);

  setLoading(loading);

  return (
    <>
      <Tooltip title="コンボを作成">
        <IconButton onClick={() => setOpen(true)} size="large">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} scroll="paper">
        <ComboForm combos={combos} moveCategories={moveCategories} onSubmit={onClickCreate} />
      </Dialog>
    </>
  );
};
