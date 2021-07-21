import React, { useState } from 'react';
import { YouTubePlayer } from 'youtube-player/dist/types';
import YouTube from 'react-youtube';

import { TournamentVideoFragment } from '@/lib/graphql/types';
import { VideoHighlights } from '../VideoHighlights';

import styles from './VideoMedia.module.scss';

interface Props {
  video: TournamentVideoFragment;
}

export const VideoMedia: React.FC<Props> = ({ video }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();

  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <YouTube
          containerClassName="bl_youtube"
          videoId={video.youtubeVideoId}
          opts={{ width: '854', height: '480', playerVars: { autoplay: 1 } }}
          onReady={event => {
            setYouTubePlayer(event.target);
          }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.ttl}>{video.title}</div>
        <div className={styles.txt}>{video.channel.name}</div>

        <VideoHighlights
          highlights={video.highlights}
          onSelect={startSec => {
            if (!youTubePlayer) return;

            youTubePlayer.seekTo(startSec, true);
            youTubePlayer.playVideo();
          }}
        />
      </div>
    </div>
  );
};
