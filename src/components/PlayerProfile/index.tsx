import React from 'react';

import { LiveTv, Twitter } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { PlayerProfileFragment } from '@/generated/graphql';
import { DEFAULT_AVATAR_URL, colors, theme } from '@/lib';

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },
  content: {
    paddingLeft: theme.spacing(2),
  },
  section: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(1),
    whiteSpace: 'pre-line',
  },
  status: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginLeft: theme.spacing(1),
    },
  },
});

interface Props {
  player: PlayerProfileFragment;
}

export const PlayerProfile: React.FC<Props> = ({ player }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div>
        <img src={player.avatarUrl || DEFAULT_AVATAR_URL} className={classes.avatarImg} />
      </div>

      <div className={classes.content}>
        <Typography variant='h1'>{player.name}</Typography>

        <div className={classes.status}>
          {player.twitterId && (
            <a href={`https://twitter.com/${player.twitterId}`} target='_blank' rel='noreferrer'>
              <Twitter fontSize='small' style={{ fill: colors.twitter }} />
            </a>
          )}
          {player.streamingUrl && (
            <a href={player.streamingUrl} target='_blank' rel='noreferrer'>
              <LiveTv fontSize='small' style={{ fill: theme.palette.grey[600] }} />
            </a>
          )}
        </div>
      </div>
    </Paper>
  );
};
