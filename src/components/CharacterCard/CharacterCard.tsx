import React from 'react';
import { CharacterCardFragment } from '@/lib/graphql/types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { path, dashboardPath } from '@/lib';
import { Link } from '../Link';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  media: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});

interface Props {
  character: CharacterCardFragment;
  dashboard?: boolean;
  onDelete?: () => void;
}

export const CharacterCard: React.FC<Props> = ({ character, dashboard = false, onDelete }) => {
  const classes = useStyles();

  const href = dashboard
    ? dashboardPath({ to: 'characterEdit', characterSlug: character.slug })
    : path({ to: 'character', characterSlug: character.slug });

  return (
    <Card>
      <CardActionArea className={classes.root} href={href} component={Link} color="inherit">
        <CardMedia image={character.faceImageUrl} className={classes.media} />

        <CardContent className={classes.details}>
          <Typography variant="h6">{character.longName}</Typography>
          <Typography variant="caption" component="p">
            {character.country}
          </Typography>
          <Typography variant="caption" component="p">
            {character.fightingStyle}
          </Typography>
        </CardContent>
      </CardActionArea>

      {dashboard && (
        <CardActions disableSpacing>
          <Button
            color="primary"
            href={dashboardPath({ to: 'moveCategories', characterSlug: character.slug })}
            component={Link}
          >
            コマンドリスト
          </Button>
          <Button
            color="primary"
            href={dashboardPath({ to: 'comboCategories', characterSlug: character.slug })}
            component={Link}
          >
            コンボ
          </Button>

          <IconButton color="default" onClick={() => {}} className={classes.deleteButton}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
