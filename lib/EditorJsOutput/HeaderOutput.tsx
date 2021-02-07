import React from 'react';

export type OutputData = {
  text: string;
  level: 2 | 3 | 4;
};

interface Props {
  data: OutputData;
}

export const HeaderOutput: React.FC<Props> = ({ data }) => {
  switch (data.level) {
    case 2:
      return <h2 dangerouslySetInnerHTML={{ __html: data.text }} />;
    case 3:
      return <h3 dangerouslySetInnerHTML={{ __html: data.text }} />;
    case 4:
      return <h4 dangerouslySetInnerHTML={{ __html: data.text }} />;
  }
};
