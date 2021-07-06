import React from 'react';
import Link from 'next/link';

import { ArticleCard } from './ArticleCard';
import { Box, Grid, Link as MuiLink, Typography } from '@material-ui/core';
import { ArticleCardFragment } from '@/lib/graphql/types';

type Props = {
  articles: ArticleCardFragment[];
  readMoreLink?: string;
};

export const ArticleCards: React.FC<Props> = ({ articles, readMoreLink }) => {
  return (
    <>
      <Grid container spacing={2}>
        {articles.map(article => (
          <Grid item key={article.id} xs={12} sm={6} md={4}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>

      {readMoreLink && (
        <Box textAlign="center" m={2}>
          <Link href={readMoreLink}>
            <MuiLink>
              <Typography>もっとみる</Typography>
            </MuiLink>
          </Link>
        </Box>
      )}
    </>
  );
};
