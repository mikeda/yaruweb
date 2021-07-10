import React from 'react';
import { DashboardPlayerCardFragment, useDashboardPlayerCardDeletePlayerMutation } from '@/lib/graphql/types';
import {
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
  player: DashboardPlayerCardFragment;
  onDelete: () => void;
}

export const DashboardPlayerCard: React.FC<Props> = ({ player, onDelete }) => {
  const classes = useStyles();
  const setLoading = useSetRecoilState(loadingState);
  const [deletePlayer, { loading: deleteLoading }] = useDashboardPlayerCardDeletePlayerMutation({
    variables: { playerSlug: player.slug },
    onCompleted: data => {
      const player = data.deletePlayer?.player;
      if (!player) return;
      toast.success('プレイヤー情報を削除しました。');
      onDelete();
    },
  });

  setLoading(deleteLoading);

  const href = dashboardPath({ to: 'playerEdit', playerSlug: player.slug });

  return (
    <Card>
      <CardActionArea className={classes.root} href={href} component={Link} color="inherit">
        <CardMedia image={player.avatarUrl || NO_IMAGE_URL} className={classes.media} />

        <CardContent>
          <Typography variant="h6">{player.name}</Typography>
          <Typography variant="caption" component="p">
            {player.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton color="default" onClick={() => deletePlayer()} className={classes.deleteButton}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
