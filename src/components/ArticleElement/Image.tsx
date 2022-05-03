import React from 'react';

import { useFocused, useSelected } from 'slate-react';

interface Props {
  url: string;
  attributes: { [key: string]: unknown };
  children: React.ReactNode;
}

export const Image: React.FC<Props> = ({ url, attributes, children }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div style={{ userSelect: 'none' }} contentEditable={false}>
        <img
          src={url}
          style={{
            display: 'block',
            maxWidth: '550px',
            maxHeight: '20em',
            boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
          }}
        />
      </div>
      {children}
    </div>
  );
};
