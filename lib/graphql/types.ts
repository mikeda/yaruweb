import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded date */
  ISO8601Date: string;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
};

export type Action = AttackAction | ThrowAction;

export type Actionable = {
  id: Scalars['ID'];
  move: Move;
};

export type Article = {
  __typename?: 'Article';
  author: Player;
  category: ArticleCategory;
  commentCount: Scalars['Int'];
  content: Scalars['String'];
  description: Scalars['String'];
  faved: Scalars['Boolean'];
  favsCount: Scalars['Int'];
  id: Scalars['ID'];
  mainImageUrl?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  status: ArticleStatus;
  title: Scalars['String'];
};

export type ArticleAttributes = {
  category: ArticleCategory;
  title: Scalars['String'];
  mainImage?: Maybe<Scalars['String']>;
  content: Scalars['String'];
};

export enum ArticleCategory {
  /** 入門 */
  Intro = 'intro',
  /** 解説・戦略 */
  Theory = 'theory',
  /** イベント */
  Event = 'event',
  /** 対戦 */
  Battle = 'battle',
  /** ニュース */
  News = 'news',
  /** 雑談 */
  Blog = 'blog'
}

export type ArticleCollection = {
  __typename?: 'ArticleCollection';
  paging: Paging;
  records: Array<Article>;
};

export type ArticleComment = {
  __typename?: 'ArticleComment';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  player: Player;
};

