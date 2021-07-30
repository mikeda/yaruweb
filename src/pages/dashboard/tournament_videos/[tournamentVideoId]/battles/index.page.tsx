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
import { Box, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import { formatSec } from '@/lib';
import { Delete } from '@material-ui/icons';
import { TournamentBattleRoundText } from '@/lib/graphql/enum_texts';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

const Page: React.FC = () => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const { tournamentVideoId } = useRouteParams();
  const { tournamentVideo } = useTournamentVideoQuery(tournamentVideoId);
  const { tournamentBattles, refetch } = useTournamentBattlesQuery(tournamentVideoId);
  const { create } = useCreateMutation(refetch);
  const { destroy } = useDeleteMutation(refetch);

  if (!tournamentVideo) return null;

  return (
    <DashboardContent
      title="対戦"
      breadcrumb={<DashboardBreadcrumbs to="tournamentBattles" tournamentVideo={tournamentVideo} />}
    >
      {tournamentVideo && (
        <>
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
                    const left = battle.sides[0];
                    const right = battle.sides[1];
                    let title = `${left.player.name} VS ${right.player.name}`;
                    if (battle.round) {
                      title = `[${TournamentBattleRoundText[battle.round]}] ${title}`;
                    }
                    return (
                      <ListItem
                        button
                        key={battle.id}
                        onClick={() => {
                          youTubePlayer?.seekTo(battle.startSec, true);
                        }}
                      >
                        <ListItemText primary={title} secondary={formatSec(battle.startSec)} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              destroy({ variables: { tournamentBattleId: battle.id } });
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Paper>
          </Box>
        </>
      )}
    </DashboardContent>
  );
};

export default Page;
