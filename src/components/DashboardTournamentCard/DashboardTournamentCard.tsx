import React from 'react';
import { DashboardTournamentCardFragment, useDeleteTournamentMutation } from '@/lib/graphql/types';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { EmojiEvents, Schedule, Edit, Delete, YouTube } from '@material-ui/icons';

import { dashboardPath } from '@/lib';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import dayjs from '@/lib/dayjs';
import { Link } from '../Link';

const useStyles = makeStyles({
  media: {
    height: 160,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
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

  return (
    <Card>
      <CardActionArea
        href={dashboardPath({ to: 'tournament', tournamentId: tournament.id })}
        component={Link}
        color="inherit"
      >
        <CardMedia image={tournament.mainImageUrl || NO_IMAGE_URL} className={classes.media} />
        <CardContent>
          <Typography variant="h6">{tournament.name}</Typography>
        </CardContent>

        <List disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <Schedule />
            </ListItemIcon>
            <ListItemText primary={dayjs(tournament.startsAt).format('YYYY/M/D H:mm')} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <EmojiEvents />
            </ListItemIcon>
            <ListItemText
              primary={tournament.rankings
                .filter(r => r.place === 1)
                .map(r => r.player.name)
                .join('、')}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <YouTube />
            </ListItemIcon>
            <ListItemText primary={`動画登録数 ${tournament.videosCount}`} />
          </ListItem>
        </List>
      </CardActionArea>

      <CardActions disableSpacing className={classes.actions}>
        <IconButton color="default" href={dashboardPath({ to: 'tournamentEdit', tournamentId: tournament.id })}>
          <Edit />
        </IconButton>
        <IconButton color="default" onClick={() => deleteTournament()}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};
