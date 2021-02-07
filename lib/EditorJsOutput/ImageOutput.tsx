import React from 'react';

type OutputData = {
  file: { url: string };
  caption: string;
  withBorder: boolean;
  withBackground: boolean;
  stretched: boolean;
};

interface Props {
  data: OutputData;
}

export const ImageOutput: React.FC<Props> = ({ data }) => {
  return (
    <figure>
      <img src={data.file.url} alt={data.caption} />
      {data.caption && <figcaption>{data.caption}</figcaption>}
    </figure>
  );
};