export type ArticleLink = {
  __typename?: 'ArticleLink';
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export enum ArticleStatus {
  /** 下書き */
  Draft = 'draft',
  /** 公開中 */
  Published = 'published'
}

export type ArticleVideo = {
  __typename?: 'ArticleVideo';
  id: Scalars['ID'];
  m3u8Url: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type AttackAction = Actionable & {
  __typename?: 'AttackAction';
  attackType: AttackTypeEnum;
  blockAvailable: Scalars['Boolean'];
  blockFrame?: Maybe<Scalars['Int']>;
  blockState: AttackActionStateEnum;
  cleanHitAvailable: Scalars['Boolean'];
  cleanHitFrame?: Maybe<Scalars['Int']>;
  cleanHitState: AttackActionStateEnum;
  counterHitAvailable: Scalars['Boolean'];
  counterHitFrame?: Maybe<Scalars['Int']>;
  counterHitState: AttackActionStateEnum;
  crouchingHitAvailable: Scalars['Boolean'];
  crouchingHitFrame?: Maybe<Scalars['Int']>;
  crouchingHitState: AttackActionStateEnum;
  damage: Scalars['Int'];
  hitAvailable: Scalars['Boolean'];
  hitFrame?: Maybe<Scalars['Int']>;
  hitState: AttackActionStateEnum;
  id: Scalars['ID'];
  move: Move;
};

export type AttackActionAttributes = {
  attackType: AttackTypeEnum;
  damage?: Maybe<Scalars['Int']>;
  blockAvailable: Scalars['Boolean'];
  blockState: AttackActionStateEnum;
  blockFrame?: Maybe<Scalars['Int']>;
  hitAvailable: Scalars['Boolean'];
  hitState: AttackActionStateEnum;
  hitFrame?: Maybe<Scalars['Int']>;
  counterHitAvailable: Scalars['Boolean'];
  counterHitState: AttackActionStateEnum;
  counterHitFrame?: Maybe<Scalars['Int']>;
  cleanHitAvailable: Scalars['Boolean'];
  cleanHitState: AttackActionStateEnum;
  cleanHitFrame?: Maybe<Scalars['Int']>;
  crouchingHitAvailable: Scalars['Boolean'];
  crouchingHitState: AttackActionStateEnum;
  crouchingHitFrame?: Maybe<Scalars['Int']>;
};

export enum AttackActionStateEnum {
  /** 指定なし */
  Unspecified = 'unspecified',
  /** ダウン */
  Down = 'down',
  /** 空中コンボ */
  Juggle = 'juggle',
  /** 崩れコンボ */
  Stun = 'stun',
  /** スクリューコンボ */
  Screw = 'screw',
  /** 叩きつけコンボ */
  Smash = 'smash',
  /** 転びコンボ */
  FallDown = 'fall_down',
  /** 強制しゃがみ */
  Crouching = 'crouching',
  /** きりもみ */
  Twist = 'twist',
  /** ガード可能な有利 */
  OnlyBlock = 'only_block',
  /** へこみ */
  Bow = 'bow',
  /** のけぞり */
  BendBack = 'bend_back',
  /** 回復可能なよろけダウン */
  RecoverableDown = 'recoverable_down'
}

export enum AttackTypeEnum {
  /** 上段 */
  H = 'h',
  /** 中段 */
  M = 'm',
  /** 下段 */
  L = 'l',
  /** 特殊中段 */
  Sm = 'sm',
  /** 上段ガード不能 */
  Ubh = 'ubh',
  /** 中段ガード不能 */
  Ubm = 'ubm',
  /** 下段ガード不能 */
  Ubl = 'ubl',
  /** 空中ガード不能 */
  Uba = 'uba',
  /** 打撃投げ */
  T = 't'
}

export type Channel = {
  __typename?: 'Channel';
  channelId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Character = {
  __typename?: 'Character';
  comboCategories: Array<ComboCategory>;
  conditions: Array<Condition>;
  country: Scalars['String'];
  description: Scalars['String'];
  dlc: Scalars['Boolean'];
  faceImageUrl: Scalars['String'];
  fightingStyle: Scalars['String'];
  id: Scalars['ID'];
  longName: Scalars['String'];
  longNameKana: Scalars['String'];
  mainImageUrl: Scalars['String'];
  moveCategories: Array<MoveCategory>;
  name: Scalars['String'];
  nameKana: Scalars['String'];
  slug: Scalars['ID'];
  states: Array<State>;
  story: Scalars['String'];
};

export type CharacterAttributes = {
  name: Scalars['String'];
  nameKana: Scalars['String'];
  longName: Scalars['String'];
  longNameKana: Scalars['String'];
  slug: Scalars['String'];
  mainImage?: Maybe<Scalars['String']>;
  faceImage?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  fightingStyle: Scalars['String'];
  story: Scalars['String'];
  description: Scalars['String'];
  dlc: Scalars['Boolean'];
};

export type Combo = {
  __typename?: 'Combo';
  comboCategory: ComboCategory;
  comboVideo?: Maybe<ComboVideo>;
  conditions: Array<Condition>;
  damage?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  operations: Array<Operation>;
  state: State;
};

export type ComboAttributes = {
  name: Scalars['String'];
  damage?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  conditionIds: Array<Scalars['ID']>;
  stateId?: Maybe<Scalars['ID']>;
  operationIds: Array<Scalars['ID']>;
  comboVideoId?: Maybe<Scalars['ID']>;
};

export type ComboCategory = {
  __typename?: 'ComboCategory';
  character: Character;
  combos: Array<Combo>;
  combosCount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ComboCategoryAttributes = {
  name: Scalars['String'];
};

export type ComboVideo = {
  __typename?: 'ComboVideo';
  id: Scalars['ID'];
  m3u8Url: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type Command = {
  __typename?: 'Command';
  id: Scalars['ID'];
  move: Move;
  operations: Array<Operation>;
  state: State;
};

export type CommandAttributes = {
  stateId?: Maybe<Scalars['ID']>;
  operationIds: Array<Scalars['ID']>;
};

export type CommentAttributes = {
  message: Scalars['String'];
};

export type Condition = {
  __typename?: 'Condition';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum CountryEnum {
  /** 日本 */
  Jp = 'jp',
  /** 韓国 */
  Kr = 'kr',
  /** 台湾 */
  Tw = 'tw',
  /** 中国 */
  Cn = 'cn',
  /** アメリカ */
  Us = 'us',
  /** アルゼンチン */
  Ar = 'ar',
  /** イギリス */
  Gb = 'gb',
  /** イタリア */
  It = 'it',
  /** オーストラリア */
  Au = 'au',
  /** オーストリア */
  At = 'at',
  /** オランダ */
  Nl = 'nl',
  /** カナダ */
  Ca = 'ca',
  /** ギリシャ */
  Gr = 'gr',
  /** シンガポール */
  Sg = 'sg',
  /** スイス */
  Ch = 'ch',
  /** スウェーデン */
  Se = 'se',
  /** スペイン */
  Es = 'es',
  /** タイ */
  Th = 'th',
  /** デンマーク */
  Dk = 'dk',
  /** ドイツ */
  De = 'de',
  /** ニュージーランド */
  Nz = 'nz',
  /** パキスタン */
  Pk = 'pk',
  /** フィリピン */
  Ph = 'ph',
  /** フィンランド */
  Fi = 'fi',
  /** ブラジル */
  Br = 'br',
  /** フランス */
  Fr = 'fr',
  /** ブルガリア */
  Bg = 'bg',
  /** ペルー */
  Pe = 'pe',
  /** ポーランド */
  Pl = 'pl',
  /** ポルトガル */
  Pt = 'pt',
  /** メキシコ */
  Mx = 'mx'
}

/** Autogenerated input type of CreateArticleComment */
export type CreateArticleCommentInput = {
  articleId: Scalars['ID'];
  attributes: CommentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateArticleComment */
export type CreateArticleCommentPayload = {
  __typename?: 'CreateArticleCommentPayload';
  articleComment: ArticleComment;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateArticleImage */
export type CreateArticleImageInput = {
  image: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateArticleImage */
export type CreateArticleImagePayload = {
  __typename?: 'CreateArticleImagePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateArticle */
export type CreateArticleInput = {
  attributes: ArticleAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateArticleLink */
export type CreateArticleLinkInput = {
  url: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateArticleLink */
export type CreateArticleLinkPayload = {
  __typename?: 'CreateArticleLinkPayload';
  articleLink: ArticleLink;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateArticle */
export type CreateArticlePayload = {
  __typename?: 'CreateArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateArticleVideo */
export type CreateArticleVideoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateArticleVideo */
export type CreateArticleVideoPayload = {
  __typename?: 'CreateArticleVideoPayload';
  articleVideo: ArticleVideo;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  videoUpload: VideoUpload;
};

/** Autogenerated input type of CreateAttackAction */
export type CreateAttackActionInput = {
  moveId: Scalars['ID'];
  attributes: AttackActionAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateAttackAction */
export type CreateAttackActionPayload = {
  __typename?: 'CreateAttackActionPayload';
  action: AttackAction;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateCharacter */
export type CreateCharacterInput = {
  attributes: CharacterAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateCharacter */
export type CreateCharacterPayload = {
  __typename?: 'CreateCharacterPayload';
  character: Character;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateComboCategory */
export type CreateComboCategoryInput = {
  characterSlug: Scalars['ID'];
  attributes: ComboCategoryAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateComboCategory */
export type CreateComboCategoryPayload = {
  __typename?: 'CreateComboCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comboCategory: ComboCategory;
};

/** Autogenerated input type of CreateCombo */
export type CreateComboInput = {
  comboCategoryId: Scalars['ID'];
  attributes: ComboAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateCombo */
export type CreateComboPayload = {
  __typename?: 'CreateComboPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  combo: Combo;
};

/** Autogenerated input type of CreateComboVideo */
export type CreateComboVideoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateComboVideo */
export type CreateComboVideoPayload = {
  __typename?: 'CreateComboVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comboVideo: ComboVideo;
  videoUpload: VideoUpload;
};

/** Autogenerated input type of CreateCommand */
export type CreateCommandInput = {
  moveId: Scalars['ID'];
  attributes: CommandAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateCommand */
export type CreateCommandPayload = {
  __typename?: 'CreateCommandPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  command: Command;
};

/** Autogenerated input type of CreateEvent */
export type CreateEventInput = {
  attributes: EventAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateEvent */
export type CreateEventPayload = {
  __typename?: 'CreateEventPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  event: Event;
};

/** Autogenerated input type of CreateHighlight */
export type CreateHighlightInput = {
  videoId: Scalars['ID'];
  attributes: HighlightAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateHighlight */
export type CreateHighlightPayload = {
  __typename?: 'CreateHighlightPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  highlight: Highlight;
};

/** Autogenerated input type of CreateMoveCategory */
export type CreateMoveCategoryInput = {
  characterSlug: Scalars['ID'];
  attributes: MoveCategoryAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateMoveCategory */
export type CreateMoveCategoryPayload = {
  __typename?: 'CreateMoveCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
};

/** Autogenerated input type of CreateMoveComment */
export type CreateMoveCommentInput = {
  moveId: Scalars['ID'];
  attributes: CommentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateMoveComment */
export type CreateMoveCommentPayload = {
  __typename?: 'CreateMoveCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveComment: MoveComment;
};

/** Autogenerated input type of CreateMove */
export type CreateMoveInput = {
  moveCategoryId: Scalars['ID'];
  attributes: MoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateMove */
export type CreateMovePayload = {
  __typename?: 'CreateMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of CreateMoveVideo */
export type CreateMoveVideoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateMoveVideo */
export type CreateMoveVideoPayload = {
  __typename?: 'CreateMoveVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveVideo: MoveVideo;
  videoUpload: VideoUpload;
};

/** Autogenerated input type of CreatePlayer */
export type CreatePlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreatePlayer */
export type CreatePlayerPayload = {
  __typename?: 'CreatePlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentPlayer: CurrentPlayer;
};

/** Autogenerated input type of CreateStage */
export type CreateStageInput = {
  attributes: StageAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateStage */
export type CreateStagePayload = {
  __typename?: 'CreateStagePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  stage: Stage;
};

/** Autogenerated input type of CreateThrowAction */
export type CreateThrowActionInput = {
  moveId: Scalars['ID'];
  attributes: ThrowActionAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateThrowAction */
export type CreateThrowActionPayload = {
  __typename?: 'CreateThrowActionPayload';
  action: ThrowAction;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateVideoComment */
export type CreateVideoCommentInput = {
  videoId: Scalars['ID'];
  attributes: CommentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateVideoComment */
export type CreateVideoCommentPayload = {
  __typename?: 'CreateVideoCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  videoComment: VideoComment;
};

/** Autogenerated input type of CreateVideoFav */
export type CreateVideoFavInput = {
  videoId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateVideoFav */
export type CreateVideoFavPayload = {
  __typename?: 'CreateVideoFavPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  video: Video;
};

/** Autogenerated input type of CreateVideo */
export type CreateVideoInput = {
  url: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateVideo */
export type CreateVideoPayload = {
  __typename?: 'CreateVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  video: Video;
};

export type CurrentPlayer = {
  __typename?: 'CurrentPlayer';
  avatarUrl: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  role: PlayerRole;
};

export type CurrentPlayerAttributes = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteAction */
export type DeleteActionInput = {
  actionId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteAction */
export type DeleteActionPayload = {
  __typename?: 'DeleteActionPayload';
  action: Action;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteArticle */
export type DeleteArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteArticle */
export type DeleteArticlePayload = {
  __typename?: 'DeleteArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteComboCategory */
export type DeleteComboCategoryInput = {
  comboCategoryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteComboCategory */
export type DeleteComboCategoryPayload = {
  __typename?: 'DeleteComboCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comboCategory: ComboCategory;
};

/** Autogenerated input type of DeleteCombo */
export type DeleteComboInput = {
  comboId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteCombo */
export type DeleteComboPayload = {
  __typename?: 'DeleteComboPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  combo: Combo;
};

/** Autogenerated input type of DeleteCommand */
export type DeleteCommandInput = {
  commandId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteCommand */
export type DeleteCommandPayload = {
  __typename?: 'DeleteCommandPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  command: Command;
};

/** Autogenerated input type of DeleteEvent */
export type DeleteEventInput = {
  eventId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteEvent */
export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  event: Event;
};

/** Autogenerated input type of DeleteHighlight */
export type DeleteHighlightInput = {
  highlightId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteHighlight */
export type DeleteHighlightPayload = {
  __typename?: 'DeleteHighlightPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  highlight: Highlight;
};

/** Autogenerated input type of DeleteMoveCategory */
export type DeleteMoveCategoryInput = {
  moveCategoryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteMoveCategory */
export type DeleteMoveCategoryPayload = {
  __typename?: 'DeleteMoveCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
};

/** Autogenerated input type of DeleteMove */
export type DeleteMoveInput = {
  moveId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteMove */
export type DeleteMovePayload = {
  __typename?: 'DeleteMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of DeleteStage */
export type DeleteStageInput = {
  stageId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteStage */
export type DeleteStagePayload = {
  __typename?: 'DeleteStagePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  stage: Stage;
};

/** Autogenerated input type of DeleteVideoFav */
export type DeleteVideoFavInput = {
  videoId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteVideoFav */
export type DeleteVideoFavPayload = {
  __typename?: 'DeleteVideoFavPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  video: Video;
};

/** Autogenerated input type of DeleteVideo */
export type DeleteVideoInput = {
  videoId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteVideo */
export type DeleteVideoPayload = {
  __typename?: 'DeleteVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  video: Video;
};

export type Event = {
  __typename?: 'Event';
  description: Scalars['String'];
  id: Scalars['ID'];
  mainImageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  organizerName: Scalars['String'];
  organizerTwitterId?: Maybe<Scalars['String']>;
  startsAt: Scalars['ISO8601DateTime'];
  streamingUrl?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  videoUrl?: Maybe<Scalars['String']>;
};

export type EventAttributes = {
  name: Scalars['String'];
  organizerName: Scalars['String'];
  organizerTwitterId?: Maybe<Scalars['String']>;
  mainImage?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  streamingUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  startsAt: Scalars['String'];
  description: Scalars['String'];
};

export type EventCollection = {
  __typename?: 'EventCollection';
  paging: Paging;
  records: Array<Event>;
};

/** Autogenerated input type of FavArticle */
export type FavArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of FavArticle */
export type FavArticlePayload = {
  __typename?: 'FavArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Highlight = {
  __typename?: 'Highlight';
  id: Scalars['ID'];
  player: Player;
  startSec: Scalars['Int'];
  title: Scalars['String'];
  video: Video;
};

export type HighlightAttributes = {
  title: Scalars['String'];
  startSec: Scalars['Int'];
};



export type Move = {
  __typename?: 'Move';
  actions: Array<Action>;
  actionsCount: Scalars['Int'];
  afterState?: Maybe<State>;
  commands: Array<Command>;
  commandsCount: Scalars['Int'];
  conditions: Array<Condition>;
  crouchingStatus: Scalars['Boolean'];
  homing: Scalars['Boolean'];
  id: Scalars['ID'];
  jumpStatus: Scalars['Boolean'];
  kana?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
  moveVideo?: Maybe<MoveVideo>;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  opponentState?: Maybe<OpponentStateEnum>;
  powerCrush: Scalars['Boolean'];
  screw: Scalars['Boolean'];
  startUpFrame?: Maybe<Scalars['Int']>;
  wallBound: Scalars['Boolean'];
};

export type MoveAttributes = {
  afterStateId?: Maybe<Scalars['ID']>;
  moveVideoId?: Maybe<Scalars['ID']>;
  opponentState?: Maybe<OpponentStateEnum>;
  name: Scalars['String'];
  kana?: Maybe<Scalars['String']>;
  startUpFrame?: Maybe<Scalars['Int']>;
  powerCrush: Scalars['Boolean'];
  crouchingStatus: Scalars['Boolean'];
  jumpStatus: Scalars['Boolean'];
  homing: Scalars['Boolean'];
  screw: Scalars['Boolean'];
  wallBound: Scalars['Boolean'];
  note?: Maybe<Scalars['String']>;
  conditionIds: Array<Scalars['ID']>;
};

export type MoveCategory = {
  __typename?: 'MoveCategory';
  character: Character;
  id: Scalars['ID'];
  moves: Array<Move>;
  movesCount: Scalars['Int'];
  name: Scalars['String'];
};

export type MoveCategoryAttributes = {
  name: Scalars['String'];
};

export type MoveComment = {
  __typename?: 'MoveComment';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  move: Move;
  player: Player;
};

export type MoveVideo = {
  __typename?: 'MoveVideo';
  id: Scalars['ID'];
  m3u8Url: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<CreateArticlePayload>;
  createArticleComment?: Maybe<CreateArticleCommentPayload>;
  createArticleImage?: Maybe<CreateArticleImagePayload>;
  createArticleLink?: Maybe<CreateArticleLinkPayload>;
  createArticleVideo?: Maybe<CreateArticleVideoPayload>;
  createAttackAction?: Maybe<CreateAttackActionPayload>;
  createCharacter?: Maybe<CreateCharacterPayload>;
  createCombo?: Maybe<CreateComboPayload>;
  createComboCategory?: Maybe<CreateComboCategoryPayload>;
  createComboVideo?: Maybe<CreateComboVideoPayload>;
  createCommand?: Maybe<CreateCommandPayload>;
  createEvent?: Maybe<CreateEventPayload>;
  createHighlight?: Maybe<CreateHighlightPayload>;
  createMove?: Maybe<CreateMovePayload>;
  createMoveCategory?: Maybe<CreateMoveCategoryPayload>;
  createMoveComment?: Maybe<CreateMoveCommentPayload>;
  createMoveVideo?: Maybe<CreateMoveVideoPayload>;
  createPlayer?: Maybe<CreatePlayerPayload>;
  createStage?: Maybe<CreateStagePayload>;
  createThrowAction?: Maybe<CreateThrowActionPayload>;
  createVideo?: Maybe<CreateVideoPayload>;
  createVideoComment?: Maybe<CreateVideoCommentPayload>;
  createVideoFav?: Maybe<CreateVideoFavPayload>;
  deleteAction?: Maybe<DeleteActionPayload>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  deleteCombo?: Maybe<DeleteComboPayload>;
  deleteComboCategory?: Maybe<DeleteComboCategoryPayload>;
  deleteCommand?: Maybe<DeleteCommandPayload>;
  deleteEvent?: Maybe<DeleteEventPayload>;
  deleteHighlight?: Maybe<DeleteHighlightPayload>;
  deleteMove?: Maybe<DeleteMovePayload>;
  deleteMoveCategory?: Maybe<DeleteMoveCategoryPayload>;
  deleteStage?: Maybe<DeleteStagePayload>;
  deleteVideo?: Maybe<DeleteVideoPayload>;
  deleteVideoFav?: Maybe<DeleteVideoFavPayload>;
  favArticle?: Maybe<FavArticlePayload>;
  publishArticle?: Maybe<PublishArticlePayload>;
  setPlayerAvatar?: Maybe<SetPlayerAvatarPayload>;
  stopArticle?: Maybe<StopArticlePayload>;
  unfavArticle?: Maybe<UnfavArticlePayload>;
  updateArticle?: Maybe<UpdateArticlePayload>;
  updateAttackAction?: Maybe<UpdateAttackActionPayload>;
  updateCharacter?: Maybe<UpdateCharacterPayload>;
  updateCombo?: Maybe<UpdateComboPayload>;
  updateComboCategory?: Maybe<UpdateComboCategoryPayload>;
  updateComboCategoryPosition?: Maybe<UpdateComboCategoryPositionPayload>;
  updateComboPosition?: Maybe<UpdateComboPositionPayload>;
  updateCommand?: Maybe<UpdateCommandPayload>;
  updateCurrentPlayer?: Maybe<UpdateCurrentPlayerPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  updateHighlight?: Maybe<UpdateHighlightPayload>;
  updateMove?: Maybe<UpdateMovePayload>;
  updateMoveCategory?: Maybe<UpdateMoveCategoryPayload>;
  updateMoveCategoryPosition?: Maybe<UpdateMoveCategoryPositionPayload>;
  updateMovePosition?: Maybe<UpdateMovePositionPayload>;
  updateStage?: Maybe<UpdateStagePayload>;
  updateStagePosition?: Maybe<UpdateStagePositionPayload>;
  updateThrowAction?: Maybe<UpdateThrowActionPayload>;
  updateVideo?: Maybe<UpdateVideoPayload>;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationCreateArticleCommentArgs = {
  input: CreateArticleCommentInput;
};


export type MutationCreateArticleImageArgs = {
  input: CreateArticleImageInput;
};


export type MutationCreateArticleLinkArgs = {
  input: CreateArticleLinkInput;
};


export type MutationCreateArticleVideoArgs = {
  input: CreateArticleVideoInput;
};


export type MutationCreateAttackActionArgs = {
  input: CreateAttackActionInput;
};


export type MutationCreateCharacterArgs = {
  input: CreateCharacterInput;
};


export type MutationCreateComboArgs = {
  input: CreateComboInput;
};


export type MutationCreateComboCategoryArgs = {
  input: CreateComboCategoryInput;
};


export type MutationCreateComboVideoArgs = {
  input: CreateComboVideoInput;
};


export type MutationCreateCommandArgs = {
  input: CreateCommandInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateHighlightArgs = {
  input: CreateHighlightInput;
};


export type MutationCreateMoveArgs = {
  input: CreateMoveInput;
};


export type MutationCreateMoveCategoryArgs = {
  input: CreateMoveCategoryInput;
};


export type MutationCreateMoveCommentArgs = {
  input: CreateMoveCommentInput;
};


export type MutationCreateMoveVideoArgs = {
  input: CreateMoveVideoInput;
};


export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type MutationCreateStageArgs = {
  input: CreateStageInput;
};


export type MutationCreateThrowActionArgs = {
  input: CreateThrowActionInput;
};


export type MutationCreateVideoArgs = {
  input: CreateVideoInput;
};


export type MutationCreateVideoCommentArgs = {
  input: CreateVideoCommentInput;
};


export type MutationCreateVideoFavArgs = {
  input: CreateVideoFavInput;
};


export type MutationDeleteActionArgs = {
  input: DeleteActionInput;
};


export type MutationDeleteArticleArgs = {
  input: DeleteArticleInput;
};


export type MutationDeleteComboArgs = {
  input: DeleteComboInput;
};


export type MutationDeleteComboCategoryArgs = {
  input: DeleteComboCategoryInput;
};


export type MutationDeleteCommandArgs = {
  input: DeleteCommandInput;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


export type MutationDeleteHighlightArgs = {
  input: DeleteHighlightInput;
};


export type MutationDeleteMoveArgs = {
  input: DeleteMoveInput;
};


export type MutationDeleteMoveCategoryArgs = {
  input: DeleteMoveCategoryInput;
};


export type MutationDeleteStageArgs = {
  input: DeleteStageInput;
};


export type MutationDeleteVideoArgs = {
  input: DeleteVideoInput;
};


export type MutationDeleteVideoFavArgs = {
  input: DeleteVideoFavInput;
};


export type MutationFavArticleArgs = {
  input: FavArticleInput;
};


export type MutationPublishArticleArgs = {
  input: PublishArticleInput;
};


export type MutationSetPlayerAvatarArgs = {
  input: SetPlayerAvatarInput;
};


export type MutationStopArticleArgs = {
  input: StopArticleInput;
};


export type MutationUnfavArticleArgs = {
  input: UnfavArticleInput;
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};


export type MutationUpdateAttackActionArgs = {
  input: UpdateAttackActionInput;
};


export type MutationUpdateCharacterArgs = {
  input: UpdateCharacterInput;
};


export type MutationUpdateComboArgs = {
  input: UpdateComboInput;
};


export type MutationUpdateComboCategoryArgs = {
  input: UpdateComboCategoryInput;
};


export type MutationUpdateComboCategoryPositionArgs = {
  input: UpdateComboCategoryPositionInput;
};


export type MutationUpdateComboPositionArgs = {
  input: UpdateComboPositionInput;
};


export type MutationUpdateCommandArgs = {
  input: UpdateCommandInput;
};


export type MutationUpdateCurrentPlayerArgs = {
  input: UpdateCurrentPlayerInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateHighlightArgs = {
  input: UpdateHighlightInput;
};


export type MutationUpdateMoveArgs = {
  input: UpdateMoveInput;
};


export type MutationUpdateMoveCategoryArgs = {
  input: UpdateMoveCategoryInput;
};


export type MutationUpdateMoveCategoryPositionArgs = {
  input: UpdateMoveCategoryPositionInput;
};


export type MutationUpdateMovePositionArgs = {
  input: UpdateMovePositionInput;
};


export type MutationUpdateStageArgs = {
  input: UpdateStageInput;
};


export type MutationUpdateStagePositionArgs = {
  input: UpdateStagePositionInput;
};


export type MutationUpdateThrowActionArgs = {
  input: UpdateThrowActionInput;
};


export type MutationUpdateVideoArgs = {
  input: UpdateVideoInput;
};

export type Operation = {
  __typename?: 'Operation';
  icon: Scalars['Boolean'];
  id: Scalars['ID'];
  key: Scalars['String'];
  name: Scalars['String'];
};

export enum OpponentStateEnum {
  /** しゃがみ中 */
  ToCrouching = 'to_crouching',
  /** ダウン中 */
  ToDown = 'to_down',
  /** 空中 */
  ToAir = 'to_air',
  /** 壁やられ中 */
  ToWallSplat = 'to_wall_splat',
  /** 左側 */
  ToLeft = 'to_left',
  /** 右側 */
  ToRight = 'to_right',
  /** 後側 */
  ToBack = 'to_back'
}

export enum Order {
  /** 人気 */
  Popular = 'popular',
  /** 新着 */
  New = 'new'
}

export type Paging = {
  __typename?: 'Paging';
  currentPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Player = {
  __typename?: 'Player';
  avatarUrl: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  twitterId?: Maybe<Scalars['String']>;
};

export enum PlayerRole {
  /** ユーザー */
  User = 'user',
  /** 管理者 */
  Admin = 'admin'
}

/** Autogenerated input type of PublishArticle */
export type PublishArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of PublishArticle */
export type PublishArticlePayload = {
  __typename?: 'PublishArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  action: Action;
  allArticles: Array<Article>;
  article: Article;
  articleComments: Array<ArticleComment>;
  articles: ArticleCollection;
  attackAction: AttackAction;
  character: Character;
  characters: Array<Character>;
  combo: Combo;
  comboCategories: Array<ComboCategory>;
  comboCategory: ComboCategory;
  combos: Array<Combo>;
  command: Command;
  conditions: Array<Condition>;
  currentPlayer: CurrentPlayer;
  event: Event;
  events: EventCollection;
  highlight: Highlight;
  highlights: Array<Highlight>;
  move: Move;
  moveCategories: Array<MoveCategory>;
  moveCategory: MoveCategory;
  moveComments: Array<MoveComment>;
  moves: Array<Move>;
  myArticle: Article;
  myArticles: ArticleCollection;
  operations: Array<Operation>;
  stage: Stage;
  stages: Array<Stage>;
  states: Array<State>;
  throwAction: ThrowAction;
  topPlayers: Array<TopPlayer>;
  video: Video;
  videoComments: Array<VideoComment>;
  videos: VideoCollection;
};


export type QueryActionArgs = {
  actionId: Scalars['ID'];
};


export type QueryArticleArgs = {
  articleId: Scalars['ID'];
};


export type QueryArticleCommentsArgs = {
  articleId: Scalars['ID'];
};


export type QueryArticlesArgs = {
  category?: Maybe<ArticleCategory>;
  order?: Maybe<Order>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
};


export type QueryAttackActionArgs = {
  actionId: Scalars['ID'];
};


export type QueryCharacterArgs = {
  characterSlug: Scalars['ID'];
};


export type QueryComboArgs = {
  comboId: Scalars['ID'];
};


export type QueryComboCategoriesArgs = {
  characterSlug?: Maybe<Scalars['ID']>;
};


export type QueryComboCategoryArgs = {
  comboCategoryId: Scalars['ID'];
};


export type QueryCombosArgs = {
  comboCategoryId: Scalars['ID'];
};


export type QueryCommandArgs = {
  commandId: Scalars['ID'];
};


export type QueryConditionsArgs = {
  characterSlug: Scalars['ID'];
};


export type QueryEventArgs = {
  eventId: Scalars['ID'];
};


export type QueryEventsArgs = {
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
};


export type QueryHighlightArgs = {
  highlightId: Scalars['ID'];
};


export type QueryHighlightsArgs = {
  videoId: Scalars['ID'];
};


export type QueryMoveArgs = {
  moveId: Scalars['ID'];
};


export type QueryMoveCategoriesArgs = {
  characterSlug?: Maybe<Scalars['ID']>;
};


export type QueryMoveCategoryArgs = {
  moveCategoryId: Scalars['ID'];
};


export type QueryMoveCommentsArgs = {
  moveId: Scalars['ID'];
};


export type QueryMovesArgs = {
  moveCategoryId: Scalars['ID'];
};


export type QueryMyArticleArgs = {
  articleId: Scalars['ID'];
};


export type QueryMyArticlesArgs = {
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
};


export type QueryStageArgs = {
  stageId: Scalars['ID'];
};


export type QueryStatesArgs = {
  characterSlug: Scalars['ID'];
};


export type QueryThrowActionArgs = {
  actionId: Scalars['ID'];
};


export type QueryVideoArgs = {
  videoId: Scalars['ID'];
};


export type QueryVideoCommentsArgs = {
  videoId: Scalars['ID'];
};


export type QueryVideosArgs = {
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
};

/** Autogenerated input type of SetPlayerAvatar */
export type SetPlayerAvatarInput = {
  avatar: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of SetPlayerAvatar */
export type SetPlayerAvatarPayload = {
  __typename?: 'SetPlayerAvatarPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: Player;
};

export type Stage = {
  __typename?: 'Stage';
  balconyBreak: Scalars['Boolean'];
  floorBreak: Scalars['Boolean'];
  id: Scalars['ID'];
  infinite: Scalars['Boolean'];
  mainImageUrl: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Int'];
  wall: Scalars['Boolean'];
  wallBreak: Scalars['Boolean'];
};

export type StageAttributes = {
  name: Scalars['String'];
  mainImage?: Maybe<Scalars['String']>;
  infinite: Scalars['Boolean'];
  wall: Scalars['Boolean'];
  wallBreak: Scalars['Boolean'];
  balconyBreak: Scalars['Boolean'];
  floorBreak: Scalars['Boolean'];
};

export type State = {
  __typename?: 'State';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Autogenerated input type of StopArticle */
export type StopArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of StopArticle */
export type StopArticlePayload = {
  __typename?: 'StopArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type ThrowAction = Actionable & {
  __typename?: 'ThrowAction';
  damage: Scalars['Int'];
  escape: ThrowEscapeEnum;
  id: Scalars['ID'];
  move: Move;
  throwAvailable: Scalars['Boolean'];
  throwEscapeAvailable: Scalars['Boolean'];
  throwEscapeFrame?: Maybe<Scalars['Int']>;
  throwEscapeState: ThrowActionStateEnum;
  throwFrame?: Maybe<Scalars['Int']>;
  throwState: ThrowActionStateEnum;
  throwType: ThrowTypeEnum;
};

export type ThrowActionAttributes = {
  throwType: ThrowTypeEnum;
  damage: Scalars['Int'];
  escape: ThrowEscapeEnum;
  throwAvailable: Scalars['Boolean'];
  throwState: ThrowActionStateEnum;
  throwFrame?: Maybe<Scalars['Int']>;
  throwEscapeAvailable: Scalars['Boolean'];
  throwEscapeState: ThrowActionStateEnum;
  throwEscapeFrame?: Maybe<Scalars['Int']>;
};

export enum ThrowActionStateEnum {
  /** 指定なし */
  Unspecified = 'unspecified',
  /** ダウン */
  Down = 'down',
  /** 空中コンボ */
  Juggle = 'juggle'
}

export enum ThrowEscapeEnum {
  /** LP OR RP */
  LpOrRp = 'lp_or_rp',
  /** WP */
  Wp = 'wp',
  /** LP */
  Lp = 'lp',
  /** RP */
  Rp = 'rp',
  /** 不可 */
  Inescapable = 'inescapable'
}

export enum ThrowTypeEnum {
  /** 上段投げ */
  High = 'high',
  /** 中段投げ */
  Middle = 'middle',
  /** 下段投げ */
  Low = 'low',
  /** ダウン投げ */
  Down = 'down',
  /** 空中投げ */
  Juggle = 'juggle',
  /** 壁投げ */
  Wall = 'wall',
  /** 投げコンボ */
  Combo = 'combo',
  /** 左側面投げ */
  Left = 'left',
  /** 右側面投げ */
  Right = 'right',
  /** 背面投げ */
  Back = 'back'
}

export type TopPlayer = {
  __typename?: 'TopPlayer';
  avatarUrl: Scalars['String'];
  birthday?: Maybe<Scalars['ISO8601Date']>;
  characters: Array<Character>;
  country: CountryEnum;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  kana: Scalars['String'];
  name: Scalars['String'];
  results: Array<TopPlayerResult>;
  slug: Scalars['String'];
  streamingUrl?: Maybe<Scalars['String']>;
  twitterId: Scalars['String'];
};

export type TopPlayerResult = {
  __typename?: 'TopPlayerResult';
  eventDate: Scalars['ISO8601Date'];
  eventName: Scalars['String'];
  id: Scalars['ID'];
  ranking: Scalars['String'];
};

/** Autogenerated input type of UnfavArticle */
export type UnfavArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnfavArticle */
export type UnfavArticlePayload = {
  __typename?: 'UnfavArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateArticle */
export type UpdateArticleInput = {
  articleId: Scalars['ID'];
  attributes: ArticleAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateArticle */
export type UpdateArticlePayload = {
  __typename?: 'UpdateArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateAttackAction */
export type UpdateAttackActionInput = {
  actionId: Scalars['ID'];
  attributes: AttackActionAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateAttackAction */
export type UpdateAttackActionPayload = {
  __typename?: 'UpdateAttackActionPayload';
  action: AttackAction;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateCharacter */
export type UpdateCharacterInput = {
  characterSlug: Scalars['ID'];
  attributes: CharacterAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCharacter */
export type UpdateCharacterPayload = {
  __typename?: 'UpdateCharacterPayload';
  character: Character;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateComboCategory */
export type UpdateComboCategoryInput = {
  comboCategoryId: Scalars['ID'];
  attributes: ComboCategoryAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateComboCategory */
export type UpdateComboCategoryPayload = {
  __typename?: 'UpdateComboCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comboCategory: ComboCategory;
};

/** Autogenerated input type of UpdateComboCategoryPosition */
export type UpdateComboCategoryPositionInput = {
  comboCategoryId: Scalars['ID'];
  newPosition: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateComboCategoryPosition */
export type UpdateComboCategoryPositionPayload = {
  __typename?: 'UpdateComboCategoryPositionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comboCategory: ComboCategory;
};

/** Autogenerated input type of UpdateCombo */
export type UpdateComboInput = {
  comboId: Scalars['ID'];
  attributes: ComboAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCombo */
export type UpdateComboPayload = {
  __typename?: 'UpdateComboPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  combo: Combo;
};

/** Autogenerated input type of UpdateComboPosition */
export type UpdateComboPositionInput = {
  comboId: Scalars['ID'];
  newPosition: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateComboPosition */
export type UpdateComboPositionPayload = {
  __typename?: 'UpdateComboPositionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  combo: Combo;
};

/** Autogenerated input type of UpdateCommand */
export type UpdateCommandInput = {
  commandId: Scalars['ID'];
  attributes: CommandAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCommand */
export type UpdateCommandPayload = {
  __typename?: 'UpdateCommandPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  command: Command;
};

/** Autogenerated input type of UpdateCurrentPlayer */
export type UpdateCurrentPlayerInput = {
  attributes: CurrentPlayerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCurrentPlayer */
export type UpdateCurrentPlayerPayload = {
  __typename?: 'UpdateCurrentPlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentPlayer: CurrentPlayer;
};

/** Autogenerated input type of UpdateEvent */
export type UpdateEventInput = {
  eventId: Scalars['ID'];
  attributes: EventAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEvent */
export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  event: Event;
};

/** Autogenerated input type of UpdateHighlight */
export type UpdateHighlightInput = {
  highlightId: Scalars['ID'];
  attributes: HighlightAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateHighlight */
export type UpdateHighlightPayload = {
  __typename?: 'UpdateHighlightPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  highlight: Highlight;
};

/** Autogenerated input type of UpdateMoveCategory */
export type UpdateMoveCategoryInput = {
  moveCategoryId: Scalars['ID'];
  attributes: MoveCategoryAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMoveCategory */
export type UpdateMoveCategoryPayload = {
  __typename?: 'UpdateMoveCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
};

/** Autogenerated input type of UpdateMoveCategoryPosition */
export type UpdateMoveCategoryPositionInput = {
  moveCategoryId: Scalars['ID'];
  newPosition: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMoveCategoryPosition */
export type UpdateMoveCategoryPositionPayload = {
  __typename?: 'UpdateMoveCategoryPositionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
};

/** Autogenerated input type of UpdateMove */
export type UpdateMoveInput = {
  moveId: Scalars['ID'];
  attributes: MoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMove */
export type UpdateMovePayload = {
  __typename?: 'UpdateMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of UpdateMovePosition */
export type UpdateMovePositionInput = {
  moveId: Scalars['ID'];
  newPosition: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMovePosition */
export type UpdateMovePositionPayload = {
  __typename?: 'UpdateMovePositionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of UpdateStage */
export type UpdateStageInput = {
  stageId: Scalars['ID'];
  attributes: StageAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateStage */
export type UpdateStagePayload = {
  __typename?: 'UpdateStagePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  stage: Stage;
};

/** Autogenerated input type of UpdateStagePosition */
export type UpdateStagePositionInput = {
  stageId: Scalars['ID'];
  newPosition: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateStagePosition */
export type UpdateStagePositionPayload = {
  __typename?: 'UpdateStagePositionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  stage: Stage;
};

/** Autogenerated input type of UpdateThrowAction */
export type UpdateThrowActionInput = {
  actionId: Scalars['ID'];
  attributes: ThrowActionAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateThrowAction */
export type UpdateThrowActionPayload = {
  __typename?: 'UpdateThrowActionPayload';
  action: ThrowAction;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateVideo */
export type UpdateVideoInput = {
  videoId: Scalars['ID'];
  attributes: VideoAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateVideo */
export type UpdateVideoPayload = {
  __typename?: 'UpdateVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  video: Video;
};

export type Video = {
  __typename?: 'Video';
  channel: Channel;
  commentCount: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  faved: Scalars['Boolean'];
  favsCount: Scalars['Int'];
  highlights: Array<Highlight>;
  highlightsCount: Scalars['Int'];
  id: Scalars['ID'];
  tags: Array<Tag>;
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  videoId: Scalars['String'];
};

export type VideoAttributes = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type VideoCollection = {
  __typename?: 'VideoCollection';
  paging: Paging;
  records: Array<Video>;
};

export type VideoComment = {
  __typename?: 'VideoComment';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  player: Player;
};

export type VideoUpload = {
  __typename?: 'VideoUpload';
  fields: Scalars['String'];
  url: Scalars['String'];
};

export type AttackActionFragment = (
  { __typename: 'AttackAction' }
  & Pick<AttackAction, 'id' | 'attackType' | 'damage' | 'blockAvailable' | 'blockState' | 'blockFrame' | 'hitAvailable' | 'hitState' | 'hitFrame' | 'counterHitAvailable' | 'counterHitState' | 'counterHitFrame' | 'cleanHitAvailable' | 'cleanHitState' | 'cleanHitFrame' | 'crouchingHitAvailable' | 'crouchingHitState' | 'crouchingHitFrame'>
);

export type ThrowActionFragment = (
  { __typename: 'ThrowAction' }
  & Pick<ThrowAction, 'id' | 'throwType' | 'damage' | 'escape' | 'throwAvailable' | 'throwState' | 'throwFrame' | 'throwEscapeAvailable' | 'throwEscapeState' | 'throwEscapeFrame'>
);

type Action_AttackAction_Fragment = (
  { __typename?: 'AttackAction' }
  & AttackActionFragment
);

type Action_ThrowAction_Fragment = (
  { __typename?: 'ThrowAction' }
  & ThrowActionFragment
);

export type ActionFragment = Action_AttackAction_Fragment | Action_ThrowAction_Fragment;

export type ArticleFragment = (
  { __typename?: 'Article' }
  & Pick<Article, 'category' | 'content'>
  & ArticleSummaryFragment
);

export type ArticleCommentFragment = (
  { __typename?: 'ArticleComment' }
  & Pick<ArticleComment, 'id' | 'message' | 'createdAt'>
  & { player: (
    { __typename?: 'Player' }
    & Pick<Player, 'name' | 'avatarUrl'>
  ) }
);

export type ArticleLinkFragment = (
  { __typename?: 'ArticleLink' }
  & Pick<ArticleLink, 'url' | 'title' | 'description' | 'imageUrl'>
);

export type ArticleSummaryFragment = (
  { __typename?: 'Article' }
  & Pick<Article, 'id' | 'title' | 'description' | 'mainImageUrl' | 'publishedAt' | 'faved' | 'favsCount' | 'status'>
  & { author: (
    { __typename?: 'Player' }
    & Pick<Player, 'name' | 'avatarUrl'>
  ) }
);

export type CharacterFragment = (
  { __typename?: 'Character' }
  & Pick<Character, 'nameKana' | 'longNameKana' | 'mainImageUrl' | 'story' | 'description' | 'dlc'>
  & CharacterSummaryFragment
);

export type CharacterSummaryFragment = (
  { __typename?: 'Character' }
  & Pick<Character, 'slug' | 'name' | 'longName' | 'faceImageUrl' | 'country' | 'fightingStyle'>
);

export type CharacterWithChildrenFragment = (
  { __typename?: 'Character' }
  & { moveCategories: Array<(
    { __typename?: 'MoveCategory' }
    & MoveCategoryFragment
  )>, comboCategories: Array<(
    { __typename?: 'ComboCategory' }
    & ComboCategoryFragment
  )> }
  & CharacterFragment
);

export type ComboFragment = (
  { __typename?: 'Combo' }
  & Pick<Combo, 'id' | 'name' | 'damage' | 'note'>
  & { comboCategory: (
    { __typename?: 'ComboCategory' }
    & Pick<ComboCategory, 'id' | 'name'>
  ), comboVideo?: Maybe<(
    { __typename?: 'ComboVideo' }
    & ComboVideoFragment
  )>, conditions: Array<(
    { __typename?: 'Condition' }
    & ConditionFragment
  )>, operations: Array<(
    { __typename?: 'Operation' }
    & OperationFragment
  )> }
);

export type ComboCategoryFragment = (
  { __typename?: 'ComboCategory' }
  & Pick<ComboCategory, 'id' | 'name'>
);

export type ComboCategoryDetailFragment = (
  { __typename?: 'ComboCategory' }
  & Pick<ComboCategory, 'id' | 'name'>
  & { character: (
    { __typename?: 'Character' }
    & CharacterFragment
  ), combos: Array<(
    { __typename?: 'Combo' }
    & ComboFragment
  )> }
);

export type ComboCategoryWithCharacterFragment = (
  { __typename?: 'ComboCategory' }
  & { character: (
    { __typename?: 'Character' }
    & CharacterFragment
  ) }
  & ComboCategoryFragment
);

export type ComboVideoFragment = (
  { __typename?: 'ComboVideo' }
  & Pick<ComboVideo, 'id' | 'm3u8Url' | 'thumbnailUrl'>
);

export type CommandFragment = (
  { __typename?: 'Command' }
  & Pick<Command, 'id'>
  & { state: (
    { __typename?: 'State' }
    & StateFragment
  ), operations: Array<(
    { __typename?: 'Operation' }
    & OperationFragment
  )> }
);

export type ConditionFragment = (
  { __typename?: 'Condition' }
  & Pick<Condition, 'id' | 'name'>
);

export type CurrentPlayerFragment = (
  { __typename?: 'CurrentPlayer' }
  & Pick<CurrentPlayer, 'id' | 'name' | 'role' | 'avatarUrl'>
);

export type EventFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'name' | 'mainImageUrl' | 'url' | 'streamingUrl' | 'videoUrl' | 'description' | 'organizerName' | 'organizerTwitterId' | 'startsAt'>
);

export type HighlightFragment = (
  { __typename?: 'Highlight' }
  & Pick<Highlight, 'id' | 'title' | 'startSec'>
  & { player: (
    { __typename?: 'Player' }
    & Pick<Player, 'name'>
  ) }
);

export type MoveFragment = (
  { __typename?: 'Move' }
  & Pick<Move, 'id' | 'name' | 'kana' | 'opponentState' | 'startUpFrame' | 'powerCrush' | 'crouchingStatus' | 'jumpStatus' | 'homing' | 'screw' | 'wallBound' | 'note'>
  & { moveCategory: (
    { __typename?: 'MoveCategory' }
    & Pick<MoveCategory, 'id' | 'name'>
  ), afterState?: Maybe<(
    { __typename?: 'State' }
    & Pick<State, 'id' | 'name'>
  )>, moveVideo?: Maybe<(
    { __typename?: 'MoveVideo' }
    & MoveVideoFragment
  )>, commands: Array<(
    { __typename?: 'Command' }
    & CommandFragment
  )>, actions: Array<(
    { __typename?: 'AttackAction' }
    & Action_AttackAction_Fragment
  ) | (
    { __typename?: 'ThrowAction' }
    & Action_ThrowAction_Fragment
  )>, conditions: Array<(
    { __typename?: 'Condition' }
    & ConditionFragment
  )> }
);

export type MoveCategoryFragment = (
  { __typename?: 'MoveCategory' }
  & Pick<MoveCategory, 'id' | 'name'>
);

export type MoveCategoryDetailFragment = (
  { __typename?: 'MoveCategory' }
  & Pick<MoveCategory, 'id' | 'name'>
  & { character: (
    { __typename?: 'Character' }
    & CharacterFragment
  ), moves: Array<(
    { __typename?: 'Move' }
    & MoveFragment
  )> }
);

export type MoveCategoryWithCharacterFragment = (
  { __typename?: 'MoveCategory' }
  & { character: (
    { __typename?: 'Character' }
    & CharacterFragment
  ) }
  & MoveCategoryFragment
);

export type MoveCommentFragment = (
  { __typename?: 'MoveComment' }
  & Pick<MoveComment, 'id' | 'message' | 'createdAt'>
  & { player: (
    { __typename?: 'Player' }
    & Pick<Player, 'name' | 'avatarUrl'>
  ) }
);

export type MoveVideoFragment = (
  { __typename?: 'MoveVideo' }
  & Pick<MoveVideo, 'id' | 'm3u8Url' | 'thumbnailUrl'>
);

export type OperationFragment = (
  { __typename?: 'Operation' }
  & Pick<Operation, 'id' | 'name' | 'key' | 'icon'>
);

export type PagingFragment = (
  { __typename?: 'Paging' }
  & Pick<Paging, 'currentPage' | 'totalCount' | 'totalPages'>
);

export type StageFragment = (
  { __typename?: 'Stage' }
  & Pick<Stage, 'id' | 'name' | 'mainImageUrl' | 'infinite' | 'wall' | 'wallBreak' | 'balconyBreak' | 'floorBreak' | 'position'>
);

export type StateFragment = (
  { __typename?: 'State' }
  & Pick<State, 'id' | 'name'>
);

export type TopPlayerFragment = (
  { __typename?: 'TopPlayer' }
  & Pick<TopPlayer, 'id' | 'name' | 'kana' | 'slug' | 'country' | 'avatarUrl' | 'twitterId' | 'streamingUrl' | 'birthday' | 'description'>
  & { characters: Array<(
    { __typename?: 'Character' }
    & Pick<Character, 'name'>
  )>, results: Array<(
    { __typename?: 'TopPlayerResult' }
    & Pick<TopPlayerResult, 'id' | 'eventDate' | 'eventName' | 'ranking'>
  )> }
);

export type VideoFragment = (
  { __typename?: 'Video' }
  & { tags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'name'>
  )>, highlights: Array<(
    { __typename?: 'Highlight' }
    & HighlightFragment
  )> }
  & VideoSummaryFragment
);

export type VideoCommentFragment = (
  { __typename?: 'VideoComment' }
  & Pick<VideoComment, 'id' | 'message' | 'createdAt'>
  & { player: (
    { __typename?: 'Player' }
    & Pick<Player, 'name' | 'avatarUrl'>
  ) }
);

export type VideoSummaryFragment = (
  { __typename?: 'Video' }
  & Pick<Video, 'id' | 'videoId' | 'title' | 'thumbnailUrl' | 'faved' | 'favsCount' | 'commentCount'>
  & { channel: (
    { __typename?: 'Channel' }
    & Pick<Channel, 'name'>
  ) }
);

export type CreateArticleMutationVariables = Exact<{
  attributes: ArticleAttributes;
}>;


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & { createArticle?: Maybe<(
    { __typename?: 'CreateArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & Pick<Article, 'id'>
    ) }
  )> }
);

export type CreateArticleCommentMutationVariables = Exact<{
  articleId: Scalars['ID'];
  attributes: CommentAttributes;
}>;


export type CreateArticleCommentMutation = (
  { __typename?: 'Mutation' }
  & { createArticleComment?: Maybe<(
    { __typename?: 'CreateArticleCommentPayload' }
    & { articleComment: (
      { __typename?: 'ArticleComment' }
      & ArticleCommentFragment
    ) }
  )> }
);

export type CreateArticleImageMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type CreateArticleImageMutation = (
  { __typename?: 'Mutation' }
  & { createArticleImage?: Maybe<(
    { __typename?: 'CreateArticleImagePayload' }
    & Pick<CreateArticleImagePayload, 'url'>
  )> }
);

export type CreateArticleLinkMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateArticleLinkMutation = (
  { __typename?: 'Mutation' }
  & { createArticleLink?: Maybe<(
    { __typename?: 'CreateArticleLinkPayload' }
    & { articleLink: (
      { __typename?: 'ArticleLink' }
      & ArticleLinkFragment
    ) }
  )> }
);

export type CreateArticleVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateArticleVideoMutation = (
  { __typename?: 'Mutation' }
  & { createArticleVideo?: Maybe<(
    { __typename?: 'CreateArticleVideoPayload' }
    & { articleVideo: (
      { __typename?: 'ArticleVideo' }
      & Pick<ArticleVideo, 'id' | 'm3u8Url' | 'thumbnailUrl'>
    ), videoUpload: (
      { __typename?: 'VideoUpload' }
      & Pick<VideoUpload, 'url' | 'fields'>
    ) }
  )> }
);

export type CreateAttackActionMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: AttackActionAttributes;
}>;


export type CreateAttackActionMutation = (
  { __typename?: 'Mutation' }
  & { createAttackAction?: Maybe<(
    { __typename?: 'CreateAttackActionPayload' }
    & { action: (
      { __typename?: 'AttackAction' }
      & AttackActionFragment
    ) }
  )> }
);

export type CreateCharacterMutationVariables = Exact<{
  attributes: CharacterAttributes;
}>;


export type CreateCharacterMutation = (
  { __typename?: 'Mutation' }
  & { createCharacter?: Maybe<(
    { __typename?: 'CreateCharacterPayload' }
    & { character: (
      { __typename?: 'Character' }
      & CharacterFragment
    ) }
  )> }
);

export type CreateComboMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type CreateComboMutation = (
  { __typename?: 'Mutation' }
  & { createCombo?: Maybe<(
    { __typename?: 'CreateComboPayload' }
    & { combo: (
      { __typename?: 'Combo' }
      & Pick<Combo, 'id'>
    ) }
  )> }
);

export type CreateComboCategoryMutationVariables = Exact<{
  characterSlug: Scalars['ID'];
  attributes: ComboCategoryAttributes;
}>;


export type CreateComboCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createComboCategory?: Maybe<(
    { __typename?: 'CreateComboCategoryPayload' }
    & { comboCategory: (
      { __typename?: 'ComboCategory' }
      & Pick<ComboCategory, 'id'>
    ) }
  )> }
);

export type CreateComboVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateComboVideoMutation = (
  { __typename?: 'Mutation' }
  & { createComboVideo?: Maybe<(
    { __typename?: 'CreateComboVideoPayload' }
    & { comboVideo: (
      { __typename?: 'ComboVideo' }
      & ComboVideoFragment
    ), videoUpload: (
      { __typename?: 'VideoUpload' }
      & Pick<VideoUpload, 'url' | 'fields'>
    ) }
  )> }
);

export type CreateCommandMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: CommandAttributes;
}>;


export type CreateCommandMutation = (
  { __typename?: 'Mutation' }
  & { createCommand?: Maybe<(
    { __typename?: 'CreateCommandPayload' }
    & { command: (
      { __typename?: 'Command' }
      & CommandFragment
    ) }
  )> }
);

export type CreateEventMutationVariables = Exact<{
  attributes: EventAttributes;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent?: Maybe<(
    { __typename?: 'CreateEventPayload' }
    & { event: (
      { __typename?: 'Event' }
      & EventFragment
    ) }
  )> }
);

export type CreateHighlightMutationVariables = Exact<{
  videoId: Scalars['ID'];
  attributes: HighlightAttributes;
}>;


export type CreateHighlightMutation = (
  { __typename?: 'Mutation' }
  & { createHighlight?: Maybe<(
    { __typename?: 'CreateHighlightPayload' }
    & { highlight: (
      { __typename?: 'Highlight' }
      & HighlightFragment
    ) }
  )> }
);

export type CreateMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: MoveAttributes;
}>;


export type CreateMoveMutation = (
  { __typename?: 'Mutation' }
  & { createMove?: Maybe<(
    { __typename?: 'CreateMovePayload' }
    & { move: (
      { __typename?: 'Move' }
      & Pick<Move, 'id'>
    ) }
  )> }
);

export type CreateMoveCategoryMutationVariables = Exact<{
  characterSlug: Scalars['ID'];
  attributes: MoveCategoryAttributes;
}>;


export type CreateMoveCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createMoveCategory?: Maybe<(
    { __typename?: 'CreateMoveCategoryPayload' }
    & { moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id'>
    ) }
  )> }
);

export type CreateMoveCommentMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: CommentAttributes;
}>;


export type CreateMoveCommentMutation = (
  { __typename?: 'Mutation' }
  & { createMoveComment?: Maybe<(
    { __typename?: 'CreateMoveCommentPayload' }
    & { moveComment: (
      { __typename?: 'MoveComment' }
      & MoveCommentFragment
    ) }
  )> }
);

export type CreateMoveVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateMoveVideoMutation = (
  { __typename?: 'Mutation' }
  & { createMoveVideo?: Maybe<(
    { __typename?: 'CreateMoveVideoPayload' }
    & { moveVideo: (
      { __typename?: 'MoveVideo' }
      & MoveVideoFragment
    ), videoUpload: (
      { __typename?: 'VideoUpload' }
      & Pick<VideoUpload, 'url' | 'fields'>
    ) }
  )> }
);

export type CreatePlayerMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePlayerMutation = (
  { __typename?: 'Mutation' }
  & { createPlayer?: Maybe<(
    { __typename?: 'CreatePlayerPayload' }
    & { currentPlayer: (
      { __typename?: 'CurrentPlayer' }
      & CurrentPlayerFragment
    ) }
  )> }
);

export type UpdateStageMutationVariables = Exact<{
  stageId: Scalars['ID'];
  attributes: StageAttributes;
}>;


export type UpdateStageMutation = (
  { __typename?: 'Mutation' }
  & { updateStage?: Maybe<(
    { __typename?: 'UpdateStagePayload' }
    & { stage: (
      { __typename?: 'Stage' }
      & StageFragment
    ) }
  )> }
);

export type CreateThrowActionMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: ThrowActionAttributes;
}>;


export type CreateThrowActionMutation = (
  { __typename?: 'Mutation' }
  & { createThrowAction?: Maybe<(
    { __typename?: 'CreateThrowActionPayload' }
    & { action: (
      { __typename?: 'ThrowAction' }
      & Pick<ThrowAction, 'id'>
    ) }
  )> }
);

export type CreateVideoMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateVideoMutation = (
  { __typename?: 'Mutation' }
  & { createVideo?: Maybe<(
    { __typename?: 'CreateVideoPayload' }
    & { video: (
      { __typename?: 'Video' }
      & Pick<Video, 'id'>
    ) }
  )> }
);

export type CreateVideoCommentMutationVariables = Exact<{
  videoId: Scalars['ID'];
  attributes: CommentAttributes;
}>;


export type CreateVideoCommentMutation = (
  { __typename?: 'Mutation' }
  & { createVideoComment?: Maybe<(
    { __typename?: 'CreateVideoCommentPayload' }
    & { videoComment: (
      { __typename?: 'VideoComment' }
      & VideoCommentFragment
    ) }
  )> }
);

export type CreateVideoFavMutationVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type CreateVideoFavMutation = (
  { __typename?: 'Mutation' }
  & { createVideoFav?: Maybe<(
    { __typename?: 'CreateVideoFavPayload' }
    & { video: (
      { __typename?: 'Video' }
      & Pick<Video, 'id'>
    ) }
  )> }
);

export type DeleteActionMutationVariables = Exact<{
  actionId: Scalars['ID'];
}>;


export type DeleteActionMutation = (
  { __typename?: 'Mutation' }
  & { deleteAction?: Maybe<(
    { __typename?: 'DeleteActionPayload' }
    & { action: (
      { __typename?: 'AttackAction' }
      & Action_AttackAction_Fragment
    ) | (
      { __typename?: 'ThrowAction' }
      & Action_ThrowAction_Fragment
    ) }
  )> }
);

export type DeleteArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DeleteArticleMutation = (
  { __typename?: 'Mutation' }
  & { deleteArticle?: Maybe<(
    { __typename?: 'DeleteArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & ArticleFragment
    ) }
  )> }
);

export type DeleteCommandMutationVariables = Exact<{
  commandId: Scalars['ID'];
}>;


export type DeleteCommandMutation = (
  { __typename?: 'Mutation' }
  & { deleteCommand?: Maybe<(
    { __typename?: 'DeleteCommandPayload' }
    & { command: (
      { __typename?: 'Command' }
      & Pick<Command, 'id'>
    ) }
  )> }
);

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type DeleteEventMutation = (
  { __typename?: 'Mutation' }
  & { deleteEvent?: Maybe<(
    { __typename?: 'DeleteEventPayload' }
    & { event: (
      { __typename?: 'Event' }
      & Pick<Event, 'id'>
    ) }
  )> }
);

export type DeleteHighlightMutationVariables = Exact<{
  highlightId: Scalars['ID'];
}>;


export type DeleteHighlightMutation = (
  { __typename?: 'Mutation' }
  & { deleteHighlight?: Maybe<(
    { __typename?: 'DeleteHighlightPayload' }
    & { highlight: (
      { __typename?: 'Highlight' }
      & Pick<Highlight, 'id'>
    ) }
  )> }
);

export type DeleteMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type DeleteMoveMutation = (
  { __typename?: 'Mutation' }
  & { deleteMove?: Maybe<(
    { __typename?: 'DeleteMovePayload' }
    & { move: (
      { __typename?: 'Move' }
      & MoveFragment
    ) }
  )> }
);

export type DeleteVideoMutationVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type DeleteVideoMutation = (
  { __typename?: 'Mutation' }
  & { deleteVideo?: Maybe<(
    { __typename?: 'DeleteVideoPayload' }
    & { video: (
      { __typename?: 'Video' }
      & VideoFragment
    ) }
  )> }
);

export type DeleteVideoFavMutationVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type DeleteVideoFavMutation = (
  { __typename?: 'Mutation' }
  & { deleteVideoFav?: Maybe<(
    { __typename?: 'DeleteVideoFavPayload' }
    & { video: (
      { __typename?: 'Video' }
      & Pick<Video, 'id'>
    ) }
  )> }
);

export type FavArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type FavArticleMutation = (
  { __typename?: 'Mutation' }
  & { favArticle?: Maybe<(
    { __typename?: 'FavArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & Pick<Article, 'id'>
    ) }
  )> }
);

export type PublishArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type PublishArticleMutation = (
  { __typename?: 'Mutation' }
  & { publishArticle?: Maybe<(
    { __typename?: 'PublishArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & ArticleSummaryFragment
    ) }
  )> }
);

export type SetPlayerAvatarMutationVariables = Exact<{
  avatar: Scalars['String'];
}>;


export type SetPlayerAvatarMutation = (
  { __typename?: 'Mutation' }
  & { setPlayerAvatar?: Maybe<(
    { __typename?: 'SetPlayerAvatarPayload' }
    & { player: (
      { __typename?: 'Player' }
      & Pick<Player, 'avatarUrl'>
    ) }
  )> }
);

export type StopArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type StopArticleMutation = (
  { __typename?: 'Mutation' }
  & { stopArticle?: Maybe<(
    { __typename?: 'StopArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & ArticleSummaryFragment
    ) }
  )> }
);

export type UnfavArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type UnfavArticleMutation = (
  { __typename?: 'Mutation' }
  & { unfavArticle?: Maybe<(
    { __typename?: 'UnfavArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & Pick<Article, 'id'>
    ) }
  )> }
);

export type UpdateArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
  attributes: ArticleAttributes;
}>;


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { updateArticle?: Maybe<(
    { __typename?: 'UpdateArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & Pick<Article, 'id'>
    ) }
  )> }
);

export type UpdateAttackActionMutationVariables = Exact<{
  actionId: Scalars['ID'];
  attributes: AttackActionAttributes;
}>;


export type UpdateAttackActionMutation = (
  { __typename?: 'Mutation' }
  & { updateAttackAction?: Maybe<(
    { __typename?: 'UpdateAttackActionPayload' }
    & { action: (
      { __typename?: 'AttackAction' }
      & Pick<AttackAction, 'id'>
    ) }
  )> }
);

export type UpdateCharacterMutationVariables = Exact<{
  characterSlug: Scalars['ID'];
  attributes: CharacterAttributes;
}>;


export type UpdateCharacterMutation = (
  { __typename?: 'Mutation' }
  & { updateCharacter?: Maybe<(
    { __typename?: 'UpdateCharacterPayload' }
    & { character: (
      { __typename?: 'Character' }
      & CharacterFragment
    ) }
  )> }
);

export type UpdateComboMutationVariables = Exact<{
  comboId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type UpdateComboMutation = (
  { __typename?: 'Mutation' }
  & { updateCombo?: Maybe<(
    { __typename?: 'UpdateComboPayload' }
    & { combo: (
      { __typename?: 'Combo' }
      & Pick<Combo, 'id'>
      & { comboCategory: (
        { __typename?: 'ComboCategory' }
        & Pick<ComboCategory, 'id'>
      ) }
    ) }
  )> }
);

export type UpdateComboCategoryMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboCategoryAttributes;
}>;


export type UpdateComboCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateComboCategory?: Maybe<(
    { __typename?: 'UpdateComboCategoryPayload' }
    & { comboCategory: (
      { __typename?: 'ComboCategory' }
      & Pick<ComboCategory, 'id'>
    ) }
  )> }
);

export type UpdateComboCategoryPositionMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateComboCategoryPositionMutation = (
  { __typename?: 'Mutation' }
  & { updateComboCategoryPosition?: Maybe<(
    { __typename?: 'UpdateComboCategoryPositionPayload' }
    & { comboCategory: (
      { __typename?: 'ComboCategory' }
      & Pick<ComboCategory, 'id'>
    ) }
  )> }
);

export type UpdateComboPositionMutationVariables = Exact<{
  comboId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateComboPositionMutation = (
  { __typename?: 'Mutation' }
  & { updateComboPosition?: Maybe<(
    { __typename?: 'UpdateComboPositionPayload' }
    & { combo: (
      { __typename?: 'Combo' }
      & Pick<Combo, 'id'>
    ) }
  )> }
);

export type UpdateCommandMutationVariables = Exact<{
  commandId: Scalars['ID'];
  attributes: CommandAttributes;
}>;


export type UpdateCommandMutation = (
  { __typename?: 'Mutation' }
  & { updateCommand?: Maybe<(
    { __typename?: 'UpdateCommandPayload' }
    & { command: (
      { __typename?: 'Command' }
      & Pick<Command, 'id'>
    ) }
  )> }
);

export type UpdateCurrentPlayerMutationVariables = Exact<{
  attributes: CurrentPlayerAttributes;
}>;


export type UpdateCurrentPlayerMutation = (
  { __typename?: 'Mutation' }
  & { updateCurrentPlayer?: Maybe<(
    { __typename?: 'UpdateCurrentPlayerPayload' }
    & { currentPlayer: (
      { __typename?: 'CurrentPlayer' }
      & CurrentPlayerFragment
    ) }
  )> }
);

export type UpdateEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
  attributes: EventAttributes;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEvent?: Maybe<(
    { __typename?: 'UpdateEventPayload' }
    & { event: (
      { __typename?: 'Event' }
      & EventFragment
    ) }
  )> }
);

export type UpdateHighlightMutationVariables = Exact<{
  highlightId: Scalars['ID'];
  attributes: HighlightAttributes;
}>;


export type UpdateHighlightMutation = (
  { __typename?: 'Mutation' }
  & { updateHighlight?: Maybe<(
    { __typename?: 'UpdateHighlightPayload' }
    & { highlight: (
      { __typename?: 'Highlight' }
      & HighlightFragment
    ) }
  )> }
);

export type UpdateMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: MoveAttributes;
}>;


export type UpdateMoveMutation = (
  { __typename?: 'Mutation' }
  & { updateMove?: Maybe<(
    { __typename?: 'UpdateMovePayload' }
    & { move: (
      { __typename?: 'Move' }
      & Pick<Move, 'id'>
      & { moveCategory: (
        { __typename?: 'MoveCategory' }
        & Pick<MoveCategory, 'id'>
      ) }
    ) }
  )> }
);

export type UpdateMoveCategoryMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: MoveCategoryAttributes;
}>;


export type UpdateMoveCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateMoveCategory?: Maybe<(
    { __typename?: 'UpdateMoveCategoryPayload' }
    & { moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id'>
    ) }
  )> }
);

export type UpdateMoveCategoryPositionMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateMoveCategoryPositionMutation = (
  { __typename?: 'Mutation' }
  & { updateMoveCategoryPosition?: Maybe<(
    { __typename?: 'UpdateMoveCategoryPositionPayload' }
    & { moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id'>
    ) }
  )> }
);

export type UpdateMovePositionMutationVariables = Exact<{
  moveId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateMovePositionMutation = (
  { __typename?: 'Mutation' }
  & { updateMovePosition?: Maybe<(
    { __typename?: 'UpdateMovePositionPayload' }
    & { move: (
      { __typename?: 'Move' }
      & Pick<Move, 'id'>
    ) }
  )> }
);

export type CreateStageMutationVariables = Exact<{
  attributes: StageAttributes;
}>;


export type CreateStageMutation = (
  { __typename?: 'Mutation' }
  & { createStage?: Maybe<(
    { __typename?: 'CreateStagePayload' }
    & { stage: (
      { __typename?: 'Stage' }
      & StageFragment
    ) }
  )> }
);

export type UpdateStagePositionMutationVariables = Exact<{
  stageId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateStagePositionMutation = (
  { __typename?: 'Mutation' }
  & { updateStagePosition?: Maybe<(
    { __typename?: 'UpdateStagePositionPayload' }
    & { stage: (
      { __typename?: 'Stage' }
      & Pick<Stage, 'id'>
    ) }
  )> }
);

export type UpdateThrowActionMutationVariables = Exact<{
  actionId: Scalars['ID'];
  attributes: ThrowActionAttributes;
}>;


export type UpdateThrowActionMutation = (
  { __typename?: 'Mutation' }
  & { updateThrowAction?: Maybe<(
    { __typename?: 'UpdateThrowActionPayload' }
    & { action: (
      { __typename?: 'ThrowAction' }
      & Pick<ThrowAction, 'id'>
    ) }
  )> }
);

export type UpdateVideoMutationVariables = Exact<{
  videoId: Scalars['ID'];
  attributes: VideoAttributes;
}>;


export type UpdateVideoMutation = (
  { __typename?: 'Mutation' }
  & { updateVideo?: Maybe<(
    { __typename?: 'UpdateVideoPayload' }
    & { video: (
      { __typename?: 'Video' }
      & VideoFragment
    ) }
  )> }
);

export type ArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type ArticleQuery = (
  { __typename?: 'Query' }
  & { article: (
    { __typename?: 'Article' }
    & ArticleFragment
  ) }
);

export type ArticleCommentsQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type ArticleCommentsQuery = (
  { __typename?: 'Query' }
  & { articleComments: Array<(
    { __typename?: 'ArticleComment' }
    & ArticleCommentFragment
  )> }
);

export type ArticlePathsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlePathsQuery = (
  { __typename?: 'Query' }
  & { allArticles: Array<(
    { __typename?: 'Article' }
    & Pick<Article, 'id'>
  )> }
);

export type ArticlesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
  category?: Maybe<ArticleCategory>;
}>;


export type ArticlesQuery = (
  { __typename?: 'Query' }
  & { articles: (
    { __typename?: 'ArticleCollection' }
    & { records: Array<(
      { __typename?: 'Article' }
      & ArticleSummaryFragment
    )>, paging: (
      { __typename?: 'Paging' }
      & PagingFragment
    ) }
  ) }
);

export type CharacterWithChildrenQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type CharacterWithChildrenQuery = (
  { __typename?: 'Query' }
  & { character: (
    { __typename?: 'Character' }
    & CharacterWithChildrenFragment
  ) }
);

export type MoveCategoryWithMovesFragment = (
  { __typename?: 'MoveCategory' }
  & { moves: Array<(
    { __typename?: 'Move' }
    & MoveFragment
  )> }
  & MoveCategoryFragment
);

export type CharacterMovesQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type CharacterMovesQuery = (
  { __typename?: 'Query' }
  & { character: (
    { __typename?: 'Character' }
    & Pick<Character, 'slug' | 'longName' | 'faceImageUrl' | 'country' | 'fightingStyle' | 'story' | 'description'>
    & { moveCategories: Array<(
      { __typename?: 'MoveCategory' }
      & MoveCategoryWithMovesFragment
    )> }
  ) }
);

export type CharacterPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterPathsQuery = (
  { __typename?: 'Query' }
  & { characters: Array<(
    { __typename?: 'Character' }
    & Pick<Character, 'slug'>
  )> }
);

export type CharacterSelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterSelectOptionsQuery = (
  { __typename?: 'Query' }
  & { characters: Array<(
    { __typename?: 'Character' }
    & Pick<Character, 'slug' | 'name'>
  )> }
);

export type CharacterSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterSlugsQuery = (
  { __typename?: 'Query' }
  & { characters: Array<(
    { __typename?: 'Character' }
    & Pick<Character, 'slug'>
  )> }
);

export type CharacterQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type CharacterQuery = (
  { __typename?: 'Query' }
  & { character: (
    { __typename?: 'Character' }
    & CharacterFragment
  ) }
);

export type CharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersQuery = (
  { __typename?: 'Query' }
  & { characters: Array<(
    { __typename?: 'Character' }
    & CharacterSummaryFragment
  )> }
);

export type CombosQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type CombosQuery = (
  { __typename?: 'Query' }
  & { combos: Array<(
    { __typename?: 'Combo' }
    & ComboFragment
  )> }
);

export type ComboCategoriesQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type ComboCategoriesQuery = (
  { __typename?: 'Query' }
  & { comboCategories: Array<(
    { __typename?: 'ComboCategory' }
    & ComboCategoryFragment
  )> }
);

export type ComboCategoryQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type ComboCategoryQuery = (
  { __typename?: 'Query' }
  & { comboCategory: (
    { __typename?: 'ComboCategory' }
    & ComboCategoryWithCharacterFragment
  ) }
);

export type ComboCategoryDetailQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type ComboCategoryDetailQuery = (
  { __typename?: 'Query' }
  & { comboCategory: (
    { __typename?: 'ComboCategory' }
    & ComboCategoryDetailFragment
  ) }
);

export type ComboCategoryIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type ComboCategoryIdsQuery = (
  { __typename?: 'Query' }
  & { comboCategories: Array<(
    { __typename?: 'ComboCategory' }
    & Pick<ComboCategory, 'id'>
  )> }
);

export type ComboSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type ComboSelectOptionsQuery = (
  { __typename?: 'Query' }
  & { comboCategories: Array<(
    { __typename?: 'ComboCategory' }
    & Pick<ComboCategory, 'id' | 'name'>
    & { combos: Array<(
      { __typename?: 'Combo' }
      & Pick<Combo, 'id' | 'name'>
    )> }
  )> }
);

export type ComboQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type ComboQuery = (
  { __typename?: 'Query' }
  & { combo: (
    { __typename?: 'Combo' }
    & ComboFragment
  ) }
);

export type CurrentPlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentPlayerQuery = (
  { __typename?: 'Query' }
  & { currentPlayer: (
    { __typename?: 'CurrentPlayer' }
    & CurrentPlayerFragment
  ) }
);

export type EventsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventCollection' }
    & { records: Array<(
      { __typename?: 'Event' }
      & EventFragment
    )>, paging: (
      { __typename?: 'Paging' }
      & PagingFragment
    ) }
  ) }
);

export type EventQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type EventQuery = (
  { __typename?: 'Query' }
  & { event: (
    { __typename?: 'Event' }
    & EventFragment
  ) }
);

export type MoveQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type MoveQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & MoveFragment
  ) }
);

export type MoveCategoriesQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type MoveCategoriesQuery = (
  { __typename?: 'Query' }
  & { moveCategories: Array<(
    { __typename?: 'MoveCategory' }
    & MoveCategoryFragment
  )> }
);

export type MoveCategoryQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type MoveCategoryQuery = (
  { __typename?: 'Query' }
  & { moveCategory: (
    { __typename?: 'MoveCategory' }
    & MoveCategoryWithCharacterFragment
  ) }
);

export type MoveCategoryDetailQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type MoveCategoryDetailQuery = (
  { __typename?: 'Query' }
  & { moveCategory: (
    { __typename?: 'MoveCategory' }
    & MoveCategoryDetailFragment
  ) }
);

export type MoveCategoryIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type MoveCategoryIdsQuery = (
  { __typename?: 'Query' }
  & { moveCategories: Array<(
    { __typename?: 'MoveCategory' }
    & Pick<MoveCategory, 'id'>
  )> }
);

export type MoveCommentsQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type MoveCommentsQuery = (
  { __typename?: 'Query' }
  & { moveComments: Array<(
    { __typename?: 'MoveComment' }
    & MoveCommentFragment
  )> }
);

export type MoveSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type MoveSelectOptionsQuery = (
  { __typename?: 'Query' }
  & { moveCategories: Array<(
    { __typename?: 'MoveCategory' }
    & Pick<MoveCategory, 'id' | 'name'>
    & { moves: Array<(
      { __typename?: 'Move' }
      & Pick<Move, 'id' | 'name'>
      & { commands: Array<(
        { __typename?: 'Command' }
        & { operations: Array<(
          { __typename?: 'Operation' }
          & Pick<Operation, 'key'>
        )> }
      )> }
    )> }
  )> }
);

export type MovesQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type MovesQuery = (
  { __typename?: 'Query' }
  & { moves: Array<(
    { __typename?: 'Move' }
    & MoveFragment
  )> }
);

export type MyArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type MyArticleQuery = (
  { __typename?: 'Query' }
  & { myArticle: (
    { __typename?: 'Article' }
    & ArticleFragment
  ) }
);

export type MyArticlesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type MyArticlesQuery = (
  { __typename?: 'Query' }
  & { myArticles: (
    { __typename?: 'ArticleCollection' }
    & { records: Array<(
      { __typename?: 'Article' }
      & ArticleSummaryFragment
    )>, paging: (
      { __typename?: 'Paging' }
      & PagingFragment
    ) }
  ) }
);

export type OperationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OperationsQuery = (
  { __typename?: 'Query' }
  & { operations: Array<(
    { __typename?: 'Operation' }
    & OperationFragment
  )> }
);

export type StageQueryVariables = Exact<{
  stageId: Scalars['ID'];
}>;


export type StageQuery = (
  { __typename?: 'Query' }
  & { stage: (
    { __typename?: 'Stage' }
    & StageFragment
  ) }
);

export type StagesQueryVariables = Exact<{ [key: string]: never; }>;


export type StagesQuery = (
  { __typename?: 'Query' }
  & { stages: Array<(
    { __typename?: 'Stage' }
    & StageFragment
  )> }
);

export type StatesQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type StatesQuery = (
  { __typename?: 'Query' }
  & { states: Array<(
    { __typename?: 'State' }
    & StateFragment
  )> }
);

export type TopPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type TopPlayersQuery = (
  { __typename?: 'Query' }
  & { topPlayers: Array<(
    { __typename?: 'TopPlayer' }
    & TopPlayerFragment
  )> }
);

export type VideoQueryVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type VideoQuery = (
  { __typename?: 'Query' }
  & { video: (
    { __typename?: 'Video' }
    & VideoFragment
  ) }
);

export type VideoCommentsQueryVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type VideoCommentsQuery = (
  { __typename?: 'Query' }
  & { videoComments: Array<(
    { __typename?: 'VideoComment' }
    & VideoCommentFragment
  )> }
);

export type VideosQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
}>;


export type VideosQuery = (
  { __typename?: 'Query' }
  & { videos: (
    { __typename?: 'VideoCollection' }
    & { records: Array<(
      { __typename?: 'Video' }
      & VideoSummaryFragment
    )>, paging: (
      { __typename?: 'Paging' }
      & PagingFragment
    ) }
  ) }
);

export type PageDashboardArticlesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type PageDashboardArticlesQuery = (
  { __typename?: 'Query' }
  & { myArticles: (
    { __typename?: 'ArticleCollection' }
    & { records: Array<(
      { __typename?: 'Article' }
      & Pick<Article, 'id' | 'title' | 'status'>
    )>, paging: (
      { __typename?: 'Paging' }
      & PagingFragment
    ) }
  ) }
);

export type PageDashboardAttackActionEditQueryVariables = Exact<{
  actionId: Scalars['ID'];
}>;


export type PageDashboardAttackActionEditQuery = (
  { __typename?: 'Query' }
  & { attackAction: (
    { __typename?: 'AttackAction' }
    & { move: (
      { __typename?: 'Move' }
      & Pick<Move, 'id' | 'name'>
      & { moveCategory: (
        { __typename?: 'MoveCategory' }
        & Pick<MoveCategory, 'id' | 'name'>
        & { character: (
          { __typename?: 'Character' }
          & Pick<Character, 'slug' | 'name'>
        ) }
      ) }
    ) }
    & AttackActionFragment
  ) }
);

export type PageDashboardComboCategoriesQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type PageDashboardComboCategoriesQuery = (
  { __typename?: 'Query' }
  & { character: (
    { __typename?: 'Character' }
    & Pick<Character, 'slug' | 'name'>
    & { comboCategories: Array<(
      { __typename?: 'ComboCategory' }
      & Pick<ComboCategory, 'id' | 'name' | 'combosCount'>
    )> }
  ) }
);

export type PageDashboardMoveCategoriesQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type PageDashboardMoveCategoriesQuery = (
  { __typename?: 'Query' }
  & { character: (
    { __typename?: 'Character' }
    & Pick<Character, 'slug' | 'name'>
    & { moveCategories: Array<(
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id' | 'name' | 'movesCount'>
    )> }
  ) }
);

export type PageDashboardCombosQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageDashboardCombosQuery = (
  { __typename?: 'Query' }
  & { comboCategory: (
    { __typename?: 'ComboCategory' }
    & Pick<ComboCategory, 'id' | 'name'>
    & { character: (
      { __typename?: 'Character' }
      & Pick<Character, 'slug' | 'name'>
    ), combos: Array<(
      { __typename?: 'Combo' }
      & Pick<Combo, 'id' | 'name'>
    )> }
  ) }
);

export type PageDashboardComboNewQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageDashboardComboNewQuery = (
  { __typename?: 'Query' }
  & { comboCategory: (
    { __typename?: 'ComboCategory' }
    & Pick<ComboCategory, 'id' | 'name'>
    & { character: (
      { __typename?: 'Character' }
      & Pick<Character, 'slug' | 'name'>
      & { states: Array<(
        { __typename?: 'State' }
        & Pick<State, 'id' | 'name'>
      )>, conditions: Array<(
        { __typename?: 'Condition' }
        & Pick<Condition, 'id' | 'name'>
      )> }
    ) }
  ) }
);

export type PageDashboardComboEditQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type PageDashboardComboEditQuery = (
  { __typename?: 'Query' }
  & { combo: (
    { __typename?: 'Combo' }
    & { state: (
      { __typename?: 'State' }
      & Pick<State, 'id'>
    ), operations: Array<(
      { __typename?: 'Operation' }
      & Pick<Operation, 'id'>
    )>, comboCategory: (
      { __typename?: 'ComboCategory' }
      & Pick<ComboCategory, 'id' | 'name'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug' | 'name'>
        & { states: Array<(
          { __typename?: 'State' }
          & Pick<State, 'id' | 'name'>
        )>, conditions: Array<(
          { __typename?: 'Condition' }
          & Pick<Condition, 'id' | 'name'>
        )> }
      ) }
    ) }
    & ComboFragment
  ) }
);

export type PageDashboardCommandEditQueryVariables = Exact<{
  commandId: Scalars['ID'];
}>;


export type PageDashboardCommandEditQuery = (
  { __typename?: 'Query' }
  & { command: (
    { __typename?: 'Command' }
    & { state: (
      { __typename?: 'State' }
      & Pick<State, 'id'>
    ), operations: Array<(
      { __typename?: 'Operation' }
      & Pick<Operation, 'id'>
    )>, move: (
      { __typename?: 'Move' }
      & Pick<Move, 'id' | 'name'>
      & { moveCategory: (
        { __typename?: 'MoveCategory' }
        & Pick<MoveCategory, 'id' | 'name'>
        & { character: (
          { __typename?: 'Character' }
          & Pick<Character, 'slug' | 'name'>
          & { states: Array<(
            { __typename?: 'State' }
            & Pick<State, 'id' | 'name'>
          )> }
        ) }
      ) }
    ) }
    & CommandFragment
  ) }
);

export type PageDashboardEventsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type PageDashboardEventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventCollection' }
    & { records: Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'name'>
    )>, paging: (
      { __typename?: 'Paging' }
      & PagingFragment
    ) }
  ) }
);

export type PageDashboardHighlightEditQueryVariables = Exact<{
  highlightId: Scalars['ID'];
}>;


export type PageDashboardHighlightEditQuery = (
  { __typename?: 'Query' }
  & { highlight: (
    { __typename?: 'Highlight' }
    & Pick<Highlight, 'id' | 'title' | 'startSec'>
    & { video: (
      { __typename?: 'Video' }
      & Pick<Video, 'id' | 'title' | 'videoId'>
    ) }
  ) }
);

export type PageDashboardMovesQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageDashboardMovesQuery = (
  { __typename?: 'Query' }
  & { moveCategory: (
    { __typename?: 'MoveCategory' }
    & Pick<MoveCategory, 'id' | 'name'>
    & { character: (
      { __typename?: 'Character' }
      & Pick<Character, 'slug' | 'name'>
    ), moves: Array<(
      { __typename?: 'Move' }
      & Pick<Move, 'id' | 'name' | 'commandsCount' | 'actionsCount'>
    )> }
  ) }
);

export type PageDashboardMoveNewQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageDashboardMoveNewQuery = (
  { __typename?: 'Query' }
  & { moveCategory: (
    { __typename?: 'MoveCategory' }
    & Pick<MoveCategory, 'id' | 'name'>
    & { character: (
      { __typename?: 'Character' }
      & Pick<Character, 'slug' | 'name'>
      & { conditions: Array<(
        { __typename?: 'Condition' }
        & Pick<Condition, 'id' | 'name'>
      )> }
    ) }
  ) }
);

export type PageDashboardActionsQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardActionsQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & Pick<Move, 'id' | 'name'>
    & { actions: Array<(
      { __typename?: 'AttackAction' }
      & Action_AttackAction_Fragment
    ) | (
      { __typename?: 'ThrowAction' }
      & Action_ThrowAction_Fragment
    )>, moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id' | 'name'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug' | 'name'>
      ) }
    ) }
  ) }
);

export type PageDashboardActionNewQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardActionNewQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & Pick<Move, 'id' | 'name'>
    & { moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id' | 'name'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug' | 'name'>
      ) }
    ) }
  ) }
);

export type PageDashboardCommandsQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardCommandsQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & Pick<Move, 'id' | 'name'>
    & { commands: Array<(
      { __typename?: 'Command' }
      & CommandFragment
    )>, moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id' | 'name'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug' | 'name'>
        & { states: Array<(
          { __typename?: 'State' }
          & Pick<State, 'id' | 'name'>
        )> }
      ) }
    ) }
  ) }
);

export type PageDashboardCommandNewQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardCommandNewQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & Pick<Move, 'id' | 'name'>
    & { moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id' | 'name'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug' | 'name'>
        & { states: Array<(
          { __typename?: 'State' }
          & Pick<State, 'id' | 'name'>
        )> }
      ) }
    ) }
  ) }
);

export type PageDashboardMoveEditQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardMoveEditQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & { conditions: Array<(
      { __typename?: 'Condition' }
      & Pick<Condition, 'id' | 'name'>
    )>, moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id' | 'name'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug' | 'name'>
        & { states: Array<(
          { __typename?: 'State' }
          & Pick<State, 'id' | 'name'>
        )>, conditions: Array<(
          { __typename?: 'Condition' }
          & Pick<Condition, 'id' | 'name'>
        )> }
      ) }
    ) }
    & MoveFragment
  ) }
);

export type PageDashboardThrowActionEditQueryVariables = Exact<{
  actionId: Scalars['ID'];
}>;


export type PageDashboardThrowActionEditQuery = (
  { __typename?: 'Query' }
  & { throwAction: (
    { __typename?: 'ThrowAction' }
    & { move: (
      { __typename?: 'Move' }
      & Pick<Move, 'id' | 'name'>
      & { moveCategory: (
        { __typename?: 'MoveCategory' }
        & Pick<MoveCategory, 'id' | 'name'>
        & { character: (
          { __typename?: 'Character' }
          & Pick<Character, 'slug' | 'name'>
        ) }
      ) }
    ) }
    & ThrowActionFragment
  ) }
);

export type PageDashboardVideoEditQueryVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type PageDashboardVideoEditQuery = (
  { __typename?: 'Query' }
  & { video: (
    { __typename?: 'Video' }
    & Pick<Video, 'id' | 'title' | 'description' | 'videoId'>
  ) }
);

export type PageDashboardHighlightsQueryVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type PageDashboardHighlightsQuery = (
  { __typename?: 'Query' }
  & { video: (
    { __typename?: 'Video' }
    & Pick<Video, 'id' | 'title'>
    & { highlights: Array<(
      { __typename?: 'Highlight' }
      & Pick<Highlight, 'id' | 'title' | 'startSec'>
    )> }
  ) }
);

export type PageDashboardHighlightNewQueryVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type PageDashboardHighlightNewQuery = (
  { __typename?: 'Query' }
  & { video: (
    { __typename?: 'Video' }
    & Pick<Video, 'id' | 'title' | 'videoId'>
  ) }
);

export type PageDashboardVideosQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type PageDashboardVideosQuery = (
  { __typename?: 'Query' }
  & { videos: (
    { __typename?: 'VideoCollection' }
    & { records: Array<(
      { __typename?: 'Video' }
      & Pick<Video, 'id' | 'title' | 'highlightsCount'>
    )>, paging: (
      { __typename?: 'Paging' }
      & PagingFragment
    ) }
  ) }
);

export type PageMoveQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageMoveQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & { moveCategory: (
      { __typename?: 'MoveCategory' }
      & Pick<MoveCategory, 'id' | 'name'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug' | 'name'>
      ) }
    ) }
    & MoveFragment
  ) }
);

