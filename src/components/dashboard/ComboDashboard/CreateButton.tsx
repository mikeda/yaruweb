import React, { useCallback, useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { ComboCategoryForm } from '@/components';
import {
  ComboCategoryAttributes,
  ComboCategoryPositionSelectFragment,
  useCreateComboCategoryMutation,
} from '@/generated/graphql';
import { handleApolloError, loadingState } from '@/lib';

interface Props {
  characterSlug: string;
  comboCategories: ComboCategoryPositionSelectFragment[];
}

export const CreateButton: React.FC<Props> = ({ characterSlug, comboCategories }) => {
  const [open, setOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  const [create, { loading }] = useCreateComboCategoryMutation({
    onCompleted: () => toast.success('カテゴリを作成しました。'),
    onError: handleApolloError,
  });

  const onClickCreate = useCallback((attributes: ComboCategoryAttributes) => {
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
        <ComboCategoryForm comboCategories={comboCategories} onSubmit={onClickCreate} />
      </Dialog>
    </>
  );
};
