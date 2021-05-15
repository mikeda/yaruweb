import React from 'react';
import { ArticleFragment } from '@/lib/graphql/types';

import styles from './ArticleDetail.module.scss';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { Heading } from '@/components/Heading';
import { ArticleAuthor } from '@/components/ArticleAuthor';
import { FavButton } from '@/components/FavButton';
import { ArticleBody } from '@/components/ArticleBody';

interface Props {
  article: ArticleFragment;
}

export const ArticleDetail: React.FC<Props> = ({ article }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <img src={article.mainImageUrl || NO_IMAGE_URL} />
      </div>

      <div className={styles.heading}>
        <Heading lv="h1">{article.title}</Heading>
      </div>

      <ArticleAuthor
        name={article.author.name}
        avatarUrl={article.author.avatarUrl}
        publishedAt={article.publishedAt}
      />

      <FavButton articleId={article.id} faved={article.faved} favsCount={article.favsCount} />

      <ArticleBody content={article.content} />
    </div>
  );
};
