import React from 'react';
import { PlayerCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { path } from '@/lib';
import { NO_IMAGE_URL } from '@/lib/Assets';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    width: 100,
    height: 100,
  },
  content: {
    flexGrow: 1,
  },
});

interface Props {
  player: PlayerCardFragment;
}

export const PlayerCard: React.FC<Props> = ({ player }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea href={path({ to: 'player', playerSlug: player.slug })} className={classes.root}>
        <CardMedia image={player.avatarUrl || NO_IMAGE_URL} className={classes.media} />
        <CardContent className={classes.content}>
          <Typography variant="h6">{player.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
