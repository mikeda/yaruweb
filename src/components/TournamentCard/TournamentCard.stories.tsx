import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TournamentCard } from '@/components';

export default {
  title: 'components/TournamentCard',
  component: TournamentCard,
} as ComponentMeta<typeof TournamentCard>;

const Template: ComponentStory<typeof TournamentCard> = args => <TournamentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tournament: {
    id: 'id',
    name: 'まんば杯 100',
    mainImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/uploads/tournament/main_image/396/A64wE2NXAjx0SA.jpg',
    startsAt: '2022-05-05T17:00:00+09:00',
    videosCount: 20,
    standings: [
      {
        id: '1',
        place: 1,
        player: {
          id: '1',
          name: 'プレイヤー1',
        },
      },
    ],
  },
};
