import React from 'react';

type OutputData = {
  text: string;
};

interface Props {
  data: OutputData;
}

export const ParagraphOutput: React.FC<Props> = ({ data }) => {
  return <p dangerouslySetInnerHTML={{ __html: data.text }} />;
};
