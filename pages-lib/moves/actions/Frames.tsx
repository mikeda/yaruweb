import React from 'react';
import { FrameText, FrameTypeText } from '@/lib/graphql/enum_texts';
import { FrameEnum, FrameFragment, FrameTypeEnum } from '@/lib/graphql/types';

import styles from './Action.module.scss';

interface Props {
  frames: FrameFragment[];
}

export const Frames: React.FC<Props> = ({ frames }) => {
  return (
    <>
      {Object.entries(FrameTypeEnum).map(([k, v]) => (
        <div key={k}>{FrameTypeText[v]}</div>
      ))}
      <div className={styles.frames}>
        {frames.map(frame => {
          return (
            <div key={frame.id}>
              <div>{FrameTypeText[frame.type]}</div>
              {frame.state !== FrameEnum.Unchanged && <div>{FrameText[frame.state]}</div>}
              {frame.frame !== null && frame.frame !== undefined && <div>{frame.frame}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
};
