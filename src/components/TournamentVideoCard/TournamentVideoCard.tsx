import React from 'react';
import { TournamentVideoCardFragment } from '@/lib/graphql/types';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { path } from '@/lib';
import { Link } from '../Link';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

interface Props {
  tournamentVideo: TournamentVideoCardFragment;
}

export const TournamentVideoCard: React.FC<Props> = ({ tournamentVideo }) => {
  const classes = useStyles();

  const href = path({ to: 'tournamentVideo', tournamentVideoId: tournamentVideo.id });

  return (
    <Card>
      <CardActionArea href={href} component={Link} color="inherit">
        <CardMedia image={tournamentVideo.thumbnailUrl} className={classes.media} />

        <CardContent>
          <Typography variant="h6">{tournamentVideo.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
