import React from 'react';

import { ArticleCards } from '@/components/ArticleCards';
import { StaffRequirement } from '@/components/StaffRequirement';
import { Article } from '@/components/ArticleCard';

import { useArticlesQuery } from '@/lib/graphql/types';
import { IntroSlides } from '@/pages-lib/index/IntroSlides';
import { Heading } from '@/components/Heading';

const Page: React.FC = () => {
  const { data: newArticlesData } = useArticlesQuery({ variables: { first: 3 } });
  const newArticles = newArticlesData?.articles.nodes;

  return (
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
  );
};

export default Page;