export const ArticleSummaryFragmentDoc = gql`
    fragment articleSummary on Article {
  id
  title
  description
  mainImageUrl
  publishedAt
  faved
  favsCount
  status
  author {
    name
    avatarUrl
  }
}
    `;
export const ArticleFragmentDoc = gql`
    fragment article on Article {
  ...articleSummary
  category
  content
}
    ${ArticleSummaryFragmentDoc}`;
export const ArticleCommentFragmentDoc = gql`
    fragment articleComment on ArticleComment {
  id
  message
  createdAt
  player {
    name
    avatarUrl
  }
}
    `;
export const ArticleLinkFragmentDoc = gql`
    fragment articleLink on ArticleLink {
  url
  title
  description
  imageUrl
}
    `;
export const CharacterSummaryFragmentDoc = gql`
    fragment characterSummary on Character {
  slug
  name
  longName
  faceImageUrl
  country
  fightingStyle
}
    `;
export const CharacterFragmentDoc = gql`
    fragment character on Character {
  ...characterSummary
  nameKana
  longNameKana
  mainImageUrl
  story
  description
  dlc
}
    ${CharacterSummaryFragmentDoc}`;
export const MoveCategoryFragmentDoc = gql`
    fragment moveCategory on MoveCategory {
  id
  name
}
    `;
