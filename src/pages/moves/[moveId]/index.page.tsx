import React from 'react';

import {
  useCreateMoveCommentMutation,
  useMoveCommentsQuery,
  MoveFragment,
  PageMoveDocument,
  PageMoveQuery,
} from '@/lib/graphql/types';
import { MoveMedia } from '@/components/MoveMedia';
import { Comment } from '@/components/Comment';
import { NotFound } from '@/components/NotFound';
import { Content } from '@/components/layouts/Content';
import { Head } from '@/components/layouts/Head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { CommentForm } from '@/components/CommentForm';
import { Breadcrumbs, BreadcrumbsProps } from '@/components/layouts/Breadcrumbs';
import { PageHeader } from '@/components/layouts/PageHeader';

const PageContent: React.FC<{ move: MoveFragment }> = ({ move }) => {
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
  characterName: string;
  breadcrumbs: BreadcrumbsProps;
}

const Page: React.FC<Props> = ({ move, breadcrumbs }) => {
  const title = move.name;

  return (
    <Content>
      <Head title={title} />
      <Breadcrumbs {...breadcrumbs} />
      <PageHeader title={title} />

      <PageContent move={move} />
    </Content>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const moveId = params?.moveId as string;
  const data: PageMoveQuery = await fetchGraphql(PageMoveDocument, { moveId });

  const moveCategory = data.move.moveCategory;
  const character = moveCategory.character;

  return {
    props: {
      move: data.move,
      characterName: character.name,
      breadcrumbs: {
        items: [{ name: data.move.name }],
      },
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default Page;
