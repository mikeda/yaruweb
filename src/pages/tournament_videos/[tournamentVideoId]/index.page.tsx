import React from 'react';

import {
  useCreateTournamentVideoCommentMutation,
  useTournamentVideoCommentsQuery,
  PageTournamentVideoQuery,
  PageTournamentVideoDocument,
} from '@/lib/graphql/types';
import { VideoMedia } from '@/components/VideoMedia';
import { Comment } from '@/components/Comment';
import { NotFound } from '@/components/NotFound';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { CommentForm } from '@/components/CommentForm';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';

const PageContent: React.FC<PageTournamentVideoQuery> = ({ tournamentVideo }) => {
  const { data: commentsData, refetch: refetchComments } = useTournamentVideoCommentsQuery({
    variables: { tournamentVideoId: tournamentVideo.id },
  });

  const [createTournamentVideoComment] = useCreateTournamentVideoCommentMutation({
    onCompleted: () => {
      refetchComments();
    },
    onError: e => {
      alert(e.message);
    },
  });

  const tournamentVideoComments = commentsData?.tournamentVideoComments;

  return (
    <>
      <div className="hp_mg_b_lg">
        <VideoMedia video={tournamentVideo} />
      </div>

      <CommentForm
        onSubmit={attributes => {
          createTournamentVideoComment({ variables: { tournamentVideoId: tournamentVideo.id, attributes } });
        }}
      />

      {tournamentVideoComments && tournamentVideoComments.length !== 0 ? (
        tournamentVideoComments.map(videoComment => {
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

const Page: React.FC<PageTournamentVideoQuery> = data => {
  const video = data.tournamentVideo;

  return (
    <Content title={video.title} breadcrumb={<Breadcrumbs to="tournamentVideo" tournamentVideo={video} />}>
      <Head title={video.title} />

      <PageContent {...data} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tournamentVideoId = params?.tournamentVideoId as string;
  const data: PageTournamentVideoQuery = await fetchGraphql(PageTournamentVideoDocument, { tournamentVideoId });

  return { props: data, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
