import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  ArticleDocument,
  ArticleFragment,
  ArticlePathsDocument,
  ArticlePathsQuery,
  ArticleQuery,
  useArticleCommentsQuery,
  useCreateArticleCommentMutation,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { Comment } from '@/components/Comment';
import { CommentForm } from '@/components/CommentForm';
import { NotFound } from '@/components/NotFound';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { ArticleDetail } from './ArticleDetail';

interface Props {
  article: ArticleFragment;
}

const Page: React.FC<Props> = ({ article }) => {
  return (
    <Content>
      <Head title={article.title} description={article.description} image={article.mainImageUrl} />
      <Breadcrumbs to="article" article={article} />

      <ArticleDetail article={article} />
      <Comments articleId={article.id} />
    </Content>
  );
};

const Comments: React.FC<{ articleId: string }> = ({ articleId }) => {
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
              player={articleComment.player}
            />
          );
        })
      ) : (
        <NotFound>コメントがありません。</NotFound>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleId = params?.articleId as string;
  const data: ArticleQuery = await fetchGraphql(ArticleDocument, { articleId });

  return {
    props: { article: data.article },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ArticlePathsQuery = await fetchGraphql(ArticlePathsDocument);

  const paths = data.allArticles.map(article => ({
    params: {
      articleId: article.id,
    },
  }));

  return { paths, fallback: 'blocking' };
};

export default Page;
