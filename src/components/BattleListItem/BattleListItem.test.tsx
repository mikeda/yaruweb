import React from 'react';

import { render } from '@testing-library/react';

import { BattleListItem } from '@/components';
import { BattleRound } from '@/generated/graphql';

jest.mock('next/router', () => require('next-router-mock'));

describe(BattleListItem, () => {
  test('Snapshot', () => {
    const { asFragment } = render(
      <BattleListItem
        battle={{
          id: '111',
          round: BattleRound.GrandFinalReset,
          startSec: 10,
          tournamentVideo: {
            __typename: 'TournamentVideo',
            id: '222',
            youtubeVideoId: 'HdS-PSdSPok',
            tournament: { __typename: 'Tournament', id: '111', name: '動画名', startsAt: '2022-05-05T17:00:00+09:00' },
          },
          sides: [
            {
              __typename: 'BattleSide',
              rounds: 3,
              player: { __typename: 'Player', name: '対戦者名1' },
              character: { __typename: 'Character', faceImageUrl: 'https://example.com/face.jpg' },
            },
            {
              __typename: 'BattleSide',
              rounds: 1,
              player: { __typename: 'Player', name: '対戦者名2' },
              character: { __typename: 'Character', faceImageUrl: 'https://example.com/face.jpg' },
            },
          ],
        }}
        onClick={() => {}}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
