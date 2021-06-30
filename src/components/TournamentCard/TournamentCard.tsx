import React from 'react';
import { TournamentCardFragment } from '@/lib/graphql/types';
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
import { NO_IMAGE_URL } from '@/lib/Assets';

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
  tournament: TournamentCardFragment;
  onDelete?: () => void;
}

export const TournamentCard: React.FC<Props> = ({ tournament, onDelete }) => {
  const classes = useStyles();

  const href = dashboardPath({ to: 'tournamentEdit', tournamentId: tournament.id });

  return (
    <Card>
      <CardActionArea className={classes.root} href={href} component={Link} color="inherit">
        <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent className={classes.details}>
          <Typography variant="h6">{tournament.name}</Typography>
          <Typography variant="caption" component="p">
            {tournament.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      {dashboard && (
        <CardActions disableSpacing>
          <Button
            color="primary"
            href={dashboardPath({ to: 'moveCategories', tournamentId: tournament.id })}
            component={Link}
          >
            コマンドリスト
          </Button>
          <Button
            color="primary"
            href={dashboardPath({ to: 'comboCategories', tournamentId: tournament.id })}
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
