import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

type Props = {
  src: string;
  thumnailUrl: string;
  width?: string | number;
  autoPlay?: boolean;
};

export const VideoPlayer: React.FC<Props> = ({ src, thumnailUrl, width = '100%', autoPlay }) => {
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
  }, [videoRef, src]);

  return (
    <video
      width={width}
      style={{ maxWidth: 680 }}
      controls
      ref={videoRef}
      poster={thumnailUrl}
      preload="none"
      autoPlay={autoPlay}
      muted
      playsInline
    />
  );
};
