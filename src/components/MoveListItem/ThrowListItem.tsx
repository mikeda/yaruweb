import React from 'react';

import { Stack, Typography } from '@mui/material';

import { ListItemFooter } from './ListItemFooter';

import { MoveListItemFragment, ThrowListItemFragment } from '@/generated/graphql';
import { ThrowEscapeEnumText, ThrowMoveResultText, ThrowTypeEnumText, frameDiffText } from '@/lib';

interface ThrowMove {
  move: MoveListItemFragment;
  throw: ThrowListItemFragment;
}

export const ThrowListItem: React.FC<ThrowMove> = ({ move, throw: thrw }) => {
  return (
    <Stack spacing={2} sx={{ paddingBottom: 1 }}>
      <Typography variant="body2">{`${ThrowTypeEnumText[thrw.throwType]} / ダメージ ${thrw.damage || '-'} / 投げ抜け ${
        ThrowEscapeEnumText[thrw.throwEscape]
      }`}</Typography>

      <Typography variant="body2">{`発生 ${thrw.startUpFrame ? frameDiffText(thrw.startUpFrame) : '-'} / H ${
        ThrowMoveResultText[thrw.throwResult]
      }`}</Typography>

      <ListItemFooter move={move} />
    </Stack>
  );
};
