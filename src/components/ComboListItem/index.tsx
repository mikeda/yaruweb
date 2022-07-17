import React, { useState } from 'react';

import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

import { Command, VideoPlayer } from '@/components';
import { ComboListItemFragment } from '@/generated/graphql';
import { colors } from '@/lib';

interface Props {
  combo: ComboListItemFragment;
  first?: boolean;
}

export const ComboListItem: React.FC<Props> = ({ combo, first }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {!first && <Divider />}

      <ListItem
        secondaryAction={
          <>
            {combo.comboVideo && (
              <>
                <IconButton onClick={() => setDialogOpen(true)} size="large">
                  <YouTubeIcon style={{ fill: colors.youtube }} />
                </IconButton>

                <Dialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  sx={{ margin: 0 }}
                  PaperProps={{ sx: { margin: 1 } }}
                >
                  <DialogContent sx={{ padding: 2 }}>
                    <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} autoPlay />

                    <Box mt={1}>
                      <Command command={combo.command} />
                    </Box>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        }
      >
        <ListItemText>
          <Box>
            <Command command={combo.command} />
          </Box>
        </ListItemText>
      </ListItem>

      {combo.note && (
        <ListItem>
          <Typography component={Paper} p={0.5} variant="caption" sx={{ whiteSpace: 'pre-line' }}>
            {combo.note}
          </Typography>
        </ListItem>
      )}
    </>
  );
};
