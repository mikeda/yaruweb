import React, { useRef } from 'react';
import { useRouter } from 'next/router';

import { useCreateMoveVideoMutation, useMoveQuery, useSetMoveVideoMutation } from '@/lib/graphql/types';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { toast } from 'react-toastify';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';

const MoveForm: React.FC<{ moveId: string }> = ({ moveId }) => {
  const router = useRouter();
  const { data, loading, error } = useMoveQuery({ variables: { id: moveId as string } });
  const fileRef = useRef<HTMLInputElement>(null);
  const [setMoveVideoMutation] = useSetMoveVideoMutation({
    onCompleted: () => {
      router.back();
      toast.success('動画を登録しました。反映まで少し時間がかかります。');
    },
  });
  const [ceateMoveVideoUploadUrl] = useCreateMoveVideoMutation({
    onCompleted: data => {
      if (!data.createMoveVideo) return;
      if (!fileRef.current?.files) return;
      const file = fileRef.current.files[0];

      const moveVideoId = data.createMoveVideo.moveVideo.id;
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

  if (loading) return <NotFound>Loading...</NotFound>;
  if (error) return <NotFound>技データの読み込みに失敗しました。</NotFound>;
  if (!data) return <NotFound>技データがありません。</NotFound>;

  return (
    <div>
      <input
        type="file"
        name="file"
        accept="video/mp4"
        onChange={e => {
          if (!e.target.files) return;

          ceateMoveVideoUploadUrl();
        }}
        ref={fileRef}
      />
    </div>
  );
};

const Page: React.FC = () => {
  const router = useRouter();

  const moveId = router.query.moveId;
  if (!moveId) return <NotFound>Loading...</NotFound>;

  return (
    <Content>
      <Head title="動画を登録" />

      <Heading lv="h1">動画を登録</Heading>
      <MoveForm moveId={moveId as string} />
    </Content>
  );
};

export default Page;
