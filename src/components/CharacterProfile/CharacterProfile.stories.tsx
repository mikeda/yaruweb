import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharacterProfile } from '@/components';

export default {
  title: 'Example/CharacterProfile',
  component: CharacterProfile,
} as ComponentMeta<typeof CharacterProfile>;

const Template: ComponentStory<typeof CharacterProfile> = args => <CharacterProfile {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  character: {
    slug: 'josie',
    longName: 'ジョシー・リサール',
    faceImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/uploads/character/face_image/36/Ip3I4Nsgac2Wpg.png',
    country: 'フィリピン',
    fightingStyle: 'エスクリマをベースとしたキックボクシング',
  },
};
