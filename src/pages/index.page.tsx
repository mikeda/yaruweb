import React from 'react';
import { GetStaticProps } from 'next';

import { ArticleCards } from '@/components/ArticleCards';
import { StaffRequirement } from '@/components/StaffRequirement';

import { ArticleCardFragment, TopPageDocument, TopPageQuery } from '@/lib/graphql/types';
import { IntroSlides } from './IntroSlides';
import { Head, Content } from '@/components';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { Box, Typography } from '@material-ui/core';

interface Props {
  newArticles: ArticleCardFragment[];
}

const Page: React.FC<Props> = ({ newArticles }) => {
  return (
    <Content activeTab="top">
      <Head title="鉄拳やろうよ.com" description="鉄拳やろうよ.comは格闘ゲーム「鉄拳7」を楽しむためのサイトです。" />

      <Box>
        <IntroSlides />
      </Box>

      <Box mt={4}>
        <Typography variant="h2">新着記事</Typography>
        <Box mt={2}>{newArticles && <ArticleCards articles={newArticles} readMoreLink="/articles" />}</Box>
      </Box>

      <Box mt={4}>
        <StaffRequirement />
      </Box>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data: TopPageQuery = await fetchGraphql(TopPageDocument);

  return { props: { newArticles: data.articles.records }, revalidate: 300 };
};

export default Page;
