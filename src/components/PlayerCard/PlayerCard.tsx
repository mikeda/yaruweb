import React from 'react';
import { PlayerCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { path } from '@/lib';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { EmojiEvents, YouTube } from '@material-ui/icons';

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
  detail: {
    display: 'flex',
    alignItems: 'center',
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
          <Typography variant="h6" gutterBottom>
            {player.name}
          </Typography>

          <Typography variant="caption" className={classes.detail}>
            <EmojiEvents fontSize="small" color="inherit" />
            大会戦績 {player.winningsCount}
          </Typography>

          <Typography variant="caption" className={classes.detail}>
            <YouTube fontSize="small" />
            対戦動画 {player.battlesCount}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
