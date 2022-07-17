import React from 'react';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { AttackDeteil } from './AttackDeteil';
import { ReversaDeteil } from './ReversaDeteil';
import { ThrowDetail } from './ThrowDetail';

import { Command, VideoPlayer } from '@/components';
import { MoveMediaFragment } from '@/generated/graphql';

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

        {move.moveable.__typename === 'AttackMove' && <AttackDeteil move={move} attack={move.moveable} />}
        {move.moveable.__typename === 'ThrowMove' && <ThrowDetail move={move} throw={move.moveable} />}
        {move.moveable.__typename === 'ReversalMove' && <ReversaDeteil move={move} reversal={move.moveable} />}
      </CardContent>
    </Card>
  );
};
