import React from 'react';
import { DashboardTournamentCardFragment, useDeleteTournamentMutation } from '@/lib/graphql/types';
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

import { dashboardPath } from '@/lib';
import { Link } from '../Link';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';

const useStyles = makeStyles({
  root: {},
  media: {
    height: 160,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});

interface Props {
  tournament: DashboardTournamentCardFragment;
  onDelete: () => void;
}

export const DashboardTournamentCard: React.FC<Props> = ({ tournament, onDelete }) => {
  const classes = useStyles();
  const setLoading = useSetRecoilState(loadingState);
  const [deleteTournament, { loading: deleteLoading }] = useDeleteTournamentMutation({
    variables: { tournamentId: tournament.id },
    onCompleted: data => {
      const tournament = data.deleteTournament?.tournament;
      if (!tournament) return;
      toast.success('大会情報を削除しました。');
      onDelete();
    },
  });

  setLoading(deleteLoading);

  const href = dashboardPath({ to: 'tournamentEdit', tournamentId: tournament.id });

  return (
    <Card>
      <CardActionArea className={classes.root} href={href} component={Link} color="inherit">
        <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent>
          <Typography variant="h6">{tournament.name}</Typography>
          <Typography variant="caption" component="p">
            {tournament.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <Button
          color="primary"
          href={dashboardPath({ to: 'tournamentVideos', tournamentId: tournament.id })}
          component={Link}
        >
          {`動画(${tournament.videosCount})`}
        </Button>

        <IconButton color="default" onClick={() => deleteTournament()} className={classes.deleteButton}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
