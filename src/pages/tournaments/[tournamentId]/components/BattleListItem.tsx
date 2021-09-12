import React from 'react';
import clsx from 'clsx';
import { Avatar, Box, createStyles, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';

import { TournamentPageBattleFragment } from '@/lib/graphql/types';
import { formatSec } from '@/lib';
import { BattleRoundText } from '@/lib/graphql/enum_texts';

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
  battle: TournamentPageBattleFragment;
  selected: boolean;
  onClick: () => void;
}

export const BattleListItem: React.FC<Props> = ({ battle, selected, onClick }) => {
  const classes = useStyles();
  const left = battle.sides[0];
  const right = battle.sides[1];
  let subTitle = formatSec(battle.startSec);
  if (battle.round) {
    subTitle = `${subTitle} ${BattleRoundText[battle.round]}`;
  }

  return (
    <ListItem button key={battle.id} selected={selected} onClick={onClick} id={`battle${battle.id}`}>
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
    </ListItem>
  );
};
