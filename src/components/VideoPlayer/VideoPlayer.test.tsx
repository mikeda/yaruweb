import React from 'react';

import { render } from '@testing-library/react';

import { VideoPlayer } from '@/components';

describe(VideoPlayer, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <VideoPlayer
        src="https://example.com/main.jpg"
        thumnailUrl="https://example.com/main.jpg"
        width={400}
        autoPlay
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
