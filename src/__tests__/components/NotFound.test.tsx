import React from 'react';

import { render } from '@testing-library/react';

import { NotFound } from '@/components';

describe(NotFound, () => {
  test('Snapshot', () => {
    const { asFragment } = render(<NotFound>NotFound</NotFound>);

    expect(asFragment()).toMatchSnapshot();
  });
});
