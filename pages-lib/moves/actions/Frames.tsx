import React, { useState } from 'react';
import { FrameFragment } from '@/lib/graphql/types';

import { Frame } from './Frame';

interface Props {
  frames: FrameFragment[];
}

export const Frames: React.FC<Props> = props => {
  const [frames, setFrames] = useState<FrameFragment[]>(props.frames);

  return (
    <>
      {frames.map(frame => (
        <Frame
          key={frame.id}
          frame={frame}
          onDelete={frameId => {
            setFrames(prev => prev.filter(frame => frame.id !== frameId));
          }}
        />
      ))}
    </>
  );
};
