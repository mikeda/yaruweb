import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import { SignUpForm } from '@/components';

export default {
  title: 'components/forms/SignUpForm',
  component: SignUpForm,
} as ComponentMeta<typeof SignUpForm>;

const Template: ComponentStory<typeof SignUpForm> = args => (
  <RecoilRoot>
    <SignUpForm {...args} />
  </RecoilRoot>
);

export const New = Template.bind({});
New.args = {};
