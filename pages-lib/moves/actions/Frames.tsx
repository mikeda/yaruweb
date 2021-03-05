import React from 'react';
import { FrameFragment, FrameTypeEnum } from '@/lib/graphql/types';

import { Frame } from './Frame';

interface Props {
  frames: FrameFragment[];
}

export const Frames: React.FC<Props> = ({ frames }) => {
  const frameMap = new Map(frames.map(f => [f.type, f]));

  return (
    <>
      {Object.entries(FrameTypeEnum).map(([, v]) => {
        const frame = frameMap.get(v);

        return <>{frame && <Frame frame={frame} />}</>;
      })}
    </>
  );
};
