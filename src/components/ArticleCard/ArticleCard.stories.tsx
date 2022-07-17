import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleCard } from '@/components';
import { ArticleStatus } from '@/generated/graphql';

export default {
  title: 'components/ArticleCard',
  component: ArticleCard,
} as ComponentMeta<typeof ArticleCard>;

const Template: ComponentStory<typeof ArticleCard> = args => <ArticleCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  article: {
    id: 'id',
    title: 'タイトル',
    description: '本文',
    status: ArticleStatus.Published,
    mainImageUrl: 'https://d2ybk292wkc2jl.cloudfront.net/site/no_image.jpeg',
    author: {
      name: 'ミケダ',
      avatarUrl: 'https://d2ybk292wkc2jl.cloudfront.net/site/no_image.jpeg',
    },
  },
};
