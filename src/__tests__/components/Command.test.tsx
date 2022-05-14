import React from 'react';

import { render } from '@testing-library/react';

import { Command } from '@/components';

describe(Command, () => {
  test('Snapshot', () => {
    const { asFragment } = render(<Command command={['レイジ中', 'df', 'lp_rp']} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Elements', () => {
    const { getByText, container } = render(<Command command={['レイジ中', 'df', 'lp_rp']} />);

    expect(getByText('レイジ中')).toBeTruthy();
    expect(container.innerHTML).toMatch('https://yarouyo.s3-ap-northeast-1.amazonaws.com/site/operations/df.svg');
    expect(container.innerHTML).toMatch('https://yarouyo.s3-ap-northeast-1.amazonaws.com/site/operations/lp_rp.svg');
  });
});
