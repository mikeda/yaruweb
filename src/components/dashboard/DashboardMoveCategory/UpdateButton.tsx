import React, { useCallback, useState } from 'react';

import { Edit as EditIcon } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { MoveCategoryForm } from '@/components';
import {
  MoveCategoryAttributes,
  MoveCategoryFormFragment,
  MoveCategoryPositionSelectFragment,
  useMoveCategoryFormLazyQuery,
  useUpdateMoveCategoryMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  moveCategoryId: string;
  moveCategories: MoveCategoryPositionSelectFragment[];
}

export const UpdateButton: React.FC<Props> = ({ moveCategoryId, moveCategories }) => {
  const [open, setOpen] = useState(false);
  const [moveCategory, setMoveCategory] = useState<MoveCategoryFormFragment>();
  const setLoading = useSetRecoilState(loadingState);

  const [fetch, { loading }] = useMoveCategoryFormLazyQuery({
    variables: { moveCategoryId },
    onCompleted: data => {
      setMoveCategory(data.moveCategory);
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const [update, { loading: updateLoading }] = useUpdateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('カテゴリを更新しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onClickUpdate = useCallback((attributes: MoveCategoryAttributes) => {
    update({ variables: { moveCategoryId, attributes } });
    setOpen(false);
  }, []);

  setLoading(loading || updateLoading);

  return (
    <>
      <IconButton
        size="large"
        onClick={() => {
          fetch().then(() => setOpen(true));
        }}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <MoveCategoryForm moveCategory={moveCategory} moveCategories={moveCategories} onSubmit={onClickUpdate} />
      </Dialog>
    </>
  );
};
