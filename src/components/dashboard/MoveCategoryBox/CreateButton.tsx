import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';

import { MoveCategoryForm } from '@/components';
import { MoveCategoryAttributes, MoveCategoryPositionSelectFragment } from '@/generated/graphql';

interface Props {
  characterSlug: string;
  moveCategories: MoveCategoryPositionSelectFragment[];
  onClickCreate: (characterSlug: string, attributes: MoveCategoryAttributes) => void;
}

export const CreateButton: React.FC<Props> = ({ characterSlug, moveCategories, onClickCreate }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        カテゴリを追加
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <MoveCategoryForm
          moveCategories={moveCategories}
          onSubmit={attributes => {
            onClickCreate(characterSlug, attributes);
            setOpen(false);
          }}
        />
        ;
      </Dialog>
    </>
  );
};
