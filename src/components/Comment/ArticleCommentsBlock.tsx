import React from 'react';

import { useArticleCommentCardsQuery, useCreateArticleCommentMutation } from '@/lib/graphql/types';
import { CommentsBlock } from './CommentsBlock';

interface Props {
  articleId: string;
}

export const ArticleCommentsBlock: React.FC<Props> = ({ articleId }) => {
  const { data, refetch } = useArticleCommentCardsQuery({ variables: { articleId } });
  const [create] = useCreateArticleCommentMutation({
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
        create({ variables: { articleId: articleId, attributes } });
      }}
      comments={data.articleComments}
    />
  );
};
