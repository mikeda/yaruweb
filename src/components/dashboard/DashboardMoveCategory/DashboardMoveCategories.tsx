import React from 'react';

import { Box, Divider, Stack } from '@mui/material';

import { CreateButton } from './CreateButton';
import { DashboardMoveCategory } from './DashboardMoveCategory';

import { DashboardMoveCategoryFragment } from '@/generated/graphql';

interface Props {
  characterSlug: string;
  moveCategories: DashboardMoveCategoryFragment[];
}

export const DashboardMoveCategories: React.FC<Props> = ({ characterSlug, moveCategories }) => {
  return (
    <>
      <Stack divider={<Divider />} spacing={2}>
        {moveCategories.map(moveCategory => (
          <DashboardMoveCategory key={moveCategory.id} moveCategory={moveCategory} moveCategories={moveCategories} />
        ))}
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box display="flex" justifyContent="center">
        <CreateButton characterSlug={characterSlug} moveCategories={moveCategories} />
      </Box>
    </>
  );
};
