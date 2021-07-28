import React from 'react';
import { OrganizerCardFragment } from '@/lib/graphql/types';
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
  organizer: OrganizerCardFragment;
}

export const OrganizerCard: React.FC<Props> = ({ organizer }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea href={path({ to: 'organizer', organizerSlug: organizer.slug })} className={classes.root}>
        <CardMedia image={organizer.avatarUrl || NO_IMAGE_URL} className={classes.media} />
        <CardContent className={classes.content}>
          <Typography variant="h6">{organizer.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
