import React from 'react';

import { Grid, ListItem, ListItemText, Typography } from '@mui/material';

import { Player } from './Player';

import { TournamentVideoPlayerBattleFragment, BattleRound } from '@/generated/graphql';
import { BattleRoundText, formatSec } from '@/lib';

interface Props {
  battle: TournamentVideoPlayerBattleFragment;
  onClick: () => void;
}

export const TournamentVideoPlayerBattle: React.FC<Props> = ({ battle, onClick }) => {
  const [left, right] = battle.sides;
  if (!left || !right) return null;

  let subText = formatSec(battle.startSec);
  if (battle.round !== BattleRound.Unspecified) {
    subText += ` ${BattleRoundText[battle.round]}`;
  }

  return (
    <ListItem button divider onClick={onClick}>
      <ListItemText
        primary={
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Player name={left.player.name} rounds={left.rounds} faceImageUrl={left.character.faceImageUrl} />
            </Grid>
            <Grid item xs={6}>
              <Player name={right.player.name} rounds={right.rounds} faceImageUrl={right.character.faceImageUrl} />
            </Grid>
          </Grid>
        }
        secondary={
          <Typography variant="body2" component="span">
            {subText}
          </Typography>
        }
      />
    </ListItem>
  );
};
