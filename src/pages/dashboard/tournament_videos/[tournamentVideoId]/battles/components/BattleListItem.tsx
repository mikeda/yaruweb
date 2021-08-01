import React from 'react';

import {
  Avatar,
  Box,
  createStyles,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { formatSec } from '@/lib';
import { Delete } from '@material-ui/icons';
import { TournamentBattleRoundText } from '@/lib/graphql/enum_texts';
import { DashboardTournamentBattlesPageBattleReslutFragment } from '@/lib/graphql/types';
import clsx from 'clsx';

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
  battle: DashboardTournamentBattlesPageBattleReslutFragment;
  onClick: () => void;
  onDestroy: () => void;
}

export const BattleListItem: React.FC<Props> = ({ battle, onClick, onDestroy }) => {
  const classes = useStyles();
  const left = battle.sides[0];
  const right = battle.sides[1];
  let subTitle = formatSec(battle.startSec);
  if (battle.round) {
    subTitle = `${subTitle} ${TournamentBattleRoundText[battle.round]}`;
  }
  return (
    <ListItem button onClick={onClick}>
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
        <IconButton edge="end" aria-label="delete" onClick={onDestroy}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
