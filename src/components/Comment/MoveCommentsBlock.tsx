import React from 'react';

import { useMoveCommentCardsQuery, useCreateMoveCommentMutation } from '@/lib/graphql/types';
import { CommentsBlock } from './CommentsBlock';

interface Props {
  moveId: string;
}

export const MoveCommentsBlock: React.FC<Props> = ({ moveId }) => {
  const { data, refetch } = useMoveCommentCardsQuery({ variables: { moveId } });
  const [create] = useCreateMoveCommentMutation({
    onCompleted: () => {
      refetch();
    },
    onError: e => {
      alert(e.message);
    },
  });

  if (!data) return null;

  return (
    <CommentsBlock
      onSubmit={attributes => {
        create({ variables: { moveId: moveId, attributes } });
      }}
      comments={data.moveComments}
    />
  );
};
