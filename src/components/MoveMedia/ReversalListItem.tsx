import React from 'react';

import { Stack } from '@mui/material';

import { DetailItem } from './DetailItem';
import { ListItemFooter } from './ListItemFooter';

import { MoveMediaFragment, ReversalMoveFragment } from '@/generated/graphql';

interface Props {
  move: MoveMediaFragment;
  reversal: ReversalMoveFragment;
}

export const ReversalListItem: React.FC<Props> = ({ move, reversal }) => {
  return (
    <Stack spacing={1} sx={{ paddingBottom: 1 }}>
      <DetailItem label="種別">{reversal.type}</DetailItem>
      <DetailItem label="受付フレーム">
        {reversal.startUpFrame}〜{reversal.finishFrame}
      </DetailItem>

      <ListItemFooter move={move} />
    </Stack>
  );
};
