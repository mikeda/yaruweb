import React from 'react';

import { HighlightFragment } from '@/lib/graphql/types';

import styles from './VideoHighlights.module.scss';

interface Props {
  highlights: HighlightFragment[];
  onSelect: (startSec: number) => void;
}

export const VideoHighlights: React.FC<Props> = ({ highlights, onSelect }) => {
  return (
    <ol>
      {highlights.map(highlight => (
        <li key={highlight.id} className={styles.highlight}>
          <a
            className={styles.startSec}
            onClick={() => {
              onSelect(highlight.startSec);
            }}
          >
            {formatSec(highlight.startSec)}
          </a>
          <span className={styles.title}>{highlight.title}</span>
          <span className={styles.playerName}>{highlight.player.name}</span>
        </li>
      ))}
    </ol>
  );
};

const formatSec = (seconds: number) => {
  const times: number[] = [];

  times.push(Math.floor(seconds / 3600));
  times.push(Math.floor((seconds % 3600) / 60));
  times.push(seconds % 60);

  return times.map(t => (t < 10 ? `0${t}` : t.toString())).join(':');
};