export const ComboCategoryFragmentDoc = gql`
    fragment comboCategory on ComboCategory {
  id
  name
}
    `;
export const CharacterWithChildrenFragmentDoc = gql`
    fragment characterWithChildren on Character {
  ...character
  moveCategories {
    ...moveCategory
  }
  comboCategories {
    ...comboCategory
  }
}
    ${CharacterFragmentDoc}
${MoveCategoryFragmentDoc}
${ComboCategoryFragmentDoc}`;
export const ComboVideoFragmentDoc = gql`
    fragment comboVideo on ComboVideo {
  id
  m3u8Url
  thumbnailUrl
}
    `;
export const ConditionFragmentDoc = gql`
    fragment condition on Condition {
  id
  name
}
    `;
export const OperationFragmentDoc = gql`
    fragment operation on Operation {
  id
  name
  key
  icon
}
    `;
export const ComboFragmentDoc = gql`
    fragment combo on Combo {
  id
  name
  damage
  note
  comboCategory {
    id
    name
  }
  comboVideo {
    ...comboVideo
  }
  conditions {
    ...condition
  }
  operations {
    ...operation
  }
}
    ${ComboVideoFragmentDoc}
${ConditionFragmentDoc}
${OperationFragmentDoc}`;
export const ComboCategoryDetailFragmentDoc = gql`
    fragment comboCategoryDetail on ComboCategory {
  id
  name
  character {
    ...character
  }
  combos {
    ...combo
  }
}
    ${CharacterFragmentDoc}
${ComboFragmentDoc}`;
export const ComboCategoryWithCharacterFragmentDoc = gql`
    fragment comboCategoryWithCharacter on ComboCategory {
  ...comboCategory
  character {
    ...character
  }
}
    ${ComboCategoryFragmentDoc}
${CharacterFragmentDoc}`;
export const CurrentPlayerFragmentDoc = gql`
    fragment currentPlayer on CurrentPlayer {
  id
  name
  role
  avatarUrl
}
    `;
export const EventFragmentDoc = gql`
    fragment event on Event {
  id
  name
  mainImageUrl
  url
  streamingUrl
  videoUrl
  description
  organizerName
  organizerTwitterId
  startsAt
}
    `;
export const MoveVideoFragmentDoc = gql`
    fragment moveVideo on MoveVideo {
  id
  m3u8Url
  thumbnailUrl
}
    `;
export const StateFragmentDoc = gql`
    fragment state on State {
  id
  name
}
    `;
export const CommandFragmentDoc = gql`
    fragment command on Command {
  id
  state {
    ...state
  }
  operations {
    ...operation
  }
}
    ${StateFragmentDoc}
${OperationFragmentDoc}`;
export const AttackActionFragmentDoc = gql`
    fragment attackAction on AttackAction {
  id
  __typename
  attackType
  damage
  attackType
  damage
  blockAvailable
  blockState
  blockFrame
  hitAvailable
  hitState
  hitFrame
  counterHitAvailable
  counterHitState
  counterHitFrame
  cleanHitAvailable
  cleanHitState
  cleanHitFrame
  crouchingHitAvailable
  crouchingHitState
  crouchingHitFrame
}
    `;
export const ThrowActionFragmentDoc = gql`
    fragment throwAction on ThrowAction {
  id
  __typename
  throwType
  damage
  escape
  throwAvailable
  throwState
  throwFrame
  throwEscapeAvailable
  throwEscapeState
  throwEscapeFrame
}
    `;
export const ActionFragmentDoc = gql`
    fragment action on Action {
  ... on AttackAction {
    ...attackAction
  }
  ... on ThrowAction {
    ...throwAction
  }
}
    ${AttackActionFragmentDoc}
${ThrowActionFragmentDoc}`;
export const MoveFragmentDoc = gql`
    fragment move on Move {
  id
  name
  kana
  opponentState
  startUpFrame
  powerCrush
  crouchingStatus
  jumpStatus
  homing
  screw
  wallBound
  note
  moveCategory {
    id
    name
  }
  afterState {
    id
    name
  }
  moveVideo {
    ...moveVideo
  }
  commands {
    ...command
  }
  actions {
    ...action
  }
  conditions {
    ...condition
  }
}
    ${MoveVideoFragmentDoc}
${CommandFragmentDoc}
${ActionFragmentDoc}
${ConditionFragmentDoc}`;
export const MoveCategoryDetailFragmentDoc = gql`
    fragment moveCategoryDetail on MoveCategory {
  id
  name
  character {
    ...character
  }
  moves {
    ...move
  }
}
    ${CharacterFragmentDoc}
${MoveFragmentDoc}`;
export const MoveCategoryWithCharacterFragmentDoc = gql`
    fragment moveCategoryWithCharacter on MoveCategory {
  ...moveCategory
  character {
    ...character
  }
}
    ${MoveCategoryFragmentDoc}
${CharacterFragmentDoc}`;
export const MoveCommentFragmentDoc = gql`
    fragment moveComment on MoveComment {
  id
  message
  createdAt
  player {
    name
    avatarUrl
  }
}
    `;
export const PagingFragmentDoc = gql`
    fragment paging on Paging {
  currentPage
  totalCount
  totalPages
}
    `;
export const StageFragmentDoc = gql`
    fragment stage on Stage {
  id
  name
  mainImageUrl
  infinite
  wall
  wallBreak
  balconyBreak
  floorBreak
  position
}
    `;
export const TopPlayerFragmentDoc = gql`
    fragment topPlayer on TopPlayer {
  id
  name
  kana
  slug
  country
  avatarUrl
  twitterId
  streamingUrl
  birthday
  description
  characters {
    name
  }
  results {
    id
    eventDate
    eventName
    ranking
  }
}
    `;
export const VideoSummaryFragmentDoc = gql`
    fragment videoSummary on Video {
  id
  videoId
  title
  thumbnailUrl
  faved
  favsCount
  commentCount
  channel {
    name
  }
}
    `;
export const HighlightFragmentDoc = gql`
    fragment highlight on Highlight {
  id
  title
  startSec
  player {
    name
  }
}
    `;
export const VideoFragmentDoc = gql`
    fragment video on Video {
  ...videoSummary
  tags {
    name
  }
  highlights {
    ...highlight
  }
}
    ${VideoSummaryFragmentDoc}
${HighlightFragmentDoc}`;
export const VideoCommentFragmentDoc = gql`
    fragment videoComment on VideoComment {
  id
  message
  createdAt
  player {
    name
    avatarUrl
  }
}
    `;
export const MoveCategoryWithMovesFragmentDoc = gql`
    fragment moveCategoryWithMoves on MoveCategory {
  ...moveCategory
  moves {
    ...move
  }
}
    ${MoveCategoryFragmentDoc}
${MoveFragmentDoc}`;
export const CreateArticleDocument = gql`
    mutation CreateArticle($attributes: ArticleAttributes!) {
  createArticle(input: {attributes: $attributes}) {
    article {
      id
    }
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const CreateArticleCommentDocument = gql`
    mutation CreateArticleComment($articleId: ID!, $attributes: CommentAttributes!) {
  createArticleComment(input: {articleId: $articleId, attributes: $attributes}) {
    articleComment {
      ...articleComment
    }
  }
}
    ${ArticleCommentFragmentDoc}`;
export type CreateArticleCommentMutationFn = Apollo.MutationFunction<CreateArticleCommentMutation, CreateArticleCommentMutationVariables>;

/**
 * __useCreateArticleCommentMutation__
 *
 * To run a mutation, you first call `useCreateArticleCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleCommentMutation, { data, loading, error }] = useCreateArticleCommentMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateArticleCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleCommentMutation, CreateArticleCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleCommentMutation, CreateArticleCommentMutationVariables>(CreateArticleCommentDocument, options);
      }
export type CreateArticleCommentMutationHookResult = ReturnType<typeof useCreateArticleCommentMutation>;
export type CreateArticleCommentMutationResult = Apollo.MutationResult<CreateArticleCommentMutation>;
export type CreateArticleCommentMutationOptions = Apollo.BaseMutationOptions<CreateArticleCommentMutation, CreateArticleCommentMutationVariables>;
export const CreateArticleImageDocument = gql`
    mutation CreateArticleImage($image: String!) {
  createArticleImage(input: {image: $image}) {
    url
  }
}
    `;
export type CreateArticleImageMutationFn = Apollo.MutationFunction<CreateArticleImageMutation, CreateArticleImageMutationVariables>;

