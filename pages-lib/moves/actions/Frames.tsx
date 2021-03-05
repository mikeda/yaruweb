import React from 'react';
import { FrameText, FrameTypeText } from '@/lib/graphql/enum_texts';
import { FrameStateEnum, FrameFragment, FrameTypeEnum } from '@/lib/graphql/types';

import styles from './Action.module.scss';
import { Frame } from './Frame';

interface Props {
  frames: FrameFragment[];
}

export const Frames: React.FC<Props> = ({ frames }) => {
  const frameMap = new Map(frames.map(f => [f.type, f]));

  return (
    <>
      {Object.entries(FrameTypeEnum).map(([k, v]) => {
        const frame = frameMap.get(v);

        return <>{frame && <Frame frame={frame} />}</>;
      })}
    </>
  );
};
