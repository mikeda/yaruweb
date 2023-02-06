import React from 'react';

import { Grid, ListItem, ListItemText, Typography } from '@mui/material';

import { Player } from './Player';

import { BattleListItemFragment, BattleRound } from '@/generated/graphql';
import { dayjs, BattleRoundText } from '@/lib';

interface Props {
  battle: BattleListItemFragment;
  onClick: () => void;
}

export const BattleListItem: React.FC<Props> = ({ battle, onClick }) => {
  const video = battle.tournamentVideo;
  const tournament = video.tournament;
  const [left, right] = battle.sides;
  if (!left || !right) return null;

  const subTitle = `${tournament.name} | ${dayjs(tournament.startsAt).format('YYYY/M/D')}`;

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
          <>
            <Typography variant='body2' component='span'>
              {subTitle}
            </Typography>
            <br />
            {battle.round !== BattleRound.Unspecified && (
              <Typography variant='body2' component='span'>
                {BattleRoundText[battle.round]}
              </Typography>
            )}
          </>
        }
      />
    </ListItem>
  );
};
