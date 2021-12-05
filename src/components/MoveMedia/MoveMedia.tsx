import React from 'react';
import { styled } from '@mui/material/styles';

import { AttackMoveFragment, MoveMediaFragment, ReversalMoveFragment, ThrowMoveFragment } from '@/lib/graphql/types';
import { Command } from '../Command';

import { VideoPlayer } from './VideoPlayer';
import {
  AttackMoveResultText,
  AttackTypeEnumText,
  ThrowEscapeEnumText,
  ThrowMoveResultText,
  ThrowTypeEnumText,
} from '@/lib/graphql/enum_texts';
import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

type Props = {
  move: MoveMediaFragment;
};

export const MoveMedia: React.FC<Props> = ({ move }) => {
  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <Typography variant="h4" gutterBottom>
            {move.name}
          </Typography>

          <Command command={move.command} />
        </Box>

        {move.moveVideo && (
          <Box mb={2}>
            <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} />
          </Box>
        )}

        {move.moveable.__typename === 'AttackMove' && <AttackListItem move={move} attack={move.moveable} />}
        {move.moveable.__typename === 'ThrowMove' && <ThrowListItem move={move} throw={move.moveable} />}
        {move.moveable.__typename === 'ReversalMove' && <ReversalListItem move={move} reversal={move.moveable} />}
      </CardContent>
    </Card>
  );
};

interface AttackMove {
  move: MoveMediaFragment;
  attack: AttackMoveFragment;
}
interface ThrowMove {
  move: MoveMediaFragment;
  throw: ThrowMoveFragment;
}
interface ReversalMove {
  move: MoveMediaFragment;
  reversal: ReversalMoveFragment;
}

const AttackListItem: React.FC<AttackMove> = ({ move, attack }) => {
  return (
    <Stack spacing={1} sx={{ paddingBottom: 1 }}>
      <AttackLabels attack={attack} />

      <DetailItem label="判定">
        <Stack direction="row" divider={<ArrowRight />} spacing={1}>
          {attack.heights.map((h, i) => (
            <Typography key={i} variant="body2">
              {AttackTypeEnumText[h]}
            </Typography>
          ))}
        </Stack>
      </DetailItem>

      {attack.damages.length > 1 && (
        <DetailItem label="ダメージ">
          {attack.damages.reduce((sum, d) => sum + d)}（{attack.damages.join(', ')}）
        </DetailItem>
      )}

      <DetailItem label="発生">{`${attack.startUpFrame}F`}</DetailItem>

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
        <DetailItem label="ガード">
          {attack.blockFrame ? frameText(attack.blockFrame) : AttackMoveResultText[attack.blockResult]}
        </DetailItem>
        <DetailItem label="ヒット">
          {attack.hitFrame ? frameText(attack.hitFrame) : AttackMoveResultText[attack.hitResult]}
        </DetailItem>
        <DetailItem label="カウンター">
          {attack.counterFrame ? frameText(attack.counterFrame) : AttackMoveResultText[attack.counterResult]}
        </DetailItem>
      </Stack>

      <ListItemFooter move={move} />
    </Stack>
  );
};

const ThrowListItem: React.FC<ThrowMove> = ({ move, throw: thrw }) => {
  return (
    <Stack spacing={1} sx={{ paddingBottom: 1 }}>
      <DetailItem label="種別">{ThrowTypeEnumText[thrw.throwType]}</DetailItem>
      <DetailItem label="ダメージ">{thrw.damage}</DetailItem>
      <DetailItem label="発生">{`${thrw.startUpFrame}F`}</DetailItem>

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
        <DetailItem label="ヒット">{ThrowMoveResultText[thrw.throwResult]}</DetailItem>
        <DetailItem label="投げ抜け">{ThrowEscapeEnumText[thrw.throwEscape]}</DetailItem>
      </Stack>

      <ListItemFooter move={move} />
    </Stack>
  );
};

const ReversalListItem: React.FC<ReversalMove> = ({ move, reversal }) => {
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

const ListItemFooter: React.FC<{ move: MoveMediaFragment }> = ({ move }) => {
  return (
    <>
      {move.note && (
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {move.note}
        </Typography>
      )}
    </>
  );
};

const AttackLabels: React.FC<{ attack: AttackMoveFragment }> = ({ attack }) => {
  const labels: string[] = [];
  if (attack.powerCrush) labels.push('パワクラ');
  if (attack.crouchingStatus) labels.push('しゃがステ');
  if (attack.jumpStatus) labels.push('ジャンステ');
  if (attack.homing) labels.push('スクリュー');
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

const frameText = (frame: number) => {
  if (frame > 0) return `+${frame}F`;
  if (frame === 0) return `±${0}F`;
  return `${frame}F`;
};

const DetailItem: React.FC<{ label: string }> = ({ label, children }) => (
  <Stack direction="row" spacing={1}>
    <DetailTextLabel variant="body2">{label}</DetailTextLabel>
    <Typography variant="body2">{children}</Typography>
  </Stack>
);

const DetailTextLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(0.25),
  fontWeight: 'bold',
}));
