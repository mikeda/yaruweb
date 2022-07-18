import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Dialog, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

import { useUpdateMutation } from '../hooks/useUpdateMutation';

import { BattleForm } from './BattleForm';

import {
  BattleRound,
  CharacterSelectOptionFragment,
  AdminBattlesPageBattleReslutFragment,
  PlayerSelectOptionFragment,
} from '@/generated/graphql';
import { BattleRoundText } from '@/lib';
import { theme, formatSec } from '@/lib';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      width: 24,
      height: 24,
    },
    win: {
      backgroundColor: '#D6AF36',
    },
    vs: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  }),
);

interface Props {
  battle: AdminBattlesPageBattleReslutFragment;
  tournamentVideoId: string;
  youtubeVideoId: string;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  onDestroy: () => void;
}

export const BattleListItem: React.FC<Props> = ({
  battle,
  tournamentVideoId,
  youtubeVideoId,
  players,
  characters,
  onDestroy,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { update } = useUpdateMutation();
  const classes = useStyles();

  const [left, right] = battle.sides;
  if (!left || !right) return null;

  let subTitle = formatSec(battle.startSec);
  if (battle.round !== BattleRound.Unspecified) {
    subTitle = `${subTitle} ${BattleRoundText[battle.round]}`;
  }
  return (
    <ListItem>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md">
        <BattleForm
          youtubeVideoId={youtubeVideoId}
          players={players}
          characters={characters}
          battle={battle}
          onSubmit={attributes => {
            update({ variables: { battleId: battle.id, attributes: { ...attributes, tournamentVideoId } } });
            setDialogOpen(false);
          }}
        />
      </Dialog>

      <ListItemText
        primary={
          <Box display="flex" alignItems="center">
            <Avatar className={clsx(classes.avatar, left.rounds === 3 && classes.win)}>{left.rounds}</Avatar>
            <Avatar className={classes.avatar} src={left.character.faceImageUrl} />
            <span>{left.player.name}</span>
            <span className={classes.vs}>×</span>
            <Avatar className={clsx(classes.avatar, right.rounds === 3 && classes.win)}>{right.rounds}</Avatar>
            <Avatar className={classes.avatar} src={right.character.faceImageUrl} />
            <span>{right.player.name}</span>
          </Box>
        }
        secondary={subTitle}
      />

      <ListItemSecondaryAction>
        <IconButton onClick={() => setDialogOpen(true)} size="large">
          <EditIcon />
        </IconButton>
        <IconButton edge="end" onClick={onDestroy} size="large">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
