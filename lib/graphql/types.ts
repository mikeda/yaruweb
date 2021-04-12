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
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
};

export type Action = AttackAction | ThrowAction;

export type Actionable = {
  frames: Array<Frame>;
  id: Scalars['ID'];
};

export type Article = {
  __typename?: 'Article';
  author: Player;
  authorId: Scalars['Int'];
  category: ArticleCategory;
  commentCount: Scalars['Int'];
  content: Scalars['String'];
  description: Scalars['String'];
  faved: Scalars['Boolean'];
  favsCount: Scalars['Int'];
  id: Scalars['ID'];
  mainImageUrl?: Maybe<Scalars['String']>;
  publishedAt: Scalars['ISO8601DateTime'];
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

export type ArticleComment = {
  __typename?: 'ArticleComment';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  player: Player;
};

export type ArticleCommentAttributes = {
  message: Scalars['String'];
};

/** The connection type for Article. */
export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ArticleEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Article>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Article>;
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

export type AttackAction = Actionable & {
  __typename?: 'AttackAction';
  attackType: AttackTypeEnum;
  damage: Scalars['Int'];
  frames: Array<Frame>;
  id: Scalars['ID'];
};

export type AttackActionAttributes = {
  attackType: AttackTypeEnum;
  damage?: Maybe<Scalars['Int']>;
};

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
  /** 打撃投げ */
  T = 't'
}

export type Character = {
  __typename?: 'Character';
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
  story: Scalars['String'];
};

