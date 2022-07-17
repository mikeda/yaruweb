import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BattleListItem } from '@/components';
import { BattleRound } from '@/generated/graphql';

export default {
  title: 'Example/BattleListItem',
  component: BattleListItem,
} as ComponentMeta<typeof BattleListItem>;

const Template: ComponentStory<typeof BattleListItem> = args => <BattleListItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  battle: {
    id: 'id',
    round: BattleRound.GrandFinalReset,
    tournamentVideo: {
      id: 'id',
      tournament: {
        id: 'id',
        name: 'トーナメント名',
        startsAt: '2022-05-05T17:00:00+09:00',
      },
    },

    sides: [
      {
        player: { name: 'プレイヤー1' },
        character: { faceImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/site/no_image.jpeg' },
        rounds: 3,
      },
      {
        player: { name: 'プレイヤー2' },
        character: { faceImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/site/no_image.jpeg' },
        rounds: 1,
      },
    ],
  },
};
