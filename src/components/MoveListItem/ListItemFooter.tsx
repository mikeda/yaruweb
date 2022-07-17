import React from 'react';

import { Paper, Typography } from '@mui/material';

import { CustomText } from '@/components';
import { MoveListItemFragment } from '@/generated/graphql';

export const ListItemFooter: React.FC<{ move: MoveListItemFragment }> = ({ move }) => {
  if (!move.note) return null;

  return (
    <Typography component={Paper} p={0.5} variant="caption" sx={{ whiteSpace: 'pre-line' }}>
      <CustomText text={move.note} />
    </Typography>
  );
};
