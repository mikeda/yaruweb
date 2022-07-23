import React, { useState } from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';

import { MoveCategoryForm } from '@/components';
import { MoveCategoryAttributes, MoveCategoryPositionSelectFragment } from '@/generated/graphql';

interface Props {
  moveCategories: MoveCategoryPositionSelectFragment[];
  onSubmit: (attributes: MoveCategoryAttributes) => void;
}

export const CreateButton: React.FC<Props> = ({ moveCategories, onSubmit }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        作成する
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <MoveCategoryForm moveCategories={moveCategories} onSubmit={onSubmit} />;
      </Dialog>
    </>
  );
};
