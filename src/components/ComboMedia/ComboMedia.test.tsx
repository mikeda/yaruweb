import React from 'react';

import { render } from '@testing-library/react';

import { ComboMedia } from '@/components';

describe(ComboMedia, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <ComboMedia
        combo={{
          id: '111',
          damage: 50,
          command: [],
          note: '解説文',
          comboCategory: { __typename: 'ComboCategory', id: '111', name: 'カテゴリ' },
          comboVideo: {
            __typename: 'ComboVideo',
            id: '111',
            m3u8Url: 'https://example.com/example.jpg',
            thumbnailUrl: 'https://example.com/example.jpg',
          },
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
