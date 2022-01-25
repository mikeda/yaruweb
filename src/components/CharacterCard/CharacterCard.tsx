import React from 'react';
import { CharacterCardFragment } from '@/lib/graphql/types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
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
import { Public, YouTube, SportsKabaddi } from '@mui/icons-material';
import { colors } from '@/colors';
import { pagesPath } from '@/lib/$path';
import { format } from 'url';

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
  dashboard?: boolean;
}

export const CharacterCard: React.FC<Props> = ({ character, dashboard = false }) => {
  const classes = useStyles();

  const href = dashboard
    ? pagesPath.dashboard.characters._characterSlug(character.slug).edit.$url()
    : pagesPath.characters._character(character.slug).$url();

  return (
    <Card>
      <CardActionArea className={classes.root} href={href} component={Link} color="inherit">
        <CardMedia image={character.faceImageUrl} className={classes.media} />

        <CardContent className={classes.content}>
          <Typography variant="h4">{character.name}</Typography>

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

            <ListItem disableGutters>
              <ListItemIcon className={classes.listItemIcon}>
                <YouTube fontSize="small" style={{ fill: colors.youtube }} />
              </ListItemIcon>
              <ListItemText primary={`対戦動画 ${character.battlesCount}`} className={classes.listItemText} />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>

      {dashboard && (
        <CardActions disableSpacing>
          <Button
            color="primary"
            href={format(pagesPath.dashboard.characters._characterSlug(character.slug).move_categories.$url())}
            component={Link}
          >
            コマンドリスト
          </Button>

          <Button
            color="primary"
            href={format(pagesPath.dashboard.characters._characterSlug(character.slug).combo_categories.$url())}
            component={Link}
          >
            コンボ
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
