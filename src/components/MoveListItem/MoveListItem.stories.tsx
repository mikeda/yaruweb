import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MoveListItem } from '@/components';
import { AttackMoveResultEnum, AttackTypeEnum } from '@/generated/graphql';

export default {
  title: 'Example/MoveListItem',
  component: MoveListItem,
} as ComponentMeta<typeof MoveListItem>;

const Template: ComponentStory<typeof MoveListItem> = args => <MoveListItem {...args} />;

export const Attack = Template.bind({});
Attack.args = {
  move: {
    id: '4',
    name: 'リングアルバイ',
    kana: null,
    command: ['f', 'rp', 'lk', 'lk'],
    note: '2発目カウンターから連続ヒット',
    moveable: {
      __typename: 'AttackMove',
      id: '4',
      startUpFrame: 12,
      duration: null,
      blockFrame: -16,
      blockResult: AttackMoveResultEnum.Normal,
      hitFrame: null,
      hitResult: AttackMoveResultEnum.Down,
      counterFrame: null,
      counterResult: AttackMoveResultEnum.Combo,
      heights: [AttackTypeEnum.H, AttackTypeEnum.L, AttackTypeEnum.M],
      damages: [10, 13, 30],
      powerCrush: false,
      crouchingStatus: false,
      jumpStatus: true,
      homing: false,
      screw: true,
      wallBound: false,
    },
    moveVideo: {
      id: 'id',
      m3u8Url: 'https://yarouyo-dev.s3-ap-northeast-1.amazonaws.com/upload_videos/move_video/1/LNVPKmXHWrwXhA_hls.m3u8',
      thumbnailUrl:
        'https://yarouyo-dev.s3-ap-northeast-1.amazonaws.com/upload_videos/move_video/1/LNVPKmXHWrwXhA_thumb.0000000.jpg',
    },
  },
};
