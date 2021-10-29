import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { StandingPlaceAvatar } from '@/components';
import { Delete } from '@mui/icons-material';
import { PlayerSelectOptionFragment, useDashboardTournamentPageStandingsQuery } from '@/lib/graphql/types';
import { DEFAULT_AVATAR_URL } from '@/lib/Assets';
import { useCreateStandingMutation, useDeleteStandingMutation } from '../hooks';
import { StandingForm } from './StandingForm';

const useStyles = makeStyles({
  list: {
    maxHeight: 300,
    overflowY: 'auto',
  },
});

interface Props {
  tournamentId: string;
  players: PlayerSelectOptionFragment[];
}

export const StandingList: React.FC<Props> = ({ tournamentId, players }) => {
  const { data, refetch } = useDashboardTournamentPageStandingsQuery({ variables: { tournamentId } });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { create } = useCreateStandingMutation({ onCreate: refetch });
  const { destroy } = useDeleteStandingMutation({ onDelete: refetch });
  const classes = useStyles();

  if (!data) return null;

  return <>
    <List className={classes.list}>
      {data.standings.records.map(standing => (
        <ListItem key={standing.id}>
          <ListItemAvatar>
            <StandingPlaceAvatar place={standing.place} />
          </ListItemAvatar>

          <ListItemAvatar>
            <Avatar src={standing.player.avatarUrl || DEFAULT_AVATAR_URL} />
          </ListItemAvatar>

          <ListItemText primary={standing.player.name} />

          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={() => {
                if (window.confirm('削除します。')) {
                  destroy({ variables: { standingId: standing.id } });
                }
              }}
              size="large">
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>

    <Box pb={2} display="flex" justifyContent="center" onClick={() => setDialogOpen(true)}>
      <Button color="primary">追加する</Button>
    </Box>

    <StandingForm
      open={dialogOpen}
      players={players}
      onClose={() => setDialogOpen(false)}
      onSubmit={attributes => {
        create({ variables: { tournamentId, attributes } });
        setDialogOpen(false);
      }}
    />
  </>;
};
