import { BattleListItem } from './BattleListItem';
import { TournamentPageBattleFragment, TournamentPageVideoFragment } from '@/lib/graphql/types';
import { List, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { useRouter } from 'next/router';
import { YouTubeWrapper } from '@/components';

const useStyles = makeStyles({
  list: {
    maxHeight: 320,
    overflowY: 'auto',
  },
});

interface Props {
  tournamentVideo: TournamentPageVideoFragment;
  startSec?: number;
}

export const TournamentVideoPlayer: React.FC<Props> = ({ tournamentVideo }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const [selectedBattle, setSelectedBattle] = useState<TournamentPageBattleFragment>();
  const classes = useStyles();
  const router = useRouter();

  const hashBattleId = router.asPath.split('#battle')[1] ?? '';

  const updateBattle = (battle: TournamentPageBattleFragment) => {
    setSelectedBattle(battle);
    youTubePlayer?.seekTo(battle.startSec, true);
    youTubePlayer?.playVideo();
  };

  useEffect(() => {
    const battle = tournamentVideo.battles.find(b => b.id === hashBattleId);
    if (battle) updateBattle(battle);
  }, [hashBattleId]);

  useEffect(() => {
    if (selectedBattle) {
      youTubePlayer?.seekTo(selectedBattle.startSec, true);
      youTubePlayer?.playVideo();
    }
  }, [youTubePlayer]);

  return (
    <div>
      <YouTubeWrapper>
        <YouTube
          videoId={tournamentVideo.youtubeVideoId}
          opts={{ width: '854', height: '480', playerVars: { playsinline: 1 } }}
          onReady={event => {
            setYouTubePlayer(event.target);
          }}
        />
      </YouTubeWrapper>

      {tournamentVideo.battles.length > 0 && (
        <Paper>
          <List className={classes.list}>
            {tournamentVideo.battles.map(battle => (
              <BattleListItem
                key={battle.id}
                battle={battle}
                selected={selectedBattle?.id === battle.id}
                onClick={() => updateBattle(battle)}
              />
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};
