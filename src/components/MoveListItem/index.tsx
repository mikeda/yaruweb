import React, { useState } from 'react';

import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Dialog, DialogContent, Divider, IconButton, ListItem, ListItemText, Typography } from '@mui/material';

import { AttackListItem } from './AttackListItem';
import { ReversalListItem } from './ReversalListItem';
import { ThrowListItem } from './ThrowListItem';

import { Command, VideoPlayer } from '@/components';
import { MoveListItemFragment } from '@/generated/graphql';
import { colors } from '@/lib';

export const MoveListItem: React.FC<{ move: MoveListItemFragment; first: boolean }> = ({ move, first }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {!first && <Divider />}

      <ListItem
        secondaryAction={
          <>
            {move.moveVideo && (
              <>
                <IconButton onClick={() => setDialogOpen(true)} size='large'>
                  <YouTubeIcon style={{ fill: colors.youtube }} />
                </IconButton>

                <Dialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  sx={{ margin: 0 }}
                  PaperProps={{ sx: { margin: 1 } }}
                >
                  <DialogContent sx={{ padding: 2 }}>
                    <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} autoPlay />

                    <Box mt={1}>
                      <Command command={move.command} />
                    </Box>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        }
      >
        <ListItemText>
          <Typography>{move.name}</Typography>

          <Box mt={1}>
            <Command command={move.command} />
          </Box>
        </ListItemText>
      </ListItem>

      <ListItem>
        {move.moveable.__typename === 'AttackMove' && <AttackListItem move={move} attack={move.moveable} />}
        {move.moveable.__typename === 'ThrowMove' && <ThrowListItem move={move} throw={move.moveable} />}
        {move.moveable.__typename === 'ReversalMove' && <ReversalListItem move={move} reversal={move.moveable} />}
      </ListItem>
    </>
  );
};
