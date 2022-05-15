import React from 'react';

import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { Loading } from '@/components';

describe(Loading, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <RecoilRoot>
        <Loading />
      </RecoilRoot>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
