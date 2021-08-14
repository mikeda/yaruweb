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
  makeStyles,
} from '@material-ui/core';
import { WinningPlaceAvatar } from '@/components';
import { Delete } from '@material-ui/icons';
import { PlayerSelectOptionFragment, useDashboardTournamentPageWinningsQuery } from '@/lib/graphql/types';
import { DEFAULT_AVATAR_URL } from '@/lib/Assets';
import { useCreateWinningMutation, useDeleteWinningMutation } from '../hooks';
import { WinningForm } from './WinningForm';

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

export const WinningList: React.FC<Props> = ({ tournamentId, players }) => {
  const { data, refetch } = useDashboardTournamentPageWinningsQuery({ variables: { tournamentId } });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { create } = useCreateWinningMutation({ onCreate: refetch });
  const { destroy } = useDeleteWinningMutation({ onDelete: refetch });
  const classes = useStyles();

  if (!data) return null;

  return (
    <>
      <List className={classes.list}>
        {data.winnings.records.map(winning => (
          <ListItem key={winning.id}>
            <ListItemAvatar>
              <WinningPlaceAvatar place={winning.place} />
            </ListItemAvatar>

            <ListItemAvatar>
              <Avatar src={winning.player.avatarUrl || DEFAULT_AVATAR_URL} />
            </ListItemAvatar>

            <ListItemText primary={winning.player.name} />

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  if (window.confirm('削除します。')) {
                    destroy({ variables: { winningId: winning.id } });
                  }
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box pb={2} display="flex" justifyContent="center" onClick={() => setDialogOpen(true)}>
        <Button color="primary">追加する</Button>
      </Box>

      <WinningForm
        open={dialogOpen}
        players={players}
        onClose={() => setDialogOpen(false)}
        onSubmit={attributes => {
          create({ variables: { tournamentId, attributes } });
          setDialogOpen(false);
        }}
      />
    </>
  );
};
