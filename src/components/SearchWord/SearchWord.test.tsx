import React from 'react';

import { render } from '@testing-library/react';

import { SearchWord } from '@/components';

describe(SearchWord, () => {
  test('Snapshot', () => {
    const { asFragment } = render(<SearchWord initWord="word" onSearch={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
