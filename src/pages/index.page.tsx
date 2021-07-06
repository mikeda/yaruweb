import React from 'react';
import { GetStaticProps } from 'next';

import { ArticleCards } from '@/components/ArticleCards';
import { StaffRequirement } from '@/components/StaffRequirement';

import { ArticleCardFragment, TopPageDocument, TopPageQuery } from '@/lib/graphql/types';
import { IntroSlides } from './IntroSlides';
import { Heading, Head, Content } from '@/components';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';

interface Props {
  newArticles: ArticleCardFragment[];
}

const Page: React.FC<Props> = ({ newArticles }) => {
  return (
    <Content activeTab="top">
      <Head title="鉄拳やろうよ.com" description="鉄拳やろうよ.comは格闘ゲーム「鉄拳7」を楽しむためのサイトです。" />

      <div className="bl_sectionUnit">
        <div className="bl_section">
          <IntroSlides />
        </div>

        <div className="bl_section">
          <Heading lv="h2">新着記事</Heading>

          {newArticles && <ArticleCards articles={newArticles} readMoreLink="/articles" />}
        </div>

        <div className="bl_section">
          <StaffRequirement />
        </div>
      </div>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data: TopPageQuery = await fetchGraphql(TopPageDocument);

  return { props: { newArticles: data.articles.records }, revalidate: 300 };
};

export default Page;
