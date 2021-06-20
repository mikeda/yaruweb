import { path } from '@/lib';
import React from 'react';

import { ArticleAuthor } from '../ArticleAuthor';
import { Card } from '../Card';

export interface Article {
  id: string;
  title: string;
  mainImageUrl: string;
  publishedAt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
}

type Props = {
  article: Article;
};

export const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Card title={article.title} imageUrl={article.mainImageUrl} href={path({ to: 'article', articleId: article.id })}>
      <ArticleAuthor
        name={article.author.name}
        avatarUrl={article.author.avatarUrl}
        publishedAt={article.publishedAt}
      />
    </Card>
  );
};
