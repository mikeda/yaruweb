import React from 'react';

import { ArrowRight } from '@mui/icons-material';
import { Chip, Divider, Stack } from '@mui/material';

import { DetailFooter } from './DetailFooter';
import { DetailItem } from './DetailItem';

import { MoveMediaAttackFragment, MoveMediaFragment } from '@/generated/graphql';
import { AttackMoveResultText, AttackTypeEnumText, frameDiffText } from '@/lib';

interface Props {
  move: MoveMediaFragment;
  attack: MoveMediaAttackFragment;
}

export const AttackDeteil: React.FC<Props> = ({ move, attack }) => {
  return (
    <Stack spacing={1} sx={{ paddingBottom: 1 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
        <DetailItem label="判定">
          <Stack direction="row" divider={<ArrowRight />} spacing={1}>
            {attack.heights.map((h, i) => (
              <span key={i}>{AttackTypeEnumText[h]}</span>
            ))}
          </Stack>
        </DetailItem>

        {attack.damages.length === 1 && <DetailItem label="ダメージ">{attack.damages[0]}</DetailItem>}
        {attack.damages.length > 1 && (
          <DetailItem label="ダメージ">
            {attack.damages.reduce((sum, d) => sum + d)}（{attack.damages.join(', ')}）
          </DetailItem>
        )}

        <DetailItem label="発生">
          {attack.startUpFrame ? `${attack.startUpFrame}F` : '-'}
          {attack.duration && `（持続 ${attack.duration}F）`}
        </DetailItem>
      </Stack>

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
        <DetailItem label="ガード">
          {attack.blockFrame ? frameDiffText(attack.blockFrame) : AttackMoveResultText[attack.blockResult]}
        </DetailItem>
        <DetailItem label="ヒット">
          {attack.hitFrame ? frameDiffText(attack.hitFrame) : AttackMoveResultText[attack.hitResult]}
        </DetailItem>
        <DetailItem label="カウンター">
          {attack.counterFrame ? frameDiffText(attack.counterFrame) : AttackMoveResultText[attack.counterResult]}
        </DetailItem>
      </Stack>

      <AttackLabels attack={attack} />

      <DetailFooter move={move} />
    </Stack>
  );
};

const AttackLabels: React.FC<{ attack: MoveMediaAttackFragment }> = ({ attack }) => {
  const labels: string[] = [];
  if (attack.powerCrush) labels.push('パワクラ');
  if (attack.crouchingStatus) labels.push('しゃがステ');
  if (attack.jumpStatus) labels.push('ジャンステ');
  if (attack.homing) labels.push('ホーミング');
  if (attack.screw) labels.push('スクリュー');
  if (attack.wallBound) labels.push('ウォールバウンド');

  if (labels.length === 0) return null;

  return (
    <Stack direction="row" spacing={1}>
      {labels.map(label => (
        <Chip key={label} size="small" label={label} />
      ))}
    </Stack>
  );
};
