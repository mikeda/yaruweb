import React from 'react';

import YouTube from 'react-youtube';

import { YouTubeWrapper } from '../YouTubeWrapper';

interface Props {
  videoId: string;
  startSec?: number;
  attributes: { [key: string]: unknown };
  children: React.ReactNode;
}

export const EmbedYouTube: React.FC<Props> = ({ videoId, startSec, attributes, children }) => {
  return (
    <div {...attributes}>
      <YouTubeWrapper contentEditable={false}>
        <YouTube
          videoId={videoId}
          opts={{ width: '854', height: '480', playerVars: { start: startSec, playsinline: 1 } }}
        />
      </YouTubeWrapper>
      {children}
    </div>
  );
};
