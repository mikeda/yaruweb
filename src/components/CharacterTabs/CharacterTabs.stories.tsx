import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CharacterTabs } from '@/components';

export default {
  title: 'components/CharacterTabs',
  component: CharacterTabs,
} as ComponentMeta<typeof CharacterTabs>;

const Template: ComponentStory<typeof CharacterTabs> = args => <CharacterTabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  character: {
    slug: 'josie',
    battlesCount: 10,
    combosCount: 20,
    movesCount: 30,
  },
};
