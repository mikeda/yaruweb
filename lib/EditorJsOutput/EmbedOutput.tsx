import React from 'react';

type OutputData = {
  service: 'youtube' | 'twitter' | 'twitch-video' | 'twitch-channel';
  source: string;
  embed: string;
  width: number;
  height: number;
  caption: string;
};

interface Props {
  data: OutputData;
}

export const EmbedOutput: React.FC<Props> = ({ data }) => {
  return (
    <figure className="bl_youtube">
      <iframe src={data.embed}></iframe>
      {data.caption && <figcaption>{data.caption}</figcaption>}
    </figure>
  );
};
