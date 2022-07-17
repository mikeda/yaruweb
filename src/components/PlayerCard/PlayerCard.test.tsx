import React from 'react';

import { render } from '@testing-library/react';

import { PlayerCard } from '@/components';

describe(PlayerCard, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <PlayerCard
        player={{
          id: '111',
          slug: 'mikeda',
          name: 'プレイヤー名',
          avatarUrl: 'https://example.com/avatar.jpg',
          standingsCount: 10,
          battlesCount: 100,
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
