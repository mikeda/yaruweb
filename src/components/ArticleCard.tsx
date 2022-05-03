import React from 'react';

import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';

import { dayjs, ArticleCardFragment, NO_IMAGE_URL, pagesPath, resolveUrlObject } from '@/lib';

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
  const router = useRouter();

  return (
    <Card>
      <CardActionArea href={resolveUrlObject(router, pagesPath.articles._id(article.id).$url())}>
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
