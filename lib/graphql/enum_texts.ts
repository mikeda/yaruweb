import * as Types from './types';

export const ArticleCategoryText: { [key in Types.ArticleCategory]: string } = {
  intro: '入門',
  theory: '解説・戦略',
  event: 'イベント',
  battle: '対戦',
  news: 'ニュース',
  blog: '雑談',
}

export const ArticleStatusText: { [key in Types.ArticleStatus]: string } = {
  draft: '下書き',
  published: '公開中',
}

export const MoveOpponentStateText: { [key in Types.MoveOpponentState]: string } = {
  unchanged: 'そのまま',
  crouching: 'しゃがみ',
  down: 'ダウン',
  juggle: '空中コンボ',
  stun: '崩れコンボ',
  screw: 'スクリューコンボ',
  smash: '叩きつけコンボ',
  fall_down: '転びコンボ',
}

export const MoveTypeEnumText: { [key in Types.MoveTypeEnum]: string } = {
  attack: '攻撃',
  throw: '投げ',
  attack_reversal: '返し技',
  stance: '構え',
}

export const OrderText: { [key in Types.Order]: string } = {
  popular: '人気',
  new: '新着',
}

export const ThrowTypeEnumText: { [key in Types.ThrowTypeEnum]: string } = {
  high: '上段投げ',
  middle: '中段投げ',
  low: '下段投げ',
  down: 'ダウン投げ',
  juggle: '空中投げ',
  wall: '壁投げ',
  combo: '投げコンボ',
}