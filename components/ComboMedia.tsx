import React from 'react';
import { ComboFragment } from '@/lib/graphql/types';
import { Operations } from './Command/Operations';

import styles from './ComboMedia.module.scss';
import { VideoPlayer } from './MoveMedia/VideoPlayer';

interface Props {
  combo: ComboFragment;
}

export const ComboMedia: React.FC<Props> = ({ combo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{combo.name}</div>

      {combo.comboVideo && (
        <div className={styles.video}>
          <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} />
        </div>
      )}

      <div className={styles.command}>
        <Operations operations={combo.operations} />
      </div>

      {combo.note && combo.note.length > 0 && <div className={styles.note}>{combo.note}</div>}
    </div>
  );
};
