import { BattleListItem } from './BattleListItem';
import { TournamentPageBattleFragment, TournamentPageVideoFragment } from '@/lib/graphql/types';
import { List, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { useRouter } from 'next/router';

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

  //const battleHash = router.query.battle as string | undefined;
  const hashBattleId = router.asPath.split('#battle')[1] ?? '';

  const updateBattle = (battle: TournamentPageBattleFragment) => {
    setSelectedBattle(battle);
    youTubePlayer?.seekTo(battle.startSec, true);
    youTubePlayer?.playVideo();
  };

  useEffect(() => {
    const battle = tournamentVideo.battles.find(b => b.id === hashBattleId);
    if (battle) setSelectedBattle(battle);
  }, []);

  return (
    <div>
      <YouTube
        containerClassName="bl_youtube"
        videoId={tournamentVideo.youtubeVideoId}
        opts={{ width: '854', height: '480' }}
        onReady={event => {
          setYouTubePlayer(event.target);
        }}
      />

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
