import React, { useState } from 'react';

import { DashboardBreadcrumbs, DashboardContent } from '@/components';
import {
  useRouteParams,
  useTournamentVideoQuery,
  useBattlesQuery,
  useCreateMutation,
  useDeleteMutation,
} from './hooks';
import { BattleForm } from './components/BattleForm';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { BattleListItem } from './components/BattleListItem';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    maxHeight: 300,
    overflowY: 'auto',
  },
});

const Page: React.FC = () => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const { tournamentVideoId } = useRouteParams();
  const { data } = useTournamentVideoQuery(tournamentVideoId);
  const { battles, refetch } = useBattlesQuery(tournamentVideoId);
  const { create } = useCreateMutation(refetch);
  const { destroy } = useDeleteMutation(refetch);
  const classes = useStyles();

  if (!data) return null;
  const { tournamentVideo, characters, players } = data;

  return (
    <DashboardContent title="対戦" breadcrumb={<DashboardBreadcrumbs to="battles" tournamentVideo={tournamentVideo} />}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Box width="100%" maxWidth={640}>
          <YouTube
            containerClassName="bl_youtube"
            videoId={tournamentVideo.youtubeVideoId}
            opts={{ width: '854', height: '480' }}
            onReady={event => {
              setYouTubePlayer(event.target);
            }}
          />
        </Box>
      </Box>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>登録する</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BattleForm
            players={players.records}
            characters={characters.records}
            onClickGetPlayerTime={callback => {
              if (!youTubePlayer) return;

              callback(youTubePlayer.getCurrentTime());
            }}
            onClickSetPlayerTime={startSec => {
              youTubePlayer?.seekTo(startSec, true);
            }}
            onClick15SecAgo={() => {
              if (!youTubePlayer) return;

              youTubePlayer.seekTo(youTubePlayer.getCurrentTime() - 15, true);
            }}
            onClick15SecLater={() => {
              if (!youTubePlayer) return;

              youTubePlayer.seekTo(youTubePlayer.getCurrentTime() + 15, true);
            }}
            onSubmit={attributes =>
              create({ variables: { attributes: { ...attributes, tournamentVideoId: tournamentVideo.id } } })
            }
          />
        </AccordionDetails>
      </Accordion>

      <Box mt={2}>
        <Paper>
          {battles && (
            <List className={classes.list}>
              {battles.map(battle => {
                return (
                  <BattleListItem
                    key={battle.id}
                    battle={battle}
                    tournamentVideoId={tournamentVideo.id}
                    players={players.records}
                    characters={characters.records}
                    onClick={() => {
                      youTubePlayer?.seekTo(battle.startSec, true);
                    }}
                    onDestroy={() => {
                      destroy({ variables: { battleId: battle.id } });
                    }}
                  />
                );
              })}
            </List>
          )}
        </Paper>
      </Box>
    </DashboardContent>
  );
};

export default Page;
