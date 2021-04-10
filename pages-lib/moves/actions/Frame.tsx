import React from 'react';
import { FrameText, FrameTypeText } from '@/lib/graphql/enum_texts';
import { FrameStateEnum, FrameTypeEnum, useDeleteFrameMutation } from '@/lib/graphql/types';

import styles from './Frame.module.scss';

interface FrameType {
  id: string;
  frame?: number | null;
  state?: FrameStateEnum | null;
  type: FrameTypeEnum;
}

interface Props {
  frame: FrameType;
  onDelete: (frameId: string) => void;
}

export const Frame: React.FC<Props> = ({ frame, onDelete }) => {
  const [deleteFrame, { loading }] = useDeleteFrameMutation({
    onCompleted: data => {
      const frame = data.deleteFrame?.frame;
      if (!frame) return;

      onDelete(frame.id);
    },
    onError: e => {
      alert(e.message);
    },
  });

  return (
    <div className={styles.frame}>
      <span>{FrameTypeText[frame.type]}</span>
      {frame.state && <span>{FrameText[frame.state]}</span>}
      {frame.frame !== null && frame.frame !== undefined && <span>{frame.frame}</span>}
      <button
        className="el_btn"
        disabled={loading}
        onClick={() => {
          deleteFrame({ variables: { frameId: frame.id } });
        }}
      >
        削除
      </button>
    </div>
  );
};
