import React from 'react';

import { Stack, Typography } from '@mui/material';

import { ListItemFooter } from './ListItemFooter';

import { MoveListItemFragment, ReversalListItemFragment } from '@/generated/graphql';

interface ReversalMove {
  move: MoveListItemFragment;
  reversal: ReversalListItemFragment;
}

export const ReversalListItem: React.FC<ReversalMove> = ({ move, reversal }) => {
  return (
    <Stack spacing={2} sx={{ paddingBottom: 1 }}>
      <Typography variant="body2">{reversal.kind}</Typography>

      {(reversal.startUpFrame || reversal.finishFrame) && (
        <Typography variant="body2">{`受付フレーム ${reversal.startUpFrame}F〜${reversal.finishFrame}F`}</Typography>
      )}

      <ListItemFooter move={move} />
    </Stack>
  );
};
