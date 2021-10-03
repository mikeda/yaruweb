import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { MoveVideoFragment, useCreateMoveVideoMutation } from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { Button } from '@material-ui/core';

interface MoveVideoInputProps {
  onCreate: (moveVideo: MoveVideoFragment) => void;
}

export const MoveVideoInput: React.FC<MoveVideoInputProps> = ({ onCreate }) => {
  const [file, setFile] = useState<File>();
  const setLoading = useSetRecoilState(loadingState);

  const [ceateMoveVideo, { loading }] = useCreateMoveVideoMutation({
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

          onCreate(data.createMoveVideo.moveVideo);
          toast.success('動画をアップロードしました。');
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
    <Button variant="contained" component="label">
      動画をアップロード
      <input
        type="file"
        id="video"
        accept="video/mp4"
        hidden
        onChange={event => {
          const target = event.target;
          if (!target.files) return;
          const file = target.files[0];
          if (!file) return;

          setFile(file);
          ceateMoveVideo();
        }}
      />
    </Button>
  );
};
