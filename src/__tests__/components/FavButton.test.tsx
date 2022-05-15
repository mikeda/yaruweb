import React from 'react';

import { render } from '@testing-library/react';

import { FavButton } from '@/components';

describe(FavButton, () => {
  test('Snapshot', () => {
    const { asFragment } = render(<FavButton articleId="111" favsCount={10} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
