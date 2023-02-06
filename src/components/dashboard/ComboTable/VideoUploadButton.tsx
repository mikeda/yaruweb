import React, { useState } from 'react';

import YouTubeIcon from '@mui/icons-material/YouTube';
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { VideoPlayer } from '@/components';
import { ComboTableRowFragment, useCreateComboVideoMutation } from '@/generated/graphql';
import { loadingState, colors } from '@/lib';

export const VideoUploadButton: React.FC<{ combo: ComboTableRowFragment }> = ({ combo }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  let file: File | undefined;

  const [ceateComboVideo, { loading }] = useCreateComboVideoMutation({
    variables: { comboId: combo.id },
    onCompleted: data => {
      if (!data.createComboVideo) return;
      if (!file) return;

      const fields = JSON.parse(data.createComboVideo.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(data.createComboVideo.videoUpload.url, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          if (!data.createComboVideo) return;

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
      <IconButton onClick={() => setDialogOpen(true)} size='large'>
        <YouTubeIcon style={combo.comboVideo ? { fill: colors.youtube } : {}} />
      </IconButton>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          {combo.comboVideo && (
            <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} autoPlay />
          )}
        </DialogContent>

        <DialogActions>
          <input
            type='file'
            id='video'
            accept='video/mp4'
            onChange={event => {
              const target = event.target;
              if (!target.files) return;

              file = target.files[0];
              if (!file) return;

              ceateComboVideo();
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
