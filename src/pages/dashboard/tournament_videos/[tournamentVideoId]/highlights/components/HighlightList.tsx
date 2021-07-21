import React from 'react';
import { TournamentVideoHighlight } from '@/lib/graphql/types';
import { ObjectCardList } from '@/components';
import { formatSec } from '@/lib';

type TournamentVideoHighlightFragment = Pick<TournamentVideoHighlight, 'id' | 'title' | 'startSec'>;

interface Props {
  highlights: TournamentVideoHighlightFragment[];
  onDestroy: (tournamentVideoHighlightId: string) => void;
}

export const HighlightList: React.FC<Props> = ({ highlights, onDestroy }) => {
  return (
    <ObjectCardList
      items={highlights.map(highlight => ({
        id: highlight.id,
        title: `[${formatSec(highlight.startSec)}] ${highlight.title}`,
        links: [
          {
            text: '削除する',
            onClick: () => {
              if (window.confirm('ハイライトを削除します。')) {
                onDestroy(highlight.id);
              }
            },
          },
        ],
      }))}
    />
  );
};
