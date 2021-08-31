import React from 'react';
import { TournamentCardFragment } from '@/lib/graphql/types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { path } from '@/lib';
import { Link } from '../Link';
import { NO_IMAGE_URL } from '@/lib/Assets';
import dayjs from '@/lib/dayjs';
import { EmojiEvents, Schedule, YouTube } from '@material-ui/icons';
import { colors } from '@/colors';

const useStyles = makeStyles({
  media: {
    height: 160,
  },
  listItemIcon: {
    minWidth: 32,
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
        </CardContent>

        <List disablePadding dense>
          <ListItem>
            <ListItemIcon className={classes.listItemIcon}>
              <Schedule />
            </ListItemIcon>
            <ListItemText primary={dayjs(tournament.startsAt).format('YYYY/M/D H:mm')} />
          </ListItem>

          {tournament.standings.length > 0 && (
            <ListItem>
              <ListItemIcon className={classes.listItemIcon}>
                <EmojiEvents style={{ fill: colors.trophy }} />
              </ListItemIcon>
              <ListItemText
                primary={tournament.standings
                  .filter(r => r.place === 1)
                  .map(r => r.player.name)
                  .join('、')}
              />
            </ListItem>
          )}

          {tournament.videosCount > 0 && (
            <ListItem>
              <ListItemIcon className={classes.listItemIcon}>
                <YouTube style={{ fill: colors.youtube }} />
              </ListItemIcon>
              <ListItemText primary="動画あり" />
            </ListItem>
          )}
        </List>
      </CardActionArea>
    </Card>
  );
};
