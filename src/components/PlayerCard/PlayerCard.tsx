import React from 'react';
import { useRouter } from 'next/router';
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
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import makeStyles from '@mui/styles/makeStyles';

import { PlayerCardFragment, NO_IMAGE_URL, colors, pagesPath, resolveUrlObject } from '@/lib';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    width: 96,
    height: 96,
  },
  content: {
    flexGrow: 1,
  },
  listItemIcon: {
    minWidth: 32,
  },
  listItemText: {
    margin: 0,
  },
});

interface Props {
  player: PlayerCardFragment;
}

export const PlayerCard: React.FC<Props> = ({ player }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card>
      <CardActionArea
        href={resolveUrlObject(router, pagesPath.players._slug(player.slug).$url())}
        className={classes.root}
      >
        <CardMedia image={player.avatarUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent className={classes.content}>
          <Typography variant="h4" gutterBottom>
            {player.name}
          </Typography>

          <List disablePadding dense>
            <ListItem disableGutters>
              <ListItemIcon className={classes.listItemIcon}>
                <EmojiEventsIcon fontSize="small" style={{ fill: colors.trophy }} />
              </ListItemIcon>
              <ListItemText primary={`大会戦績 ${player.standingsCount}`} className={classes.listItemText} />
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon className={classes.listItemIcon}>
                <YouTubeIcon fontSize="small" style={{ fill: colors.youtube }} />
              </ListItemIcon>
              <ListItemText primary={`対戦動画 ${player.battlesCount}`} className={classes.listItemText} />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
