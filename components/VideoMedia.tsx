import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { YouTubePlayer } from 'youtube-player/dist/types';
import YouTube from 'react-youtube';

import { useCreateVideoFavMutation, useDeleteVideoFavMutation, VideoFragment } from '@/lib/graphql/types';

import styles from './VideoMedia.module.scss';
import { VideoHighlights } from './VideoHighlights';

interface Props {
  video: VideoFragment;
}

export const VideoMedia: React.FC<Props> = ({ video }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const [faved, setFaved] = useState(video.faved);
  const [favsCount, setFavedCount] = useState(video.favsCount);

  const [createFav] = useCreateVideoFavMutation({
    onCompleted: () => {
      setFaved(true);
      setFavedCount(prev => prev + 1);
    },
  });

  const [deleteFav] = useDeleteVideoFavMutation({
    onCompleted: () => {
      setFaved(false);
      setFavedCount(prev => prev - 1);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <YouTube
          containerClassName="bl_youtube"
          videoId={video.videoId}
          opts={{ width: '854', height: '480', playerVars: { autoplay: 1 } }}
          onReady={event => {
            setYouTubePlayer(event.target);
          }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.ttl}>{video.title}</div>
        <div className={styles.txt}>{video.channelTitle}</div>

        <VideoHighlights
          highlights={video.highlights}
          onSelect={startSec => {
            if (!youTubePlayer) return;

            youTubePlayer.seekTo(startSec, true);
            youTubePlayer.playVideo();
          }}
        />

        {faved ? (
          <div onClick={() => deleteFav({ variables: { videoId: video.id } })} className="el_iconBtn">
            <FontAwesomeIcon icon={filledHeart} />
            <span>{favsCount}</span>
          </div>
        ) : (
          <div onClick={() => createFav({ variables: { videoId: video.id } })} className="el_iconBtn">
            <FontAwesomeIcon icon={unfilledHeart} />
            <span>{favsCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};
