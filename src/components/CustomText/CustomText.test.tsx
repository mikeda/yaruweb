import React from 'react';

import { render } from '@testing-library/react';

import { CustomText } from '@/components';

describe(CustomText, () => {
  test('Snapshot', () => {
    const { asFragment } = render(<CustomText text='lp_rp_lk_rk' />);

    expect(asFragment()).toMatchSnapshot();
  });
});
