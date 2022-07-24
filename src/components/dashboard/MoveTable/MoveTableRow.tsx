import React, { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Dialog, DialogActions, DialogContent, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { Command, VideoPlayer } from '@/components';
import { MoveTableRowFragment, useCreateMoveVideoMutation } from '@/generated/graphql';
import { loadingState, colors } from '@/lib';

interface Props {
  move: MoveTableRowFragment;
  onClickDelete: (moveId: string) => void;
}

export const MoveTableRow: React.FC<Props> = ({ move, onClickDelete }) => {
  return (
    <TableRow>
      <TableCell scope="row">
        <Typography>{move.name}</Typography>

        <Command command={move.command} />
      </TableCell>

      <TableCell align="right" scope="row">
        <VideoButton move={move} />

        <IconButton size="large">
          <EditIcon />
        </IconButton>

        <IconButton size="large">
          <ContentCopyIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            if (window.confirm('削除します。')) {
              onClickDelete(move.id);
            }
          }}
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const VideoButton: React.FC<{ move: MoveTableRowFragment }> = ({ move }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  let file: File | undefined;

  const [ceateMoveVideo, { loading }] = useCreateMoveVideoMutation({
    variables: { moveId: move.id },
    onCompleted: data => {
      if (!data.createMoveVideo) return;
      if (!file) return;

      const fields = JSON.parse(data.createMoveVideo.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(data.createMoveVideo.videoUpload.url, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          if (!data.createMoveVideo) return;

          toast.success('動画をアップロードしました。');
          setDialogOpen(false);
        })
        .catch(() => {
          toast.error('アップロードに失敗しました。');
        });
    },
    onError: () => {
      toast.error('アップロードに失敗しました。');
    },
  });

  setLoading(loading);

  return (
    <>
      <IconButton onClick={() => setDialogOpen(true)} size="large">
        <YouTubeIcon style={move.moveVideo ? { fill: colors.youtube } : {}} />
      </IconButton>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          {move.moveVideo && (
            <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} autoPlay />
          )}
        </DialogContent>

        <DialogActions>
          <input
            type="file"
            id="video"
            accept="video/mp4"
            onChange={event => {
              const target = event.target;
              if (!target.files) return;

              file = target.files[0];
              if (!file) return;

              ceateMoveVideo();
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
