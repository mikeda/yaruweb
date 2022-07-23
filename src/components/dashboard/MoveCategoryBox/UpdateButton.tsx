import React, { useState } from 'react';

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
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  moveCategoryId: string;
  moveCategories: MoveCategoryPositionSelectFragment[];
  onClickUpdate: (moveCategoryId: string, attributes: MoveCategoryAttributes) => void;
}

export const UpdateButton: React.FC<Props> = ({ moveCategoryId, moveCategories, onClickUpdate }) => {
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

  setLoading(loading);

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
        <MoveCategoryForm
          moveCategory={moveCategory}
          moveCategories={moveCategories}
          onSubmit={attributes => {
            onClickUpdate(moveCategoryId, attributes);
            setOpen(false);
          }}
        />
      </Dialog>
    </>
  );
};
