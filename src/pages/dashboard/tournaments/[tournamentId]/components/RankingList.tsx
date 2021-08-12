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
import { RankingPlaceAvatar } from '@/components';
import { Delete } from '@material-ui/icons';
import { PlayerSelectOptionFragment, useDashboardTournamentPageRankingsQuery } from '@/lib/graphql/types';
import { DEFAULT_AVATAR_URL } from '@/lib/Assets';
import { useCreateRankingMutation, useDeleteRankingMutation } from '../hooks';
import { RankingForm } from './RankingForm';

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

export const RankingList: React.FC<Props> = ({ tournamentId, players }) => {
  const { data, refetch } = useDashboardTournamentPageRankingsQuery({ variables: { tournamentId } });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { create } = useCreateRankingMutation({ onCreate: refetch });
  const { destroy } = useDeleteRankingMutation({ onDelete: refetch });
  const classes = useStyles();

  if (!data) return null;

  return (
    <>
      <List className={classes.list}>
        {data.tournamentRankings.records.map(ranking => (
          <ListItem key={ranking.id}>
            <ListItemAvatar>
              <RankingPlaceAvatar place={ranking.place} />
            </ListItemAvatar>

            <ListItemAvatar>
              <Avatar src={ranking.player.avatarUrl || DEFAULT_AVATAR_URL} />
            </ListItemAvatar>

            <ListItemText primary={ranking.player.name} />

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  if (window.confirm('削除します。')) {
                    destroy({ variables: { tournamentRankingId: ranking.id } });
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

      <RankingForm
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
