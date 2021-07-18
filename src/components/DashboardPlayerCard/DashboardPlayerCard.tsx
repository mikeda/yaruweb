import React from 'react';
import { DashboardPlayerCardFragment, useDashboardPlayerCardDeletePlayerMutation } from '@/lib/graphql/types';
import { Card, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import { dashboardPath } from '@/lib';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import theme from '@/theme';

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
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
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

  return (
    <Card className={classes.root}>
      <CardMedia image={player.avatarUrl || NO_IMAGE_URL} className={classes.media} />

      <div className={classes.details}>
        <Typography variant="h6">{player.name}</Typography>

        <div className={classes.actions}>
          <IconButton color="default" href={dashboardPath({ to: 'playerEdit', playerSlug: player.slug })}>
            <Edit />
          </IconButton>
          <IconButton color="default" onClick={() => deletePlayer()}>
            <Delete />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
