import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleForm } from '@/components';
import { ArticleStatus } from '@/generated/graphql';

export default {
  title: 'components/forms/ArticleForm',
  component: ArticleForm,
} as ComponentMeta<typeof ArticleForm>;

const Template: ComponentStory<typeof ArticleForm> = args => <ArticleForm {...args} />;

export const New = Template.bind({});
New.args = {};
