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

export const AttackMoveResultText: { [key in Types.AttackMoveResultEnum]: string } = {
  normal: '-',
  down: 'ダウン',
  combo: 'コンボ',
};

export const OrderText: { [key in Types.Order]: string } = {
  popular: '人気',
  new: '新着',
};

export const AttackTypeEnumText: { [key in Types.AttackTypeEnum]: string } = {
  h: '上',
  m: '中',
  l: '下',
  sm: '特殊中',
  ubh: '上ガー不',
  ubm: '中ガー不',
  ubl: '下ガー不',
  uba: '空ガー不',
  t: '打投',
  th: '上投',
  tl: '下投',
};

export const AttackMoveStateEnumText: { [key in Types.AttackMoveStateEnum]: string } = {
  crouching: '強制しゃがみ',
  twist: 'きりもみ',
  blockable: 'ガード可能な硬直',
};

export const ThrowMoveResultText: { [key in Types.ThrowMoveResultEnum]: string } = {
  normal: '',
  down: 'ダウン',
  combo: 'コンボ',
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

export const BattleRoundText: { [key in Types.BattleRound]: string } = {
  grand_final: 'Grand Final',
  grand_final_reset: 'Grand Final(リセット)',
  winners_final: 'Winners Final',
  winners_semifinal: 'Winners Semifinal',
  losers_final: 'Losers Final',
  losers_semifinal: 'Losers Semifinal',
  final: 'Final',
  semifinal: 'Semifinal',
};
