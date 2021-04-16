import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { useSetMoveVideoMutation, useCreateMoveVideoUploadUrlMutation } from '@/lib/graphql/types';

import styles from './VideoDropzone.module.scss';

type Props = {
  moveId: string;
};

export const VideoDropzone: React.FC<Props> = ({ moveId }) => {
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [setMoveVideoMutation] = useSetMoveVideoMutation({
    onCompleted: () => {
      toast.success('動画を登録しました。反映まで少し時間がかかります。');
    },
  });

  const [ceateMoveVideoUploadUrl] = useCreateMoveVideoUploadUrlMutation({
    onCompleted: data => {
      if (!data.createMoveVideoUploadUrl) return;
      if (!file) return;
      setUploading(true);

      const moveVideoId = data.createMoveVideoUploadUrl.moveVideoId;
      const fields = JSON.parse(data.createMoveVideoUploadUrl.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(data.createMoveVideoUploadUrl.url, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          setMoveVideoMutation({ variables: { moveId, moveVideoId } });
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
    ceateMoveVideoUploadUrl();
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
