import React from 'react';

import { Avatar, Box, Grid, ListItem, ListItemText, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

import { Link } from '@/components';
import { pagesPath } from '@/generated/$path';
import { BattleListItemFragment, BattleRound } from '@/generated/graphql';
import { theme, dayjs, BattleRoundText } from '@/lib';

interface Props {
  battle: BattleListItemFragment;
  last?: boolean;
}

export const BattleListItem: React.FC<Props> = ({ battle, last = false }) => {
  const video = battle.tournamentVideo;
  const tournament = video.tournament;
  const [left, right] = battle.sides;
  if (!left || !right) return null;

  let subTitle = tournament.name;
  if (battle.round !== BattleRound.Unspecified) {
    subTitle = `${subTitle} ${BattleRoundText[battle.round]}`;
  }

  return (
    <Link
      href={pagesPath.tournament_videos._id(video.id).$url({ hash: `battle_${battle.id}` })}
      passHref
      underline="none"
    >
      <ListItem button divider={!last}>
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
              <Typography variant="h6">{subTitle}</Typography>
              <Typography variant="body2">{dayjs(tournament.startsAt).format('YYYY/M/D')}</Typography>
            </>
          }
        />
      </ListItem>
    </Link>
  );
};

const useStyles = makeStyles({
  root: {
    marginBottom: theme.spacing(1),
  },
  round: {
    width: 32,
    height: 32,
    textDecoration: 'none',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(1),
  },
  win: {
    backgroundColor: '#D6AF36',
  },
  vs: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: 32,
  },
});

interface PlayerProps {
  name: string;
  rounds: number;
  faceImageUrl: string;
}

const Player: React.FC<PlayerProps> = ({ name, rounds, faceImageUrl }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.root}>
      <Avatar className={clsx(classes.avatar, rounds === 3 && classes.win)}>{rounds}</Avatar>
      <Avatar className={classes.avatar} src={faceImageUrl} />
      <Typography>{name}</Typography>
    </Box>
  );
};
