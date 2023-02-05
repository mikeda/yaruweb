import React from 'react';

import { Box, Divider, Stack } from '@mui/material';

import { ComboDashboardCategory } from './ComboDashboardCategory';
import { CreateButton } from './CreateButton';

import { ComboDashboardFragment } from '@/generated/graphql';

interface Props {
  character: ComboDashboardFragment;
}

export const ComboDashboard: React.FC<Props> = ({ character: { slug, comboCategories, moveCategories } }) => {
  return (
    <>
      <Stack divider={<Divider />} spacing={2}>
        {comboCategories.map(comboCategory => (
          <ComboDashboardCategory
            key={comboCategory.id}
            comboCategory={comboCategory}
            comboCategories={comboCategories}
            moveCategories={moveCategories}
          />
        ))}
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box display='flex' justifyContent='center'>
        <CreateButton characterSlug={slug} comboCategories={comboCategories} />
      </Box>
    </>
  );
};
