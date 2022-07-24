import React from 'react';

import { Box, Divider, Stack } from '@mui/material';

import { CreateButton } from './CreateButton';
import { DashboardMoveCategory } from './DashboardMoveCategory';

import { DashboardMoveCategoriesFragment } from '@/generated/graphql';

interface Props {
  character: DashboardMoveCategoriesFragment;
}

export const DashboardMoveCategories: React.FC<Props> = ({ character: { slug, moveCategories } }) => {
  return (
    <>
      <Stack divider={<Divider />} spacing={2}>
        {moveCategories.map(moveCategory => (
          <DashboardMoveCategory key={moveCategory.id} moveCategory={moveCategory} moveCategories={moveCategories} />
        ))}
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box display="flex" justifyContent="center">
        <CreateButton characterSlug={slug} moveCategories={moveCategories} />
      </Box>
    </>
  );
};