/**
 * __useCreateArticleImageMutation__
 *
 * To run a mutation, you first call `useCreateArticleImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleImageMutation, { data, loading, error }] = useCreateArticleImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateArticleImageMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleImageMutation, CreateArticleImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleImageMutation, CreateArticleImageMutationVariables>(CreateArticleImageDocument, options);
      }
export type CreateArticleImageMutationHookResult = ReturnType<typeof useCreateArticleImageMutation>;
export type CreateArticleImageMutationResult = Apollo.MutationResult<CreateArticleImageMutation>;
export type CreateArticleImageMutationOptions = Apollo.BaseMutationOptions<CreateArticleImageMutation, CreateArticleImageMutationVariables>;
export const CreateArticleLinkDocument = gql`
    mutation CreateArticleLink($url: String!) {
  createArticleLink(input: {url: $url}) {
    articleLink {
      ...articleLink
    }
  }
}
    ${ArticleLinkFragmentDoc}`;
export type CreateArticleLinkMutationFn = Apollo.MutationFunction<CreateArticleLinkMutation, CreateArticleLinkMutationVariables>;

/**
 * __useCreateArticleLinkMutation__
 *
 * To run a mutation, you first call `useCreateArticleLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleLinkMutation, { data, loading, error }] = useCreateArticleLinkMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateArticleLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleLinkMutation, CreateArticleLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleLinkMutation, CreateArticleLinkMutationVariables>(CreateArticleLinkDocument, options);
      }
export type CreateArticleLinkMutationHookResult = ReturnType<typeof useCreateArticleLinkMutation>;
export type CreateArticleLinkMutationResult = Apollo.MutationResult<CreateArticleLinkMutation>;
export type CreateArticleLinkMutationOptions = Apollo.BaseMutationOptions<CreateArticleLinkMutation, CreateArticleLinkMutationVariables>;
export const CreateArticleVideoDocument = gql`
    mutation CreateArticleVideo {
  createArticleVideo(input: {}) {
    articleVideo {
      id
      m3u8Url
      thumbnailUrl
    }
    videoUpload {
      url
      fields
    }
  }
}
    `;
export type CreateArticleVideoMutationFn = Apollo.MutationFunction<CreateArticleVideoMutation, CreateArticleVideoMutationVariables>;

/**
 * __useCreateArticleVideoMutation__
 *
 * To run a mutation, you first call `useCreateArticleVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleVideoMutation, { data, loading, error }] = useCreateArticleVideoMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateArticleVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleVideoMutation, CreateArticleVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleVideoMutation, CreateArticleVideoMutationVariables>(CreateArticleVideoDocument, options);
      }
export type CreateArticleVideoMutationHookResult = ReturnType<typeof useCreateArticleVideoMutation>;
export type CreateArticleVideoMutationResult = Apollo.MutationResult<CreateArticleVideoMutation>;
export type CreateArticleVideoMutationOptions = Apollo.BaseMutationOptions<CreateArticleVideoMutation, CreateArticleVideoMutationVariables>;
export const CreateAttackActionDocument = gql`
    mutation CreateAttackAction($moveId: ID!, $attributes: AttackActionAttributes!) {
  createAttackAction(input: {moveId: $moveId, attributes: $attributes}) {
    action {
      ...attackAction
    }
  }
}
    ${AttackActionFragmentDoc}`;
export type CreateAttackActionMutationFn = Apollo.MutationFunction<CreateAttackActionMutation, CreateAttackActionMutationVariables>;

/**
 * __useCreateAttackActionMutation__
 *
 * To run a mutation, you first call `useCreateAttackActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttackActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttackActionMutation, { data, loading, error }] = useCreateAttackActionMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateAttackActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateAttackActionMutation, CreateAttackActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAttackActionMutation, CreateAttackActionMutationVariables>(CreateAttackActionDocument, options);
      }
export type CreateAttackActionMutationHookResult = ReturnType<typeof useCreateAttackActionMutation>;
export type CreateAttackActionMutationResult = Apollo.MutationResult<CreateAttackActionMutation>;
export type CreateAttackActionMutationOptions = Apollo.BaseMutationOptions<CreateAttackActionMutation, CreateAttackActionMutationVariables>;
export const CreateCharacterDocument = gql`
    mutation CreateCharacter($attributes: CharacterAttributes!) {
  createCharacter(input: {attributes: $attributes}) {
    character {
      ...character
    }
  }
}
    ${CharacterFragmentDoc}`;
export type CreateCharacterMutationFn = Apollo.MutationFunction<CreateCharacterMutation, CreateCharacterMutationVariables>;

/**
 * __useCreateCharacterMutation__
 *
 * To run a mutation, you first call `useCreateCharacterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCharacterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCharacterMutation, { data, loading, error }] = useCreateCharacterMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateCharacterMutation(baseOptions?: Apollo.MutationHookOptions<CreateCharacterMutation, CreateCharacterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCharacterMutation, CreateCharacterMutationVariables>(CreateCharacterDocument, options);
      }
export type CreateCharacterMutationHookResult = ReturnType<typeof useCreateCharacterMutation>;
export type CreateCharacterMutationResult = Apollo.MutationResult<CreateCharacterMutation>;
export type CreateCharacterMutationOptions = Apollo.BaseMutationOptions<CreateCharacterMutation, CreateCharacterMutationVariables>;
export const CreateComboDocument = gql`
    mutation CreateCombo($comboCategoryId: ID!, $attributes: ComboAttributes!) {
  createCombo(input: {comboCategoryId: $comboCategoryId, attributes: $attributes}) {
    combo {
      id
    }
  }
}
    `;
export type CreateComboMutationFn = Apollo.MutationFunction<CreateComboMutation, CreateComboMutationVariables>;

/**
 * __useCreateComboMutation__
 *
 * To run a mutation, you first call `useCreateComboMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComboMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComboMutation, { data, loading, error }] = useCreateComboMutation({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateComboMutation(baseOptions?: Apollo.MutationHookOptions<CreateComboMutation, CreateComboMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComboMutation, CreateComboMutationVariables>(CreateComboDocument, options);
      }
export type CreateComboMutationHookResult = ReturnType<typeof useCreateComboMutation>;
export type CreateComboMutationResult = Apollo.MutationResult<CreateComboMutation>;
export type CreateComboMutationOptions = Apollo.BaseMutationOptions<CreateComboMutation, CreateComboMutationVariables>;
export const CreateComboCategoryDocument = gql`
    mutation CreateComboCategory($characterSlug: ID!, $attributes: ComboCategoryAttributes!) {
  createComboCategory(
    input: {characterSlug: $characterSlug, attributes: $attributes}
  ) {
    comboCategory {
      id
    }
  }
}
    `;
export type CreateComboCategoryMutationFn = Apollo.MutationFunction<CreateComboCategoryMutation, CreateComboCategoryMutationVariables>;

/**
 * __useCreateComboCategoryMutation__
 *
 * To run a mutation, you first call `useCreateComboCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComboCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComboCategoryMutation, { data, loading, error }] = useCreateComboCategoryMutation({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateComboCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateComboCategoryMutation, CreateComboCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComboCategoryMutation, CreateComboCategoryMutationVariables>(CreateComboCategoryDocument, options);
      }
export type CreateComboCategoryMutationHookResult = ReturnType<typeof useCreateComboCategoryMutation>;
export type CreateComboCategoryMutationResult = Apollo.MutationResult<CreateComboCategoryMutation>;
export type CreateComboCategoryMutationOptions = Apollo.BaseMutationOptions<CreateComboCategoryMutation, CreateComboCategoryMutationVariables>;
export const CreateComboVideoDocument = gql`
    mutation CreateComboVideo {
  createComboVideo(input: {}) {
    comboVideo {
      ...comboVideo
    }
    videoUpload {
      url
      fields
    }
  }
}
    ${ComboVideoFragmentDoc}`;
export type CreateComboVideoMutationFn = Apollo.MutationFunction<CreateComboVideoMutation, CreateComboVideoMutationVariables>;

/**
 * __useCreateComboVideoMutation__
 *
 * To run a mutation, you first call `useCreateComboVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComboVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComboVideoMutation, { data, loading, error }] = useCreateComboVideoMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateComboVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateComboVideoMutation, CreateComboVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComboVideoMutation, CreateComboVideoMutationVariables>(CreateComboVideoDocument, options);
      }
export type CreateComboVideoMutationHookResult = ReturnType<typeof useCreateComboVideoMutation>;
export type CreateComboVideoMutationResult = Apollo.MutationResult<CreateComboVideoMutation>;
export type CreateComboVideoMutationOptions = Apollo.BaseMutationOptions<CreateComboVideoMutation, CreateComboVideoMutationVariables>;
export const CreateCommandDocument = gql`
    mutation CreateCommand($moveId: ID!, $attributes: CommandAttributes!) {
  createCommand(input: {moveId: $moveId, attributes: $attributes}) {
    command {
      ...command
    }
  }
}
    ${CommandFragmentDoc}`;
export type CreateCommandMutationFn = Apollo.MutationFunction<CreateCommandMutation, CreateCommandMutationVariables>;

/**
 * __useCreateCommandMutation__
 *
 * To run a mutation, you first call `useCreateCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommandMutation, { data, loading, error }] = useCreateCommandMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateCommandMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommandMutation, CreateCommandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommandMutation, CreateCommandMutationVariables>(CreateCommandDocument, options);
      }
export type CreateCommandMutationHookResult = ReturnType<typeof useCreateCommandMutation>;
export type CreateCommandMutationResult = Apollo.MutationResult<CreateCommandMutation>;
export type CreateCommandMutationOptions = Apollo.BaseMutationOptions<CreateCommandMutation, CreateCommandMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($attributes: EventAttributes!) {
  createEvent(input: {attributes: $attributes}) {
    event {
      ...event
    }
  }
}
    ${EventFragmentDoc}`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CreateHighlightDocument = gql`
    mutation CreateHighlight($videoId: ID!, $attributes: HighlightAttributes!) {
  createHighlight(input: {videoId: $videoId, attributes: $attributes}) {
    highlight {
      ...highlight
    }
  }
}
    ${HighlightFragmentDoc}`;
export type CreateHighlightMutationFn = Apollo.MutationFunction<CreateHighlightMutation, CreateHighlightMutationVariables>;

/**
 * __useCreateHighlightMutation__
 *
 * To run a mutation, you first call `useCreateHighlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHighlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHighlightMutation, { data, loading, error }] = useCreateHighlightMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateHighlightMutation(baseOptions?: Apollo.MutationHookOptions<CreateHighlightMutation, CreateHighlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHighlightMutation, CreateHighlightMutationVariables>(CreateHighlightDocument, options);
      }
export type CreateHighlightMutationHookResult = ReturnType<typeof useCreateHighlightMutation>;
export type CreateHighlightMutationResult = Apollo.MutationResult<CreateHighlightMutation>;
export type CreateHighlightMutationOptions = Apollo.BaseMutationOptions<CreateHighlightMutation, CreateHighlightMutationVariables>;
export const CreateMoveDocument = gql`
    mutation CreateMove($moveCategoryId: ID!, $attributes: MoveAttributes!) {
  createMove(input: {moveCategoryId: $moveCategoryId, attributes: $attributes}) {
    move {
      id
    }
  }
}
    `;
export type CreateMoveMutationFn = Apollo.MutationFunction<CreateMoveMutation, CreateMoveMutationVariables>;

/**
 * __useCreateMoveMutation__
 *
 * To run a mutation, you first call `useCreateMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoveMutation, { data, loading, error }] = useCreateMoveMutation({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateMoveMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoveMutation, CreateMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoveMutation, CreateMoveMutationVariables>(CreateMoveDocument, options);
      }
export type CreateMoveMutationHookResult = ReturnType<typeof useCreateMoveMutation>;
export type CreateMoveMutationResult = Apollo.MutationResult<CreateMoveMutation>;
export type CreateMoveMutationOptions = Apollo.BaseMutationOptions<CreateMoveMutation, CreateMoveMutationVariables>;
export const CreateMoveCategoryDocument = gql`
    mutation CreateMoveCategory($characterSlug: ID!, $attributes: MoveCategoryAttributes!) {
  createMoveCategory(
    input: {characterSlug: $characterSlug, attributes: $attributes}
  ) {
    moveCategory {
      id
    }
  }
}
    `;
export type CreateMoveCategoryMutationFn = Apollo.MutationFunction<CreateMoveCategoryMutation, CreateMoveCategoryMutationVariables>;

/**
 * __useCreateMoveCategoryMutation__
 *
 * To run a mutation, you first call `useCreateMoveCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoveCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoveCategoryMutation, { data, loading, error }] = useCreateMoveCategoryMutation({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateMoveCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoveCategoryMutation, CreateMoveCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoveCategoryMutation, CreateMoveCategoryMutationVariables>(CreateMoveCategoryDocument, options);
      }
export type CreateMoveCategoryMutationHookResult = ReturnType<typeof useCreateMoveCategoryMutation>;
export type CreateMoveCategoryMutationResult = Apollo.MutationResult<CreateMoveCategoryMutation>;
export type CreateMoveCategoryMutationOptions = Apollo.BaseMutationOptions<CreateMoveCategoryMutation, CreateMoveCategoryMutationVariables>;
export const CreateMoveCommentDocument = gql`
    mutation CreateMoveComment($moveId: ID!, $attributes: CommentAttributes!) {
  createMoveComment(input: {moveId: $moveId, attributes: $attributes}) {
    moveComment {
      ...moveComment
    }
  }
}
    ${MoveCommentFragmentDoc}`;
export type CreateMoveCommentMutationFn = Apollo.MutationFunction<CreateMoveCommentMutation, CreateMoveCommentMutationVariables>;

/**
 * __useCreateMoveCommentMutation__
 *
 * To run a mutation, you first call `useCreateMoveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoveCommentMutation, { data, loading, error }] = useCreateMoveCommentMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateMoveCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoveCommentMutation, CreateMoveCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoveCommentMutation, CreateMoveCommentMutationVariables>(CreateMoveCommentDocument, options);
      }
export type CreateMoveCommentMutationHookResult = ReturnType<typeof useCreateMoveCommentMutation>;
export type CreateMoveCommentMutationResult = Apollo.MutationResult<CreateMoveCommentMutation>;
export type CreateMoveCommentMutationOptions = Apollo.BaseMutationOptions<CreateMoveCommentMutation, CreateMoveCommentMutationVariables>;
export const CreateMoveVideoDocument = gql`
    mutation CreateMoveVideo {
  createMoveVideo(input: {}) {
    moveVideo {
      ...moveVideo
    }
    videoUpload {
      url
      fields
    }
  }
}
    ${MoveVideoFragmentDoc}`;
export type CreateMoveVideoMutationFn = Apollo.MutationFunction<CreateMoveVideoMutation, CreateMoveVideoMutationVariables>;

/**
 * __useCreateMoveVideoMutation__
 *
 * To run a mutation, you first call `useCreateMoveVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoveVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoveVideoMutation, { data, loading, error }] = useCreateMoveVideoMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateMoveVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoveVideoMutation, CreateMoveVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoveVideoMutation, CreateMoveVideoMutationVariables>(CreateMoveVideoDocument, options);
      }
export type CreateMoveVideoMutationHookResult = ReturnType<typeof useCreateMoveVideoMutation>;
export type CreateMoveVideoMutationResult = Apollo.MutationResult<CreateMoveVideoMutation>;
export type CreateMoveVideoMutationOptions = Apollo.BaseMutationOptions<CreateMoveVideoMutation, CreateMoveVideoMutationVariables>;
export const CreatePlayerDocument = gql`
    mutation CreatePlayer {
  createPlayer(input: {}) {
    currentPlayer {
      ...currentPlayer
    }
  }
}
    ${CurrentPlayerFragmentDoc}`;
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, options);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const UpdateStageDocument = gql`
    mutation UpdateStage($stageId: ID!, $attributes: StageAttributes!) {
  updateStage(input: {stageId: $stageId, attributes: $attributes}) {
    stage {
      ...stage
    }
  }
}
    ${StageFragmentDoc}`;
export type UpdateStageMutationFn = Apollo.MutationFunction<UpdateStageMutation, UpdateStageMutationVariables>;

/**
 * __useUpdateStageMutation__
 *
 * To run a mutation, you first call `useUpdateStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStageMutation, { data, loading, error }] = useUpdateStageMutation({
 *   variables: {
 *      stageId: // value for 'stageId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateStageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStageMutation, UpdateStageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStageMutation, UpdateStageMutationVariables>(UpdateStageDocument, options);
      }
export type UpdateStageMutationHookResult = ReturnType<typeof useUpdateStageMutation>;
export type UpdateStageMutationResult = Apollo.MutationResult<UpdateStageMutation>;
export type UpdateStageMutationOptions = Apollo.BaseMutationOptions<UpdateStageMutation, UpdateStageMutationVariables>;
export const CreateThrowActionDocument = gql`
    mutation CreateThrowAction($moveId: ID!, $attributes: ThrowActionAttributes!) {
  createThrowAction(input: {moveId: $moveId, attributes: $attributes}) {
    action {
      id
    }
  }
}
    `;
export type CreateThrowActionMutationFn = Apollo.MutationFunction<CreateThrowActionMutation, CreateThrowActionMutationVariables>;

/**
 * __useCreateThrowActionMutation__
 *
 * To run a mutation, you first call `useCreateThrowActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThrowActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThrowActionMutation, { data, loading, error }] = useCreateThrowActionMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateThrowActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateThrowActionMutation, CreateThrowActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThrowActionMutation, CreateThrowActionMutationVariables>(CreateThrowActionDocument, options);
      }
export type CreateThrowActionMutationHookResult = ReturnType<typeof useCreateThrowActionMutation>;
export type CreateThrowActionMutationResult = Apollo.MutationResult<CreateThrowActionMutation>;
export type CreateThrowActionMutationOptions = Apollo.BaseMutationOptions<CreateThrowActionMutation, CreateThrowActionMutationVariables>;
export const CreateVideoDocument = gql`
    mutation CreateVideo($url: String!) {
  createVideo(input: {url: $url}) {
    video {
      id
    }
  }
}
    `;
export type CreateVideoMutationFn = Apollo.MutationFunction<CreateVideoMutation, CreateVideoMutationVariables>;

/**
 * __useCreateVideoMutation__
 *
 * To run a mutation, you first call `useCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoMutation, { data, loading, error }] = useCreateVideoMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateVideoMutation, CreateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(CreateVideoDocument, options);
      }
export type CreateVideoMutationHookResult = ReturnType<typeof useCreateVideoMutation>;
export type CreateVideoMutationResult = Apollo.MutationResult<CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<CreateVideoMutation, CreateVideoMutationVariables>;
export const CreateVideoCommentDocument = gql`
    mutation CreateVideoComment($videoId: ID!, $attributes: CommentAttributes!) {
  createVideoComment(input: {videoId: $videoId, attributes: $attributes}) {
    videoComment {
      ...videoComment
    }
  }
}
    ${VideoCommentFragmentDoc}`;
export type CreateVideoCommentMutationFn = Apollo.MutationFunction<CreateVideoCommentMutation, CreateVideoCommentMutationVariables>;

/**
 * __useCreateVideoCommentMutation__
 *
 * To run a mutation, you first call `useCreateVideoCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoCommentMutation, { data, loading, error }] = useCreateVideoCommentMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateVideoCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateVideoCommentMutation, CreateVideoCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVideoCommentMutation, CreateVideoCommentMutationVariables>(CreateVideoCommentDocument, options);
      }
export type CreateVideoCommentMutationHookResult = ReturnType<typeof useCreateVideoCommentMutation>;
export type CreateVideoCommentMutationResult = Apollo.MutationResult<CreateVideoCommentMutation>;
export type CreateVideoCommentMutationOptions = Apollo.BaseMutationOptions<CreateVideoCommentMutation, CreateVideoCommentMutationVariables>;
export const CreateVideoFavDocument = gql`
    mutation CreateVideoFav($videoId: ID!) {
  createVideoFav(input: {videoId: $videoId}) {
    video {
      id
    }
  }
}
    `;
export type CreateVideoFavMutationFn = Apollo.MutationFunction<CreateVideoFavMutation, CreateVideoFavMutationVariables>;

/**
 * __useCreateVideoFavMutation__
 *
 * To run a mutation, you first call `useCreateVideoFavMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoFavMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoFavMutation, { data, loading, error }] = useCreateVideoFavMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useCreateVideoFavMutation(baseOptions?: Apollo.MutationHookOptions<CreateVideoFavMutation, CreateVideoFavMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVideoFavMutation, CreateVideoFavMutationVariables>(CreateVideoFavDocument, options);
      }
export type CreateVideoFavMutationHookResult = ReturnType<typeof useCreateVideoFavMutation>;
export type CreateVideoFavMutationResult = Apollo.MutationResult<CreateVideoFavMutation>;
export type CreateVideoFavMutationOptions = Apollo.BaseMutationOptions<CreateVideoFavMutation, CreateVideoFavMutationVariables>;
export const DeleteActionDocument = gql`
    mutation DeleteAction($actionId: ID!) {
  deleteAction(input: {actionId: $actionId}) {
    action {
      ...action
    }
  }
}
    ${ActionFragmentDoc}`;
export type DeleteActionMutationFn = Apollo.MutationFunction<DeleteActionMutation, DeleteActionMutationVariables>;

/**
 * __useDeleteActionMutation__
 *
 * To run a mutation, you first call `useDeleteActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActionMutation, { data, loading, error }] = useDeleteActionMutation({
 *   variables: {
 *      actionId: // value for 'actionId'
 *   },
 * });
 */
export function useDeleteActionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActionMutation, DeleteActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActionMutation, DeleteActionMutationVariables>(DeleteActionDocument, options);
      }
export type DeleteActionMutationHookResult = ReturnType<typeof useDeleteActionMutation>;
export type DeleteActionMutationResult = Apollo.MutationResult<DeleteActionMutation>;
export type DeleteActionMutationOptions = Apollo.BaseMutationOptions<DeleteActionMutation, DeleteActionMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($articleId: ID!) {
  deleteArticle(input: {articleId: $articleId}) {
    article {
      ...article
    }
  }
}
    ${ArticleFragmentDoc}`;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const DeleteCommandDocument = gql`
    mutation DeleteCommand($commandId: ID!) {
  deleteCommand(input: {commandId: $commandId}) {
    command {
      id
    }
  }
}
    `;
export type DeleteCommandMutationFn = Apollo.MutationFunction<DeleteCommandMutation, DeleteCommandMutationVariables>;

/**
 * __useDeleteCommandMutation__
 *
 * To run a mutation, you first call `useDeleteCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommandMutation, { data, loading, error }] = useDeleteCommandMutation({
 *   variables: {
 *      commandId: // value for 'commandId'
 *   },
 * });
 */
export function useDeleteCommandMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommandMutation, DeleteCommandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommandMutation, DeleteCommandMutationVariables>(DeleteCommandDocument, options);
      }
export type DeleteCommandMutationHookResult = ReturnType<typeof useDeleteCommandMutation>;
export type DeleteCommandMutationResult = Apollo.MutationResult<DeleteCommandMutation>;
export type DeleteCommandMutationOptions = Apollo.BaseMutationOptions<DeleteCommandMutation, DeleteCommandMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($eventId: ID!) {
  deleteEvent(input: {eventId: $eventId}) {
    event {
      id
    }
  }
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const DeleteHighlightDocument = gql`
    mutation DeleteHighlight($highlightId: ID!) {
  deleteHighlight(input: {highlightId: $highlightId}) {
    highlight {
      id
    }
  }
}
    `;
export type DeleteHighlightMutationFn = Apollo.MutationFunction<DeleteHighlightMutation, DeleteHighlightMutationVariables>;

/**
 * __useDeleteHighlightMutation__
 *
 * To run a mutation, you first call `useDeleteHighlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHighlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHighlightMutation, { data, loading, error }] = useDeleteHighlightMutation({
 *   variables: {
 *      highlightId: // value for 'highlightId'
 *   },
 * });
 */
export function useDeleteHighlightMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHighlightMutation, DeleteHighlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHighlightMutation, DeleteHighlightMutationVariables>(DeleteHighlightDocument, options);
      }
export type DeleteHighlightMutationHookResult = ReturnType<typeof useDeleteHighlightMutation>;
export type DeleteHighlightMutationResult = Apollo.MutationResult<DeleteHighlightMutation>;
export type DeleteHighlightMutationOptions = Apollo.BaseMutationOptions<DeleteHighlightMutation, DeleteHighlightMutationVariables>;
export const DeleteMoveDocument = gql`
    mutation DeleteMove($moveId: ID!) {
  deleteMove(input: {moveId: $moveId}) {
    move {
      ...move
    }
  }
}
    ${MoveFragmentDoc}`;
export type DeleteMoveMutationFn = Apollo.MutationFunction<DeleteMoveMutation, DeleteMoveMutationVariables>;

/**
 * __useDeleteMoveMutation__
 *
 * To run a mutation, you first call `useDeleteMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMoveMutation, { data, loading, error }] = useDeleteMoveMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function useDeleteMoveMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMoveMutation, DeleteMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMoveMutation, DeleteMoveMutationVariables>(DeleteMoveDocument, options);
      }
export type DeleteMoveMutationHookResult = ReturnType<typeof useDeleteMoveMutation>;
export type DeleteMoveMutationResult = Apollo.MutationResult<DeleteMoveMutation>;
export type DeleteMoveMutationOptions = Apollo.BaseMutationOptions<DeleteMoveMutation, DeleteMoveMutationVariables>;
export const DeleteVideoDocument = gql`
    mutation DeleteVideo($videoId: ID!) {
  deleteVideo(input: {videoId: $videoId}) {
    video {
      ...video
    }
  }
}
    ${VideoFragmentDoc}`;
export type DeleteVideoMutationFn = Apollo.MutationFunction<DeleteVideoMutation, DeleteVideoMutationVariables>;

/**
 * __useDeleteVideoMutation__
 *
 * To run a mutation, you first call `useDeleteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoMutation, { data, loading, error }] = useDeleteVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useDeleteVideoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVideoMutation, DeleteVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVideoMutation, DeleteVideoMutationVariables>(DeleteVideoDocument, options);
      }
export type DeleteVideoMutationHookResult = ReturnType<typeof useDeleteVideoMutation>;
export type DeleteVideoMutationResult = Apollo.MutationResult<DeleteVideoMutation>;
export type DeleteVideoMutationOptions = Apollo.BaseMutationOptions<DeleteVideoMutation, DeleteVideoMutationVariables>;
export const DeleteVideoFavDocument = gql`
    mutation DeleteVideoFav($videoId: ID!) {
  deleteVideoFav(input: {videoId: $videoId}) {
    video {
      id
    }
  }
}
    `;
export type DeleteVideoFavMutationFn = Apollo.MutationFunction<DeleteVideoFavMutation, DeleteVideoFavMutationVariables>;

/**
 * __useDeleteVideoFavMutation__
 *
 * To run a mutation, you first call `useDeleteVideoFavMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoFavMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoFavMutation, { data, loading, error }] = useDeleteVideoFavMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useDeleteVideoFavMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVideoFavMutation, DeleteVideoFavMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVideoFavMutation, DeleteVideoFavMutationVariables>(DeleteVideoFavDocument, options);
      }
export type DeleteVideoFavMutationHookResult = ReturnType<typeof useDeleteVideoFavMutation>;
export type DeleteVideoFavMutationResult = Apollo.MutationResult<DeleteVideoFavMutation>;
export type DeleteVideoFavMutationOptions = Apollo.BaseMutationOptions<DeleteVideoFavMutation, DeleteVideoFavMutationVariables>;
export const FavArticleDocument = gql`
    mutation FavArticle($articleId: ID!) {
  favArticle(input: {articleId: $articleId}) {
    article {
      id
    }
  }
}
    `;
export type FavArticleMutationFn = Apollo.MutationFunction<FavArticleMutation, FavArticleMutationVariables>;

/**
 * __useFavArticleMutation__
 *
 * To run a mutation, you first call `useFavArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favArticleMutation, { data, loading, error }] = useFavArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useFavArticleMutation(baseOptions?: Apollo.MutationHookOptions<FavArticleMutation, FavArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FavArticleMutation, FavArticleMutationVariables>(FavArticleDocument, options);
      }
export type FavArticleMutationHookResult = ReturnType<typeof useFavArticleMutation>;
export type FavArticleMutationResult = Apollo.MutationResult<FavArticleMutation>;
export type FavArticleMutationOptions = Apollo.BaseMutationOptions<FavArticleMutation, FavArticleMutationVariables>;
export const PublishArticleDocument = gql`
    mutation PublishArticle($articleId: ID!) {
  publishArticle(input: {articleId: $articleId}) {
    article {
      ...articleSummary
    }
  }
}
    ${ArticleSummaryFragmentDoc}`;
export type PublishArticleMutationFn = Apollo.MutationFunction<PublishArticleMutation, PublishArticleMutationVariables>;

/**
 * __usePublishArticleMutation__
 *
 * To run a mutation, you first call `usePublishArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishArticleMutation, { data, loading, error }] = usePublishArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function usePublishArticleMutation(baseOptions?: Apollo.MutationHookOptions<PublishArticleMutation, PublishArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishArticleMutation, PublishArticleMutationVariables>(PublishArticleDocument, options);
      }
export type PublishArticleMutationHookResult = ReturnType<typeof usePublishArticleMutation>;
export type PublishArticleMutationResult = Apollo.MutationResult<PublishArticleMutation>;
export type PublishArticleMutationOptions = Apollo.BaseMutationOptions<PublishArticleMutation, PublishArticleMutationVariables>;
export const SetPlayerAvatarDocument = gql`
    mutation SetPlayerAvatar($avatar: String!) {
  setPlayerAvatar(input: {avatar: $avatar}) {
    player {
      avatarUrl
    }
  }
}
    `;
export type SetPlayerAvatarMutationFn = Apollo.MutationFunction<SetPlayerAvatarMutation, SetPlayerAvatarMutationVariables>;

/**
 * __useSetPlayerAvatarMutation__
 *
 * To run a mutation, you first call `useSetPlayerAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPlayerAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPlayerAvatarMutation, { data, loading, error }] = useSetPlayerAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useSetPlayerAvatarMutation(baseOptions?: Apollo.MutationHookOptions<SetPlayerAvatarMutation, SetPlayerAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPlayerAvatarMutation, SetPlayerAvatarMutationVariables>(SetPlayerAvatarDocument, options);
      }
export type SetPlayerAvatarMutationHookResult = ReturnType<typeof useSetPlayerAvatarMutation>;
export type SetPlayerAvatarMutationResult = Apollo.MutationResult<SetPlayerAvatarMutation>;
export type SetPlayerAvatarMutationOptions = Apollo.BaseMutationOptions<SetPlayerAvatarMutation, SetPlayerAvatarMutationVariables>;
export const StopArticleDocument = gql`
    mutation StopArticle($articleId: ID!) {
  stopArticle(input: {articleId: $articleId}) {
    article {
      ...articleSummary
    }
  }
}
    ${ArticleSummaryFragmentDoc}`;
export type StopArticleMutationFn = Apollo.MutationFunction<StopArticleMutation, StopArticleMutationVariables>;

/**
 * __useStopArticleMutation__
 *
 * To run a mutation, you first call `useStopArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopArticleMutation, { data, loading, error }] = useStopArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useStopArticleMutation(baseOptions?: Apollo.MutationHookOptions<StopArticleMutation, StopArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopArticleMutation, StopArticleMutationVariables>(StopArticleDocument, options);
      }
export type StopArticleMutationHookResult = ReturnType<typeof useStopArticleMutation>;
export type StopArticleMutationResult = Apollo.MutationResult<StopArticleMutation>;
export type StopArticleMutationOptions = Apollo.BaseMutationOptions<StopArticleMutation, StopArticleMutationVariables>;
export const UnfavArticleDocument = gql`
    mutation UnfavArticle($articleId: ID!) {
  unfavArticle(input: {articleId: $articleId}) {
    article {
      id
    }
  }
}
    `;
export type UnfavArticleMutationFn = Apollo.MutationFunction<UnfavArticleMutation, UnfavArticleMutationVariables>;

/**
 * __useUnfavArticleMutation__
 *
 * To run a mutation, you first call `useUnfavArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfavArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfavArticleMutation, { data, loading, error }] = useUnfavArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useUnfavArticleMutation(baseOptions?: Apollo.MutationHookOptions<UnfavArticleMutation, UnfavArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfavArticleMutation, UnfavArticleMutationVariables>(UnfavArticleDocument, options);
      }
export type UnfavArticleMutationHookResult = ReturnType<typeof useUnfavArticleMutation>;
export type UnfavArticleMutationResult = Apollo.MutationResult<UnfavArticleMutation>;
export type UnfavArticleMutationOptions = Apollo.BaseMutationOptions<UnfavArticleMutation, UnfavArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($articleId: ID!, $attributes: ArticleAttributes!) {
  updateArticle(input: {articleId: $articleId, attributes: $attributes}) {
    article {
      id
    }
  }
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const UpdateAttackActionDocument = gql`
    mutation UpdateAttackAction($actionId: ID!, $attributes: AttackActionAttributes!) {
  updateAttackAction(input: {actionId: $actionId, attributes: $attributes}) {
    action {
      id
    }
  }
}
    `;
export type UpdateAttackActionMutationFn = Apollo.MutationFunction<UpdateAttackActionMutation, UpdateAttackActionMutationVariables>;

/**
 * __useUpdateAttackActionMutation__
 *
 * To run a mutation, you first call `useUpdateAttackActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttackActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttackActionMutation, { data, loading, error }] = useUpdateAttackActionMutation({
 *   variables: {
 *      actionId: // value for 'actionId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateAttackActionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAttackActionMutation, UpdateAttackActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAttackActionMutation, UpdateAttackActionMutationVariables>(UpdateAttackActionDocument, options);
      }
export type UpdateAttackActionMutationHookResult = ReturnType<typeof useUpdateAttackActionMutation>;
export type UpdateAttackActionMutationResult = Apollo.MutationResult<UpdateAttackActionMutation>;
export type UpdateAttackActionMutationOptions = Apollo.BaseMutationOptions<UpdateAttackActionMutation, UpdateAttackActionMutationVariables>;
export const UpdateCharacterDocument = gql`
    mutation UpdateCharacter($characterSlug: ID!, $attributes: CharacterAttributes!) {
  updateCharacter(input: {characterSlug: $characterSlug, attributes: $attributes}) {
    character {
      ...character
    }
  }
}
    ${CharacterFragmentDoc}`;
export type UpdateCharacterMutationFn = Apollo.MutationFunction<UpdateCharacterMutation, UpdateCharacterMutationVariables>;

/**
 * __useUpdateCharacterMutation__
 *
 * To run a mutation, you first call `useUpdateCharacterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCharacterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCharacterMutation, { data, loading, error }] = useUpdateCharacterMutation({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateCharacterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCharacterMutation, UpdateCharacterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCharacterMutation, UpdateCharacterMutationVariables>(UpdateCharacterDocument, options);
      }
export type UpdateCharacterMutationHookResult = ReturnType<typeof useUpdateCharacterMutation>;
export type UpdateCharacterMutationResult = Apollo.MutationResult<UpdateCharacterMutation>;
export type UpdateCharacterMutationOptions = Apollo.BaseMutationOptions<UpdateCharacterMutation, UpdateCharacterMutationVariables>;
export const UpdateComboDocument = gql`
    mutation UpdateCombo($comboId: ID!, $attributes: ComboAttributes!) {
  updateCombo(input: {comboId: $comboId, attributes: $attributes}) {
    combo {
      id
      comboCategory {
        id
      }
    }
  }
}
    `;
export type UpdateComboMutationFn = Apollo.MutationFunction<UpdateComboMutation, UpdateComboMutationVariables>;

/**
 * __useUpdateComboMutation__
 *
 * To run a mutation, you first call `useUpdateComboMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComboMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComboMutation, { data, loading, error }] = useUpdateComboMutation({
 *   variables: {
 *      comboId: // value for 'comboId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateComboMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComboMutation, UpdateComboMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComboMutation, UpdateComboMutationVariables>(UpdateComboDocument, options);
      }
export type UpdateComboMutationHookResult = ReturnType<typeof useUpdateComboMutation>;
export type UpdateComboMutationResult = Apollo.MutationResult<UpdateComboMutation>;
export type UpdateComboMutationOptions = Apollo.BaseMutationOptions<UpdateComboMutation, UpdateComboMutationVariables>;
export const UpdateComboCategoryDocument = gql`
    mutation UpdateComboCategory($comboCategoryId: ID!, $attributes: ComboCategoryAttributes!) {
  updateComboCategory(
    input: {comboCategoryId: $comboCategoryId, attributes: $attributes}
  ) {
    comboCategory {
      id
    }
  }
}
    `;
export type UpdateComboCategoryMutationFn = Apollo.MutationFunction<UpdateComboCategoryMutation, UpdateComboCategoryMutationVariables>;

/**
 * __useUpdateComboCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateComboCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComboCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComboCategoryMutation, { data, loading, error }] = useUpdateComboCategoryMutation({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateComboCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComboCategoryMutation, UpdateComboCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComboCategoryMutation, UpdateComboCategoryMutationVariables>(UpdateComboCategoryDocument, options);
      }
export type UpdateComboCategoryMutationHookResult = ReturnType<typeof useUpdateComboCategoryMutation>;
export type UpdateComboCategoryMutationResult = Apollo.MutationResult<UpdateComboCategoryMutation>;
export type UpdateComboCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateComboCategoryMutation, UpdateComboCategoryMutationVariables>;
export const UpdateComboCategoryPositionDocument = gql`
    mutation UpdateComboCategoryPosition($comboCategoryId: ID!, $newPosition: Int!) {
  updateComboCategoryPosition(
    input: {comboCategoryId: $comboCategoryId, newPosition: $newPosition}
  ) {
    comboCategory {
      id
    }
  }
}
    `;
export type UpdateComboCategoryPositionMutationFn = Apollo.MutationFunction<UpdateComboCategoryPositionMutation, UpdateComboCategoryPositionMutationVariables>;

/**
 * __useUpdateComboCategoryPositionMutation__
 *
 * To run a mutation, you first call `useUpdateComboCategoryPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComboCategoryPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComboCategoryPositionMutation, { data, loading, error }] = useUpdateComboCategoryPositionMutation({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *      newPosition: // value for 'newPosition'
 *   },
 * });
 */
