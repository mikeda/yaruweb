import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharacterCard } from '@/components';

export default {
  title: 'components/CharacterCard',
  component: CharacterCard,
} as ComponentMeta<typeof CharacterCard>;

const Template: ComponentStory<typeof CharacterCard> = args => <CharacterCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  character: {
    slug: 'josie',
    name: 'ジョシー',
    faceImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/uploads/character/face_image/36/Ip3I4Nsgac2Wpg.png',
    country: 'フィリピン',
    fightingStyle: 'エスクリマをベースとしたキックボクシング',
    battlesCount: 10,
  },
};
