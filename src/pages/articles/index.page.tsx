import React from 'react';

import { Box, Button, Grid } from '@mui/material';
import { GetStaticProps } from 'next';
import { useSetRecoilState } from 'recoil';

import { Content, Breadcrumbs, Head, ArticleCard } from '@/components';
import { ArticlesPageDocument, ArticlesPageQuery, useArticleCardsQuery } from '@/generated/graphql';
import { fetchGraphql, handleApolloError, loadingState } from '@/lib';

const Page: React.FC<ArticlesPageQuery> = ssrData => {
  const { data, loading, fetchMore } = useArticleCardsQuery({ onError: handleApolloError });
  const setLoading = useSetRecoilState(loadingState);
  setLoading(loading);

  const articles = data ? data.articles.edges.map(e => e.node) : ssrData.articles.nodes;
  const pageInfo = data?.articles.pageInfo;

  return (
    <Content activeTab="articles" title="記事一覧" breadcrumb={<Breadcrumbs to="articles" />}>
      <Head title="鉄拳7の記事一覧" />

      <Grid container spacing={2}>
        {articles.map(article => (
          <Grid item key={article.id} xs={12} sm={6} md={4}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>

      {pageInfo?.hasNextPage && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => {
              fetchMore({ variables: { after: pageInfo.endCursor } });
            }}
          >
            もっとみる
          </Button>
        </Box>
      )}
    </Content>
  );
};

export const getStaticProps: GetStaticProps<ArticlesPageQuery> = async () => {
  const data: ArticlesPageQuery = await fetchGraphql(ArticlesPageDocument, { page: 1 });

  return { props: data, revalidate: 300 };
};

export default Page;
