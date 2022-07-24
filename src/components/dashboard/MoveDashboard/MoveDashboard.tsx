import React from 'react';

import { Box, Divider, Stack } from '@mui/material';

import { CreateButton } from './CreateButton';
import { MoveDashboardCategory } from './MoveDashboardCategory';

import { MoveDashboardFragment } from '@/generated/graphql';

interface Props {
  character: MoveDashboardFragment;
}

export const MoveDashboard: React.FC<Props> = ({ character: { slug, moveCategories } }) => {
  return (
    <>
      <Stack divider={<Divider />} spacing={2}>
        {moveCategories.map(moveCategory => (
          <MoveDashboardCategory key={moveCategory.id} moveCategory={moveCategory} moveCategories={moveCategories} />
        ))}
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box display="flex" justifyContent="center">
        <CreateButton characterSlug={slug} moveCategories={moveCategories} />
      </Box>
    </>
  );
};