export function useUpdateComboCategoryPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComboCategoryPositionMutation, UpdateComboCategoryPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComboCategoryPositionMutation, UpdateComboCategoryPositionMutationVariables>(UpdateComboCategoryPositionDocument, options);
      }
export type UpdateComboCategoryPositionMutationHookResult = ReturnType<typeof useUpdateComboCategoryPositionMutation>;
export type UpdateComboCategoryPositionMutationResult = Apollo.MutationResult<UpdateComboCategoryPositionMutation>;
export type UpdateComboCategoryPositionMutationOptions = Apollo.BaseMutationOptions<UpdateComboCategoryPositionMutation, UpdateComboCategoryPositionMutationVariables>;
export const UpdateComboPositionDocument = gql`
    mutation UpdateComboPosition($comboId: ID!, $newPosition: Int!) {
  updateComboPosition(input: {comboId: $comboId, newPosition: $newPosition}) {
    combo {
      id
    }
  }
}
    `;
export type UpdateComboPositionMutationFn = Apollo.MutationFunction<UpdateComboPositionMutation, UpdateComboPositionMutationVariables>;

/**
 * __useUpdateComboPositionMutation__
 *
 * To run a mutation, you first call `useUpdateComboPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComboPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComboPositionMutation, { data, loading, error }] = useUpdateComboPositionMutation({
 *   variables: {
 *      comboId: // value for 'comboId'
 *      newPosition: // value for 'newPosition'
 *   },
 * });
 */
export function useUpdateComboPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComboPositionMutation, UpdateComboPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComboPositionMutation, UpdateComboPositionMutationVariables>(UpdateComboPositionDocument, options);
      }
export type UpdateComboPositionMutationHookResult = ReturnType<typeof useUpdateComboPositionMutation>;
export type UpdateComboPositionMutationResult = Apollo.MutationResult<UpdateComboPositionMutation>;
export type UpdateComboPositionMutationOptions = Apollo.BaseMutationOptions<UpdateComboPositionMutation, UpdateComboPositionMutationVariables>;
export const UpdateCommandDocument = gql`
    mutation UpdateCommand($commandId: ID!, $attributes: CommandAttributes!) {
  updateCommand(input: {commandId: $commandId, attributes: $attributes}) {
    command {
      id
    }
  }
}
    `;
export type UpdateCommandMutationFn = Apollo.MutationFunction<UpdateCommandMutation, UpdateCommandMutationVariables>;

/**
 * __useUpdateCommandMutation__
 *
 * To run a mutation, you first call `useUpdateCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommandMutation, { data, loading, error }] = useUpdateCommandMutation({
 *   variables: {
 *      commandId: // value for 'commandId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateCommandMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommandMutation, UpdateCommandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommandMutation, UpdateCommandMutationVariables>(UpdateCommandDocument, options);
      }
export type UpdateCommandMutationHookResult = ReturnType<typeof useUpdateCommandMutation>;
export type UpdateCommandMutationResult = Apollo.MutationResult<UpdateCommandMutation>;
export type UpdateCommandMutationOptions = Apollo.BaseMutationOptions<UpdateCommandMutation, UpdateCommandMutationVariables>;
export const UpdateCurrentPlayerDocument = gql`
    mutation UpdateCurrentPlayer($attributes: CurrentPlayerAttributes!) {
  updateCurrentPlayer(input: {attributes: $attributes}) {
    currentPlayer {
      ...currentPlayer
    }
  }
}
    ${CurrentPlayerFragmentDoc}`;
export type UpdateCurrentPlayerMutationFn = Apollo.MutationFunction<UpdateCurrentPlayerMutation, UpdateCurrentPlayerMutationVariables>;

/**
 * __useUpdateCurrentPlayerMutation__
 *
 * To run a mutation, you first call `useUpdateCurrentPlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrentPlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrentPlayerMutation, { data, loading, error }] = useUpdateCurrentPlayerMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateCurrentPlayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCurrentPlayerMutation, UpdateCurrentPlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCurrentPlayerMutation, UpdateCurrentPlayerMutationVariables>(UpdateCurrentPlayerDocument, options);
      }
export type UpdateCurrentPlayerMutationHookResult = ReturnType<typeof useUpdateCurrentPlayerMutation>;
export type UpdateCurrentPlayerMutationResult = Apollo.MutationResult<UpdateCurrentPlayerMutation>;
export type UpdateCurrentPlayerMutationOptions = Apollo.BaseMutationOptions<UpdateCurrentPlayerMutation, UpdateCurrentPlayerMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($eventId: ID!, $attributes: EventAttributes!) {
  updateEvent(input: {eventId: $eventId, attributes: $attributes}) {
    event {
      ...event
    }
  }
}
    ${EventFragmentDoc}`;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const UpdateHighlightDocument = gql`
    mutation UpdateHighlight($highlightId: ID!, $attributes: HighlightAttributes!) {
  updateHighlight(input: {highlightId: $highlightId, attributes: $attributes}) {
    highlight {
      ...highlight
    }
  }
}
    ${HighlightFragmentDoc}`;
export type UpdateHighlightMutationFn = Apollo.MutationFunction<UpdateHighlightMutation, UpdateHighlightMutationVariables>;

/**
 * __useUpdateHighlightMutation__
 *
 * To run a mutation, you first call `useUpdateHighlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHighlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHighlightMutation, { data, loading, error }] = useUpdateHighlightMutation({
 *   variables: {
 *      highlightId: // value for 'highlightId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateHighlightMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHighlightMutation, UpdateHighlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHighlightMutation, UpdateHighlightMutationVariables>(UpdateHighlightDocument, options);
      }
export type UpdateHighlightMutationHookResult = ReturnType<typeof useUpdateHighlightMutation>;
export type UpdateHighlightMutationResult = Apollo.MutationResult<UpdateHighlightMutation>;
export type UpdateHighlightMutationOptions = Apollo.BaseMutationOptions<UpdateHighlightMutation, UpdateHighlightMutationVariables>;
export const UpdateMoveDocument = gql`
    mutation UpdateMove($moveId: ID!, $attributes: MoveAttributes!) {
  updateMove(input: {moveId: $moveId, attributes: $attributes}) {
    move {
      id
      moveCategory {
        id
      }
    }
  }
}
    `;
export type UpdateMoveMutationFn = Apollo.MutationFunction<UpdateMoveMutation, UpdateMoveMutationVariables>;

/**
 * __useUpdateMoveMutation__
 *
 * To run a mutation, you first call `useUpdateMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMoveMutation, { data, loading, error }] = useUpdateMoveMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateMoveMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMoveMutation, UpdateMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMoveMutation, UpdateMoveMutationVariables>(UpdateMoveDocument, options);
      }
export type UpdateMoveMutationHookResult = ReturnType<typeof useUpdateMoveMutation>;
export type UpdateMoveMutationResult = Apollo.MutationResult<UpdateMoveMutation>;
export type UpdateMoveMutationOptions = Apollo.BaseMutationOptions<UpdateMoveMutation, UpdateMoveMutationVariables>;
export const UpdateMoveCategoryDocument = gql`
    mutation UpdateMoveCategory($moveCategoryId: ID!, $attributes: MoveCategoryAttributes!) {
  updateMoveCategory(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    moveCategory {
      id
    }
  }
}
    `;
export type UpdateMoveCategoryMutationFn = Apollo.MutationFunction<UpdateMoveCategoryMutation, UpdateMoveCategoryMutationVariables>;

/**
 * __useUpdateMoveCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateMoveCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMoveCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMoveCategoryMutation, { data, loading, error }] = useUpdateMoveCategoryMutation({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateMoveCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMoveCategoryMutation, UpdateMoveCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMoveCategoryMutation, UpdateMoveCategoryMutationVariables>(UpdateMoveCategoryDocument, options);
      }
export type UpdateMoveCategoryMutationHookResult = ReturnType<typeof useUpdateMoveCategoryMutation>;
export type UpdateMoveCategoryMutationResult = Apollo.MutationResult<UpdateMoveCategoryMutation>;
export type UpdateMoveCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateMoveCategoryMutation, UpdateMoveCategoryMutationVariables>;
export const UpdateMoveCategoryPositionDocument = gql`
    mutation UpdateMoveCategoryPosition($moveCategoryId: ID!, $newPosition: Int!) {
  updateMoveCategoryPosition(
    input: {moveCategoryId: $moveCategoryId, newPosition: $newPosition}
  ) {
    moveCategory {
      id
    }
  }
}
    `;
export type UpdateMoveCategoryPositionMutationFn = Apollo.MutationFunction<UpdateMoveCategoryPositionMutation, UpdateMoveCategoryPositionMutationVariables>;

/**
 * __useUpdateMoveCategoryPositionMutation__
 *
 * To run a mutation, you first call `useUpdateMoveCategoryPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMoveCategoryPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMoveCategoryPositionMutation, { data, loading, error }] = useUpdateMoveCategoryPositionMutation({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *      newPosition: // value for 'newPosition'
 *   },
 * });
 */
export function useUpdateMoveCategoryPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMoveCategoryPositionMutation, UpdateMoveCategoryPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMoveCategoryPositionMutation, UpdateMoveCategoryPositionMutationVariables>(UpdateMoveCategoryPositionDocument, options);
      }
export type UpdateMoveCategoryPositionMutationHookResult = ReturnType<typeof useUpdateMoveCategoryPositionMutation>;
export type UpdateMoveCategoryPositionMutationResult = Apollo.MutationResult<UpdateMoveCategoryPositionMutation>;
export type UpdateMoveCategoryPositionMutationOptions = Apollo.BaseMutationOptions<UpdateMoveCategoryPositionMutation, UpdateMoveCategoryPositionMutationVariables>;
export const UpdateMovePositionDocument = gql`
    mutation UpdateMovePosition($moveId: ID!, $newPosition: Int!) {
  updateMovePosition(input: {moveId: $moveId, newPosition: $newPosition}) {
    move {
      id
    }
  }
}
    `;
export type UpdateMovePositionMutationFn = Apollo.MutationFunction<UpdateMovePositionMutation, UpdateMovePositionMutationVariables>;

/**
 * __useUpdateMovePositionMutation__
 *
 * To run a mutation, you first call `useUpdateMovePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMovePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMovePositionMutation, { data, loading, error }] = useUpdateMovePositionMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      newPosition: // value for 'newPosition'
 *   },
 * });
 */
export function useUpdateMovePositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMovePositionMutation, UpdateMovePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMovePositionMutation, UpdateMovePositionMutationVariables>(UpdateMovePositionDocument, options);
      }
export type UpdateMovePositionMutationHookResult = ReturnType<typeof useUpdateMovePositionMutation>;
export type UpdateMovePositionMutationResult = Apollo.MutationResult<UpdateMovePositionMutation>;
export type UpdateMovePositionMutationOptions = Apollo.BaseMutationOptions<UpdateMovePositionMutation, UpdateMovePositionMutationVariables>;
export const CreateStageDocument = gql`
    mutation CreateStage($attributes: StageAttributes!) {
  createStage(input: {attributes: $attributes}) {
    stage {
      ...stage
    }
  }
}
    ${StageFragmentDoc}`;
export type CreateStageMutationFn = Apollo.MutationFunction<CreateStageMutation, CreateStageMutationVariables>;

/**
 * __useCreateStageMutation__
 *
 * To run a mutation, you first call `useCreateStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStageMutation, { data, loading, error }] = useCreateStageMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateStageMutation(baseOptions?: Apollo.MutationHookOptions<CreateStageMutation, CreateStageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStageMutation, CreateStageMutationVariables>(CreateStageDocument, options);
      }
export type CreateStageMutationHookResult = ReturnType<typeof useCreateStageMutation>;
export type CreateStageMutationResult = Apollo.MutationResult<CreateStageMutation>;
export type CreateStageMutationOptions = Apollo.BaseMutationOptions<CreateStageMutation, CreateStageMutationVariables>;
export const UpdateStagePositionDocument = gql`
    mutation UpdateStagePosition($stageId: ID!, $newPosition: Int!) {
  updateStagePosition(input: {stageId: $stageId, newPosition: $newPosition}) {
    stage {
      id
    }
  }
}
    `;
export type UpdateStagePositionMutationFn = Apollo.MutationFunction<UpdateStagePositionMutation, UpdateStagePositionMutationVariables>;

/**
 * __useUpdateStagePositionMutation__
 *
 * To run a mutation, you first call `useUpdateStagePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStagePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStagePositionMutation, { data, loading, error }] = useUpdateStagePositionMutation({
 *   variables: {
 *      stageId: // value for 'stageId'
 *      newPosition: // value for 'newPosition'
 *   },
 * });
 */
export function useUpdateStagePositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStagePositionMutation, UpdateStagePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStagePositionMutation, UpdateStagePositionMutationVariables>(UpdateStagePositionDocument, options);
      }
export type UpdateStagePositionMutationHookResult = ReturnType<typeof useUpdateStagePositionMutation>;
export type UpdateStagePositionMutationResult = Apollo.MutationResult<UpdateStagePositionMutation>;
export type UpdateStagePositionMutationOptions = Apollo.BaseMutationOptions<UpdateStagePositionMutation, UpdateStagePositionMutationVariables>;
export const UpdateThrowActionDocument = gql`
    mutation UpdateThrowAction($actionId: ID!, $attributes: ThrowActionAttributes!) {
  updateThrowAction(input: {actionId: $actionId, attributes: $attributes}) {
    action {
      id
    }
  }
}
    `;
export type UpdateThrowActionMutationFn = Apollo.MutationFunction<UpdateThrowActionMutation, UpdateThrowActionMutationVariables>;

/**
 * __useUpdateThrowActionMutation__
 *
 * To run a mutation, you first call `useUpdateThrowActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThrowActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThrowActionMutation, { data, loading, error }] = useUpdateThrowActionMutation({
 *   variables: {
 *      actionId: // value for 'actionId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateThrowActionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThrowActionMutation, UpdateThrowActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThrowActionMutation, UpdateThrowActionMutationVariables>(UpdateThrowActionDocument, options);
      }
export type UpdateThrowActionMutationHookResult = ReturnType<typeof useUpdateThrowActionMutation>;
export type UpdateThrowActionMutationResult = Apollo.MutationResult<UpdateThrowActionMutation>;
export type UpdateThrowActionMutationOptions = Apollo.BaseMutationOptions<UpdateThrowActionMutation, UpdateThrowActionMutationVariables>;
export const UpdateVideoDocument = gql`
    mutation UpdateVideo($videoId: ID!, $attributes: VideoAttributes!) {
  updateVideo(input: {videoId: $videoId, attributes: $attributes}) {
    video {
      ...video
    }
  }
}
    ${VideoFragmentDoc}`;
export type UpdateVideoMutationFn = Apollo.MutationFunction<UpdateVideoMutation, UpdateVideoMutationVariables>;

/**
 * __useUpdateVideoMutation__
 *
 * To run a mutation, you first call `useUpdateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoMutation, { data, loading, error }] = useUpdateVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateVideoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVideoMutation, UpdateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVideoMutation, UpdateVideoMutationVariables>(UpdateVideoDocument, options);
      }
export type UpdateVideoMutationHookResult = ReturnType<typeof useUpdateVideoMutation>;
export type UpdateVideoMutationResult = Apollo.MutationResult<UpdateVideoMutation>;
export type UpdateVideoMutationOptions = Apollo.BaseMutationOptions<UpdateVideoMutation, UpdateVideoMutationVariables>;
export const ArticleDocument = gql`
    query Article($articleId: ID!) {
  article(articleId: $articleId) {
    ...article
  }
}
    ${ArticleFragmentDoc}`;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
      }
export function useArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const ArticleCommentsDocument = gql`
    query ArticleComments($articleId: ID!) {
  articleComments(articleId: $articleId) {
    ...articleComment
  }
}
    ${ArticleCommentFragmentDoc}`;

/**
 * __useArticleCommentsQuery__
 *
 * To run a query within a React component, call `useArticleCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleCommentsQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useArticleCommentsQuery(baseOptions: Apollo.QueryHookOptions<ArticleCommentsQuery, ArticleCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleCommentsQuery, ArticleCommentsQueryVariables>(ArticleCommentsDocument, options);
      }
export function useArticleCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleCommentsQuery, ArticleCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleCommentsQuery, ArticleCommentsQueryVariables>(ArticleCommentsDocument, options);
        }
export type ArticleCommentsQueryHookResult = ReturnType<typeof useArticleCommentsQuery>;
export type ArticleCommentsLazyQueryHookResult = ReturnType<typeof useArticleCommentsLazyQuery>;
export type ArticleCommentsQueryResult = Apollo.QueryResult<ArticleCommentsQuery, ArticleCommentsQueryVariables>;
export const ArticlePathsDocument = gql`
    query ArticlePaths {
  allArticles {
    id
  }
}
    `;

/**
 * __useArticlePathsQuery__
 *
 * To run a query within a React component, call `useArticlePathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlePathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlePathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlePathsQuery(baseOptions?: Apollo.QueryHookOptions<ArticlePathsQuery, ArticlePathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlePathsQuery, ArticlePathsQueryVariables>(ArticlePathsDocument, options);
      }
export function useArticlePathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlePathsQuery, ArticlePathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlePathsQuery, ArticlePathsQueryVariables>(ArticlePathsDocument, options);
        }
export type ArticlePathsQueryHookResult = ReturnType<typeof useArticlePathsQuery>;
export type ArticlePathsLazyQueryHookResult = ReturnType<typeof useArticlePathsLazyQuery>;
export type ArticlePathsQueryResult = Apollo.QueryResult<ArticlePathsQuery, ArticlePathsQueryVariables>;
export const ArticlesDocument = gql`
    query Articles($page: Int, $per: Int, $order: Order, $category: ArticleCategory) {
  articles(page: $page, per: $per, order: $order, category: $category) {
    records {
      ...articleSummary
    }
    paging {
      ...paging
    }
  }
}
    ${ArticleSummaryFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *      order: // value for 'order'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const CharacterWithChildrenDocument = gql`
    query CharacterWithChildren($characterSlug: ID!) {
  character(characterSlug: $characterSlug) {
    ...characterWithChildren
  }
}
    ${CharacterWithChildrenFragmentDoc}`;

/**
 * __useCharacterWithChildrenQuery__
 *
 * To run a query within a React component, call `useCharacterWithChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterWithChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterWithChildrenQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterWithChildrenQuery(baseOptions: Apollo.QueryHookOptions<CharacterWithChildrenQuery, CharacterWithChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterWithChildrenQuery, CharacterWithChildrenQueryVariables>(CharacterWithChildrenDocument, options);
      }
export function useCharacterWithChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterWithChildrenQuery, CharacterWithChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterWithChildrenQuery, CharacterWithChildrenQueryVariables>(CharacterWithChildrenDocument, options);
        }
export type CharacterWithChildrenQueryHookResult = ReturnType<typeof useCharacterWithChildrenQuery>;
export type CharacterWithChildrenLazyQueryHookResult = ReturnType<typeof useCharacterWithChildrenLazyQuery>;
export type CharacterWithChildrenQueryResult = Apollo.QueryResult<CharacterWithChildrenQuery, CharacterWithChildrenQueryVariables>;
export const CharacterMovesDocument = gql`
    query CharacterMoves($characterSlug: ID!) {
  character(characterSlug: $characterSlug) {
    slug
    longName
    faceImageUrl
    country
    fightingStyle
    story
    description
    moveCategories {
      ...moveCategoryWithMoves
    }
  }
}
    ${MoveCategoryWithMovesFragmentDoc}`;

/**
 * __useCharacterMovesQuery__
 *
 * To run a query within a React component, call `useCharacterMovesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterMovesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterMovesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterMovesQuery(baseOptions: Apollo.QueryHookOptions<CharacterMovesQuery, CharacterMovesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterMovesQuery, CharacterMovesQueryVariables>(CharacterMovesDocument, options);
      }
export function useCharacterMovesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterMovesQuery, CharacterMovesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterMovesQuery, CharacterMovesQueryVariables>(CharacterMovesDocument, options);
        }
export type CharacterMovesQueryHookResult = ReturnType<typeof useCharacterMovesQuery>;
export type CharacterMovesLazyQueryHookResult = ReturnType<typeof useCharacterMovesLazyQuery>;
export type CharacterMovesQueryResult = Apollo.QueryResult<CharacterMovesQuery, CharacterMovesQueryVariables>;
export const CharacterPathsDocument = gql`
    query CharacterPaths {
  characters {
    slug
  }
}
    `;

/**
 * __useCharacterPathsQuery__
 *
 * To run a query within a React component, call `useCharacterPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharacterPathsQuery(baseOptions?: Apollo.QueryHookOptions<CharacterPathsQuery, CharacterPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterPathsQuery, CharacterPathsQueryVariables>(CharacterPathsDocument, options);
      }
export function useCharacterPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterPathsQuery, CharacterPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterPathsQuery, CharacterPathsQueryVariables>(CharacterPathsDocument, options);
        }
export type CharacterPathsQueryHookResult = ReturnType<typeof useCharacterPathsQuery>;
export type CharacterPathsLazyQueryHookResult = ReturnType<typeof useCharacterPathsLazyQuery>;
export type CharacterPathsQueryResult = Apollo.QueryResult<CharacterPathsQuery, CharacterPathsQueryVariables>;
export const CharacterSelectOptionsDocument = gql`
    query CharacterSelectOptions {
  characters {
    slug
    name
  }
}
    `;

/**
 * __useCharacterSelectOptionsQuery__
 *
 * To run a query within a React component, call `useCharacterSelectOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterSelectOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterSelectOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharacterSelectOptionsQuery(baseOptions?: Apollo.QueryHookOptions<CharacterSelectOptionsQuery, CharacterSelectOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterSelectOptionsQuery, CharacterSelectOptionsQueryVariables>(CharacterSelectOptionsDocument, options);
      }
export function useCharacterSelectOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterSelectOptionsQuery, CharacterSelectOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterSelectOptionsQuery, CharacterSelectOptionsQueryVariables>(CharacterSelectOptionsDocument, options);
        }
export type CharacterSelectOptionsQueryHookResult = ReturnType<typeof useCharacterSelectOptionsQuery>;
export type CharacterSelectOptionsLazyQueryHookResult = ReturnType<typeof useCharacterSelectOptionsLazyQuery>;
export type CharacterSelectOptionsQueryResult = Apollo.QueryResult<CharacterSelectOptionsQuery, CharacterSelectOptionsQueryVariables>;
export const CharacterSlugsDocument = gql`
    query CharacterSlugs {
  characters {
    slug
  }
}
    `;

/**
 * __useCharacterSlugsQuery__
 *
 * To run a query within a React component, call `useCharacterSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharacterSlugsQuery(baseOptions?: Apollo.QueryHookOptions<CharacterSlugsQuery, CharacterSlugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterSlugsQuery, CharacterSlugsQueryVariables>(CharacterSlugsDocument, options);
      }
export function useCharacterSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterSlugsQuery, CharacterSlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterSlugsQuery, CharacterSlugsQueryVariables>(CharacterSlugsDocument, options);
        }
export type CharacterSlugsQueryHookResult = ReturnType<typeof useCharacterSlugsQuery>;
export type CharacterSlugsLazyQueryHookResult = ReturnType<typeof useCharacterSlugsLazyQuery>;
export type CharacterSlugsQueryResult = Apollo.QueryResult<CharacterSlugsQuery, CharacterSlugsQueryVariables>;
export const CharacterDocument = gql`
    query Character($characterSlug: ID!) {
  character(characterSlug: $characterSlug) {
    ...character
  }
}
    ${CharacterFragmentDoc}`;

/**
 * __useCharacterQuery__
 *
 * To run a query within a React component, call `useCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterQuery(baseOptions: Apollo.QueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
      }
export function useCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
        }
export type CharacterQueryHookResult = ReturnType<typeof useCharacterQuery>;
export type CharacterLazyQueryHookResult = ReturnType<typeof useCharacterLazyQuery>;
export type CharacterQueryResult = Apollo.QueryResult<CharacterQuery, CharacterQueryVariables>;
export const CharactersDocument = gql`
    query Characters {
  characters {
    ...characterSummary
  }
}
    ${CharacterSummaryFragmentDoc}`;

/**
 * __useCharactersQuery__
 *
 * To run a query within a React component, call `useCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharactersQuery(baseOptions?: Apollo.QueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, options);
      }
export function useCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, options);
        }
export type CharactersQueryHookResult = ReturnType<typeof useCharactersQuery>;
export type CharactersLazyQueryHookResult = ReturnType<typeof useCharactersLazyQuery>;
export type CharactersQueryResult = Apollo.QueryResult<CharactersQuery, CharactersQueryVariables>;
export const CombosDocument = gql`
    query Combos($comboCategoryId: ID!) {
  combos(comboCategoryId: $comboCategoryId) {
    ...combo
  }
}
    ${ComboFragmentDoc}`;

/**
 * __useCombosQuery__
 *
 * To run a query within a React component, call `useCombosQuery` and pass it any options that fit your needs.
 * When your component renders, `useCombosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCombosQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function useCombosQuery(baseOptions: Apollo.QueryHookOptions<CombosQuery, CombosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CombosQuery, CombosQueryVariables>(CombosDocument, options);
      }
export function useCombosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CombosQuery, CombosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CombosQuery, CombosQueryVariables>(CombosDocument, options);
        }
export type CombosQueryHookResult = ReturnType<typeof useCombosQuery>;
export type CombosLazyQueryHookResult = ReturnType<typeof useCombosLazyQuery>;
export type CombosQueryResult = Apollo.QueryResult<CombosQuery, CombosQueryVariables>;
export const ComboCategoriesDocument = gql`
    query ComboCategories($characterSlug: ID!) {
  comboCategories(characterSlug: $characterSlug) {
    ...comboCategory
  }
}
    ${ComboCategoryFragmentDoc}`;

/**
 * __useComboCategoriesQuery__
 *
 * To run a query within a React component, call `useComboCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboCategoriesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useComboCategoriesQuery(baseOptions: Apollo.QueryHookOptions<ComboCategoriesQuery, ComboCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboCategoriesQuery, ComboCategoriesQueryVariables>(ComboCategoriesDocument, options);
      }
export function useComboCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboCategoriesQuery, ComboCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboCategoriesQuery, ComboCategoriesQueryVariables>(ComboCategoriesDocument, options);
        }
export type ComboCategoriesQueryHookResult = ReturnType<typeof useComboCategoriesQuery>;
export type ComboCategoriesLazyQueryHookResult = ReturnType<typeof useComboCategoriesLazyQuery>;
export type ComboCategoriesQueryResult = Apollo.QueryResult<ComboCategoriesQuery, ComboCategoriesQueryVariables>;
export const ComboCategoryDocument = gql`
    query ComboCategory($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    ...comboCategoryWithCharacter
  }
}
    ${ComboCategoryWithCharacterFragmentDoc}`;

/**
 * __useComboCategoryQuery__
 *
 * To run a query within a React component, call `useComboCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboCategoryQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function useComboCategoryQuery(baseOptions: Apollo.QueryHookOptions<ComboCategoryQuery, ComboCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboCategoryQuery, ComboCategoryQueryVariables>(ComboCategoryDocument, options);
      }
export function useComboCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboCategoryQuery, ComboCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboCategoryQuery, ComboCategoryQueryVariables>(ComboCategoryDocument, options);
        }
export type ComboCategoryQueryHookResult = ReturnType<typeof useComboCategoryQuery>;
export type ComboCategoryLazyQueryHookResult = ReturnType<typeof useComboCategoryLazyQuery>;
export type ComboCategoryQueryResult = Apollo.QueryResult<ComboCategoryQuery, ComboCategoryQueryVariables>;
export const ComboCategoryDetailDocument = gql`
    query ComboCategoryDetail($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    ...comboCategoryDetail
  }
}
    ${ComboCategoryDetailFragmentDoc}`;

/**
 * __useComboCategoryDetailQuery__
 *
 * To run a query within a React component, call `useComboCategoryDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboCategoryDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboCategoryDetailQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function useComboCategoryDetailQuery(baseOptions: Apollo.QueryHookOptions<ComboCategoryDetailQuery, ComboCategoryDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboCategoryDetailQuery, ComboCategoryDetailQueryVariables>(ComboCategoryDetailDocument, options);
      }
export function useComboCategoryDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboCategoryDetailQuery, ComboCategoryDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboCategoryDetailQuery, ComboCategoryDetailQueryVariables>(ComboCategoryDetailDocument, options);
        }
export type ComboCategoryDetailQueryHookResult = ReturnType<typeof useComboCategoryDetailQuery>;
export type ComboCategoryDetailLazyQueryHookResult = ReturnType<typeof useComboCategoryDetailLazyQuery>;
export type ComboCategoryDetailQueryResult = Apollo.QueryResult<ComboCategoryDetailQuery, ComboCategoryDetailQueryVariables>;
export const ComboCategoryIdsDocument = gql`
    query ComboCategoryIds {
  comboCategories {
    id
  }
}
    `;

/**
 * __useComboCategoryIdsQuery__
 *
 * To run a query within a React component, call `useComboCategoryIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboCategoryIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboCategoryIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useComboCategoryIdsQuery(baseOptions?: Apollo.QueryHookOptions<ComboCategoryIdsQuery, ComboCategoryIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboCategoryIdsQuery, ComboCategoryIdsQueryVariables>(ComboCategoryIdsDocument, options);
      }
export function useComboCategoryIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboCategoryIdsQuery, ComboCategoryIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboCategoryIdsQuery, ComboCategoryIdsQueryVariables>(ComboCategoryIdsDocument, options);
        }
export type ComboCategoryIdsQueryHookResult = ReturnType<typeof useComboCategoryIdsQuery>;
export type ComboCategoryIdsLazyQueryHookResult = ReturnType<typeof useComboCategoryIdsLazyQuery>;
export type ComboCategoryIdsQueryResult = Apollo.QueryResult<ComboCategoryIdsQuery, ComboCategoryIdsQueryVariables>;
export const ComboSelectOptionsDocument = gql`
    query ComboSelectOptions($characterSlug: ID!) {
  comboCategories(characterSlug: $characterSlug) {
    id
    name
    combos {
      id
      name
    }
  }
}
    `;

/**
 * __useComboSelectOptionsQuery__
 *
 * To run a query within a React component, call `useComboSelectOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboSelectOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboSelectOptionsQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useComboSelectOptionsQuery(baseOptions: Apollo.QueryHookOptions<ComboSelectOptionsQuery, ComboSelectOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboSelectOptionsQuery, ComboSelectOptionsQueryVariables>(ComboSelectOptionsDocument, options);
      }
export function useComboSelectOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboSelectOptionsQuery, ComboSelectOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboSelectOptionsQuery, ComboSelectOptionsQueryVariables>(ComboSelectOptionsDocument, options);
        }
export type ComboSelectOptionsQueryHookResult = ReturnType<typeof useComboSelectOptionsQuery>;
export type ComboSelectOptionsLazyQueryHookResult = ReturnType<typeof useComboSelectOptionsLazyQuery>;
export type ComboSelectOptionsQueryResult = Apollo.QueryResult<ComboSelectOptionsQuery, ComboSelectOptionsQueryVariables>;
export const ComboDocument = gql`
    query Combo($comboId: ID!) {
  combo(comboId: $comboId) {
    ...combo
  }
}
    ${ComboFragmentDoc}`;

/**
 * __useComboQuery__
 *
 * To run a query within a React component, call `useComboQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboQuery({
 *   variables: {
 *      comboId: // value for 'comboId'
 *   },
 * });
 */
