import React from 'react';
import YouTube from 'react-youtube';

interface Props {
  videoId: string;
  startSec?: number;
  attributes: { [key: string]: unknown };
}

export const EmbedYouTube: React.FC<Props> = ({ videoId, startSec, attributes, children }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <YouTube
          containerClassName="bl_youtube"
          videoId={videoId}
          opts={{ width: '854', height: '480', playerVars: { start: startSec } }}
        />
      </div>
      {children}
    </div>
  );
};
