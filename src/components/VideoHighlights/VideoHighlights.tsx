import React from 'react';

import { TournamentVideoHighlightFragment } from '@/lib/graphql/types';

import styles from './VideoHighlights.module.scss';
import { formatSec } from '@/lib/formatSec';

interface Props {
  highlights: TournamentVideoHighlightFragment[];
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
