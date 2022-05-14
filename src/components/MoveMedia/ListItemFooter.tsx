import React from 'react';

import { Typography } from '@mui/material';

import { CustomText } from '@/components';
import { MoveMediaFragment } from '@/generated/graphql';

export const ListItemFooter: React.FC<{ move: MoveMediaFragment }> = ({ move }) => {
  if (!move.note) return null;

  return (
    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
      <CustomText text={move.note} />
    </Typography>
  );
};
