import React from 'react';

import { render } from '@testing-library/react';

import { ArticleCard } from '@/components';
import { ArticleStatus } from '@/generated/graphql';

describe(ArticleCard, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <ArticleCard
        article={{
          id: '111',
          title: 'タイトル',
          description: '本文',
          mainImageUrl: 'https://example.com/main.jpg',
          publishedAt: '2022-05-05T17:04:40+09:00',
          faved: true,
          favsCount: 1,
          status: ArticleStatus.Published,
          author: { __typename: 'User', name: '著者', avatarUrl: 'https://example.com/avatar.jpg' },
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
