import React from 'react';
import { DashboardTournamentCardFragment, useDeleteTournamentMutation } from '@/lib/graphql/types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { EmojiEvents, Schedule, Edit, Delete } from '@material-ui/icons';

import { dashboardPath } from '@/lib';
import { NO_IMAGE_URL } from '@/lib/Assets';
import { toast } from 'react-toastify';
import { loadingState } from '@/states/loading';
import { useSetRecoilState } from 'recoil';
import dayjs from '@/lib/dayjs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    media: {
      height: 160,
    },
    deleteButton: {
      marginLeft: 'auto',
    },
    rankings: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    rankingItem: {
      margin: theme.spacing(0.5),
    },
  }),
);

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
      </List>

      <CardActions disableSpacing>
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
