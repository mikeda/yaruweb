import React from 'react';

import {
  useCreateMoveCommentMutation,
  useMoveCommentsQuery,
  MoveDocument,
  MoveFragment,
  MoveQuery,
} from '@/lib/graphql/types';
import { MoveMedia } from '@/components/MoveMedia';
import { Comment } from '@/components/Comment';
import { NotFound } from '@/components/NotFound';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { CommentForm } from '@/components/CommentForm';

const PageContent: React.FC<Props> = ({ move }) => {
  const { data: commentsData, refetch: refetchComments } = useMoveCommentsQuery({ variables: { moveId: move.id } });

  const [createMoveComment] = useCreateMoveCommentMutation({
    onCompleted: () => {
      refetchComments();
    },
    onError: e => {
      alert(e.message);
    },
  });

  const moveComments = commentsData?.moveComments;

  return (
    <>
      <div className="hp_mg_b_lg">
        <MoveMedia move={move} />
      </div>

      <CommentForm
        onSubmit={attributes => {
          createMoveComment({ variables: { moveId: move.id, attributes } });
        }}
      />

      {moveComments && moveComments.length !== 0 ? (
        moveComments.map(moveComment => {
          if (!moveComment) return;

          return (
            <Comment
              key={moveComment.id}
              message={moveComment.message}
              createdAt={moveComment.createdAt}
              player={moveComment.player}
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
  move: MoveFragment;
}

const Page: React.FC<Props> = ({ move }) => {
  return (
    <Content>
      <Head title={move.name} />

      <PageContent move={move} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const moveId = params?.moveId as string;
  const data: MoveQuery = await fetchGraphql(MoveDocument, { moveId });

  return { props: { move: data.move }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
