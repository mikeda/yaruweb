import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ComboListItem } from '@/components';

export default {
  title: 'Example/ComboListItem',
  component: ComboListItem,
} as ComponentMeta<typeof ComboListItem>;

const Template: ComponentStory<typeof ComboListItem> = args => <ComboListItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  combo: {
    id: 'id',
    command: [
      'df',
      'rp',
      'next',
      'f',
      'lp_rp',
      'next',
      'rk',
      'next',
      'rk',
      'next',
      'f',
      'rp',
      'lk',
      'rk',
      'next',
      'f',
      'rp',
      'lk',
      'lk',
    ],
    damage: 50,
    note: 'コンボの説明',
    move: {
      id: 'id',
    },
    comboVideo: {
      id: 'id',
      m3u8Url:
        'https://yarouyo-dev.s3-ap-northeast-1.amazonaws.com/upload_videos/combo_video/1/w8rOzxYEb4SFFg_hls.m3u8',
      thumbnailUrl:
        'https://yarouyo-dev.s3-ap-northeast-1.amazonaws.com/upload_videos/combo_video/1/w8rOzxYEb4SFFg_thumb.0000000.jpg',
    },
  },
};
