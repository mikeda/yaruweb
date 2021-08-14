import React from 'react';
import { Avatar, Box, Grid, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';

import { Link } from '@/components';
import { path } from '@/lib';
import { PlayerPageBattleFragment } from '@/lib/graphql/types';
import theme from '@/theme';
import { BattleRoundText } from '@/lib/graphql/enum_texts';
import clsx from 'clsx';
import dayjs from '@/lib/dayjs';

interface Props {
  battle: PlayerPageBattleFragment;
  last: boolean;
}

export const BattleListItem: React.FC<Props> = ({ battle, last }) => {
  const video = battle.tournamentVideo;
  const tournament = video.tournament;
  const left = battle.sides[0];
  const right = battle.sides[1];
  let subTitle = tournament.name;
  if (battle.round) {
    subTitle = `${subTitle} ${BattleRoundText[battle.round]}`;
  }
  return (
    <Link
      href={path({ to: 'tournamentVideo', tournamentVideoId: video.id, battleId: battle.id })}
      passHref
      underline="none"
    >
      <ListItem button divider={!last}>
        <ListItemText
          primary={
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <PLayer name={left.player.name} rounds={left.rounds} faceImageUrl={left.character.faceImageUrl} />
              </Grid>
              <Grid item xs={6}>
                <PLayer name={right.player.name} rounds={right.rounds} faceImageUrl={right.character.faceImageUrl} />
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

const PLayer: React.FC<PlayerProps> = ({ name, rounds, faceImageUrl }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.root}>
      <Avatar className={clsx(classes.avatar, rounds === 3 && classes.win)}>{rounds}</Avatar>
      <Avatar className={classes.avatar} src={faceImageUrl} />
      <Typography>{name}</Typography>
    </Box>
  );
};
