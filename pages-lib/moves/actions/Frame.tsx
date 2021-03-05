import React from 'react';
import { FrameText, FrameTypeText } from '@/lib/graphql/enum_texts';
import { FrameStateEnum, FrameFragment } from '@/lib/graphql/types';

import styles from './Frame.module.scss';

export const Frame: React.FC<{ frame: FrameFragment }> = ({ frame }) => {
  return (
    <div className={styles.frame}>
      <span>{FrameTypeText[frame.type]}</span>
      {frame.state !== FrameStateEnum.Unchanged && <span>{FrameText[frame.state]}</span>}
      {frame.frame !== null && frame.frame !== undefined && <span>{frame.frame}</span>}
    </div>
  );
};
