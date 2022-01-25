import React from 'react';
import url from 'url';

import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import dayjs from '@/lib/dayjs';
import { ArticleCardFragment } from '@/lib/graphql/types';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { pagesPath } from '@/lib/$path';

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

type Props = {
  article: ArticleCardFragment;
};

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea href={url.format(pagesPath.articles._articleId(article.id).$url())}>
        <CardMedia className={classes.media} image={article.mainImageUrl || NO_IMAGE_URL} title={article.title} />
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography variant="h6">{article.title}</Typography>
        </CardContent>
        <CardHeader
          avatar={<Avatar src={article.author.avatarUrl} />}
          title={article.author.name}
          subheader={article.publishedAt && dayjs(article.publishedAt).format('YYYY/M/D H:mm')}
        />
      </CardActionArea>
    </Card>
  );
};
