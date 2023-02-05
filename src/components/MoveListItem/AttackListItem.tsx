import React from 'react';

import { Chip, Stack, Typography } from '@mui/material';

import { ListItemFooter } from './ListItemFooter';

import { AttackListItemFragment, MoveListItemFragment } from '@/generated/graphql';
import { AttackMoveResultText, AttackTypeEnumText, frameDiffText } from '@/lib';
interface AttackMove {
  move: MoveListItemFragment;
  attack: AttackListItemFragment;
}

export const AttackListItem: React.FC<AttackMove> = ({ move, attack }) => {
  const frames: { label: string; frame: string }[] = [
    {
      label: 'G',
      frame: attack.blockFrame ? frameDiffText(attack.blockFrame) : AttackMoveResultText[attack.blockResult],
    },
    {
      label: 'H',
      frame: attack.hitFrame ? frameDiffText(attack.hitFrame) : AttackMoveResultText[attack.hitResult],
    },
    {
      label: 'C',
      frame: attack.counterFrame ? frameDiffText(attack.counterFrame) : AttackMoveResultText[attack.counterResult],
    },
  ];

  return (
    <Stack spacing={1}>
      <AttackLabels attack={attack} />

      <Typography variant='body2'>
        {attack.heights.map(h => AttackTypeEnumText[h]).join(',')}
        {attack.damages.length > 0 && ` / ダメージ ${attack.damages.join(',')}`}
      </Typography>

      <Typography variant='body2'>
        発生 {attack.startUpFrame ? frameDiffText(attack.startUpFrame) : '-'}
        {attack.duration && `（持続 ${attack.duration}F）`}
      </Typography>
      <Typography variant='body2'>{frames.map(frame => `${frame.label} ${frame.frame}`).join(' / ')}</Typography>

      <ListItemFooter move={move} />
    </Stack>
  );
};

const AttackLabels: React.FC<{ attack: AttackListItemFragment }> = ({ attack }) => {
  const labels: string[] = [];
  if (attack.powerCrush) labels.push('パワークラッシュ');
  if (attack.crouchingStatus) labels.push('しゃがステ');
  if (attack.jumpStatus) labels.push('ジャンステ');
  if (attack.homing) labels.push('ホーミング');
  if (attack.screw) labels.push('スクリュー');
  if (attack.wallBound) labels.push('ウォールバウンド');

  if (labels.length === 0) return null;

  return (
    <Stack direction='row' spacing={1}>
      {labels.map(label => (
        <Chip key={label} size='small' label={label} />
      ))}
    </Stack>
  );
};
