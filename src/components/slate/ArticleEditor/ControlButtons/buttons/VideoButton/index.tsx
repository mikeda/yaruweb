import React, { useRef } from 'react';

import { toast } from 'react-toastify';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { Button } from './Button';
import { HiddenInput } from './HiddenInput';

import { VideoElement } from '@/custom-types';
import { useCreateArticleVideoMutation } from '@/generated/graphql';
import { YAROUYO_FONT_CODE } from '@/lib';

export const VideoButton: React.FC = () => {
  const editor = useSlate();
  const fileRef = useRef<File>();

  const [createArticleVideo] = useCreateArticleVideoMutation({
    onCompleted: e => {
      if (!fileRef.current) return;
      const res = e.createArticleVideo;
      if (!res) return;

      const uploadUrl = res.videoUpload.url;
      const fields = JSON.parse(res.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', fileRef.current);

      fetch(uploadUrl, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          const text = { text: '' };
          const video: VideoElement = {
            type: 'video',
            m3u8Url: res.articleVideo.m3u8Url,
            thumbnailUrl: res.articleVideo.thumbnailUrl,
            children: [text],
          };
          Transforms.insertNodes(editor, video);
          Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] });
        })
        .catch(() => {
          toast.error('アップロードに失敗しました。');
        });
    },
    onError: e => {
      alert(e.message);
    },
  });

  return (
    <>
      <label htmlFor="video">
        <Button
          active={false}
          onMouseDown={event => {
            fileRef.current = undefined;
            event.preventDefault();
          }}
          icon={YAROUYO_FONT_CODE.video}
        />
      </label>

      <HiddenInput
        type="file"
        id="video"
        accept="video/mp4"
        onChange={event => {
          const target = event.target;
          if (!target.files) return;

          fileRef.current = target.files[0];
          if (!fileRef.current) return;

          createArticleVideo();
        }}
      />
    </>
  );
};
