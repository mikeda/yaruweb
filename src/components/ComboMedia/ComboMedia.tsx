import React from 'react';
import { ComboMediaFragment } from '@/lib/graphql/types';
import { Card, CardContent, Typography } from '@mui/material';
import { VideoPlayer } from '../MoveMedia/VideoPlayer';
import { Command } from '../Command';

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
