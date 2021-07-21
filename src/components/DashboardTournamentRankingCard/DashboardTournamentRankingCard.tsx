import React from 'react';
import { DashboardTournamentRankingCardFragment } from '@/lib/graphql/types';
import { Card, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { NO_IMAGE_URL } from '@/lib/Assets';
import theme from '@/theme';
import { RankingPlaceAvatar } from '../RankingPlaceAvatar';

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
  first: {
    backgroundColor: '#D6AF36',
  },
  second: {
    backgroundColor: '#A7A7AD',
  },
  third: {
    backgroundColor: '#824A02',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

interface Props {
  tournamentRanking: DashboardTournamentRankingCardFragment;
  onDelete: () => void;
}

export const DashboardTournamentRankingCard: React.FC<Props> = ({ tournamentRanking, onDelete }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia image={tournamentRanking.player.avatarUrl || NO_IMAGE_URL} className={classes.media} />

      <div className={classes.details}>
        <div className={classes.title}>
          <RankingPlaceAvatar place={tournamentRanking.place} />
          <Typography variant="h4" className={classes.name}>
            {tournamentRanking.player.name}
          </Typography>
        </div>

        <div className={classes.actions}>
          <IconButton color="default" onClick={onDelete}>
            <Delete />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
