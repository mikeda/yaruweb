import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import { Command } from '../Command';
import { VideoPlayer } from '../VideoPlayer';

import { ComboMediaFragment } from '@/lib';

interface Props {
  combo: ComboMediaFragment;
}

export const ComboMedia: React.FC<Props> = ({ combo }) => {
  return (
    <Card>
      {combo.comboVideo && <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} />}

      <CardContent>
        <Command command={combo.command} />
        {combo.note && (
          <Typography variant="caption" component="p">
            {combo.note}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
