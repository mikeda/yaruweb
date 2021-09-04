import React from 'react';
import { CharacterPageProfileFragment } from '@/lib/graphql/types';
import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { Public, SportsKabaddi } from '@material-ui/icons';

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
  character: CharacterPageProfileFragment;
}

export const Profile: React.FC<Props> = ({ character }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia image={character.faceImageUrl} className={classes.media} />

      <CardContent className={classes.content}>
        <Typography variant="h2">{character.longName}</Typography>

        <List disablePadding dense>
          <ListItem disableGutters>
            <ListItemIcon className={classes.listItemIcon}>
              <Public fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={character.country} className={classes.listItemText} />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon className={classes.listItemIcon}>
              <SportsKabaddi fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={character.fightingStyle} className={classes.listItemText} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