export function useComboQuery(baseOptions: Apollo.QueryHookOptions<ComboQuery, ComboQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboQuery, ComboQueryVariables>(ComboDocument, options);
      }
export function useComboLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboQuery, ComboQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboQuery, ComboQueryVariables>(ComboDocument, options);
        }
export type ComboQueryHookResult = ReturnType<typeof useComboQuery>;
export type ComboLazyQueryHookResult = ReturnType<typeof useComboLazyQuery>;
export type ComboQueryResult = Apollo.QueryResult<ComboQuery, ComboQueryVariables>;
export const CurrentPlayerDocument = gql`
    query CurrentPlayer {
  currentPlayer {
    ...currentPlayer
  }
}
    ${CurrentPlayerFragmentDoc}`;

/**
 * __useCurrentPlayerQuery__
 *
 * To run a query within a React component, call `useCurrentPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentPlayerQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentPlayerQuery(baseOptions?: Apollo.QueryHookOptions<CurrentPlayerQuery, CurrentPlayerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentPlayerQuery, CurrentPlayerQueryVariables>(CurrentPlayerDocument, options);
      }
export function useCurrentPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentPlayerQuery, CurrentPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentPlayerQuery, CurrentPlayerQueryVariables>(CurrentPlayerDocument, options);
        }
export type CurrentPlayerQueryHookResult = ReturnType<typeof useCurrentPlayerQuery>;
export type CurrentPlayerLazyQueryHookResult = ReturnType<typeof useCurrentPlayerLazyQuery>;
export type CurrentPlayerQueryResult = Apollo.QueryResult<CurrentPlayerQuery, CurrentPlayerQueryVariables>;
export const EventsDocument = gql`
    query Events($page: Int, $per: Int) {
  events(page: $page, per: $per) {
    records {
      ...event
    }
    paging {
      ...paging
    }
  }
}
    ${EventFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const EventDocument = gql`
    query Event($eventId: ID!) {
  event(eventId: $eventId) {
    ...event
  }
}
    ${EventFragmentDoc}`;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const MoveDocument = gql`
    query Move($moveId: ID!) {
  move(moveId: $moveId) {
    ...move
  }
}
    ${MoveFragmentDoc}`;

/**
 * __useMoveQuery__
 *
 * To run a query within a React component, call `useMoveQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function useMoveQuery(baseOptions: Apollo.QueryHookOptions<MoveQuery, MoveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveQuery, MoveQueryVariables>(MoveDocument, options);
      }
export function useMoveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveQuery, MoveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveQuery, MoveQueryVariables>(MoveDocument, options);
        }
export type MoveQueryHookResult = ReturnType<typeof useMoveQuery>;
export type MoveLazyQueryHookResult = ReturnType<typeof useMoveLazyQuery>;
export type MoveQueryResult = Apollo.QueryResult<MoveQuery, MoveQueryVariables>;
export const MoveCategoriesDocument = gql`
    query MoveCategories($characterSlug: ID!) {
  moveCategories(characterSlug: $characterSlug) {
    ...moveCategory
  }
}
    ${MoveCategoryFragmentDoc}`;

/**
 * __useMoveCategoriesQuery__
 *
 * To run a query within a React component, call `useMoveCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCategoriesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useMoveCategoriesQuery(baseOptions: Apollo.QueryHookOptions<MoveCategoriesQuery, MoveCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCategoriesQuery, MoveCategoriesQueryVariables>(MoveCategoriesDocument, options);
      }
export function useMoveCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCategoriesQuery, MoveCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCategoriesQuery, MoveCategoriesQueryVariables>(MoveCategoriesDocument, options);
        }
export type MoveCategoriesQueryHookResult = ReturnType<typeof useMoveCategoriesQuery>;
export type MoveCategoriesLazyQueryHookResult = ReturnType<typeof useMoveCategoriesLazyQuery>;
export type MoveCategoriesQueryResult = Apollo.QueryResult<MoveCategoriesQuery, MoveCategoriesQueryVariables>;
export const MoveCategoryDocument = gql`
    query MoveCategory($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    ...moveCategoryWithCharacter
  }
}
    ${MoveCategoryWithCharacterFragmentDoc}`;

/**
 * __useMoveCategoryQuery__
 *
 * To run a query within a React component, call `useMoveCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCategoryQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function useMoveCategoryQuery(baseOptions: Apollo.QueryHookOptions<MoveCategoryQuery, MoveCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCategoryQuery, MoveCategoryQueryVariables>(MoveCategoryDocument, options);
      }
export function useMoveCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCategoryQuery, MoveCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCategoryQuery, MoveCategoryQueryVariables>(MoveCategoryDocument, options);
        }
export type MoveCategoryQueryHookResult = ReturnType<typeof useMoveCategoryQuery>;
export type MoveCategoryLazyQueryHookResult = ReturnType<typeof useMoveCategoryLazyQuery>;
export type MoveCategoryQueryResult = Apollo.QueryResult<MoveCategoryQuery, MoveCategoryQueryVariables>;
export const MoveCategoryDetailDocument = gql`
    query MoveCategoryDetail($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    ...moveCategoryDetail
  }
}
    ${MoveCategoryDetailFragmentDoc}`;

/**
 * __useMoveCategoryDetailQuery__
 *
 * To run a query within a React component, call `useMoveCategoryDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCategoryDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCategoryDetailQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function useMoveCategoryDetailQuery(baseOptions: Apollo.QueryHookOptions<MoveCategoryDetailQuery, MoveCategoryDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCategoryDetailQuery, MoveCategoryDetailQueryVariables>(MoveCategoryDetailDocument, options);
      }
export function useMoveCategoryDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCategoryDetailQuery, MoveCategoryDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCategoryDetailQuery, MoveCategoryDetailQueryVariables>(MoveCategoryDetailDocument, options);
        }
export type MoveCategoryDetailQueryHookResult = ReturnType<typeof useMoveCategoryDetailQuery>;
export type MoveCategoryDetailLazyQueryHookResult = ReturnType<typeof useMoveCategoryDetailLazyQuery>;
export type MoveCategoryDetailQueryResult = Apollo.QueryResult<MoveCategoryDetailQuery, MoveCategoryDetailQueryVariables>;
export const MoveCategoryIdsDocument = gql`
    query MoveCategoryIds {
  moveCategories {
    id
  }
}
    `;

/**
 * __useMoveCategoryIdsQuery__
 *
 * To run a query within a React component, call `useMoveCategoryIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCategoryIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCategoryIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMoveCategoryIdsQuery(baseOptions?: Apollo.QueryHookOptions<MoveCategoryIdsQuery, MoveCategoryIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCategoryIdsQuery, MoveCategoryIdsQueryVariables>(MoveCategoryIdsDocument, options);
      }
export function useMoveCategoryIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCategoryIdsQuery, MoveCategoryIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCategoryIdsQuery, MoveCategoryIdsQueryVariables>(MoveCategoryIdsDocument, options);
        }
export type MoveCategoryIdsQueryHookResult = ReturnType<typeof useMoveCategoryIdsQuery>;
export type MoveCategoryIdsLazyQueryHookResult = ReturnType<typeof useMoveCategoryIdsLazyQuery>;
export type MoveCategoryIdsQueryResult = Apollo.QueryResult<MoveCategoryIdsQuery, MoveCategoryIdsQueryVariables>;
export const MoveCommentsDocument = gql`
    query MoveComments($moveId: ID!) {
  moveComments(moveId: $moveId) {
    ...moveComment
  }
}
    ${MoveCommentFragmentDoc}`;

/**
 * __useMoveCommentsQuery__
 *
 * To run a query within a React component, call `useMoveCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCommentsQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function useMoveCommentsQuery(baseOptions: Apollo.QueryHookOptions<MoveCommentsQuery, MoveCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCommentsQuery, MoveCommentsQueryVariables>(MoveCommentsDocument, options);
      }
export function useMoveCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCommentsQuery, MoveCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCommentsQuery, MoveCommentsQueryVariables>(MoveCommentsDocument, options);
        }
export type MoveCommentsQueryHookResult = ReturnType<typeof useMoveCommentsQuery>;
export type MoveCommentsLazyQueryHookResult = ReturnType<typeof useMoveCommentsLazyQuery>;
export type MoveCommentsQueryResult = Apollo.QueryResult<MoveCommentsQuery, MoveCommentsQueryVariables>;
export const MoveSelectOptionsDocument = gql`
    query MoveSelectOptions($characterSlug: ID!) {
  moveCategories(characterSlug: $characterSlug) {
    id
    name
    moves {
      id
      name
      commands {
        operations {
          key
        }
      }
    }
  }
}
    `;

/**
 * __useMoveSelectOptionsQuery__
 *
 * To run a query within a React component, call `useMoveSelectOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveSelectOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveSelectOptionsQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useMoveSelectOptionsQuery(baseOptions: Apollo.QueryHookOptions<MoveSelectOptionsQuery, MoveSelectOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveSelectOptionsQuery, MoveSelectOptionsQueryVariables>(MoveSelectOptionsDocument, options);
      }
export function useMoveSelectOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveSelectOptionsQuery, MoveSelectOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveSelectOptionsQuery, MoveSelectOptionsQueryVariables>(MoveSelectOptionsDocument, options);
        }
export type MoveSelectOptionsQueryHookResult = ReturnType<typeof useMoveSelectOptionsQuery>;
export type MoveSelectOptionsLazyQueryHookResult = ReturnType<typeof useMoveSelectOptionsLazyQuery>;
export type MoveSelectOptionsQueryResult = Apollo.QueryResult<MoveSelectOptionsQuery, MoveSelectOptionsQueryVariables>;
export const MovesDocument = gql`
    query Moves($moveCategoryId: ID!) {
  moves(moveCategoryId: $moveCategoryId) {
    ...move
  }
}
    ${MoveFragmentDoc}`;

/**
 * __useMovesQuery__
 *
 * To run a query within a React component, call `useMovesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovesQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function useMovesQuery(baseOptions: Apollo.QueryHookOptions<MovesQuery, MovesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MovesQuery, MovesQueryVariables>(MovesDocument, options);
      }
export function useMovesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovesQuery, MovesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MovesQuery, MovesQueryVariables>(MovesDocument, options);
        }
export type MovesQueryHookResult = ReturnType<typeof useMovesQuery>;
export type MovesLazyQueryHookResult = ReturnType<typeof useMovesLazyQuery>;
export type MovesQueryResult = Apollo.QueryResult<MovesQuery, MovesQueryVariables>;
export const MyArticleDocument = gql`
    query MyArticle($articleId: ID!) {
  myArticle(articleId: $articleId) {
    ...article
  }
}
    ${ArticleFragmentDoc}`;

/**
 * __useMyArticleQuery__
 *
 * To run a query within a React component, call `useMyArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useMyArticleQuery(baseOptions: Apollo.QueryHookOptions<MyArticleQuery, MyArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyArticleQuery, MyArticleQueryVariables>(MyArticleDocument, options);
      }
export function useMyArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyArticleQuery, MyArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyArticleQuery, MyArticleQueryVariables>(MyArticleDocument, options);
        }
export type MyArticleQueryHookResult = ReturnType<typeof useMyArticleQuery>;
export type MyArticleLazyQueryHookResult = ReturnType<typeof useMyArticleLazyQuery>;
export type MyArticleQueryResult = Apollo.QueryResult<MyArticleQuery, MyArticleQueryVariables>;
export const MyArticlesDocument = gql`
    query MyArticles($page: Int, $per: Int) {
  myArticles(page: $page, per: $per) {
    records {
      ...articleSummary
    }
    paging {
      ...paging
    }
  }
}
    ${ArticleSummaryFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useMyArticlesQuery__
 *
 * To run a query within a React component, call `useMyArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyArticlesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *   },
 * });
 */
export function useMyArticlesQuery(baseOptions?: Apollo.QueryHookOptions<MyArticlesQuery, MyArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyArticlesQuery, MyArticlesQueryVariables>(MyArticlesDocument, options);
      }
export function useMyArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyArticlesQuery, MyArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyArticlesQuery, MyArticlesQueryVariables>(MyArticlesDocument, options);
        }
export type MyArticlesQueryHookResult = ReturnType<typeof useMyArticlesQuery>;
export type MyArticlesLazyQueryHookResult = ReturnType<typeof useMyArticlesLazyQuery>;
export type MyArticlesQueryResult = Apollo.QueryResult<MyArticlesQuery, MyArticlesQueryVariables>;
export const OperationsDocument = gql`
    query Operations {
  operations {
    ...operation
  }
}
    ${OperationFragmentDoc}`;

/**
 * __useOperationsQuery__
 *
 * To run a query within a React component, call `useOperationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOperationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOperationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOperationsQuery(baseOptions?: Apollo.QueryHookOptions<OperationsQuery, OperationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OperationsQuery, OperationsQueryVariables>(OperationsDocument, options);
      }
export function useOperationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperationsQuery, OperationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OperationsQuery, OperationsQueryVariables>(OperationsDocument, options);
        }
export type OperationsQueryHookResult = ReturnType<typeof useOperationsQuery>;
export type OperationsLazyQueryHookResult = ReturnType<typeof useOperationsLazyQuery>;
export type OperationsQueryResult = Apollo.QueryResult<OperationsQuery, OperationsQueryVariables>;
export const StageDocument = gql`
    query Stage($stageId: ID!) {
  stage(stageId: $stageId) {
    ...stage
  }
}
    ${StageFragmentDoc}`;

/**
 * __useStageQuery__
 *
 * To run a query within a React component, call `useStageQuery` and pass it any options that fit your needs.
 * When your component renders, `useStageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStageQuery({
 *   variables: {
 *      stageId: // value for 'stageId'
 *   },
 * });
 */
export function useStageQuery(baseOptions: Apollo.QueryHookOptions<StageQuery, StageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StageQuery, StageQueryVariables>(StageDocument, options);
      }
export function useStageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StageQuery, StageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StageQuery, StageQueryVariables>(StageDocument, options);
        }
export type StageQueryHookResult = ReturnType<typeof useStageQuery>;
export type StageLazyQueryHookResult = ReturnType<typeof useStageLazyQuery>;
export type StageQueryResult = Apollo.QueryResult<StageQuery, StageQueryVariables>;
export const StagesDocument = gql`
    query Stages {
  stages {
    ...stage
  }
}
    ${StageFragmentDoc}`;

/**
 * __useStagesQuery__
 *
 * To run a query within a React component, call `useStagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStagesQuery(baseOptions?: Apollo.QueryHookOptions<StagesQuery, StagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StagesQuery, StagesQueryVariables>(StagesDocument, options);
      }
export function useStagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StagesQuery, StagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StagesQuery, StagesQueryVariables>(StagesDocument, options);
        }
export type StagesQueryHookResult = ReturnType<typeof useStagesQuery>;
export type StagesLazyQueryHookResult = ReturnType<typeof useStagesLazyQuery>;
export type StagesQueryResult = Apollo.QueryResult<StagesQuery, StagesQueryVariables>;
export const StatesDocument = gql`
    query States($characterSlug: ID!) {
  states(characterSlug: $characterSlug) {
    ...state
  }
}
    ${StateFragmentDoc}`;

/**
 * __useStatesQuery__
 *
 * To run a query within a React component, call `useStatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useStatesQuery(baseOptions: Apollo.QueryHookOptions<StatesQuery, StatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
      }
export function useStatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatesQuery, StatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatesQuery, StatesQueryVariables>(StatesDocument, options);
        }
export type StatesQueryHookResult = ReturnType<typeof useStatesQuery>;
export type StatesLazyQueryHookResult = ReturnType<typeof useStatesLazyQuery>;
export type StatesQueryResult = Apollo.QueryResult<StatesQuery, StatesQueryVariables>;
export const TopPlayersDocument = gql`
    query TopPlayers {
  topPlayers {
    ...topPlayer
  }
}
    ${TopPlayerFragmentDoc}`;

/**
 * __useTopPlayersQuery__
 *
 * To run a query within a React component, call `useTopPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopPlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopPlayersQuery(baseOptions?: Apollo.QueryHookOptions<TopPlayersQuery, TopPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopPlayersQuery, TopPlayersQueryVariables>(TopPlayersDocument, options);
      }
export function useTopPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopPlayersQuery, TopPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopPlayersQuery, TopPlayersQueryVariables>(TopPlayersDocument, options);
        }
export type TopPlayersQueryHookResult = ReturnType<typeof useTopPlayersQuery>;
export type TopPlayersLazyQueryHookResult = ReturnType<typeof useTopPlayersLazyQuery>;
export type TopPlayersQueryResult = Apollo.QueryResult<TopPlayersQuery, TopPlayersQueryVariables>;
export const VideoDocument = gql`
    query Video($videoId: ID!) {
  video(videoId: $videoId) {
    ...video
  }
}
    ${VideoFragmentDoc}`;

/**
 * __useVideoQuery__
 *
 * To run a query within a React component, call `useVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useVideoQuery(baseOptions: Apollo.QueryHookOptions<VideoQuery, VideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoQuery, VideoQueryVariables>(VideoDocument, options);
      }
export function useVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoQuery, VideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoQuery, VideoQueryVariables>(VideoDocument, options);
        }
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoQueryResult = Apollo.QueryResult<VideoQuery, VideoQueryVariables>;
export const VideoCommentsDocument = gql`
    query VideoComments($videoId: ID!) {
  videoComments(videoId: $videoId) {
    ...videoComment
  }
}
    ${VideoCommentFragmentDoc}`;

/**
 * __useVideoCommentsQuery__
 *
 * To run a query within a React component, call `useVideoCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoCommentsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useVideoCommentsQuery(baseOptions: Apollo.QueryHookOptions<VideoCommentsQuery, VideoCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoCommentsQuery, VideoCommentsQueryVariables>(VideoCommentsDocument, options);
      }
export function useVideoCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoCommentsQuery, VideoCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoCommentsQuery, VideoCommentsQueryVariables>(VideoCommentsDocument, options);
        }
export type VideoCommentsQueryHookResult = ReturnType<typeof useVideoCommentsQuery>;
export type VideoCommentsLazyQueryHookResult = ReturnType<typeof useVideoCommentsLazyQuery>;
export type VideoCommentsQueryResult = Apollo.QueryResult<VideoCommentsQuery, VideoCommentsQueryVariables>;
export const VideosDocument = gql`
    query Videos($page: Int, $per: Int, $order: Order) {
  videos(page: $page, per: $per, order: $order) {
    records {
      ...videoSummary
    }
    paging {
      ...paging
    }
  }
}
    ${VideoSummaryFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useVideosQuery(baseOptions?: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
      }
export function useVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
        }
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<VideosQuery, VideosQueryVariables>;
export const PageDashboardArticlesDocument = gql`
    query PageDashboardArticles($page: Int, $per: Int) {
  myArticles(page: $page, per: $per) {
    records {
      id
      title
      status
    }
    paging {
      ...paging
    }
  }
}
    ${PagingFragmentDoc}`;

/**
 * __usePageDashboardArticlesQuery__
 *
 * To run a query within a React component, call `usePageDashboardArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardArticlesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *   },
 * });
 */
export function usePageDashboardArticlesQuery(baseOptions?: Apollo.QueryHookOptions<PageDashboardArticlesQuery, PageDashboardArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardArticlesQuery, PageDashboardArticlesQueryVariables>(PageDashboardArticlesDocument, options);
      }
export function usePageDashboardArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardArticlesQuery, PageDashboardArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardArticlesQuery, PageDashboardArticlesQueryVariables>(PageDashboardArticlesDocument, options);
        }
export type PageDashboardArticlesQueryHookResult = ReturnType<typeof usePageDashboardArticlesQuery>;
export type PageDashboardArticlesLazyQueryHookResult = ReturnType<typeof usePageDashboardArticlesLazyQuery>;
export type PageDashboardArticlesQueryResult = Apollo.QueryResult<PageDashboardArticlesQuery, PageDashboardArticlesQueryVariables>;
export const PageDashboardAttackActionEditDocument = gql`
    query PageDashboardAttackActionEdit($actionId: ID!) {
  attackAction(actionId: $actionId) {
    ...attackAction
    move {
      id
      name
      moveCategory {
        id
        name
        character {
          slug
          name
        }
      }
    }
  }
}
    ${AttackActionFragmentDoc}`;

