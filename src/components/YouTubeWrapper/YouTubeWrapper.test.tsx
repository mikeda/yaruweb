import React from 'react';

import { render } from '@testing-library/react';

import { YouTubeWrapper } from '@/components';

describe('YouTubeWrapper', () => {
  test('Snapshot', () => {
    const { asFragment } = render(<YouTubeWrapper />);

    expect(asFragment()).toMatchSnapshot();
  });
});
