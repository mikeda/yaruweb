import React from 'react';

import { render } from '@testing-library/react';

import { OperationListSelector } from '@/components';

describe(OperationListSelector, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <OperationListSelector command={['レイジ中', 'df', 'lp_rp']} onClose={() => {}} onChange={() => {}} open />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
