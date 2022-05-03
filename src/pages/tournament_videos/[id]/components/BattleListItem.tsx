import React from 'react';
import clsx from 'clsx';
import { Avatar, Box, ListItem, ListItemText, Typography } from '@mui/material';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

import { TournamentVideoPageBattleFragment, TournamentVideoPageBattleSideFragment } from '@/lib/$types';
import { formatSec } from '@/lib';
import { BattleRoundText } from '@/lib/EnumText';
import theme from '@/theme';

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
  battle: TournamentVideoPageBattleFragment;
  selected?: boolean;
  onClick: () => void;
}

export const BattleListItem: React.FC<Props> = ({ battle, selected = false, onClick }) => {
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
          <Box display="flex" alignItems="center" mb={1}>
            <SideBox battleSide={left} />
            <SideBox battleSide={right} />
          </Box>
        }
        secondary={subTitle}
      />
    </ListItem>
  );
};

const SideBox: React.FC<{ battleSide: TournamentVideoPageBattleSideFragment }> = ({ battleSide }) => {
  const classes = useStyles();

  return (
    <Box flexGrow={1}>
      <Typography variant="body2">{battleSide.player.name}</Typography>

      <Box display="flex" alignItems="center">
        <Avatar className={clsx(classes.avatar, battleSide.rounds === 3 && classes.win)}>{battleSide.rounds}</Avatar>
        <Avatar className={classes.avatar} src={battleSide.character.faceImageUrl} sx={{ ml: 1 }} />
      </Box>
    </Box>
  );
};
