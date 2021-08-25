import React from 'react';
import { StandingCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { NO_IMAGE_URL } from '@/lib/Assets';
import theme from '@/theme';
import { StandingPlaceAvatar } from '../StandingPlaceAvatar';
import { path } from '@/lib';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginLeft: theme.spacing(2),
  },
});

interface Props {
  standing: StandingCardFragment;
}

export const StandingCard: React.FC<Props> = ({ standing }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea className={classes.root} href={path({ to: 'player', playerSlug: standing.player.slug })}>
        <CardMedia image={standing.player.avatarUrl || NO_IMAGE_URL} className={classes.media} />

        <div className={classes.details}>
          <div className={classes.title}>
            <StandingPlaceAvatar place={standing.place} />
            <Typography variant="h4" className={classes.name}>
              {standing.player.name}
            </Typography>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};
