import React from 'react';
import { DashboardTournamentRankingCardFragment } from '@/lib/graphql/types';
import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { NO_IMAGE_URL } from '@/lib/Assets';

const useStyles = makeStyles({
  media: {
    height: 160,
    width: 160,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});

interface Props {
  tournamentRanking: DashboardTournamentRankingCardFragment;
  onDelete: () => void;
}

export const DashboardTournamentRankingCard: React.FC<Props> = ({ tournamentRanking, onDelete }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia image={tournamentRanking.player.avatarUrl || NO_IMAGE_URL} className={classes.media} />

      <CardContent>
        <Typography variant="h6">{tournamentRanking.place}</Typography>
        <Typography variant="h6">{tournamentRanking.player.name}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton color="default" onClick={onDelete} className={classes.deleteButton}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
