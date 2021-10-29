import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Dialog,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme,
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { formatSec } from '@/lib';
import { Delete, Edit } from '@mui/icons-material';
import { BattleRoundText } from '@/lib/graphql/enum_texts';
import {
  CharacterSelectOptionFragment,
  DashboardBattlesPageBattleReslutFragment,
  PlayerSelectOptionFragment,
} from '@/lib/graphql/types';
import clsx from 'clsx';
import { BattleUpdateForm } from './BattleUpdateForm';
import { useUpdateMutation } from '../hooks/useUpdateMutation';

const useStyles = makeStyles((theme: Theme) =>
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
  battle: DashboardBattlesPageBattleReslutFragment;
  tournamentVideoId: string;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  onClick: () => void;
  onDestroy: () => void;
}

export const BattleListItem: React.FC<Props> = ({
  battle,
  tournamentVideoId,
  players,
  characters,
  onClick,
  onDestroy,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { update } = useUpdateMutation();
  const classes = useStyles();

  const left = battle.sides[0];
  const right = battle.sides[1];
  let subTitle = formatSec(battle.startSec);
  if (battle.round) {
    subTitle = `${subTitle} ${BattleRoundText[battle.round]}`;
  }
  return (
    <ListItem button onClick={onClick}>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <BattleUpdateForm
          battle={battle}
          players={players}
          characters={characters}
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
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={onDestroy} size="large">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
