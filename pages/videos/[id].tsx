import React from 'react';
import { useRouter } from 'next/router';

import { useCreateVideoCommentMutation, useVideoCommentsQuery, useVideoQuery } from '@/lib/graphql/types';
import { VideoMedia } from '@/components/VideoMedia';
import { Comment } from '@/components/Comment';
import { CommentForm } from '@/components/CommentForm';
import { NotFound } from '@/components/NotFound';

const Page: React.FC = () => {
  const router = useRouter();
  const videoId = router.query.id as string;

  const { data: videoData } = useVideoQuery({ variables: { id: videoId } });
  const { data: commentsData, refetch: refetchComments } = useVideoCommentsQuery({ variables: { videoId } });

  const [createVideoComment] = useCreateVideoCommentMutation({
    onCompleted: () => {
      refetchComments();
    },
    onError: e => {
      alert(e.message);
    },
  });

  const video = videoData?.video;
  if (!video) return null;

  const videoComments = commentsData?.videoComments;
  if (!videoComments) return null;

  return (
    <>
      <div className="hp_mg_b_lg">
        <VideoMedia video={video} />
      </div>

      <CommentForm
        onSubmit={message => {
          createVideoComment({ variables: { id: video.id, attributes: { message } } });
        }}
      />

      {videoComments.length !== 0 ? (
        videoComments.map(videoComment => {
          if (!videoComment) return;

          return (
            <Comment
              key={videoComment.id}
              message={videoComment.message}
              createdAt={videoComment.createdAt}
              player={videoComment.player}
            />
          );
        })
      ) : (
        <NotFound>コメントがありません。</NotFound>
      )}
    </>
  );
};

export default Page;
