import React from 'react';

type OutputData = {
  style: 'ordered' | 'unordered';
  items: string[];
};

interface Props {
  data: OutputData;
}

export const ListOutput: React.FC<Props> = ({ data }) => {
  const items = data.items.map((item, index) => <li dangerouslySetInnerHTML={{ __html: item }} key={index} />);

  switch (data.style) {
    case 'ordered':
      return <ol>{items}</ol>;
    case 'unordered':
      return <ul>{items}</ul>;
  }
};
