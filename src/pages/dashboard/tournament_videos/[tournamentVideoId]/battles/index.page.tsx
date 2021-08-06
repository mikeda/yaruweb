import React, { useState } from 'react';

import { DashboardBreadcrumbs, DashboardContent } from '@/components';
import {
  useRouteParams,
  useTournamentVideoQuery,
  useTournamentBattlesQuery,
  useCreateMutation,
  useDeleteMutation,
} from './hooks';
import { TournamentBattleForm } from './components/TournamentBattleForm';
import { Box, List, Paper } from '@material-ui/core';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { BattleListItem } from './components/BattleListItem';

const Page: React.FC = () => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const { tournamentVideoId } = useRouteParams();
  const { data } = useTournamentVideoQuery(tournamentVideoId);
  const { tournamentBattles, refetch } = useTournamentBattlesQuery(tournamentVideoId);
  const { create } = useCreateMutation(refetch);
  const { destroy } = useDeleteMutation(refetch);

  if (!data) return null;
  const { tournamentVideo, characters, players } = data;

  return (
    <DashboardContent
      title="対戦"
      breadcrumb={<DashboardBreadcrumbs to="tournamentBattles" tournamentVideo={tournamentVideo} />}
    >
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

      <TournamentBattleForm
        players={players.records}
        characters={characters}
        onClickGetPlayerTime={callback => {
          if (!youTubePlayer) return;

          callback(youTubePlayer.getCurrentTime());
        }}
        onClickSetPlayerTime={startSec => {
          youTubePlayer?.seekTo(startSec, true);
        }}
        onSubmit={attributes =>
          create({ variables: { attributes: { ...attributes, tournamentVideoId: tournamentVideo.id } } })
        }
      />

      <Box mt={2}>
        <Paper>
          {tournamentBattles && (
            <List>
              {tournamentBattles.map(battle => {
                return (
                  <BattleListItem
                    key={battle.id}
                    battle={battle}
                    tournamentVideoId={tournamentVideo.id}
                    players={players.records}
                    characters={characters}
                    onClick={() => {
                      youTubePlayer?.seekTo(battle.startSec, true);
                    }}
                    onDestroy={() => {
                      destroy({ variables: { tournamentBattleId: battle.id } });
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
