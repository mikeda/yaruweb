import React from 'react';
import { VideoPlayer } from '../VideoPlayer';

interface Props {
  m3u8Url: string;
  thumbnailUrl: string;
  attributes: { [key: string]: unknown };
  children: React.ReactNode;
}

export const Video: React.FC<Props> = ({ m3u8Url, thumbnailUrl, attributes, children }) => {
  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        <VideoPlayer src={m3u8Url} thumnailUrl={thumbnailUrl} />
      </div>
      {children}
    </div>
  );
};
