import React, { useCallback, useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { MoveCategoryForm } from '@/components';
import {
  MoveCategoryAttributes,
  MoveCategoryPositionSelectFragment,
  useCreateMoveCategoryMutation,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  characterSlug: string;
  moveCategories: MoveCategoryPositionSelectFragment[];
}

export const CreateButton: React.FC<Props> = ({ characterSlug, moveCategories }) => {
  const [open, setOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  const [create, { loading }] = useCreateMoveCategoryMutation({
    onCompleted: () => toast.success('カテゴリを作成しました。'),
    onError: handleApolloError,
  });

  const onClickCreate = useCallback((attributes: MoveCategoryAttributes) => {
    create({ variables: { characterSlug, attributes } });
    setOpen(false);
  }, []);

  setLoading(loading);

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        カテゴリを追加
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <MoveCategoryForm moveCategories={moveCategories} onSubmit={onClickCreate} />
      </Dialog>
    </>
  );
};
