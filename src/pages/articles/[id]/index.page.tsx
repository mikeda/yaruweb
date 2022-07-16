import React from 'react';

import { ParsedUrlQuery } from 'querystring';

import { Avatar, Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ArticleBody, ArticleCard, Breadcrumbs, Content, Head } from '@/components';
import {
  ArticlePageArticleDocument,
  ArticlePageArticleQuery,
  ArticlePathsDocument,
  ArticlePathsQuery,
} from '@/generated/graphql';
import { dayjs, fetchGraphql, NO_IMAGE_URL } from '@/lib';

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
      </Box>

      <ArticleBody content={article.content} />

      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          関連記事
        </Typography>

        <Grid container spacing={2}>
          {article.relatedArticles.map(article => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
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
