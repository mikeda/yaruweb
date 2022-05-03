import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Box, Button, Grid } from '@mui/material';

import {
  ArticlesPageArticlesDocument,
  ArticlesPageArticlesQuery,
  useArticlesPageArticlesLazyQuery,
} from '@/lib/$types';
import { fetchGraphql } from '@/lib/fetchGraphql';
import { loadingState } from '@/lib/states/loadingState';

import { Content, Breadcrumbs, Head, ArticleCard } from '@/components';

const Page: React.FC<ArticlesPageArticlesQuery> = ({ articles: { records: initArticles, paging: initPaging } }) => {
  const [state, setState] = useState({
    articles: initArticles,
    paging: initPaging,
  });
  const [fetch] = useArticlesPageArticlesLazyQuery({
    onCompleted: data => {
      setState(prev => ({
        articles: [...prev.articles, ...data.articles.records],
        paging: data.articles.paging,
      }));
      setLoading(false);
    },
    onError: e => {
      toast.error(e.message);
      setLoading(false);
    },
    fetchPolicy: 'network-only',
  });
  const setLoading = useSetRecoilState(loadingState);

  const { articles, paging } = state;

  const fetchMore = () => {
    if (!paging.hasNext) return;

    setLoading(true);
    fetch({ variables: { page: paging.currentPage + 1 } });
  };

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

      {paging.hasNext && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button variant="outlined" onClick={fetchMore}>
            もっとみる
          </Button>
        </Box>
      )}
    </Content>
  );
};

export const getStaticProps: GetStaticProps<ArticlesPageArticlesQuery> = async () => {
  const data: ArticlesPageArticlesQuery = await fetchGraphql(ArticlesPageArticlesDocument, { page: 1 });

  return { props: data, revalidate: 300 };
};

export default Page;
