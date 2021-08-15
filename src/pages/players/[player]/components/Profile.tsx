import React from 'react';
import { DEFAULT_AVATAR_URL } from '@/lib/Assets';
import { PlayerPageProfileFragment } from '@/lib/graphql/types';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import theme from '@/theme';
import { LiveTv, Twitter } from '@material-ui/icons';
import { colors } from '@/colors';

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
  player: PlayerPageProfileFragment;
}

export const Profile: React.FC<Props> = ({ player }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div>
        <img src={player.avatarUrl || DEFAULT_AVATAR_URL} className={classes.avatarImg} />
      </div>

      <div className={classes.content}>
        <Typography variant="h1">{player.name}</Typography>

        {player.description && <Typography className={classes.description}>{player.description}</Typography>}

        <div className={classes.status}>
          <Typography variant="caption">大会実績 {player.winningsCount}</Typography>
          <Typography variant="caption">対戦動画 {player.battlesCount}</Typography>

          {player.twitterId && (
            <a href={`https://twitter.com/${player.twitterId}`} target="_blank" rel="noreferrer">
              <Twitter fontSize="small" style={{ fill: colors.twitter }} />
            </a>
          )}
          {player.streamingUrl && (
            <a href={player.streamingUrl} target="_blank" rel="noreferrer">
              <LiveTv fontSize="small" style={{ fill: theme.palette.grey[600] }} />
            </a>
          )}
        </div>
      </div>
    </Paper>
  );
};
