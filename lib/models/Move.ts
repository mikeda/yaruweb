import { MoveOpponentState, ThrowTypeEnum } from '@/lib/graphql/types';

export const OPPONENT_STATE_TEXTS: { [key in MoveOpponentState]: string } = {
  unchanged: 'そのまま',
  crouching: 'しゃがみ',
  down: 'ダウン',
  juggle: '空中コンボ',
  stun: '崩れコンボ',
  screw: 'スクリューコンボ',
  smash: '叩きつけコンボ',
  fall_down: '転びコンボ',
};

export const THROW_TYPE_TEXTS: { [key in ThrowTypeEnum]: string } = {
  high: '上段投げ',
  middle: '上段投げ',
  low: '下段投げ',
  down: 'ダウン投げ',
  juggle: '空中投げ',
  wall: '壁投げ',
  combo: '投げコンボ',
};
