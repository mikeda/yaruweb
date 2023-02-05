import React from 'react';

import { Stack } from '@mui/material';

import { DetailFooter } from './DetailFooter';
import { DetailItem } from './DetailItem';

import { MoveMediaFragment, MoveMediaReversalFragment } from '@/generated/graphql';

interface Props {
  move: MoveMediaFragment;
  reversal: MoveMediaReversalFragment;
}

export const ReversaDeteil: React.FC<Props> = ({ move, reversal }) => {
  return (
    <Stack spacing={1} sx={{ paddingBottom: 1 }}>
      <DetailItem label='種別'>{reversal.kind}</DetailItem>
      <DetailItem label='受付フレーム'>
        {reversal.startUpFrame}〜{reversal.finishFrame}
      </DetailItem>

      <DetailFooter move={move} />
    </Stack>
  );
};
