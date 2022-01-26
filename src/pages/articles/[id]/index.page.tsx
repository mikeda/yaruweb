import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  ArticlePageArticleDocument,
  ArticlePageArticleQuery,
  ArticlePathsDocument,
  ArticlePathsQuery,
} from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Content } from '@/components/layouts/Content';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { Avatar, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import dayjs from '@/lib/dayjs';
import { ArticleBody, FavButton } from '@/components';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { ParsedUrlQuery } from 'querystring';

const useStyles = makeStyles({
  mainImage: {
    width: '100%',
    height: 'auto',
    verticalAlign: 'top',
  },
});

const Page: React.FC<ArticlePageArticleQuery> = ({ article }) => {
  const classes = useStyles();

  return (
    <Content activeTab="articles" title={article.title} breadcrumb={<Breadcrumbs to="article" article={article} />}>
      <Head title={article.title} description={article.description} image={article.mainImageUrl} />

      <Box mb={2}>
        <img className={classes.mainImage} src={article.mainImageUrl || NO_IMAGE_URL} />
      </Box>

      <Box mb={2} display="flex" flexDirection="row">
        <Avatar alt={article.author.name} src={article.author.avatarUrl} />
        <Box ml={2} flexGrow={1}>
          <Typography variant="h6">{article.author.name}</Typography>
          {article.publishedAt && (
            <Typography variant="caption">{dayjs(article.publishedAt).format('YYYY/M/D H:mm')}</Typography>
          )}
        </Box>
        <FavButton articleId={article.id} favsCount={article.favsCount} />
      </Box>

      <ArticleBody content={article.content} />
    </Content>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<ArticlePageArticleQuery, Params> = async ({ params }) => {
  const articleId = params?.id;
  const data: ArticlePageArticleQuery = await fetchGraphql(ArticlePageArticleDocument, { articleId });

  return {
    props: data,
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: ArticlePathsQuery = await fetchGraphql(ArticlePathsDocument);

  const paths = data.allArticles.map(({ id }) => ({ params: { id } }));

  return { paths, fallback: 'blocking' };
};

export default Page;
