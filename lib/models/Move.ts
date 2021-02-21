import { MoveOpponentState } from '@/lib/graphql/types';

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
