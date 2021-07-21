import React from 'react';
import { TournamentRankingCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { NO_IMAGE_URL } from '@/lib/Assets';
import theme from '@/theme';
import { RankingPlaceAvatar } from '../RankingPlaceAvatar';
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
  tournamentRanking: TournamentRankingCardFragment;
}

export const TournamentRankingCard: React.FC<Props> = ({ tournamentRanking }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea className={classes.root} href={path({ to: 'player', playerSlug: tournamentRanking.player.slug })}>
        <CardMedia image={tournamentRanking.player.avatarUrl || NO_IMAGE_URL} className={classes.media} />

        <div className={classes.details}>
          <div className={classes.title}>
            <RankingPlaceAvatar place={tournamentRanking.place} />
            <Typography variant="h4" className={classes.name}>
              {tournamentRanking.player.name}
            </Typography>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};