export type Combo = {
  __typename?: 'Combo';
  beginning: Scalars['Boolean'];
  character: Character;
  commands: Array<Command>;
  counterHit: Scalars['Boolean'];
  damage: Scalars['Int'];
  ex: Scalars['Boolean'];
  floorBreak: Scalars['Boolean'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  rage: Scalars['Boolean'];
  wall: Scalars['Boolean'];
  wallBound: Scalars['Boolean'];
  wallSplat: Scalars['Boolean'];
  youtubeVideoId: Scalars['String'];
};

export type ComboAttributes = {
  damage: Scalars['Int'];
  youtubeVideoId?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  commandIds: Array<Scalars['ID']>;
};

/** The connection type for Combo. */
export type ComboConnection = {
  __typename?: 'ComboConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ComboEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Combo>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ComboEdge = {
  __typename?: 'ComboEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Combo>;
};

export type Command = {
  __typename?: 'Command';
  id: Scalars['ID'];
  move: Move;
  operations: Array<Operation>;
  state?: Maybe<State>;
};

export type CommandAttributes = {
  stateId?: Maybe<Scalars['ID']>;
  operationIds: Array<Scalars['ID']>;
};

/** Autogenerated input type of CreateArticleComment */
export type CreateArticleCommentInput = {
  articleId: Scalars['ID'];
  attributes: ArticleCommentAttributes;
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
  article: MyArticle;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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

/** Autogenerated input type of CreateCombo */
export type CreateComboInput = {
  characterSlug: Scalars['ID'];
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

/** Autogenerated input type of CreateFrame */
export type CreateFrameInput = {
  actionId: Scalars['ID'];
  attributes: FrameAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateFrame */
export type CreateFramePayload = {
  __typename?: 'CreateFramePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  frame: Frame;
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

/** Autogenerated input type of CreateMoveComment */
export type CreateMoveCommentInput = {
  moveId: Scalars['ID'];
  attributes: MoveCommentAttributes;
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
  characterSlug: Scalars['ID'];
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

/** Autogenerated input type of CreateMoveVideoUploadUrl */
export type CreateMoveVideoUploadUrlInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateMoveVideoUploadUrl */
export type CreateMoveVideoUploadUrlPayload = {
  __typename?: 'CreateMoveVideoUploadUrlPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  fields: Scalars['String'];
  moveVideoId: Scalars['ID'];
  url: Scalars['String'];
};

/** Autogenerated input type of CreatePlayerWithEmail */
export type CreatePlayerWithEmailInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreatePlayerWithEmail */
export type CreatePlayerWithEmailPayload = {
  __typename?: 'CreatePlayerWithEmailPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentPlayer: CurrentPlayer;
};

/** Autogenerated input type of CreatePlayerWithTwitter */
export type CreatePlayerWithTwitterInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreatePlayerWithTwitter */
export type CreatePlayerWithTwitterPayload = {
  __typename?: 'CreatePlayerWithTwitterPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentPlayer: CurrentPlayer;
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
  id: Scalars['ID'];
  attributes: VideoCommentAttributes;
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
  slug: Scalars['String'];
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

/** Autogenerated input type of DeleteFrame */
export type DeleteFrameInput = {
  frameId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteFrame */
export type DeleteFramePayload = {
  __typename?: 'DeleteFramePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  frame: Frame;
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

export type Event = {
  __typename?: 'Event';
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
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
  url: Scalars['String'];
  imageUrl: Scalars['String'];
  streamingUrl?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
  startsAt: Scalars['String'];
  description: Scalars['String'];
};

/** The connection type for Event. */
export type EventConnection = {
  __typename?: 'EventConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Event>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EventEdge = {
  __typename?: 'EventEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Event>;
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

export type Frame = {
  __typename?: 'Frame';
  frame?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  state?: Maybe<FrameStateEnum>;
  type: FrameTypeEnum;
};

export type FrameAttributes = {
  type: FrameTypeEnum;
  frame?: Maybe<Scalars['Int']>;
  state: FrameStateEnum;
};

export enum FrameStateEnum {
  /** そのまま */
  Unchanged = 'unchanged',
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
  /** へこみ */
  Bow = 'bow',
  /** のけぞり */
  BendBack = 'bend_back'
}

export enum FrameTypeEnum {
  /** ガード */
  Block = 'block',
  /** ヒット */
  Hit = 'hit',
  /** カウンターヒット */
  CounterHit = 'counter_hit',
  /** クリーンヒット */
  CleanHit = 'clean_hit',
  /** しゃがみにヒット */
  CrouchingHit = 'crouching_hit'
}

export type Highlight = {
  __typename?: 'Highlight';
  id: Scalars['ID'];
  player: Player;
  startSec: Scalars['Int'];
  title: Scalars['String'];
};

export type HighlightAttributes = {
  title: Scalars['String'];
  startSec: Scalars['Int'];
};


export type Move = {
  __typename?: 'Move';
  actions: Array<Action>;
  afterState?: Maybe<State>;
  character: Character;
  comboStarter: Scalars['Boolean'];
  commands: Array<Command>;
  crouchingStatus: Scalars['Boolean'];
  homing: Scalars['Boolean'];
  id: Scalars['ID'];
  jumpStatus: Scalars['Boolean'];
  kana?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
  moveCategoryId: Scalars['ID'];
  moveVideo?: Maybe<MoveVideo>;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  opponentState?: Maybe<OpponentStateEnum>;
  playerId: Scalars['ID'];
  powerCrush: Scalars['Boolean'];
  rage: Scalars['Boolean'];
  screw: Scalars['Boolean'];
  startUpFrame?: Maybe<Scalars['Int']>;
  wallBound: Scalars['Boolean'];
};

export type MoveAttributes = {
  moveCategoryId: Scalars['ID'];
  afterStateId?: Maybe<Scalars['ID']>;
  opponentState?: Maybe<OpponentStateEnum>;
  name: Scalars['String'];
  kana?: Maybe<Scalars['String']>;
  startUpFrame?: Maybe<Scalars['Int']>;
  rage: Scalars['Boolean'];
  comboStarter: Scalars['Boolean'];
  powerCrush: Scalars['Boolean'];
  crouchingStatus: Scalars['Boolean'];
  jumpStatus: Scalars['Boolean'];
  homing: Scalars['Boolean'];
  screw: Scalars['Boolean'];
  wallBound: Scalars['Boolean'];
  note?: Maybe<Scalars['String']>;
};

export type MoveCategory = {
  __typename?: 'MoveCategory';
  character: Character;
  id: Scalars['ID'];
  moves: Array<Move>;
  name: Scalars['String'];
  slug: Scalars['ID'];
};

export type MoveComment = {
  __typename?: 'MoveComment';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  move: Move;
  player: Player;
  youtubeVideoId?: Maybe<Scalars['String']>;
};

export type MoveCommentAttributes = {
  youtubeVideoId: Scalars['String'];
  message: Scalars['String'];
};

export type MoveVideo = {
  __typename?: 'MoveVideo';
  m3u8Url: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<CreateArticlePayload>;
  createArticleComment?: Maybe<CreateArticleCommentPayload>;
  createArticleImage?: Maybe<CreateArticleImagePayload>;
  createArticleLink?: Maybe<CreateArticleLinkPayload>;
  createAttackAction?: Maybe<CreateAttackActionPayload>;
  createCombo?: Maybe<CreateComboPayload>;
  createCommand?: Maybe<CreateCommandPayload>;
  createEvent?: Maybe<CreateEventPayload>;
  createFrame?: Maybe<CreateFramePayload>;
  createHighlight?: Maybe<CreateHighlightPayload>;
  createMove?: Maybe<CreateMovePayload>;
  createMoveComment?: Maybe<CreateMoveCommentPayload>;
  createMoveVideoUploadUrl?: Maybe<CreateMoveVideoUploadUrlPayload>;
  createPlayerWithEmail?: Maybe<CreatePlayerWithEmailPayload>;
  createPlayerWithTwitter?: Maybe<CreatePlayerWithTwitterPayload>;
  createThrowAction?: Maybe<CreateThrowActionPayload>;
  createVideo?: Maybe<CreateVideoPayload>;
  createVideoComment?: Maybe<CreateVideoCommentPayload>;
  createVideoFav?: Maybe<CreateVideoFavPayload>;
  deleteAction?: Maybe<DeleteActionPayload>;
  deleteCommand?: Maybe<DeleteCommandPayload>;
  deleteFrame?: Maybe<DeleteFramePayload>;
  deleteHighlight?: Maybe<DeleteHighlightPayload>;
  deleteVideoFav?: Maybe<DeleteVideoFavPayload>;
  favArticle?: Maybe<FavArticlePayload>;
  publishArticle?: Maybe<PublishArticlePayload>;
  setMoveVideo?: Maybe<SetMoveVideoPayload>;
  setPlayerAvatar?: Maybe<SetPlayerAvatarPayload>;
  stopArticle?: Maybe<StopArticlePayload>;
  unfavArticle?: Maybe<UnfavArticlePayload>;
  updateArticle?: Maybe<UpdateArticlePayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  updateMove?: Maybe<UpdateMovePayload>;
  updatePlayer?: Maybe<UpdatePlayerPayload>;
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


export type MutationCreateAttackActionArgs = {
  input: CreateAttackActionInput;
};


export type MutationCreateComboArgs = {
  input: CreateComboInput;
};


export type MutationCreateCommandArgs = {
  input: CreateCommandInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateFrameArgs = {
  input: CreateFrameInput;
};


export type MutationCreateHighlightArgs = {
  input: CreateHighlightInput;
};


export type MutationCreateMoveArgs = {
  input: CreateMoveInput;
};


export type MutationCreateMoveCommentArgs = {
  input: CreateMoveCommentInput;
};


export type MutationCreateMoveVideoUploadUrlArgs = {
  input: CreateMoveVideoUploadUrlInput;
};


export type MutationCreatePlayerWithEmailArgs = {
  input: CreatePlayerWithEmailInput;
};


export type MutationCreatePlayerWithTwitterArgs = {
  input: CreatePlayerWithTwitterInput;
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


export type MutationDeleteCommandArgs = {
  input: DeleteCommandInput;
};


export type MutationDeleteFrameArgs = {
  input: DeleteFrameInput;
};


export type MutationDeleteHighlightArgs = {
  input: DeleteHighlightInput;
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


export type MutationSetMoveVideoArgs = {
  input: SetMoveVideoInput;
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


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateMoveArgs = {
  input: UpdateMoveInput;
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};

export type MyArticle = {
  __typename?: 'MyArticle';
  category: ArticleCategory;
  content: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  mainImageUrl?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  status: ArticleStatus;
  title: Scalars['String'];
};

/** The connection type for MyArticle. */
export type MyArticleConnection = {
  __typename?: 'MyArticleConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MyArticleEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<MyArticle>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MyArticleEdge = {
  __typename?: 'MyArticleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<MyArticle>;
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

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Player = {
  __typename?: 'Player';
  avatarUrl: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  twitterId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of PublishArticle */
export type PublishArticleInput = {
  id: Scalars['ID'];
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
  actions: Array<Action>;
  allArticles: Array<Article>;
  article: Article;
  articleComments: Array<ArticleComment>;
  articles: ArticleConnection;
  character: Character;
  characters: Array<Character>;
  combos: ComboConnection;
  currentPlayer: CurrentPlayer;
  events: EventConnection;
  move: Move;
  moveCategories: Array<MoveCategory>;
  moves: Array<Move>;
  myArticle: MyArticle;
  myArticles: MyArticleConnection;
  myCombos: ComboConnection;
  myEvents: EventConnection;
  myVideos: VideoConnection;
  operations: Array<Operation>;
  states: Array<State>;
  video: Video;
  videoComments: Array<VideoComment>;
  videos: VideoConnection;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};


export type QueryArticleCommentsArgs = {
  articleId: Scalars['ID'];
};


export type QueryArticlesArgs = {
  category?: Maybe<ArticleCategory>;
  order?: Maybe<Order>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCharacterArgs = {
  slug: Scalars['ID'];
};


export type QueryCombosArgs = {
  characterSlug: Scalars['ID'];
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEventsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMoveArgs = {
  id: Scalars['ID'];
};


export type QueryMoveCategoriesArgs = {
  characterSlug?: Maybe<Scalars['ID']>;
};


export type QueryMovesArgs = {
  characterSlug?: Maybe<Scalars['ID']>;
  moveCategorySlug?: Maybe<Scalars['ID']>;
};


export type QueryMyArticleArgs = {
  id: Scalars['ID'];
};


export type QueryMyArticlesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMyCombosArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMyEventsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMyVideosArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryStatesArgs = {
  characterSlug: Scalars['ID'];
};


export type QueryVideoArgs = {
  id: Scalars['ID'];
};


export type QueryVideoCommentsArgs = {
  videoId: Scalars['ID'];
};


export type QueryVideosArgs = {
  order?: Maybe<Order>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Autogenerated input type of SetMoveVideo */
export type SetMoveVideoInput = {
  moveId: Scalars['ID'];
  moveVideoId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of SetMoveVideo */
export type SetMoveVideoPayload = {
  __typename?: 'SetMoveVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  result: Scalars['Boolean'];
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

export type State = {
  __typename?: 'State';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Autogenerated input type of StopArticle */
export type StopArticleInput = {
  id: Scalars['ID'];
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
  escape?: Maybe<ThrowEscapeEnum>;
  frames: Array<Frame>;
  id: Scalars['ID'];
  throwType: ThrowTypeEnum;
};

export type ThrowActionAttributes = {
  throwType: ThrowTypeEnum;
  damage?: Maybe<Scalars['Int']>;
  escape?: Maybe<ThrowEscapeEnum>;
};

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
  id: Scalars['ID'];
  attributes: ArticleAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateArticle */
export type UpdateArticlePayload = {
  __typename?: 'UpdateArticlePayload';
  article: MyArticle;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEvent */
export type UpdateEventInput = {
  id: Scalars['ID'];
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

/** Autogenerated input type of UpdateMove */
export type UpdateMoveInput = {
  id: Scalars['ID'];
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

/** Autogenerated input type of UpdatePlayer */
export type UpdatePlayerInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePlayer */
export type UpdatePlayerPayload = {
  __typename?: 'UpdatePlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: CurrentPlayer;
};

export type Video = {
  __typename?: 'Video';
  channelTitle: Scalars['String'];
  commentCount: Scalars['Int'];
  faved: Scalars['Boolean'];
  favsCount: Scalars['Int'];
  highlights: Array<Highlight>;
  id: Scalars['ID'];
  tags: Array<Tag>;
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  videoId: Scalars['String'];
};

export type VideoComment = {
  __typename?: 'VideoComment';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  player: Player;
};

export type VideoCommentAttributes = {
  message: Scalars['String'];
};

/** The connection type for Video. */
export type VideoConnection = {
  __typename?: 'VideoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<VideoEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Video>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type VideoEdge = {
  __typename?: 'VideoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Video>;
};

export type AttackActionFragment = (
  { __typename?: 'AttackAction' }
  & Pick<AttackAction, 'id' | 'attackType' | 'damage'>
  & { frames: Array<(
    { __typename?: 'Frame' }
    & Pick<Frame, 'id' | 'type' | 'frame' | 'state'>
  )> }
);

export type ThrowActionFragment = (
  { __typename?: 'ThrowAction' }
  & Pick<ThrowAction, 'id' | 'throwType' | 'damage' | 'escape'>
  & { frames: Array<(
    { __typename?: 'Frame' }
    & Pick<Frame, 'id' | 'type' | 'frame' | 'state'>
  )> }
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
  & Pick<Article, 'id' | 'category' | 'title' | 'description' | 'mainImageUrl' | 'content' | 'publishedAt' | 'faved' | 'favsCount'>
  & { author: (
    { __typename?: 'Player' }
    & Pick<Player, 'name' | 'avatarUrl'>
  ) }
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

export type CharacterFragment = (
  { __typename?: 'Character' }
  & Pick<Character, 'story' | 'description'>
  & CharacterSummaryFragment
);

export type CharacterSummaryFragment = (
  { __typename?: 'Character' }
  & Pick<Character, 'slug' | 'longName' | 'faceImageUrl' | 'country' | 'fightingStyle'>
);

export type CommandFragment = (
  { __typename?: 'Command' }
  & Pick<Command, 'id'>
  & { state?: Maybe<(
    { __typename?: 'State' }
    & StateFragment
  )>, operations: Array<(
    { __typename?: 'Operation' }
    & OperationFragment
  )> }
);

export type CurrentPlayerFragment = (
  { __typename?: 'CurrentPlayer' }
  & Pick<CurrentPlayer, 'id' | 'name' | 'slug' | 'avatarUrl'>
);

export type EventFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'name' | 'url' | 'imageUrl' | 'streamingUrl' | 'videoUrl' | 'description' | 'organizerName' | 'organizerTwitterId' | 'startsAt'>
);

export type HighlightFragment = (
  { __typename?: 'Highlight' }
  & Pick<Highlight, 'id' | 'title' | 'startSec'>
  & { player: (
    { __typename?: 'Player' }
    & Pick<Player, 'slug' | 'name'>
  ) }
);

export type MoveFragment = (
  { __typename?: 'Move' }
  & Pick<Move, 'id' | 'playerId' | 'moveCategoryId' | 'name' | 'kana' | 'opponentState' | 'startUpFrame' | 'rage' | 'comboStarter' | 'powerCrush' | 'crouchingStatus' | 'jumpStatus' | 'homing' | 'screw' | 'wallBound' | 'note'>
  & { afterState?: Maybe<(
    { __typename?: 'State' }
    & Pick<State, 'id' | 'name'>
  )>, moveVideo?: Maybe<(
    { __typename?: 'MoveVideo' }
    & Pick<MoveVideo, 'm3u8Url' | 'thumbnailUrl'>
  )>, commands: Array<(
    { __typename?: 'Command' }
    & CommandFragment
  )>, actions: Array<(
    { __typename?: 'AttackAction' }
    & Action_AttackAction_Fragment
  ) | (
    { __typename?: 'ThrowAction' }
    & Action_ThrowAction_Fragment
  )> }
);

export type MoveCategoryFragment = (
  { __typename?: 'MoveCategory' }
  & Pick<MoveCategory, 'id' | 'slug' | 'name'>
);

export type MoveCommentFragment = (
  { __typename?: 'MoveComment' }
  & Pick<MoveComment, 'id' | 'youtubeVideoId' | 'message'>
);

export type OperationFragment = (
  { __typename?: 'Operation' }
  & Pick<Operation, 'id' | 'name' | 'key' | 'icon'>
);

export type PagingFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
);

export type StateFragment = (
  { __typename?: 'State' }
  & Pick<State, 'id' | 'name'>
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
  & Pick<Video, 'id' | 'videoId' | 'channelTitle' | 'title' | 'thumbnailUrl' | 'faved' | 'favsCount' | 'commentCount'>
);

export type CreateArticleMutationVariables = Exact<{
  attributes: ArticleAttributes;
}>;


export type CreateArticleMutation = (
  { __typename?: 'Mutation' }
  & { createArticle?: Maybe<(
    { __typename?: 'CreateArticlePayload' }
    & { article: (
      { __typename?: 'MyArticle' }
      & Pick<MyArticle, 'id'>
    ) }
  )> }
);

export type CreateArticleCommentMutationVariables = Exact<{
  articleId: Scalars['ID'];
  attributes: ArticleCommentAttributes;
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

export type CreateComboMutationVariables = Exact<{
  characterSlug: Scalars['ID'];
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

export type CreateFrameMutationVariables = Exact<{
  actionId: Scalars['ID'];
  attributes: FrameAttributes;
}>;


export type CreateFrameMutation = (
  { __typename?: 'Mutation' }
  & { createFrame?: Maybe<(
    { __typename?: 'CreateFramePayload' }
    & { frame: (
      { __typename?: 'Frame' }
      & Pick<Frame, 'id' | 'type' | 'frame' | 'state'>
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
  characterSlug: Scalars['ID'];
  attributes: MoveAttributes;
}>;


export type CreateMoveMutation = (
  { __typename?: 'Mutation' }
  & { createMove?: Maybe<(
    { __typename?: 'CreateMovePayload' }
    & { move: (
      { __typename?: 'Move' }
      & Pick<Move, 'id'>
      & { moveCategory: (
        { __typename?: 'MoveCategory' }
        & Pick<MoveCategory, 'slug'>
      ) }
    ) }
  )> }
);

export type CreateMoveCommentMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: MoveCommentAttributes;
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

export type CreateMoveVideoUploadUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateMoveVideoUploadUrlMutation = (
  { __typename?: 'Mutation' }
  & { createMoveVideoUploadUrl?: Maybe<(
    { __typename?: 'CreateMoveVideoUploadUrlPayload' }
    & Pick<CreateMoveVideoUploadUrlPayload, 'moveVideoId' | 'url' | 'fields'>
  )> }
);

export type CreatePlayerWithEmailMutationVariables = Exact<{
  name: Scalars['String'];
  slug: Scalars['String'];
}>;


export type CreatePlayerWithEmailMutation = (
  { __typename?: 'Mutation' }
  & { createPlayerWithEmail?: Maybe<(
    { __typename?: 'CreatePlayerWithEmailPayload' }
    & { currentPlayer: (
      { __typename?: 'CurrentPlayer' }
      & CurrentPlayerFragment
    ) }
  )> }
);

export type CreatePlayerWithTwitterMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePlayerWithTwitterMutation = (
  { __typename?: 'Mutation' }
  & { createPlayerWithTwitter?: Maybe<(
    { __typename?: 'CreatePlayerWithTwitterPayload' }
    & { currentPlayer: (
      { __typename?: 'CurrentPlayer' }
      & CurrentPlayerFragment
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
  id: Scalars['ID'];
  attributes: VideoCommentAttributes;
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

export type DeleteFrameMutationVariables = Exact<{
  frameId: Scalars['ID'];
}>;


export type DeleteFrameMutation = (
  { __typename?: 'Mutation' }
  & { deleteFrame?: Maybe<(
    { __typename?: 'DeleteFramePayload' }
    & { frame: (
      { __typename?: 'Frame' }
      & Pick<Frame, 'id'>
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
  id: Scalars['ID'];
}>;


export type PublishArticleMutation = (
  { __typename?: 'Mutation' }
  & { publishArticle?: Maybe<(
    { __typename?: 'PublishArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & Pick<Article, 'id'>
    ) }
  )> }
);

export type SetMoveVideoMutationVariables = Exact<{
  moveId: Scalars['ID'];
  moveVideoId: Scalars['ID'];
}>;


export type SetMoveVideoMutation = (
  { __typename?: 'Mutation' }
  & { setMoveVideo?: Maybe<(
    { __typename?: 'SetMoveVideoPayload' }
    & Pick<SetMoveVideoPayload, 'result'>
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
  id: Scalars['ID'];
}>;


export type StopArticleMutation = (
  { __typename?: 'Mutation' }
  & { stopArticle?: Maybe<(
    { __typename?: 'StopArticlePayload' }
    & { article: (
      { __typename?: 'Article' }
      & Pick<Article, 'id'>
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
  id: Scalars['ID'];
  attributes: ArticleAttributes;
}>;


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { updateArticle?: Maybe<(
    { __typename?: 'UpdateArticlePayload' }
    & { article: (
      { __typename?: 'MyArticle' }
      & Pick<MyArticle, 'id'>
    ) }
  )> }
);

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID'];
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

export type UpdateMoveMutationVariables = Exact<{
  id: Scalars['ID'];
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
        & Pick<MoveCategory, 'slug'>
      ), character: (
        { __typename?: 'Character' }
        & Pick<Character, 'slug'>
      ) }
    ) }
  )> }
);

export type UpdatePlayerMutationVariables = Exact<{
  name: Scalars['String'];
  slug: Scalars['String'];
}>;


export type UpdatePlayerMutation = (
  { __typename?: 'Mutation' }
  & { updatePlayer?: Maybe<(
    { __typename?: 'UpdatePlayerPayload' }
    & { player: (
      { __typename?: 'CurrentPlayer' }
      & Pick<CurrentPlayer, 'name' | 'slug'>
    ) }
  )> }
);

export type ArticleQueryVariables = Exact<{
  id: Scalars['ID'];
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
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  category?: Maybe<ArticleCategory>;
}>;


export type ArticlesQuery = (
  { __typename?: 'Query' }
  & { articles: (
    { __typename?: 'ArticleConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Article' }
      & Pick<Article, 'id' | 'title' | 'description' | 'mainImageUrl' | 'publishedAt'>
      & { author: (
        { __typename?: 'Player' }
        & Pick<Player, 'name' | 'avatarUrl'>
      ) }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & PagingFragment
    ) }
  ) }
);

export type CharacterQueryVariables = Exact<{
  slug: Scalars['ID'];
}>;


export type CharacterQuery = (
  { __typename?: 'Query' }
  & { character: (
    { __typename?: 'Character' }
    & CharacterFragment
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
  slug: Scalars['ID'];
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

export type CharacterSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterSlugsQuery = (
  { __typename?: 'Query' }
  & { characters: Array<(
    { __typename?: 'Character' }
    & Pick<Character, 'slug'>
  )> }
);

export type CharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersQuery = (
  { __typename?: 'Query' }
  & { characters: Array<(
    { __typename?: 'Character' }
    & CharacterSummaryFragment
  )> }
);

export type ComboFragment = (
  { __typename?: 'Combo' }
  & Pick<Combo, 'id' | 'damage' | 'youtubeVideoId' | 'counterHit' | 'beginning' | 'wall' | 'wallSplat' | 'wallBound' | 'rage' | 'ex' | 'note'>
  & { commands: Array<(
    { __typename?: 'Command' }
    & { move: (
      { __typename?: 'Move' }
      & Pick<Move, 'name'>
    ), operations: Array<(
      { __typename?: 'Operation' }
      & OperationFragment
    )> }
  )> }
);

export type CombosQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
}>;


export type CombosQuery = (
  { __typename?: 'Query' }
  & { combos: (
    { __typename?: 'ComboConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Combo' }
      & ComboFragment
    )>>> }
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
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Event' }
      & EventFragment
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & PagingFragment
    ) }
  ) }
);

export type MoveQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MoveQuery = (
  { __typename?: 'Query' }
  & { move: (
    { __typename?: 'Move' }
    & { character: (
      { __typename?: 'Character' }
      & CharacterSummaryFragment
    ) }
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

export type MoveCategoryPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type MoveCategoryPathsQuery = (
  { __typename?: 'Query' }
  & { moveCategories: Array<(
    { __typename?: 'MoveCategory' }
    & Pick<MoveCategory, 'slug'>
    & { character: (
      { __typename?: 'Character' }
      & Pick<Character, 'slug'>
    ) }
  )> }
);

export type MovesQueryVariables = Exact<{
  characterSlug: Scalars['ID'];
  moveCategorySlug?: Maybe<Scalars['ID']>;
}>;


export type MovesQuery = (
  { __typename?: 'Query' }
  & { moves: Array<(
    { __typename?: 'Move' }
    & MoveFragment
  )> }
);

export type MyArticleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MyArticleQuery = (
  { __typename?: 'Query' }
  & { myArticle: (
    { __typename?: 'MyArticle' }
    & Pick<MyArticle, 'id' | 'category' | 'title' | 'mainImageUrl' | 'content'>
  ) }
);

export type MyArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyArticlesQuery = (
  { __typename?: 'Query' }
  & { myArticles: (
    { __typename?: 'MyArticleConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'MyArticle' }
      & Pick<MyArticle, 'id' | 'title' | 'status'>
    )>>> }
  ) }
);

export type MyCombosQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCombosQuery = (
  { __typename?: 'Query' }
  & { myCombos: (
    { __typename?: 'ComboConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Combo' }
      & Pick<Combo, 'id'>
      & { character: (
        { __typename?: 'Character' }
        & Pick<Character, 'name'>
      ), commands: Array<(
        { __typename?: 'Command' }
        & Pick<Command, 'id'>
        & { state?: Maybe<(
          { __typename?: 'State' }
          & Pick<State, 'id' | 'name'>
        )>, move: (
          { __typename?: 'Move' }
          & Pick<Move, 'name'>
        ) }
      )> }
    )>>> }
  ) }
);

export type MyEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEventsQuery = (
  { __typename?: 'Query' }
  & { myEvents: (
    { __typename?: 'EventConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Event' }
      & EventFragment
    )>>> }
  ) }
);

export type MyVideosQueryVariables = Exact<{ [key: string]: never; }>;


export type MyVideosQuery = (
  { __typename?: 'Query' }
  & { myVideos: (
    { __typename?: 'VideoConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Video' }
      & Pick<Video, 'id' | 'title'>
    )>>> }
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

export type VideoQueryVariables = Exact<{
  id: Scalars['ID'];
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
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
}>;


export type VideosQuery = (
  { __typename?: 'Query' }
  & { videos: (
    { __typename?: 'VideoConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Video' }
      & VideoSummaryFragment
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & PagingFragment
    ) }
  ) }
);

export const ArticleFragmentDoc = gql`
    fragment article on Article {
  id
  category
  title
  description
  mainImageUrl
  content
  publishedAt
  faved
  favsCount
  author {
    name
    avatarUrl
  }
}
    `;
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
  longName
  faceImageUrl
  country
  fightingStyle
}
    `;
export const CharacterFragmentDoc = gql`
    fragment character on Character {
  ...characterSummary
  story
  description
}
    ${CharacterSummaryFragmentDoc}`;
export const CurrentPlayerFragmentDoc = gql`
    fragment currentPlayer on CurrentPlayer {
  id
  name
  slug
  avatarUrl
}
    `;
export const EventFragmentDoc = gql`
    fragment event on Event {
  id
  name
  url
  imageUrl
  streamingUrl
  videoUrl
  description
  organizerName
  organizerTwitterId
  startsAt
}
    `;
export const MoveCommentFragmentDoc = gql`
    fragment moveComment on MoveComment {
  id
  youtubeVideoId
  message
}
    `;
export const PagingFragmentDoc = gql`
    fragment paging on PageInfo {
  hasNextPage
  endCursor
}
    `;
export const VideoSummaryFragmentDoc = gql`
    fragment videoSummary on Video {
  id
  videoId
  channelTitle
  title
  thumbnailUrl
  faved
  favsCount
  commentCount
}
    `;
export const HighlightFragmentDoc = gql`
    fragment highlight on Highlight {
  id
  title
  startSec
  player {
    slug
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
export const MoveCategoryFragmentDoc = gql`
    fragment moveCategory on MoveCategory {
  id
  slug
  name
}
    `;
export const StateFragmentDoc = gql`
    fragment state on State {
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
  frames {
    id
    type
    frame
    state
  }
  attackType
  damage
}
    `;
export const ThrowActionFragmentDoc = gql`
    fragment throwAction on ThrowAction {
  id
  frames {
    id
    type
    frame
    state
  }
  throwType
  damage
  escape
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
  playerId
  moveCategoryId
  afterState {
    id
    name
  }
  name
  kana
  opponentState
  startUpFrame
  rage
  comboStarter
  powerCrush
  crouchingStatus
  jumpStatus
  homing
  screw
  wallBound
  note
  moveVideo {
    m3u8Url
    thumbnailUrl
  }
  commands {
    ...command
  }
  actions {
    ...action
  }
}
    ${CommandFragmentDoc}
${ActionFragmentDoc}`;
export const MoveCategoryWithMovesFragmentDoc = gql`
    fragment moveCategoryWithMoves on MoveCategory {
  ...moveCategory
  moves {
    ...move
  }
}
    ${MoveCategoryFragmentDoc}
${MoveFragmentDoc}`;
export const ComboFragmentDoc = gql`
    fragment combo on Combo {
  id
  damage
  youtubeVideoId
  counterHit
  beginning
  counterHit
  wall
  wallSplat
  wallBound
  rage
  ex
  note
  commands {
    move {
      name
    }
    operations {
      ...operation
    }
  }
}
    ${OperationFragmentDoc}`;
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
    mutation CreateArticleComment($articleId: ID!, $attributes: ArticleCommentAttributes!) {
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
export const CreateComboDocument = gql`
    mutation CreateCombo($characterSlug: ID!, $attributes: ComboAttributes!) {
  createCombo(input: {characterSlug: $characterSlug, attributes: $attributes}) {
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
 *      characterSlug: // value for 'characterSlug'
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
export const CreateFrameDocument = gql`
    mutation CreateFrame($actionId: ID!, $attributes: FrameAttributes!) {
  createFrame(input: {actionId: $actionId, attributes: $attributes}) {
    frame {
      id
      type
      frame
      state
    }
  }
}
    `;
export type CreateFrameMutationFn = Apollo.MutationFunction<CreateFrameMutation, CreateFrameMutationVariables>;

/**
 * __useCreateFrameMutation__
 *
 * To run a mutation, you first call `useCreateFrameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFrameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFrameMutation, { data, loading, error }] = useCreateFrameMutation({
 *   variables: {
 *      actionId: // value for 'actionId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateFrameMutation(baseOptions?: Apollo.MutationHookOptions<CreateFrameMutation, CreateFrameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFrameMutation, CreateFrameMutationVariables>(CreateFrameDocument, options);
      }
export type CreateFrameMutationHookResult = ReturnType<typeof useCreateFrameMutation>;
export type CreateFrameMutationResult = Apollo.MutationResult<CreateFrameMutation>;
export type CreateFrameMutationOptions = Apollo.BaseMutationOptions<CreateFrameMutation, CreateFrameMutationVariables>;
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
    mutation CreateMove($characterSlug: ID!, $attributes: MoveAttributes!) {
  createMove(input: {characterSlug: $characterSlug, attributes: $attributes}) {
    move {
      id
      moveCategory {
        slug
      }
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
 *      characterSlug: // value for 'characterSlug'
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
export const CreateMoveCommentDocument = gql`
    mutation CreateMoveComment($moveId: ID!, $attributes: MoveCommentAttributes!) {
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
export const CreateMoveVideoUploadUrlDocument = gql`
    mutation CreateMoveVideoUploadUrl {
  createMoveVideoUploadUrl(input: {}) {
    moveVideoId
    url
    fields
  }
}
    `;
export type CreateMoveVideoUploadUrlMutationFn = Apollo.MutationFunction<CreateMoveVideoUploadUrlMutation, CreateMoveVideoUploadUrlMutationVariables>;

/**
 * __useCreateMoveVideoUploadUrlMutation__
 *
 * To run a mutation, you first call `useCreateMoveVideoUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMoveVideoUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMoveVideoUploadUrlMutation, { data, loading, error }] = useCreateMoveVideoUploadUrlMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateMoveVideoUploadUrlMutation(baseOptions?: Apollo.MutationHookOptions<CreateMoveVideoUploadUrlMutation, CreateMoveVideoUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMoveVideoUploadUrlMutation, CreateMoveVideoUploadUrlMutationVariables>(CreateMoveVideoUploadUrlDocument, options);
      }
export type CreateMoveVideoUploadUrlMutationHookResult = ReturnType<typeof useCreateMoveVideoUploadUrlMutation>;
export type CreateMoveVideoUploadUrlMutationResult = Apollo.MutationResult<CreateMoveVideoUploadUrlMutation>;
export type CreateMoveVideoUploadUrlMutationOptions = Apollo.BaseMutationOptions<CreateMoveVideoUploadUrlMutation, CreateMoveVideoUploadUrlMutationVariables>;
export const CreatePlayerWithEmailDocument = gql`
    mutation CreatePlayerWithEmail($name: String!, $slug: String!) {
  createPlayerWithEmail(input: {name: $name, slug: $slug}) {
    currentPlayer {
      ...currentPlayer
    }
  }
}
    ${CurrentPlayerFragmentDoc}`;
export type CreatePlayerWithEmailMutationFn = Apollo.MutationFunction<CreatePlayerWithEmailMutation, CreatePlayerWithEmailMutationVariables>;

/**
 * __useCreatePlayerWithEmailMutation__
 *
 * To run a mutation, you first call `useCreatePlayerWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerWithEmailMutation, { data, loading, error }] = useCreatePlayerWithEmailMutation({
 *   variables: {
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCreatePlayerWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerWithEmailMutation, CreatePlayerWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerWithEmailMutation, CreatePlayerWithEmailMutationVariables>(CreatePlayerWithEmailDocument, options);
      }
export type CreatePlayerWithEmailMutationHookResult = ReturnType<typeof useCreatePlayerWithEmailMutation>;
export type CreatePlayerWithEmailMutationResult = Apollo.MutationResult<CreatePlayerWithEmailMutation>;
export type CreatePlayerWithEmailMutationOptions = Apollo.BaseMutationOptions<CreatePlayerWithEmailMutation, CreatePlayerWithEmailMutationVariables>;
export const CreatePlayerWithTwitterDocument = gql`
    mutation CreatePlayerWithTwitter {
  createPlayerWithTwitter(input: {}) {
    currentPlayer {
      ...currentPlayer
    }
  }
}
    ${CurrentPlayerFragmentDoc}`;
export type CreatePlayerWithTwitterMutationFn = Apollo.MutationFunction<CreatePlayerWithTwitterMutation, CreatePlayerWithTwitterMutationVariables>;

/**
 * __useCreatePlayerWithTwitterMutation__
 *
 * To run a mutation, you first call `useCreatePlayerWithTwitterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerWithTwitterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerWithTwitterMutation, { data, loading, error }] = useCreatePlayerWithTwitterMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreatePlayerWithTwitterMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerWithTwitterMutation, CreatePlayerWithTwitterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerWithTwitterMutation, CreatePlayerWithTwitterMutationVariables>(CreatePlayerWithTwitterDocument, options);
      }
export type CreatePlayerWithTwitterMutationHookResult = ReturnType<typeof useCreatePlayerWithTwitterMutation>;
export type CreatePlayerWithTwitterMutationResult = Apollo.MutationResult<CreatePlayerWithTwitterMutation>;
export type CreatePlayerWithTwitterMutationOptions = Apollo.BaseMutationOptions<CreatePlayerWithTwitterMutation, CreatePlayerWithTwitterMutationVariables>;
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
    mutation CreateVideoComment($id: ID!, $attributes: VideoCommentAttributes!) {
  createVideoComment(input: {id: $id, attributes: $attributes}) {
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
 *      id: // value for 'id'
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
export const DeleteFrameDocument = gql`
    mutation DeleteFrame($frameId: ID!) {
  deleteFrame(input: {frameId: $frameId}) {
    frame {
      id
    }
  }
}
    `;
export type DeleteFrameMutationFn = Apollo.MutationFunction<DeleteFrameMutation, DeleteFrameMutationVariables>;

/**
 * __useDeleteFrameMutation__
 *
 * To run a mutation, you first call `useDeleteFrameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFrameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFrameMutation, { data, loading, error }] = useDeleteFrameMutation({
 *   variables: {
 *      frameId: // value for 'frameId'
 *   },
 * });
 */
export function useDeleteFrameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFrameMutation, DeleteFrameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFrameMutation, DeleteFrameMutationVariables>(DeleteFrameDocument, options);
      }
export type DeleteFrameMutationHookResult = ReturnType<typeof useDeleteFrameMutation>;
export type DeleteFrameMutationResult = Apollo.MutationResult<DeleteFrameMutation>;
export type DeleteFrameMutationOptions = Apollo.BaseMutationOptions<DeleteFrameMutation, DeleteFrameMutationVariables>;
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
    mutation PublishArticle($id: ID!) {
  publishArticle(input: {id: $id}) {
    article {
      id
    }
  }
}
    `;
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
 *      id: // value for 'id'
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
export const SetMoveVideoDocument = gql`
    mutation setMoveVideo($moveId: ID!, $moveVideoId: ID!) {
  setMoveVideo(input: {moveId: $moveId, moveVideoId: $moveVideoId}) {
    result
  }
}
    `;
export type SetMoveVideoMutationFn = Apollo.MutationFunction<SetMoveVideoMutation, SetMoveVideoMutationVariables>;

/**
 * __useSetMoveVideoMutation__
 *
 * To run a mutation, you first call `useSetMoveVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMoveVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMoveVideoMutation, { data, loading, error }] = useSetMoveVideoMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      moveVideoId: // value for 'moveVideoId'
 *   },
 * });
 */
export function useSetMoveVideoMutation(baseOptions?: Apollo.MutationHookOptions<SetMoveVideoMutation, SetMoveVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetMoveVideoMutation, SetMoveVideoMutationVariables>(SetMoveVideoDocument, options);
      }
export type SetMoveVideoMutationHookResult = ReturnType<typeof useSetMoveVideoMutation>;
export type SetMoveVideoMutationResult = Apollo.MutationResult<SetMoveVideoMutation>;
export type SetMoveVideoMutationOptions = Apollo.BaseMutationOptions<SetMoveVideoMutation, SetMoveVideoMutationVariables>;
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
    mutation StopArticle($id: ID!) {
  stopArticle(input: {id: $id}) {
    article {
      id
    }
  }
}
    `;
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
 *      id: // value for 'id'
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
    mutation UpdateArticle($id: ID!, $attributes: ArticleAttributes!) {
  updateArticle(input: {id: $id, attributes: $attributes}) {
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
 *      id: // value for 'id'
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
export const UpdateEventDocument = gql`
    mutation UpdateEvent($id: ID!, $attributes: EventAttributes!) {
  updateEvent(input: {id: $id, attributes: $attributes}) {
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
 *      id: // value for 'id'
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
export const UpdateMoveDocument = gql`
    mutation UpdateMove($id: ID!, $attributes: MoveAttributes!) {
  updateMove(input: {id: $id, attributes: $attributes}) {
    move {
      id
      moveCategory {
        slug
      }
      character {
        slug
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
 *      id: // value for 'id'
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
export const UpdatePlayerDocument = gql`
    mutation UpdatePlayer($name: String!, $slug: String!) {
  updatePlayer(input: {name: $name, slug: $slug}) {
    player {
      name
      slug
    }
  }
}
    `;
export type UpdatePlayerMutationFn = Apollo.MutationFunction<UpdatePlayerMutation, UpdatePlayerMutationVariables>;

/**
 * __useUpdatePlayerMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerMutation, { data, loading, error }] = useUpdatePlayerMutation({
 *   variables: {
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useUpdatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerMutation, UpdatePlayerMutationVariables>(UpdatePlayerDocument, options);
      }
export type UpdatePlayerMutationHookResult = ReturnType<typeof useUpdatePlayerMutation>;
export type UpdatePlayerMutationResult = Apollo.MutationResult<UpdatePlayerMutation>;
export type UpdatePlayerMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>;
export const ArticleDocument = gql`
    query Article($id: ID!) {
  article(id: $id) {
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
 *      id: // value for 'id'
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
    query Articles($first: Int, $after: String, $order: Order, $category: ArticleCategory) {
  articles(first: $first, after: $after, order: $order, category: $category) {
    nodes {
      id
      title
      description
      mainImageUrl
      publishedAt
      author {
        name
        avatarUrl
      }
    }
    pageInfo {
      ...paging
    }
  }
}
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
 *      first: // value for 'first'
 *      after: // value for 'after'
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
export const CharacterDocument = gql`
    query Character($slug: ID!) {
  character(slug: $slug) {
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
 *      slug: // value for 'slug'
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
export const CharacterMovesDocument = gql`
    query CharacterMoves($slug: ID!) {
  character(slug: $slug) {
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
 *      slug: // value for 'slug'
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
    query Combos($characterSlug: ID!) {
  combos(characterSlug: $characterSlug) {
    nodes {
      ...combo
    }
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
 *      characterSlug: // value for 'characterSlug'
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
    query Events($first: Int, $after: String) {
  events(first: $first, after: $after) {
    nodes {
      ...event
    }
    pageInfo {
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
 *      first: // value for 'first'
 *      after: // value for 'after'
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
export const MoveDocument = gql`
    query Move($id: ID!) {
  move(id: $id) {
    ...move
    character {
      ...characterSummary
    }
  }
}
    ${MoveFragmentDoc}
${CharacterSummaryFragmentDoc}`;

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
 *      id: // value for 'id'
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
export const MoveCategoryPathsDocument = gql`
    query MoveCategoryPaths {
  moveCategories {
    slug
    character {
      slug
    }
  }
}
    `;

/**
 * __useMoveCategoryPathsQuery__
 *
 * To run a query within a React component, call `useMoveCategoryPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCategoryPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCategoryPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMoveCategoryPathsQuery(baseOptions?: Apollo.QueryHookOptions<MoveCategoryPathsQuery, MoveCategoryPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCategoryPathsQuery, MoveCategoryPathsQueryVariables>(MoveCategoryPathsDocument, options);
      }
export function useMoveCategoryPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCategoryPathsQuery, MoveCategoryPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCategoryPathsQuery, MoveCategoryPathsQueryVariables>(MoveCategoryPathsDocument, options);
        }
export type MoveCategoryPathsQueryHookResult = ReturnType<typeof useMoveCategoryPathsQuery>;
export type MoveCategoryPathsLazyQueryHookResult = ReturnType<typeof useMoveCategoryPathsLazyQuery>;
export type MoveCategoryPathsQueryResult = Apollo.QueryResult<MoveCategoryPathsQuery, MoveCategoryPathsQueryVariables>;
export const MovesDocument = gql`
    query Moves($characterSlug: ID!, $moveCategorySlug: ID) {
  moves(characterSlug: $characterSlug, moveCategorySlug: $moveCategorySlug) {
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
 *      characterSlug: // value for 'characterSlug'
 *      moveCategorySlug: // value for 'moveCategorySlug'
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
    query MyArticle($id: ID!) {
  myArticle(id: $id) {
    id
    category
    title
    mainImageUrl
    content
  }
}
    `;

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
 *      id: // value for 'id'
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
    query MyArticles {
  myArticles {
    nodes {
      id
      title
      status
    }
  }
}
    `;

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
export const MyCombosDocument = gql`
    query MyCombos {
  myCombos {
    nodes {
      id
      character {
        name
      }
      commands {
        id
        state {
          id
          name
        }
        move {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useMyCombosQuery__
 *
 * To run a query within a React component, call `useMyCombosQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCombosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCombosQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCombosQuery(baseOptions?: Apollo.QueryHookOptions<MyCombosQuery, MyCombosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCombosQuery, MyCombosQueryVariables>(MyCombosDocument, options);
      }
export function useMyCombosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCombosQuery, MyCombosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCombosQuery, MyCombosQueryVariables>(MyCombosDocument, options);
        }
export type MyCombosQueryHookResult = ReturnType<typeof useMyCombosQuery>;
export type MyCombosLazyQueryHookResult = ReturnType<typeof useMyCombosLazyQuery>;
export type MyCombosQueryResult = Apollo.QueryResult<MyCombosQuery, MyCombosQueryVariables>;
export const MyEventsDocument = gql`
    query MyEvents {
  myEvents {
    nodes {
      ...event
    }
  }
}
    ${EventFragmentDoc}`;

/**
 * __useMyEventsQuery__
 *
 * To run a query within a React component, call `useMyEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEventsQuery(baseOptions?: Apollo.QueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
      }
export function useMyEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
        }
export type MyEventsQueryHookResult = ReturnType<typeof useMyEventsQuery>;
export type MyEventsLazyQueryHookResult = ReturnType<typeof useMyEventsLazyQuery>;
export type MyEventsQueryResult = Apollo.QueryResult<MyEventsQuery, MyEventsQueryVariables>;
export const MyVideosDocument = gql`
    query MyVideos {
  myVideos {
    nodes {
      id
      title
    }
  }
}
    `;

/**
 * __useMyVideosQuery__
 *
 * To run a query within a React component, call `useMyVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyVideosQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyVideosQuery(baseOptions?: Apollo.QueryHookOptions<MyVideosQuery, MyVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyVideosQuery, MyVideosQueryVariables>(MyVideosDocument, options);
      }
export function useMyVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyVideosQuery, MyVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyVideosQuery, MyVideosQueryVariables>(MyVideosDocument, options);
        }
export type MyVideosQueryHookResult = ReturnType<typeof useMyVideosQuery>;
export type MyVideosLazyQueryHookResult = ReturnType<typeof useMyVideosLazyQuery>;
export type MyVideosQueryResult = Apollo.QueryResult<MyVideosQuery, MyVideosQueryVariables>;
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
export const VideoDocument = gql`
    query Video($id: ID!) {
  video(id: $id) {
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
 *      id: // value for 'id'
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
    query Videos($first: Int, $after: String, $order: Order) {
  videos(first: $first, after: $after, order: $order) {
    nodes {
      ...videoSummary
    }
    pageInfo {
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
 *      first: // value for 'first'
 *      after: // value for 'after'
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