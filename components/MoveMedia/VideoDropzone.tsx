import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { useCreateMoveVideoMutation } from '@/lib/graphql/types';

import styles from './VideoDropzone.module.scss';

type Props = {
  moveId: string;
};

export const VideoDropzone: React.FC<Props> = ({ moveId }) => {
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const [ceateMoveVideo] = useCreateMoveVideoMutation({
    onCompleted: data => {
      if (!data.createMoveVideo) return;
      if (!file) return;
      setUploading(true);

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
          toast.success('動画をアップロードしました。反映まで少し時間がかかります。');
        })
        .catch(() => {
          toast.error('アップロードに失敗しました。');
        });
    },
    onError: () => {
      toast.error('アップロードに失敗しました。');
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    ceateMoveVideo({ variables: { moveId } });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  if (uploading) {
    return (
      <div className={styles.container}>
        <p>
          アップロード中です。
          <br />
          しばらく待ってからアクセスしてみて下さい。
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>動画ファイルをドロップして下さい</p>
    </div>
  );
};
