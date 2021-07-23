import React from 'react';

import { useTournamentVideoCommentCardsQuery, useCreateTournamentVideoCommentMutation } from '@/lib/graphql/types';
import { CommentsBlock } from './CommentsBlock';

interface Props {
  tournamentVideoId: string;
}

export const TournamentVideoCommentsBlock: React.FC<Props> = ({ tournamentVideoId }) => {
  const { data, refetch } = useTournamentVideoCommentCardsQuery({ variables: { tournamentVideoId } });
  const [create] = useCreateTournamentVideoCommentMutation({
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
        create({ variables: { tournamentVideoId: tournamentVideoId, attributes } });
      }}
      comments={data.tournamentVideoComments}
    />
  );
};
