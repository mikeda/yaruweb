import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BattleListItem } from '@/components';
import { BattleRound } from '@/generated/graphql';

export default {
  title: 'components/BattleListItem',
  component: BattleListItem,
} as ComponentMeta<typeof BattleListItem>;

const Template: ComponentStory<typeof BattleListItem> = args => <BattleListItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  battle: {
    id: 'id',
    round: BattleRound.GrandFinalReset,
    startSec: 10,
    tournamentVideo: {
      id: 'id',
      youtubeVideoId: 'HdS-PSdSPok',
      tournament: {
        id: 'id',
        name: 'トーナメント名',
        startsAt: '2022-05-05T17:00:00+09:00',
      },
    },

    sides: [
      {
        id: '1',
        rounds: 3,
        player: { id: '1', name: 'プレイヤー1' },
        character: { id: '1', faceImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/site/no_image.jpeg' },
      },
      {
        id: '2',
        rounds: 1,
        player: { id: '2', name: 'プレイヤー2' },
        character: { id: '2', faceImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/site/no_image.jpeg' },
      },
    ],
  },
};
