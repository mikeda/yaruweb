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
import { ArticleAuthor } from '@/components/ArticleAuthor';
import { FavButton } from '@/components/FavButton';
import { Comment } from '@/components/Comment';
import { CommentForm } from '@/components/CommentForm';
import { NotFound } from '@/components/NotFound';
import { Heading } from '@/components/Heading';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { ArticleBody } from '@/components/ArticleBody';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { Content } from '@/components/layouts/Content';

interface Props {
  article: ArticleFragment;
}

const Page: React.FC<Props> = ({ article }) => {
  return (
    <Content>
      <Head title={article.title} description={article.description} image={article.mainImageUrl} />

      <div className="bl_article">
        <div className="bl_article_mainImage">
          <img src={article.mainImageUrl || NO_IMAGE_URL} />
        </div>

        <Heading lv="h1">{article.title}</Heading>

        <ArticleAuthor
          name={article.author.name}
          avatarUrl={article.author.avatarUrl}
          publishedAt={article.publishedAt}
        />

        <FavButton articleId={article.id} faved={article.faved} favsCount={article.favsCount} />

        <ArticleBody content={article.content} />
      </div>

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
        onSubmit={message => {
          createArticleComment({ variables: { articleId: articleId, attributes: { message } } });
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
  const id = params?.id as string;
  const data: ArticleQuery = await fetchGraphql(ArticleDocument, { id });

  return {
    props: { article: data.article },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ArticlePathsQuery = await fetchGraphql(ArticlePathsDocument);

  const paths = data.allArticles.map(article => ({
    params: {
      id: article.id,
    },
  }));

  return { paths, fallback: 'blocking' };
};

export default Page;
