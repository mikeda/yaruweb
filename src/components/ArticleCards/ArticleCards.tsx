import React from 'react';
import Link from 'next/link';

import { ArticleCard, Article } from '../ArticleCard';
import { path } from '@/lib';

type Props = {
  articles: Article[];
  readMoreLink?: string;
};

export const ArticleCards: React.FC<Props> = ({ articles, readMoreLink }) => (
  <>
    <div className="ly_row ly_row__mg_md">
      {articles.map(article => {
        return (
          <div key={article.id} className="ly_col_4 ly_smCol_12">
            <ArticleCard article={article} />
          </div>
        );
      })}
    </div>

    {readMoreLink && (
      <div className="bl_section_footer">
        <Link href={path({ to: 'articles' })}>
          <a className="el_readmore">もっとみる</a>
        </Link>
      </div>
    )}
  </>
);
