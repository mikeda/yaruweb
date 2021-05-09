import React from 'react';

import {
  useCreateVideoCommentMutation,
  useVideoCommentsQuery,
  VideoDocument,
  VideoFragment,
  VideoQuery,
} from '@/lib/graphql/types';
import { VideoMedia } from '@/components/VideoMedia';
import { Comment } from '@/components/Comment';
import { NotFound } from '@/components/NotFound';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { VideoCommentForm } from '@/components/VideoCommentForm';

const PageContent: React.FC<Props> = ({ video }) => {
  const { data: commentsData, refetch: refetchComments } = useVideoCommentsQuery({ variables: { videoId: video.id } });

  const [createVideoComment] = useCreateVideoCommentMutation({
    onCompleted: () => {
      refetchComments();
    },
    onError: e => {
      alert(e.message);
    },
  });

  const videoComments = commentsData?.videoComments;

  return (
    <>
      <div className="hp_mg_b_lg">
        <VideoMedia video={video} />
      </div>

      <VideoCommentForm
        onSubmit={attributes => {
          createVideoComment({ variables: { videoId: video.id, attributes } });
        }}
      />

      {videoComments && videoComments.length !== 0 ? (
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

interface Props {
  video: VideoFragment;
}

const Page: React.FC<Props> = ({ video }) => {
  return (
    <Content>
      <Head title={video.title} />

      <PageContent video={video} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const videoId = params?.videoId as string;
  const data: VideoQuery = await fetchGraphql(VideoDocument, { videoId });

  return { props: { video: data.video }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
