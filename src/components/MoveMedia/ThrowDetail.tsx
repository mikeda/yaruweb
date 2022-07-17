import React from 'react';

import { Divider, Stack } from '@mui/material';

import { DetailFooter } from './DetailFooter';
import { DetailItem } from './DetailItem';

import { MoveMediaFragment, MoveMediaThrowFragment } from '@/generated/graphql';
import { ThrowEscapeEnumText, ThrowMoveResultText, ThrowTypeEnumText } from '@/lib';

interface Props {
  move: MoveMediaFragment;
  throw: MoveMediaThrowFragment;
}
export const ThrowDetail: React.FC<Props> = ({ move, throw: thrw }) => {
  return (
    <Stack spacing={1} sx={{ paddingBottom: 1 }}>
      <DetailItem label="種別">{ThrowTypeEnumText[thrw.throwType]}</DetailItem>
      <DetailItem label="ダメージ">{thrw.damage}</DetailItem>
      <DetailItem label="発生">{`${thrw.startUpFrame}F`}</DetailItem>

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
        <DetailItem label="ヒット">{ThrowMoveResultText[thrw.throwResult]}</DetailItem>
        <DetailItem label="投げ抜け">{ThrowEscapeEnumText[thrw.throwEscape]}</DetailItem>
      </Stack>

      <DetailFooter move={move} />
    </Stack>
  );
};
