import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { Link } from '@/components';
import { path } from '@/lib';
import { NO_IMAGE_URL, placeIconUrl } from '@/lib/Assets';
import dayjs from '@/lib/dayjs';
import { PlayerPageRankingFragment } from '@/lib/graphql/types';
import theme from '@/theme';

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
  ranking: PlayerPageRankingFragment;
}

export const RankingCard: React.FC<Props> = ({ ranking }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea
        href={path({ to: 'tournament', tournamentId: ranking.tournament.id })}
        component={Link}
        color="inherit"
      >
        <CardMedia image={ranking.tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent className={classes.content}>
          <img src={placeIconUrl(ranking.place)} width={38} height={44} />
          <div className={classes.title}>
            <Typography variant="h6">{ranking.tournament.name}</Typography>
            <Typography variant="caption" component="p">
              {dayjs(ranking.tournament.startsAt).format('YYYY/M/D')}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