/**
 * __usePageDashboardAttackActionEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardAttackActionEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardAttackActionEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardAttackActionEditQuery({
 *   variables: {
 *      actionId: // value for 'actionId'
 *   },
 * });
 */
export function usePageDashboardAttackActionEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardAttackActionEditQuery, PageDashboardAttackActionEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardAttackActionEditQuery, PageDashboardAttackActionEditQueryVariables>(PageDashboardAttackActionEditDocument, options);
      }
export function usePageDashboardAttackActionEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardAttackActionEditQuery, PageDashboardAttackActionEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardAttackActionEditQuery, PageDashboardAttackActionEditQueryVariables>(PageDashboardAttackActionEditDocument, options);
        }
export type PageDashboardAttackActionEditQueryHookResult = ReturnType<typeof usePageDashboardAttackActionEditQuery>;
export type PageDashboardAttackActionEditLazyQueryHookResult = ReturnType<typeof usePageDashboardAttackActionEditLazyQuery>;
export type PageDashboardAttackActionEditQueryResult = Apollo.QueryResult<PageDashboardAttackActionEditQuery, PageDashboardAttackActionEditQueryVariables>;
export const PageDashboardComboCategoriesDocument = gql`
    query PageDashboardComboCategories($characterSlug: ID!) {
  character(characterSlug: $characterSlug) {
    slug
    name
    comboCategories {
      id
      name
      combosCount
    }
  }
}
    `;

/**
 * __usePageDashboardComboCategoriesQuery__
 *
 * To run a query within a React component, call `usePageDashboardComboCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardComboCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardComboCategoriesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageDashboardComboCategoriesQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardComboCategoriesQuery, PageDashboardComboCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardComboCategoriesQuery, PageDashboardComboCategoriesQueryVariables>(PageDashboardComboCategoriesDocument, options);
      }
export function usePageDashboardComboCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardComboCategoriesQuery, PageDashboardComboCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardComboCategoriesQuery, PageDashboardComboCategoriesQueryVariables>(PageDashboardComboCategoriesDocument, options);
        }
export type PageDashboardComboCategoriesQueryHookResult = ReturnType<typeof usePageDashboardComboCategoriesQuery>;
export type PageDashboardComboCategoriesLazyQueryHookResult = ReturnType<typeof usePageDashboardComboCategoriesLazyQuery>;
export type PageDashboardComboCategoriesQueryResult = Apollo.QueryResult<PageDashboardComboCategoriesQuery, PageDashboardComboCategoriesQueryVariables>;
export const PageDashboardMoveCategoriesDocument = gql`
    query PageDashboardMoveCategories($characterSlug: ID!) {
  character(characterSlug: $characterSlug) {
    slug
    name
    moveCategories {
      id
      name
      movesCount
    }
  }
}
    `;

/**
 * __usePageDashboardMoveCategoriesQuery__
 *
 * To run a query within a React component, call `usePageDashboardMoveCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardMoveCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardMoveCategoriesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageDashboardMoveCategoriesQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardMoveCategoriesQuery, PageDashboardMoveCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardMoveCategoriesQuery, PageDashboardMoveCategoriesQueryVariables>(PageDashboardMoveCategoriesDocument, options);
      }
export function usePageDashboardMoveCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardMoveCategoriesQuery, PageDashboardMoveCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardMoveCategoriesQuery, PageDashboardMoveCategoriesQueryVariables>(PageDashboardMoveCategoriesDocument, options);
        }
export type PageDashboardMoveCategoriesQueryHookResult = ReturnType<typeof usePageDashboardMoveCategoriesQuery>;
export type PageDashboardMoveCategoriesLazyQueryHookResult = ReturnType<typeof usePageDashboardMoveCategoriesLazyQuery>;
export type PageDashboardMoveCategoriesQueryResult = Apollo.QueryResult<PageDashboardMoveCategoriesQuery, PageDashboardMoveCategoriesQueryVariables>;
export const PageDashboardCombosDocument = gql`
    query PageDashboardCombos($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    id
    name
    character {
      slug
      name
    }
    combos {
      id
      name
    }
  }
}
    `;

/**
 * __usePageDashboardCombosQuery__
 *
 * To run a query within a React component, call `usePageDashboardCombosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardCombosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardCombosQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function usePageDashboardCombosQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardCombosQuery, PageDashboardCombosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardCombosQuery, PageDashboardCombosQueryVariables>(PageDashboardCombosDocument, options);
      }
export function usePageDashboardCombosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardCombosQuery, PageDashboardCombosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardCombosQuery, PageDashboardCombosQueryVariables>(PageDashboardCombosDocument, options);
        }
export type PageDashboardCombosQueryHookResult = ReturnType<typeof usePageDashboardCombosQuery>;
export type PageDashboardCombosLazyQueryHookResult = ReturnType<typeof usePageDashboardCombosLazyQuery>;
export type PageDashboardCombosQueryResult = Apollo.QueryResult<PageDashboardCombosQuery, PageDashboardCombosQueryVariables>;
export const PageDashboardComboNewDocument = gql`
    query PageDashboardComboNew($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    id
    name
    character {
      slug
      name
      states {
        id
        name
      }
      conditions {
        id
        name
      }
    }
  }
}
    `;

/**
 * __usePageDashboardComboNewQuery__
 *
 * To run a query within a React component, call `usePageDashboardComboNewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardComboNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardComboNewQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function usePageDashboardComboNewQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardComboNewQuery, PageDashboardComboNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardComboNewQuery, PageDashboardComboNewQueryVariables>(PageDashboardComboNewDocument, options);
      }
export function usePageDashboardComboNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardComboNewQuery, PageDashboardComboNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardComboNewQuery, PageDashboardComboNewQueryVariables>(PageDashboardComboNewDocument, options);
        }
export type PageDashboardComboNewQueryHookResult = ReturnType<typeof usePageDashboardComboNewQuery>;
export type PageDashboardComboNewLazyQueryHookResult = ReturnType<typeof usePageDashboardComboNewLazyQuery>;
export type PageDashboardComboNewQueryResult = Apollo.QueryResult<PageDashboardComboNewQuery, PageDashboardComboNewQueryVariables>;
export const PageDashboardComboEditDocument = gql`
    query PageDashboardComboEdit($comboId: ID!) {
  combo(comboId: $comboId) {
    ...combo
    state {
      id
    }
    operations {
      id
    }
    comboCategory {
      id
      name
      character {
        slug
        name
        states {
          id
          name
        }
        conditions {
          id
          name
        }
      }
    }
  }
}
    ${ComboFragmentDoc}`;

/**
 * __usePageDashboardComboEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardComboEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardComboEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardComboEditQuery({
 *   variables: {
 *      comboId: // value for 'comboId'
 *   },
 * });
 */
export function usePageDashboardComboEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardComboEditQuery, PageDashboardComboEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardComboEditQuery, PageDashboardComboEditQueryVariables>(PageDashboardComboEditDocument, options);
      }
export function usePageDashboardComboEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardComboEditQuery, PageDashboardComboEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardComboEditQuery, PageDashboardComboEditQueryVariables>(PageDashboardComboEditDocument, options);
        }
export type PageDashboardComboEditQueryHookResult = ReturnType<typeof usePageDashboardComboEditQuery>;
export type PageDashboardComboEditLazyQueryHookResult = ReturnType<typeof usePageDashboardComboEditLazyQuery>;
export type PageDashboardComboEditQueryResult = Apollo.QueryResult<PageDashboardComboEditQuery, PageDashboardComboEditQueryVariables>;
export const PageDashboardCommandEditDocument = gql`
    query PageDashboardCommandEdit($commandId: ID!) {
  command(commandId: $commandId) {
    ...command
    state {
      id
    }
    operations {
      id
    }
    move {
      id
      name
      moveCategory {
        id
        name
        character {
          slug
          name
          states {
            id
            name
          }
        }
      }
    }
  }
}
    ${CommandFragmentDoc}`;

/**
 * __usePageDashboardCommandEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardCommandEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardCommandEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardCommandEditQuery({
 *   variables: {
 *      commandId: // value for 'commandId'
 *   },
 * });
 */
export function usePageDashboardCommandEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardCommandEditQuery, PageDashboardCommandEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardCommandEditQuery, PageDashboardCommandEditQueryVariables>(PageDashboardCommandEditDocument, options);
      }
export function usePageDashboardCommandEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardCommandEditQuery, PageDashboardCommandEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardCommandEditQuery, PageDashboardCommandEditQueryVariables>(PageDashboardCommandEditDocument, options);
        }
export type PageDashboardCommandEditQueryHookResult = ReturnType<typeof usePageDashboardCommandEditQuery>;
export type PageDashboardCommandEditLazyQueryHookResult = ReturnType<typeof usePageDashboardCommandEditLazyQuery>;
export type PageDashboardCommandEditQueryResult = Apollo.QueryResult<PageDashboardCommandEditQuery, PageDashboardCommandEditQueryVariables>;
export const PageDashboardEventsDocument = gql`
    query PageDashboardEvents($page: Int, $per: Int) {
  events(page: $page, per: $per) {
    records {
      id
      name
    }
    paging {
      ...paging
    }
  }
}
    ${PagingFragmentDoc}`;

/**
 * __usePageDashboardEventsQuery__
 *
 * To run a query within a React component, call `usePageDashboardEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardEventsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *   },
 * });
 */
export function usePageDashboardEventsQuery(baseOptions?: Apollo.QueryHookOptions<PageDashboardEventsQuery, PageDashboardEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardEventsQuery, PageDashboardEventsQueryVariables>(PageDashboardEventsDocument, options);
      }
export function usePageDashboardEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardEventsQuery, PageDashboardEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardEventsQuery, PageDashboardEventsQueryVariables>(PageDashboardEventsDocument, options);
        }
export type PageDashboardEventsQueryHookResult = ReturnType<typeof usePageDashboardEventsQuery>;
export type PageDashboardEventsLazyQueryHookResult = ReturnType<typeof usePageDashboardEventsLazyQuery>;
export type PageDashboardEventsQueryResult = Apollo.QueryResult<PageDashboardEventsQuery, PageDashboardEventsQueryVariables>;
export const PageDashboardHighlightEditDocument = gql`
    query PageDashboardHighlightEdit($highlightId: ID!) {
  highlight(highlightId: $highlightId) {
    id
    title
    startSec
    video {
      id
      title
      videoId
    }
  }
}
    `;

/**
 * __usePageDashboardHighlightEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardHighlightEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardHighlightEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardHighlightEditQuery({
 *   variables: {
 *      highlightId: // value for 'highlightId'
 *   },
 * });
 */
export function usePageDashboardHighlightEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardHighlightEditQuery, PageDashboardHighlightEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardHighlightEditQuery, PageDashboardHighlightEditQueryVariables>(PageDashboardHighlightEditDocument, options);
      }
export function usePageDashboardHighlightEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardHighlightEditQuery, PageDashboardHighlightEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardHighlightEditQuery, PageDashboardHighlightEditQueryVariables>(PageDashboardHighlightEditDocument, options);
        }
export type PageDashboardHighlightEditQueryHookResult = ReturnType<typeof usePageDashboardHighlightEditQuery>;
export type PageDashboardHighlightEditLazyQueryHookResult = ReturnType<typeof usePageDashboardHighlightEditLazyQuery>;
export type PageDashboardHighlightEditQueryResult = Apollo.QueryResult<PageDashboardHighlightEditQuery, PageDashboardHighlightEditQueryVariables>;
export const PageDashboardMovesDocument = gql`
    query PageDashboardMoves($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    id
    name
    character {
      slug
      name
    }
    moves {
      id
      name
      commandsCount
      actionsCount
    }
  }
}
    `;

/**
 * __usePageDashboardMovesQuery__
 *
 * To run a query within a React component, call `usePageDashboardMovesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardMovesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardMovesQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function usePageDashboardMovesQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardMovesQuery, PageDashboardMovesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardMovesQuery, PageDashboardMovesQueryVariables>(PageDashboardMovesDocument, options);
      }
export function usePageDashboardMovesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardMovesQuery, PageDashboardMovesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardMovesQuery, PageDashboardMovesQueryVariables>(PageDashboardMovesDocument, options);
        }
export type PageDashboardMovesQueryHookResult = ReturnType<typeof usePageDashboardMovesQuery>;
export type PageDashboardMovesLazyQueryHookResult = ReturnType<typeof usePageDashboardMovesLazyQuery>;
export type PageDashboardMovesQueryResult = Apollo.QueryResult<PageDashboardMovesQuery, PageDashboardMovesQueryVariables>;
export const PageDashboardMoveNewDocument = gql`
    query PageDashboardMoveNew($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    id
    name
    character {
      slug
      name
      conditions {
        id
        name
      }
    }
  }
}
    `;

/**
 * __usePageDashboardMoveNewQuery__
 *
 * To run a query within a React component, call `usePageDashboardMoveNewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardMoveNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardMoveNewQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function usePageDashboardMoveNewQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardMoveNewQuery, PageDashboardMoveNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardMoveNewQuery, PageDashboardMoveNewQueryVariables>(PageDashboardMoveNewDocument, options);
      }
export function usePageDashboardMoveNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardMoveNewQuery, PageDashboardMoveNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardMoveNewQuery, PageDashboardMoveNewQueryVariables>(PageDashboardMoveNewDocument, options);
        }
export type PageDashboardMoveNewQueryHookResult = ReturnType<typeof usePageDashboardMoveNewQuery>;
export type PageDashboardMoveNewLazyQueryHookResult = ReturnType<typeof usePageDashboardMoveNewLazyQuery>;
export type PageDashboardMoveNewQueryResult = Apollo.QueryResult<PageDashboardMoveNewQuery, PageDashboardMoveNewQueryVariables>;
export const PageDashboardActionsDocument = gql`
    query PageDashboardActions($moveId: ID!) {
  move(moveId: $moveId) {
    id
    name
    actions {
      ...action
    }
    moveCategory {
      id
      name
      character {
        slug
        name
      }
    }
  }
}
    ${ActionFragmentDoc}`;

/**
 * __usePageDashboardActionsQuery__
 *
 * To run a query within a React component, call `usePageDashboardActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardActionsQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function usePageDashboardActionsQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardActionsQuery, PageDashboardActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardActionsQuery, PageDashboardActionsQueryVariables>(PageDashboardActionsDocument, options);
      }
export function usePageDashboardActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardActionsQuery, PageDashboardActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardActionsQuery, PageDashboardActionsQueryVariables>(PageDashboardActionsDocument, options);
        }
export type PageDashboardActionsQueryHookResult = ReturnType<typeof usePageDashboardActionsQuery>;
export type PageDashboardActionsLazyQueryHookResult = ReturnType<typeof usePageDashboardActionsLazyQuery>;
export type PageDashboardActionsQueryResult = Apollo.QueryResult<PageDashboardActionsQuery, PageDashboardActionsQueryVariables>;
export const PageDashboardActionNewDocument = gql`
    query PageDashboardActionNew($moveId: ID!) {
  move(moveId: $moveId) {
    id
    name
    moveCategory {
      id
      name
      character {
        slug
        name
      }
    }
  }
}
    `;

/**
 * __usePageDashboardActionNewQuery__
 *
 * To run a query within a React component, call `usePageDashboardActionNewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardActionNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardActionNewQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function usePageDashboardActionNewQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardActionNewQuery, PageDashboardActionNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardActionNewQuery, PageDashboardActionNewQueryVariables>(PageDashboardActionNewDocument, options);
      }
export function usePageDashboardActionNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardActionNewQuery, PageDashboardActionNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardActionNewQuery, PageDashboardActionNewQueryVariables>(PageDashboardActionNewDocument, options);
        }
export type PageDashboardActionNewQueryHookResult = ReturnType<typeof usePageDashboardActionNewQuery>;
export type PageDashboardActionNewLazyQueryHookResult = ReturnType<typeof usePageDashboardActionNewLazyQuery>;
export type PageDashboardActionNewQueryResult = Apollo.QueryResult<PageDashboardActionNewQuery, PageDashboardActionNewQueryVariables>;
export const PageDashboardCommandsDocument = gql`
    query PageDashboardCommands($moveId: ID!) {
  move(moveId: $moveId) {
    id
    name
    commands {
      ...command
    }
    moveCategory {
      id
      name
      character {
        slug
        name
        states {
          id
          name
        }
      }
    }
  }
}
    ${CommandFragmentDoc}`;

/**
 * __usePageDashboardCommandsQuery__
 *
 * To run a query within a React component, call `usePageDashboardCommandsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardCommandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardCommandsQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function usePageDashboardCommandsQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardCommandsQuery, PageDashboardCommandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardCommandsQuery, PageDashboardCommandsQueryVariables>(PageDashboardCommandsDocument, options);
      }
export function usePageDashboardCommandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardCommandsQuery, PageDashboardCommandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardCommandsQuery, PageDashboardCommandsQueryVariables>(PageDashboardCommandsDocument, options);
        }
export type PageDashboardCommandsQueryHookResult = ReturnType<typeof usePageDashboardCommandsQuery>;
export type PageDashboardCommandsLazyQueryHookResult = ReturnType<typeof usePageDashboardCommandsLazyQuery>;
export type PageDashboardCommandsQueryResult = Apollo.QueryResult<PageDashboardCommandsQuery, PageDashboardCommandsQueryVariables>;
export const PageDashboardCommandNewDocument = gql`
    query PageDashboardCommandNew($moveId: ID!) {
  move(moveId: $moveId) {
    id
    name
    moveCategory {
      id
      name
      character {
        slug
        name
        states {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __usePageDashboardCommandNewQuery__
 *
 * To run a query within a React component, call `usePageDashboardCommandNewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardCommandNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardCommandNewQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function usePageDashboardCommandNewQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardCommandNewQuery, PageDashboardCommandNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardCommandNewQuery, PageDashboardCommandNewQueryVariables>(PageDashboardCommandNewDocument, options);
      }
export function usePageDashboardCommandNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardCommandNewQuery, PageDashboardCommandNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardCommandNewQuery, PageDashboardCommandNewQueryVariables>(PageDashboardCommandNewDocument, options);
        }
export type PageDashboardCommandNewQueryHookResult = ReturnType<typeof usePageDashboardCommandNewQuery>;
export type PageDashboardCommandNewLazyQueryHookResult = ReturnType<typeof usePageDashboardCommandNewLazyQuery>;
export type PageDashboardCommandNewQueryResult = Apollo.QueryResult<PageDashboardCommandNewQuery, PageDashboardCommandNewQueryVariables>;
export const PageDashboardMoveEditDocument = gql`
    query PageDashboardMoveEdit($moveId: ID!) {
  move(moveId: $moveId) {
    ...move
    conditions {
      id
      name
    }
    moveCategory {
      id
      name
      character {
        slug
        name
        states {
          id
          name
        }
        conditions {
          id
          name
        }
      }
    }
  }
}
    ${MoveFragmentDoc}`;

/**
 * __usePageDashboardMoveEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardMoveEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardMoveEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardMoveEditQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function usePageDashboardMoveEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardMoveEditQuery, PageDashboardMoveEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardMoveEditQuery, PageDashboardMoveEditQueryVariables>(PageDashboardMoveEditDocument, options);
      }
export function usePageDashboardMoveEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardMoveEditQuery, PageDashboardMoveEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardMoveEditQuery, PageDashboardMoveEditQueryVariables>(PageDashboardMoveEditDocument, options);
        }
export type PageDashboardMoveEditQueryHookResult = ReturnType<typeof usePageDashboardMoveEditQuery>;
export type PageDashboardMoveEditLazyQueryHookResult = ReturnType<typeof usePageDashboardMoveEditLazyQuery>;
export type PageDashboardMoveEditQueryResult = Apollo.QueryResult<PageDashboardMoveEditQuery, PageDashboardMoveEditQueryVariables>;
export const PageDashboardThrowActionEditDocument = gql`
    query PageDashboardThrowActionEdit($actionId: ID!) {
  throwAction(actionId: $actionId) {
    ...throwAction
    move {
      id
      name
      moveCategory {
        id
        name
        character {
          slug
          name
        }
      }
    }
  }
}
    ${ThrowActionFragmentDoc}`;

/**
 * __usePageDashboardThrowActionEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardThrowActionEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardThrowActionEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardThrowActionEditQuery({
 *   variables: {
 *      actionId: // value for 'actionId'
 *   },
 * });
 */
export function usePageDashboardThrowActionEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardThrowActionEditQuery, PageDashboardThrowActionEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardThrowActionEditQuery, PageDashboardThrowActionEditQueryVariables>(PageDashboardThrowActionEditDocument, options);
      }
export function usePageDashboardThrowActionEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardThrowActionEditQuery, PageDashboardThrowActionEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardThrowActionEditQuery, PageDashboardThrowActionEditQueryVariables>(PageDashboardThrowActionEditDocument, options);
        }
export type PageDashboardThrowActionEditQueryHookResult = ReturnType<typeof usePageDashboardThrowActionEditQuery>;
export type PageDashboardThrowActionEditLazyQueryHookResult = ReturnType<typeof usePageDashboardThrowActionEditLazyQuery>;
export type PageDashboardThrowActionEditQueryResult = Apollo.QueryResult<PageDashboardThrowActionEditQuery, PageDashboardThrowActionEditQueryVariables>;
export const PageDashboardVideoEditDocument = gql`
    query PageDashboardVideoEdit($videoId: ID!) {
  video(videoId: $videoId) {
    id
    title
    description
    videoId
  }
}
    `;

/**
 * __usePageDashboardVideoEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardVideoEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardVideoEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardVideoEditQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function usePageDashboardVideoEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardVideoEditQuery, PageDashboardVideoEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardVideoEditQuery, PageDashboardVideoEditQueryVariables>(PageDashboardVideoEditDocument, options);
      }
export function usePageDashboardVideoEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardVideoEditQuery, PageDashboardVideoEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardVideoEditQuery, PageDashboardVideoEditQueryVariables>(PageDashboardVideoEditDocument, options);
        }
export type PageDashboardVideoEditQueryHookResult = ReturnType<typeof usePageDashboardVideoEditQuery>;
export type PageDashboardVideoEditLazyQueryHookResult = ReturnType<typeof usePageDashboardVideoEditLazyQuery>;
export type PageDashboardVideoEditQueryResult = Apollo.QueryResult<PageDashboardVideoEditQuery, PageDashboardVideoEditQueryVariables>;
export const PageDashboardHighlightsDocument = gql`
    query PageDashboardHighlights($videoId: ID!) {
  video(videoId: $videoId) {
    id
    title
    highlights {
      id
      title
      startSec
    }
  }
}
    `;

/**
 * __usePageDashboardHighlightsQuery__
 *
 * To run a query within a React component, call `usePageDashboardHighlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardHighlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardHighlightsQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function usePageDashboardHighlightsQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardHighlightsQuery, PageDashboardHighlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardHighlightsQuery, PageDashboardHighlightsQueryVariables>(PageDashboardHighlightsDocument, options);
      }
export function usePageDashboardHighlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardHighlightsQuery, PageDashboardHighlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardHighlightsQuery, PageDashboardHighlightsQueryVariables>(PageDashboardHighlightsDocument, options);
        }
export type PageDashboardHighlightsQueryHookResult = ReturnType<typeof usePageDashboardHighlightsQuery>;
export type PageDashboardHighlightsLazyQueryHookResult = ReturnType<typeof usePageDashboardHighlightsLazyQuery>;
export type PageDashboardHighlightsQueryResult = Apollo.QueryResult<PageDashboardHighlightsQuery, PageDashboardHighlightsQueryVariables>;
export const PageDashboardHighlightNewDocument = gql`
    query PageDashboardHighlightNew($videoId: ID!) {
  video(videoId: $videoId) {
    id
    title
    videoId
  }
}
    `;

/**
 * __usePageDashboardHighlightNewQuery__
 *
 * To run a query within a React component, call `usePageDashboardHighlightNewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardHighlightNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardHighlightNewQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function usePageDashboardHighlightNewQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardHighlightNewQuery, PageDashboardHighlightNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardHighlightNewQuery, PageDashboardHighlightNewQueryVariables>(PageDashboardHighlightNewDocument, options);
      }
export function usePageDashboardHighlightNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardHighlightNewQuery, PageDashboardHighlightNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardHighlightNewQuery, PageDashboardHighlightNewQueryVariables>(PageDashboardHighlightNewDocument, options);
        }
export type PageDashboardHighlightNewQueryHookResult = ReturnType<typeof usePageDashboardHighlightNewQuery>;
export type PageDashboardHighlightNewLazyQueryHookResult = ReturnType<typeof usePageDashboardHighlightNewLazyQuery>;
export type PageDashboardHighlightNewQueryResult = Apollo.QueryResult<PageDashboardHighlightNewQuery, PageDashboardHighlightNewQueryVariables>;
export const PageDashboardVideosDocument = gql`
    query PageDashboardVideos($page: Int, $per: Int) {
  videos(page: $page, per: $per) {
    records {
      id
      title
      highlightsCount
    }
    paging {
      ...paging
    }
  }
}
    ${PagingFragmentDoc}`;

/**
 * __usePageDashboardVideosQuery__
 *
 * To run a query within a React component, call `usePageDashboardVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardVideosQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *   },
 * });
 */
export function usePageDashboardVideosQuery(baseOptions?: Apollo.QueryHookOptions<PageDashboardVideosQuery, PageDashboardVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardVideosQuery, PageDashboardVideosQueryVariables>(PageDashboardVideosDocument, options);
      }
export function usePageDashboardVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardVideosQuery, PageDashboardVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardVideosQuery, PageDashboardVideosQueryVariables>(PageDashboardVideosDocument, options);
        }
export type PageDashboardVideosQueryHookResult = ReturnType<typeof usePageDashboardVideosQuery>;
export type PageDashboardVideosLazyQueryHookResult = ReturnType<typeof usePageDashboardVideosLazyQuery>;
export type PageDashboardVideosQueryResult = Apollo.QueryResult<PageDashboardVideosQuery, PageDashboardVideosQueryVariables>;
export const PageMoveDocument = gql`
    query PageMove($moveId: ID!) {
  move(moveId: $moveId) {
    ...move
    moveCategory {
      id
      name
      character {
        slug
        name
      }
    }
  }
}
    ${MoveFragmentDoc}`;

/**
 * __usePageMoveQuery__
 *
 * To run a query within a React component, call `usePageMoveQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageMoveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageMoveQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function usePageMoveQuery(baseOptions: Apollo.QueryHookOptions<PageMoveQuery, PageMoveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageMoveQuery, PageMoveQueryVariables>(PageMoveDocument, options);
      }
export function usePageMoveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageMoveQuery, PageMoveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageMoveQuery, PageMoveQueryVariables>(PageMoveDocument, options);
        }
export type PageMoveQueryHookResult = ReturnType<typeof usePageMoveQuery>;
export type PageMoveLazyQueryHookResult = ReturnType<typeof usePageMoveLazyQuery>;
export type PageMoveQueryResult = Apollo.QueryResult<PageMoveQuery, PageMoveQueryVariables>;