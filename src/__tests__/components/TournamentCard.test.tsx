import React from 'react';

import { render } from '@testing-library/react';

import { TournamentCard } from '@/components';

describe(TournamentCard, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <TournamentCard
        tournament={{
          id: '111',
          name: '大会名',
          mainImageUrl: 'https://example.com/main.jpg',
          startsAt: '2022-05-05T17:00:00+09:00',
          videosCount: 1,
          standings: [{ id: '111', place: 1, player: { id: '111', name: 'プレイヤー名' } }],
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
