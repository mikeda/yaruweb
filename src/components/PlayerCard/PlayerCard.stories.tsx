import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PlayerCard } from '@/components';

export default {
  title: 'components/PlayerCard',
  component: PlayerCard,
} as ComponentMeta<typeof PlayerCard>;

const Template: ComponentStory<typeof PlayerCard> = args => <PlayerCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  player: {
    id: 'id',
    slug: 'mikeda',
    name: 'ミケダ',
    avatarUrl: 'https://d2ybk292wkc2jl.cloudfront.net/site/no_image.jpeg',
    standingsCount: 10,
    battlesCount: 30,
  },
};
