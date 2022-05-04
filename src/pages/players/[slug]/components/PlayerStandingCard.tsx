import React from 'react';

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { Link } from '@/components';
import { pagesPath } from '@/generated/$path';
import { PlayerStandingCardFragment } from '@/generated/graphql';
import { NO_IMAGE_URL, placeIconUrl, theme, dayjs } from '@/lib';

const useStyles = makeStyles({
  media: {
    height: 160,
  },
  content: {
    display: 'flex',
  },
  title: {
    marginLeft: theme.spacing(1),
  },
});

interface Props {
  standing: PlayerStandingCardFragment;
}

export const PlayerStandingCard: React.FC<Props> = ({ standing }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea href={pagesPath.tournaments._id(standing.tournament.id).$url()} component={Link} color="inherit">
        <CardMedia image={standing.tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent className={classes.content}>
          <img src={placeIconUrl(standing.place)} width={38} height={44} />
          <div className={classes.title}>
            <Typography variant="h6">{standing.tournament.name}</Typography>
            <Typography variant="caption" component="p">
              {dayjs(standing.tournament.startsAt).format('YYYY/M/D')}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
