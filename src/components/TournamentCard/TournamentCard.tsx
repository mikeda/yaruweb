import React from 'react';
import { TournamentCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { path } from '@/lib';
import { Link } from '../Link';
import { NO_IMAGE_URL } from '@/lib/Assets';
import dayjs from '@/lib/dayjs';

const useStyles = makeStyles({
  media: {
    height: 160,
  },
});

interface Props {
  tournament: TournamentCardFragment;
}

export const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles();

  const href = path({ to: 'tournament', tournamentId: tournament.id });

  return (
    <Card>
      <CardActionArea href={href} component={Link} color="inherit">
        <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent>
          <Typography variant="h6">{tournament.name}</Typography>
          <Typography variant="caption" component="p">
            {dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
