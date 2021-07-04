import React from 'react';

import { ArticleCards } from '@/components/ArticleCards';
import { StaffRequirement } from '@/components/StaffRequirement';
import { Article } from '@/components/ArticleCard';

import { useArticlesQuery } from '@/lib/graphql/types';
import { IntroSlides } from './IntroSlides';
import { Heading } from '@/components/Heading';
import { Head } from '@/components/layouts/Head';
import { Content } from '@/components/layouts/Content';

const Page: React.FC = () => {
  const { data: newArticlesData } = useArticlesQuery({ variables: { page: 1, per: 3 } });
  const newArticles = newArticlesData?.articles.records;

  return (
    <Content activeTab="top">
      <Head title="鉄拳やろうよ.com" description="鉄拳やろうよ.comは格闘ゲーム「鉄拳7」を楽しむためのサイトです。" />

      <div className="bl_sectionUnit">
        <div className="bl_section">
          <IntroSlides />
        </div>

        <div className="bl_section">
          <Heading lv="h2">新着記事</Heading>

          {newArticles && <ArticleCards articles={newArticles.filter(a => a) as Article[]} readMoreLink="/articles" />}
        </div>

        <div className="bl_section">
          <StaffRequirement />
        </div>
      </div>
    </Content>
  );
};

export default Page;
