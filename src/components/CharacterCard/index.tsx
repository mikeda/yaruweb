import React from 'react';

import PublicIcon from '@mui/icons-material/Public';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import YouTubeIcon from '@mui/icons-material/YouTube';
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

import { Link } from '@/components';
import { pagesPath } from '@/generated/$path';
import { CharacterCardFragment } from '@/generated/graphql';
import { colors } from '@/lib';

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
  character: CharacterCardFragment;
}

export const CharacterCard: React.FC<Props> = ({ character }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea
        className={classes.root}
        href={pagesPath.characters._slug(character.slug).$url()}
        component={Link}
        color='inherit'
      >
        <CardMedia image={character.faceImageUrl} className={classes.media} />

        <CardContent className={classes.content}>
          <Typography variant='h4'>{character.name}</Typography>

          <List disablePadding dense>
            <ListItem disableGutters>
              <ListItemIcon className={classes.listItemIcon}>
                <PublicIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={character.country} className={classes.listItemText} />
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon className={classes.listItemIcon}>
                <SportsKabaddiIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={character.fightingStyle} className={classes.listItemText} />
            </ListItem>

            <ListItem disableGutters>
              <ListItemIcon className={classes.listItemIcon}>
                <YouTubeIcon fontSize='small' style={{ fill: colors.youtube }} />
              </ListItemIcon>
              <ListItemText primary={`対戦動画 ${character.battlesCount}`} className={classes.listItemText} />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
