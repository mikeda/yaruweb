import React from 'react';
import { Comment, CommentForm, NotFound } from '@/components';
import { useArticleCommentsQuery, useCreateArticleCommentMutation } from '@/lib/graphql/types';

export const Comments: React.FC<{ articleId: string }> = ({ articleId }) => {
  const { data: commentsData, refetch: refetchComments } = useArticleCommentsQuery({ variables: { articleId } });
  const [createArticleComment] = useCreateArticleCommentMutation({
    onCompleted: () => {
      refetchComments();
    },
    onError: e => {
      alert(e.message);
    },
  });

  const articleComments = commentsData?.articleComments;
  if (!articleComments) return null;

  return (
    <>
      <CommentForm
        onSubmit={attributes => {
          createArticleComment({ variables: { articleId: articleId, attributes } });
        }}
      />

      {articleComments.length !== 0 ? (
        articleComments.map(articleComment => {
          if (!articleComment) return;

          return (
            <Comment
              key={articleComment.id}
              message={articleComment.message}
              createdAt={articleComment.createdAt}
              user={articleComment.user}
            />
          );
        })
      ) : (
        <NotFound>コメントがありません。</NotFound>
      )}
    </>
  );
};
