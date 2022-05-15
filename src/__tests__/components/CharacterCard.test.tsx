import React from 'react';

import { render } from '@testing-library/react';

import { CharacterCard } from '@/components';

describe(CharacterCard, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <CharacterCard
        character={{
          slug: 'heihachi',
          name: '平八',
          faceImageUrl: 'https://example.com/example.jpg',
          country: '日本',
          fightingStyle: 'https://example.com/example.jpg',
          battlesCount: 10,
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
