import React from 'react';
import { path } from '@/lib';

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import dayjs from '@/lib/dayjs';

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea href={path({ to: 'article', articleId: article.id })}>
        <CardMedia className={classes.media} image={article.mainImageUrl} title={article.title} />
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography variant="h6">{article.title}</Typography>
        </CardContent>
        <CardHeader
          avatar={<Avatar src={article.author.avatarUrl} />}
          title={article.author.name}
          subheader={dayjs(article.publishedAt).format('YYYY/M/D  H:mm')}
        />
      </CardActionArea>
    </Card>
  );
};

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
