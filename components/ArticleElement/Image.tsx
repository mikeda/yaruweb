import React from 'react';

interface Props {
  url: string;
  attributes: { [key: string]: unknown };
}

export const Image: React.FC<Props> = ({ url, attributes, children }) => {
  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        <figure>
          <img src={url} />
        </figure>
      </div>
      {children}
    </div>
  );
};
