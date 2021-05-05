import React, { useState } from 'react';
import { useSlate } from 'slate-react';

import { Button } from './Button';
import styles from './VideoButton.module.scss';
import { useConvertArticleVideoMutation, useCreateArticleVideoMutation } from '@/lib/graphql/types';
import { YAROUYO_FONT_CODE } from '@/lib/YarouyoFont';
import { ArticleElementTypes } from '@/components/ArticleElement/ArticleElement';
import { toast } from 'react-toastify';

export const VideoButton: React.FC = () => {
  const editor = useSlate();
  const [file, setFile] = useState<File>();
  const [createArticleVideo] = useCreateArticleVideoMutation({
    onCompleted: e => {
      if (!file) return;
      const res = e.createArticleVideo;
      if (!res) return;

      const uploadUrl = res.videoUpload.url;
      const fields = JSON.parse(res.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(uploadUrl, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          convertArticleVideoMutation({ variables: { articleVideoId: res.articleVideo.id } });
        })
        .catch(() => {
          toast.error('アップロードに失敗しました。');
        });
    },
    onError: e => {
      alert(e.message);
    },
  });
  const [convertArticleVideoMutation] = useConvertArticleVideoMutation({
    onCompleted: e => {
      const articleVideo = e.convertArticleVideo?.articleVideo;
      if (!articleVideo) return;

      editor.insertNode({
        type: ArticleElementTypes.Video,
        m3u8Url: articleVideo.m3u8Url,
        thumbnailUrl: articleVideo.thumbnailUrl,
        children: [{ text: '' }],
      });
      editor.insertNode({ type: ArticleElementTypes.Paragraph, children: [{ text: '' }] });
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
            event.preventDefault();
          }}
          icon={YAROUYO_FONT_CODE.video}
        />
      </label>
      <input
        type="file"
        id="video"
        className={styles.input}
        accept="video/*"
        onChange={event => {
          const target = event.target;
          if (!target.files) return;
          const file = target.files[0];
          if (!file) return;

          setFile(file);
          createArticleVideo();
        }}
      />
    </>
  );
};
