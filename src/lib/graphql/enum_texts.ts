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

export const OperationText: { [key in Types.OperationEnum]: { text: string; icon: boolean; jpKey?: string } } = {
  ub: { text: '↖', icon: true, jpKey: '7' },
  u: { text: '↑', icon: true, jpKey: '8' },
  uf: { text: '↗', icon: true, jpKey: '9' },
  b: { text: '←', icon: true, jpKey: '4' },
  n: { text: '☆(ニュートラル)', icon: true, jpKey: '5' },
  f: { text: '→', icon: true, jpKey: '6' },
  db: { text: '↙', icon: true, jpKey: '1' },
  d: { text: '↓', icon: true, jpKey: '2' },
  df: { text: '↘', icon: true, jpKey: '3' },
  ub_h: { text: '↖(長押し)', icon: true, jpKey: '7h' },
  u_h: { text: '↑(長押し)', icon: true, jpKey: '8h' },
  uf_h: { text: '↗(長押し)', icon: true, jpKey: '9h' },
  b_h: { text: '←(長押し)', icon: true, jpKey: '4h' },
  f_h: { text: '→(長押し)', icon: true, jpKey: '6h' },
  db_h: { text: '↙(長押し)', icon: true, jpKey: '1h' },
  d_h: { text: '↓(長押し)', icon: true, jpKey: '2h' },
  df_h: { text: '↘(長押し)', icon: true, jpKey: '3h' },
  lp: { text: 'LP', icon: true },
  rp: { text: 'RP', icon: true },
  lk: { text: 'LK', icon: true },
  rk: { text: 'RK', icon: true },
  lp_rp: { text: 'LP+RP', icon: true },
  lp_lk: { text: 'LP+LK', icon: true },
  lp_rk: { text: 'LP+RK', icon: true },
  rp_lk: { text: 'RP+LK', icon: true },
  rp_rk: { text: 'RP+RK', icon: true },
  lk_rk: { text: 'LK+RK', icon: true },
  lp_rp_lk: { text: 'LP+RP+LK', icon: true },
  lp_rp_rk: { text: 'LP+RP+RK', icon: true },
  lp_lk_rk: { text: 'LP+LK+RK', icon: true },
  rp_lk_rk: { text: 'RP+LK+RK', icon: true },
  lp_rp_lk_rk: { text: 'LP+RP+LK+RK', icon: true },
  l_bracket: { text: '【', icon: true },
  r_bracket: { text: '】', icon: true },
  hold: { text: 'ホールド', icon: false },
  long_hold: { text: '最大ホールド', icon: false },
  just: { text: 'ジャスト入力', icon: false },
  side_step: { text: '横移動', icon: false },
  next: { text: '▶', icon: true },
};

export const ReversalTargetEnumText: { [key in Types.ReversalTargetEnum]: string } = {
  high_or_middle: '上中段',
  high: '上段',
  middle: '中段',
  low: '下段',
};

export const ReversalTypeEnumText: { [key in Types.ReversalTypeEnum]: string } = {
  reversal: '返し',
  parry: 'さばき',
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
