import React, { useState } from 'react';
import { FrameStateEnum, FrameTypeEnum } from '@/lib/graphql/types';

import { Frame } from './Frame';

interface FrameType {
  id: string;
  frame?: number | null;
  state?: FrameStateEnum | null;
  type: FrameTypeEnum;
}

interface Props {
  frames: FrameType[];
}

export const Frames: React.FC<Props> = props => {
  const [frames, setFrames] = useState<FrameType[]>(props.frames);

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
