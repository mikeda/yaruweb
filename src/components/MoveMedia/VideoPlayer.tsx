import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import styles from './MoveMedia.module.scss';

type Props = {
  src: string;
  thumnailUrl: string;
};

export const VideoPlayer: React.FC<Props> = ({ src, thumnailUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls;
    if (videoRef.current) {
      const video = videoRef.current;
      if (!video) return;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoRef]);

  return <video width="100%" controls ref={videoRef} className={styles.video} poster={thumnailUrl} preload="none" />;
};
