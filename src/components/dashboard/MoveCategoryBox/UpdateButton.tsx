import React, { useState } from 'react';

import { Edit as EditIcon } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { MoveCategoryForm } from '@/components';
import {
  MoveCategoryPositionSelectFragment,
  useMoveCategoryFormQuery,
  useUpdateMoveCategoryMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  moveCategoryId: string;
  moveCategories: MoveCategoryPositionSelectFragment[];
}

export const UpdateButton: React.FC<Props> = ({ moveCategoryId, moveCategories }) => {
  const [open, setOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = useMoveCategoryFormQuery({
    variables: { moveCategoryId },
    fetchPolicy: 'network-only',
  });

  const [update, { loading: updateLoading }] = useUpdateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('カテゴリを更新しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading || updateLoading);

  if (!data) return null;
  const { moveCategory } = data;

  return (
    <>
      <IconButton size="large" onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <MoveCategoryForm
          moveCategory={moveCategory}
          moveCategories={moveCategories}
          onSubmit={attributes => {
            update({ variables: { moveCategoryId, attributes } });
            setOpen(false);
          }}
        />
        ;
      </Dialog>
    </>
  );
};
