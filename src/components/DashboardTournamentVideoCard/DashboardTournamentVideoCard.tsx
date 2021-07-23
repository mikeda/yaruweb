import React from 'react';
import { DashboardTournamentVideoCardFragment, useDeleteTournamentVideoMutation } from '@/lib/graphql/types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import { dashboardPath } from '@/lib';
import { Link } from '../Link';

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
  tournamentVideo: DashboardTournamentVideoCardFragment;
  onDelete: () => void;
}

export const DashboardTournamentVideoCard: React.FC<Props> = ({ tournamentVideo, onDelete }) => {
  const classes = useStyles();
  const setLoading = useSetRecoilState(loadingState);
  const [deleteTournamentVideo, { loading: deleteLoading }] = useDeleteTournamentVideoMutation({
    variables: { tournamentVideoId: tournamentVideo.id },
    onCompleted: data => {
      const tournamentVideo = data.deleteTournamentVideo?.tournamentVideo;
      if (!tournamentVideo) return;
      toast.success('大会動画を削除しました。');
      onDelete();
    },
  });

  setLoading(deleteLoading);

  return (
    <Card>
      <CardMedia image={tournamentVideo.thumbnailUrl} className={classes.media} />

      <CardContent>
        <Typography variant="h6">{tournamentVideo.title}</Typography>
        <Typography variant="caption" component="p">
          {tournamentVideo.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Button
          color="primary"
          href={dashboardPath({ to: 'tournamentBattles', tournamentVideoId: tournamentVideo.id })}
          component={Link}
        >
          {`対戦(${tournamentVideo.battlesCount})`}
        </Button>

        <IconButton color="default" onClick={() => deleteTournamentVideo()} className={classes.deleteButton}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
