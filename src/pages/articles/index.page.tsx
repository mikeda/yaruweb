import React from 'react';
import { GetServerSideProps } from 'next';
import { Grid } from '@material-ui/core';

import { ArticlesPageDocument, ArticlesPageQuery, Order } from '@/lib/graphql/types';
import { Content, Breadcrumbs, Head, Paging, ArticleCard, TabLinkGroup, TabLink } from '@/components';
import { path } from '@/lib';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  data: ArticlesPageQuery;
  order: Order;
}

const Page: React.FC<Props> = ({
  data: {
    articles: { records: articles, paging },
  },
  order,
}) => {
  const url = (page: number) => path({ to: 'articles', params: { page, order } });

  return (
    <Content activeTab="articles" title="記事一覧" breadcrumb={<Breadcrumbs to="articles" />}>
      <Head title="鉄拳7の記事一覧" />
      <TabLinkGroup>
        <TabLink text="新着" href={path({ to: 'articles' })} active={order === Order.New} />
        <TabLink
          text="人気"
          href={path({ to: 'articles', params: { order: Order.Popular } })}
          active={order === Order.Popular}
        />
      </TabLinkGroup>

      <Grid container spacing={2}>
        {articles.map(article => (
          <Grid item key={article.id} xs={12} sm={6} md={4}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>

      <Paging paging={paging} url={url} />
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const page = query?.page ? Number(query.page) : 1;
  const order = query.order === 'popular' ? Order.Popular : Order.New;
  const data: ArticlesPageQuery = await fetchGraphql(ArticlesPageDocument, { page, order });

  return {
    props: { data, order },
  };
};

export default Page;
