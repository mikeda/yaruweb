import * as Types from './types';

export const ArticleCategoryText: { [key in Types.ArticleCategory]: string } = {
  intro: '入門',
  theory: '解説・戦略',
  event: 'イベント',
  battle: '対戦',
  news: 'ニュース',
  blog: '雑談',
};

export const ArticleStatusText: { [key in Types.ArticleStatus]: string } = {
  draft: '下書き',
  published: '公開中',
};

export const AttackActionStateText: { [key in Types.AttackActionStateEnum]: string } = {
  unspecified: '',
  down: 'ダウン',
  juggle: '空中コンボ',
  stun: '崩れコンボ',
  screw: 'スクリューコンボ',
  smash: '叩きつけコンボ',
  fall_down: '転びコンボ',
  crouching: '強制しゃがみ',
  twist: 'きりもみ',
  only_block: 'ガード可能な有利',
  bow: '強制しゃがみ',
  bend_back: '強制しゃがみ',
};

export const OrderText: { [key in Types.Order]: string } = {
  popular: '人気',
  new: '新着',
};

export const OpponentStateEnumText: { [key in Types.OpponentStateEnum]: string } = {
  to_crouching: 'しゃがみ中',
  to_down: 'ダウン中',
  to_air: '空中',
  to_wall_splat: '壁やられ中',
  to_left: '左側',
  to_right: '右側',
  to_back: '後側',
};

export const AttackTypeEnumText: { [key in Types.AttackTypeEnum]: string } = {
  h: '上',
  m: '中',
  l: '下',
  sm: '特殊中',
  ubh: '上段ガード不能',
  ubm: '中段ガード不能',
  ubl: '下段ガード不能',
  uba: '空中ガード不能',
  t: '打撃投げ',
};

export const ThorwActionStateText: { [key in Types.ThrowActionStateEnum]: string } = {
  unspecified: '',
  down: 'ダウン',
  juggle: '空中コンボ',
};

export const ThrowEscapeEnumText: { [key in Types.ThrowEscapeEnum]: string } = {
  lp_or_rp: 'LP or RP',
  wp: 'LP+RP',
  lp: 'LP',
  rp: 'RP',
  inescapable: '不可',
};

export const ThrowTypeEnumText: { [key in Types.ThrowTypeEnum]: string } = {
  high: '上段投げ',
  middle: '中段投げ',
  low: '下段投げ',
  down: 'ダウン投げ',
  juggle: '空中投げ',
  wall: '壁投げ',
  combo: '投げコンボ',
  left: '左側面投げ',
  right: '右側面投げ',
  back: '背面投げ',
};
