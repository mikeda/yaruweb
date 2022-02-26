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
  Typography,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { Link } from '../Link';
import { NO_IMAGE_URL } from '@/lib/Assets';
import dayjs from '@/lib/dayjs';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { colors } from '@/colors';
import { pagesPath } from '@/lib/$path';

const useStyles = makeStyles({
  media: {
    height: 160,
  },
  listItemIcon: {
    minWidth: 32,
  },
  listItemText: {
    margin: 0,
  },
});

interface Props {
  tournament: TournamentCardFragment;
}

export const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles();

  const href = pagesPath.tournaments._id(tournament.id).$url();

  return (
    <Card>
      <CardActionArea href={href} component={Link} color="inherit">
        <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent>
          <Typography variant="h4">{tournament.name}</Typography>

          <List disablePadding dense>
            <ListItem disableGutters>
              <ListItemIcon className={classes.listItemIcon}>
                <ScheduleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}
                className={classes.listItemText}
              />
            </ListItem>

            {tournament.standings.length > 0 && (
              <ListItem disableGutters>
                <ListItemIcon className={classes.listItemIcon}>
                  <EmojiEventsIcon fontSize="small" style={{ fill: colors.trophy }} />
                </ListItemIcon>
                <ListItemText
                  primary={tournament.standings
                    .filter(r => r.place === 1)
                    .map(r => r.player.name)
                    .join('、')}
                  className={classes.listItemText}
                />
              </ListItem>
            )}

            {tournament.videosCount > 0 && (
              <ListItem disableGutters>
                <ListItemIcon className={classes.listItemIcon}>
                  <YouTubeIcon fontSize="small" style={{ fill: colors.youtube }} />
                </ListItemIcon>
                <ListItemText primary="動画あり" className={classes.listItemText} />
              </ListItem>
            )}
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
