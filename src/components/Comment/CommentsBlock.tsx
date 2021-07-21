import { CommentAttributes } from '@/lib/graphql/types';
import { Box } from '@material-ui/core';
import React from 'react';
import { CommentForm } from '../CommentForm';
import { NotFound } from '../NotFound';
import { Comment, CommentFragment } from './Comment';

interface Props {
  comments: CommentFragment[];
  onSubmit: (attributes: CommentAttributes) => void;
}

export const CommentsBlock: React.FC<Props> = ({ comments, onSubmit }) => {
  return (
    <>
      <CommentForm onSubmit={onSubmit} />

      {comments.length !== 0 ? (
        comments.map(comment => (
          <Box key={comment.id} mb={2}>
            <Comment comment={comment} />
          </Box>
        ))
      ) : (
        <NotFound>コメントがありません。</NotFound>
      )}
    </>
  );
};
