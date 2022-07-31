import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type Article = {
  __typename?: 'Article';
  author: User;
  category: ArticleCategory;
  content: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  mainImageUrl?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  relatedArticles: Array<Article>;
  status: ArticleStatus;
  title: Scalars['String'];
};

export type ArticleAttributes = {
  category: ArticleCategory;
  content: Scalars['String'];
  mainImage?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export enum ArticleCategory {
  /** 対戦 */
  Battle = 'battle',
  /** 雑談 */
  Blog = 'blog',
  /** イベント */
  Event = 'event',
  /** 入門 */
  Intro = 'intro',
  /** ニュース */
  News = 'news',
  /** 解説・戦略 */
  Theory = 'theory'
}

/** The connection type for Article. */
export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  /** A list of edges. */
  edges: Array<ArticleEdge>;
  /** A list of nodes. */
  nodes: Array<Article>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Article;
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

export type AttackAttributes = {
  blockFrame?: InputMaybe<Scalars['Int']>;
  blockResult: AttackMoveResultEnum;
  blockStatus?: InputMaybe<AttackMoveStateEnum>;
  counterFrame?: InputMaybe<Scalars['Int']>;
  counterResult: AttackMoveResultEnum;
  counterStatus?: InputMaybe<AttackMoveStateEnum>;
  crouchingStatus: Scalars['Boolean'];
  damages: Array<Scalars['Int']>;
  duration?: InputMaybe<Scalars['Int']>;
  heights: Array<AttackTypeEnum>;
  hitFrame?: InputMaybe<Scalars['Int']>;
  hitResult: AttackMoveResultEnum;
  hitStatus?: InputMaybe<AttackMoveStateEnum>;
  homing: Scalars['Boolean'];
  jumpStatus: Scalars['Boolean'];
  powerCrush: Scalars['Boolean'];
  reach?: InputMaybe<Scalars['Float']>;
  screw: Scalars['Boolean'];
  startUpFrame?: InputMaybe<Scalars['Int']>;
  wallBound: Scalars['Boolean'];
};

export type AttackMove = {
  __typename?: 'AttackMove';
  blockFrame?: Maybe<Scalars['Int']>;
  blockResult: AttackMoveResultEnum;
  blockStatus?: Maybe<AttackMoveStateEnum>;
  counterFrame?: Maybe<Scalars['Int']>;
  counterResult: AttackMoveResultEnum;
  counterStatus?: Maybe<AttackMoveStateEnum>;
  crouchingStatus: Scalars['Boolean'];
  crouchingStatusFrame?: Maybe<Scalars['Int']>;
  damages: Array<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  heights: Array<AttackTypeEnum>;
  hitFrame?: Maybe<Scalars['Int']>;
  hitResult: AttackMoveResultEnum;
  hitStatus?: Maybe<AttackMoveStateEnum>;
  homing: Scalars['Boolean'];
  id: Scalars['ID'];
  jumpStatus: Scalars['Boolean'];
  jumpStatusFrame?: Maybe<Scalars['Int']>;
  powerCrush: Scalars['Boolean'];
  powerCrushFrame?: Maybe<Scalars['Int']>;
  reach?: Maybe<Scalars['Float']>;
  screw: Scalars['Boolean'];
  startUpFrame?: Maybe<Scalars['Int']>;
  wallBound: Scalars['Boolean'];
};

export type AttackMoveAttributes = {
  attack: AttackAttributes;
  move: MoveAttributes;
};

export enum AttackMoveResultEnum {
  /** 空中コンボ */
  Combo = 'combo',
  /** ダウン */
  Down = 'down',
  /** - */
  Normal = 'normal'
}

export enum AttackMoveStateEnum {
  /** 強制後ろ向き */
  Backward = 'backward',
  /** ガード可能な硬直 */
  Blockable = 'blockable',
  /** 強制しゃがみ */
  Crouching = 'crouching',
  /** 強制横向き */
  Sideways = 'sideways',
  /** きりもみ */
  Twist = 'twist'
}

export enum AttackTypeEnum {
  /** 上段 */
  H = 'h',
  /** 下段 */
  L = 'l',
  /** 中段 */
  M = 'm',
  /** 特殊中段 */
  Sm = 'sm',
  /** 打撃投げ */
  T = 't',
  /** 上段投げ */
  Th = 'th',
  /** 下段投げ */
  Tl = 'tl',
  /** 中段投げ */
  Tm = 'tm',
  /** 空中ガード不能 */
  Uba = 'uba',
  /** 上段ガード不能 */
  Ubh = 'ubh',
  /** 下段ガード不能 */
  Ubl = 'ubl',
  /** 中段ガード不能 */
  Ubm = 'ubm'
}

export type Battle = {
  __typename?: 'Battle';
  id: Scalars['ID'];
  round: BattleRound;
  sides: Array<BattleSide>;
  startSec: Scalars['Int'];
  tournamentVideo: TournamentVideo;
};

export type BattleAttributes = {
  round: BattleRound;
  sides: Array<BattleSideAttributes>;
  startSec: Scalars['Int'];
  tournamentVideoId: Scalars['ID'];
};

/** The connection type for Battle. */
export type BattleConnection = {
  __typename?: 'BattleConnection';
  /** A list of edges. */
  edges: Array<BattleEdge>;
  /** A list of nodes. */
  nodes: Array<Battle>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type BattleCount = {
  __typename?: 'BattleCount';
  character: Character;
  count: Scalars['Int'];
  id: Scalars['ID'];
  player: Player;
};

/** The connection type for BattleCount. */
export type BattleCountConnection = {
  __typename?: 'BattleCountConnection';
  /** A list of edges. */
  edges: Array<BattleCountEdge>;
  /** A list of nodes. */
  nodes: Array<BattleCount>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BattleCountEdge = {
  __typename?: 'BattleCountEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: BattleCount;
};

/** An edge in a connection. */
export type BattleEdge = {
  __typename?: 'BattleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Battle;
};

export enum BattleRound {
  /** Final */
  Final = 'final',
  /** Grand Final */
  GrandFinal = 'grand_final',
  /** Grand Final(リセット) */
  GrandFinalReset = 'grand_final_reset',
  /** Losers Final */
  LosersFinal = 'losers_final',
  /** Losers Semifinal */
  LosersSemifinal = 'losers_semifinal',
  /** Semifinal */
  Semifinal = 'semifinal',
  /** 3位決定戦 */
  ThirdPlace = 'third_place',
  /** 指定なし */
  Unspecified = 'unspecified',
  /** Winners Final */
  WinnersFinal = 'winners_final',
  /** Winners Semifinal */
  WinnersSemifinal = 'winners_semifinal'
}

export type BattleSide = {
  __typename?: 'BattleSide';
  character: Character;
  id: Scalars['ID'];
  player: Player;
  rounds: Scalars['Int'];
};

export type BattleSideAttributes = {
  characterId: Scalars['ID'];
  playerId: Scalars['ID'];
  rounds: Scalars['Int'];
};

export type Channel = {
  __typename?: 'Channel';
  channelId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Character = {
  __typename?: 'Character';
  battlesCount: Scalars['Int'];
  comboCategories: Array<ComboCategory>;
  comboStarters: Array<Move>;
  combosCount: Scalars['Int'];
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
  movesCount: Scalars['Int'];
  name: Scalars['String'];
  nameKana: Scalars['String'];
  slug: Scalars['String'];
  story: Scalars['String'];
};

export type CharacterAttributes = {
  country: Scalars['String'];
  description: Scalars['String'];
  dlc: Scalars['Boolean'];
  faceImage?: InputMaybe<Scalars['String']>;
  fightingStyle: Scalars['String'];
  longName: Scalars['String'];
  longNameKana: Scalars['String'];
  mainImage?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nameKana: Scalars['String'];
  slug: Scalars['String'];
  story: Scalars['String'];
};

/** The connection type for Character. */
export type CharacterConnection = {
  __typename?: 'CharacterConnection';
  /** A list of edges. */
  edges: Array<CharacterEdge>;
  /** A list of nodes. */
  nodes: Array<Character>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CharacterEdge = {
  __typename?: 'CharacterEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Character;
};

export enum CharacterOrder {
  /** 名前 */
  Name = 'name',
  /** 新着 */
  UseRate = 'use_rate'
}

export type Combo = {
  __typename?: 'Combo';
  comboCategory: ComboCategory;
  comboVideo?: Maybe<ComboVideo>;
  command: Array<Scalars['String']>;
  damage?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  move?: Maybe<Move>;
  note?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
};

export type ComboAttributes = {
  command: Array<Scalars['String']>;
  damage?: InputMaybe<Scalars['Int']>;
  moveId?: InputMaybe<Scalars['ID']>;
  note?: InputMaybe<Scalars['String']>;
  position: Scalars['Int'];
};

export type ComboCategory = {
  __typename?: 'ComboCategory';
  character: Character;
  combos: Array<Combo>;
  combosCount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['Int'];
};

export type ComboCategoryAttributes = {
  name: Scalars['String'];
  position: Scalars['Int'];
};

export type ComboVideo = {
  __typename?: 'ComboVideo';
  id: Scalars['ID'];
  m3u8Url: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String'];
  flagEmoji: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Autogenerated input type of CreateArticleImage */
export type CreateArticleImageInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
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
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated input type of CreateArticleLink */
export type CreateArticleLinkInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
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
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateArticleVideo */
export type CreateArticleVideoPayload = {
  __typename?: 'CreateArticleVideoPayload';
  articleVideo: ArticleVideo;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  videoUpload: VideoUpload;
};

/** Autogenerated input type of CreateAttackMove */
export type CreateAttackMoveInput = {
  attributes: AttackMoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveCategoryId: Scalars['ID'];
};

/** Autogenerated return type of CreateAttackMove */
export type CreateAttackMovePayload = {
  __typename?: 'CreateAttackMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of CreateBattle */
export type CreateBattleInput = {
  attributes: BattleAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateBattle */
export type CreateBattlePayload = {
  __typename?: 'CreateBattlePayload';
  battle: Battle;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateCharacter */
export type CreateCharacterInput = {
  attributes: CharacterAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
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
  attributes: ComboCategoryAttributes;
  characterSlug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
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
  attributes: ComboAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  comboCategoryId: Scalars['ID'];
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
  clientMutationId?: InputMaybe<Scalars['String']>;
  comboId: Scalars['ID'];
};

/** Autogenerated return type of CreateComboVideo */
export type CreateComboVideoPayload = {
  __typename?: 'CreateComboVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  combo: Combo;
  videoUpload: VideoUpload;
};

/** Autogenerated input type of CreateMoveCategory */
export type CreateMoveCategoryInput = {
  attributes: MoveCategoryAttributes;
  characterSlug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateMoveCategory */
export type CreateMoveCategoryPayload = {
  __typename?: 'CreateMoveCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
};

/** Autogenerated input type of CreateMove */
export type CreateMoveInput = {
  attributes: MoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveCategoryId: Scalars['ID'];
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
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveId: Scalars['ID'];
};

/** Autogenerated return type of CreateMoveVideo */
export type CreateMoveVideoPayload = {
  __typename?: 'CreateMoveVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
  videoUpload: VideoUpload;
};

/** Autogenerated input type of CreateOrganizer */
export type CreateOrganizerInput = {
  attributes: OrganizerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateOrganizer */
export type CreateOrganizerPayload = {
  __typename?: 'CreateOrganizerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  organizer: Organizer;
};

/** Autogenerated input type of CreatePlayerFromSmashgg */
export type CreatePlayerFromSmashggInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  smashggId: Scalars['String'];
};

/** Autogenerated return type of CreatePlayerFromSmashgg */
export type CreatePlayerFromSmashggPayload = {
  __typename?: 'CreatePlayerFromSmashggPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: Player;
};

/** Autogenerated input type of CreatePlayer */
export type CreatePlayerInput = {
  attributes: PlayerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreatePlayer */
export type CreatePlayerPayload = {
  __typename?: 'CreatePlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: Player;
};

/** Autogenerated input type of CreateReversalMove */
export type CreateReversalMoveInput = {
  attributes: ReversalMoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveCategoryId: Scalars['ID'];
};

/** Autogenerated return type of CreateReversalMove */
export type CreateReversalMovePayload = {
  __typename?: 'CreateReversalMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of CreateStanding */
export type CreateStandingInput = {
  attributes: StandingAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  tournamentId: Scalars['ID'];
};

/** Autogenerated return type of CreateStanding */
export type CreateStandingPayload = {
  __typename?: 'CreateStandingPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  standing: Standing;
};

/** Autogenerated input type of CreateThrowMove */
export type CreateThrowMoveInput = {
  attributes: ThrowMoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveCategoryId: Scalars['ID'];
};

/** Autogenerated return type of CreateThrowMove */
export type CreateThrowMovePayload = {
  __typename?: 'CreateThrowMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of CreateTournament */
export type CreateTournamentInput = {
  attributes: TournamentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateTournament */
export type CreateTournamentPayload = {
  __typename?: 'CreateTournamentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournament: Tournament;
};

/** Autogenerated input type of CreateTournamentVideo */
export type CreateTournamentVideoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  tournamentId: Scalars['ID'];
  url: Scalars['String'];
};

/** Autogenerated return type of CreateTournamentVideo */
export type CreateTournamentVideoPayload = {
  __typename?: 'CreateTournamentVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournamentVideo: TournamentVideo;
};

/** Autogenerated input type of CreateUser */
export type CreateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateUser */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentUser: CurrentUser;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  avatarUrl: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  role: UserRole;
};

export type CurrentUserAttributes = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** Autogenerated input type of DeleteArticle */
export type DeleteArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteArticle */
export type DeleteArticlePayload = {
  __typename?: 'DeleteArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteBattle */
export type DeleteBattleInput = {
  battleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteBattle */
export type DeleteBattlePayload = {
  __typename?: 'DeleteBattlePayload';
  battle: Battle;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteComboCategory */
export type DeleteComboCategoryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  comboCategoryId: Scalars['ID'];
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
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  comboId: Scalars['ID'];
};

/** Autogenerated return type of DeleteCombo */
export type DeleteComboPayload = {
  __typename?: 'DeleteComboPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  combo: Combo;
};

/** Autogenerated input type of DeleteMoveCategory */
export type DeleteMoveCategoryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveCategoryId: Scalars['ID'];
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
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveId: Scalars['ID'];
};

/** Autogenerated return type of DeleteMove */
export type DeleteMovePayload = {
  __typename?: 'DeleteMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of DeleteMoveVideo */
export type DeleteMoveVideoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveId: Scalars['ID'];
};

/** Autogenerated return type of DeleteMoveVideo */
export type DeleteMoveVideoPayload = {
  __typename?: 'DeleteMoveVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of DeleteOrganizer */
export type DeleteOrganizerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizerSlug: Scalars['String'];
};

/** Autogenerated return type of DeleteOrganizer */
export type DeleteOrganizerPayload = {
  __typename?: 'DeleteOrganizerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  organizer: Organizer;
};

/** Autogenerated input type of DeletePlayer */
export type DeletePlayerInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  playerSlug: Scalars['String'];
};

/** Autogenerated return type of DeletePlayer */
export type DeletePlayerPayload = {
  __typename?: 'DeletePlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: Player;
};

/** Autogenerated input type of DeleteStanding */
export type DeleteStandingInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  standingId: Scalars['ID'];
};

/** Autogenerated return type of DeleteStanding */
export type DeleteStandingPayload = {
  __typename?: 'DeleteStandingPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  standing: Standing;
};

/** Autogenerated input type of DeleteTournament */
export type DeleteTournamentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  tournamentId: Scalars['ID'];
};

/** Autogenerated return type of DeleteTournament */
export type DeleteTournamentPayload = {
  __typename?: 'DeleteTournamentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournament: Tournament;
};

/** Autogenerated input type of DeleteTournamentVideo */
export type DeleteTournamentVideoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  tournamentVideoId: Scalars['ID'];
};

/** Autogenerated return type of DeleteTournamentVideo */
export type DeleteTournamentVideoPayload = {
  __typename?: 'DeleteTournamentVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournamentVideo: TournamentVideo;
};

export type Move = {
  __typename?: 'Move';
  combos: Array<Combo>;
  combosCount: Scalars['Int'];
  command: Array<Scalars['String']>;
  id: Scalars['ID'];
  kana?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
  moveVideo?: Maybe<MoveVideo>;
  moveable: Moveable;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  statusAfter?: Maybe<Scalars['String']>;
};

export type MoveAttributes = {
  command: Array<Scalars['String']>;
  kana?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  position: Scalars['Int'];
  statusAfter?: InputMaybe<Scalars['String']>;
};

export type MoveCategory = {
  __typename?: 'MoveCategory';
  character: Character;
  id: Scalars['ID'];
  moves: Array<Move>;
  movesCount: Scalars['Int'];
  name: Scalars['String'];
  position: Scalars['Int'];
};

export type MoveCategoryAttributes = {
  name: Scalars['String'];
  position: Scalars['Int'];
};

export type MoveVideo = {
  __typename?: 'MoveVideo';
  id: Scalars['ID'];
  m3u8Url: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type Moveable = AttackMove | ReversalMove | ThrowMove;

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<CreateArticlePayload>;
  createArticleImage?: Maybe<CreateArticleImagePayload>;
  createArticleLink?: Maybe<CreateArticleLinkPayload>;
  createArticleVideo?: Maybe<CreateArticleVideoPayload>;
  createAttackMove?: Maybe<CreateAttackMovePayload>;
  createBattle?: Maybe<CreateBattlePayload>;
  createCharacter?: Maybe<CreateCharacterPayload>;
  createCombo?: Maybe<CreateComboPayload>;
  createComboCategory?: Maybe<CreateComboCategoryPayload>;
  createComboVideo?: Maybe<CreateComboVideoPayload>;
  createMove?: Maybe<CreateMovePayload>;
  createMoveCategory?: Maybe<CreateMoveCategoryPayload>;
  createMoveVideo?: Maybe<CreateMoveVideoPayload>;
  createOrganizer?: Maybe<CreateOrganizerPayload>;
  createPlayer?: Maybe<CreatePlayerPayload>;
  createPlayerFromSmashgg?: Maybe<CreatePlayerFromSmashggPayload>;
  createReversalMove?: Maybe<CreateReversalMovePayload>;
  createStanding?: Maybe<CreateStandingPayload>;
  createThrowMove?: Maybe<CreateThrowMovePayload>;
  createTournament?: Maybe<CreateTournamentPayload>;
  createTournamentVideo?: Maybe<CreateTournamentVideoPayload>;
  createUser?: Maybe<CreateUserPayload>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  deleteBattle?: Maybe<DeleteBattlePayload>;
  deleteCombo?: Maybe<DeleteComboPayload>;
  deleteComboCategory?: Maybe<DeleteComboCategoryPayload>;
  deleteMove?: Maybe<DeleteMovePayload>;
  deleteMoveCategory?: Maybe<DeleteMoveCategoryPayload>;
  deleteMoveVideo?: Maybe<DeleteMoveVideoPayload>;
  deleteOrganizer?: Maybe<DeleteOrganizerPayload>;
  deletePlayer?: Maybe<DeletePlayerPayload>;
  deleteStanding?: Maybe<DeleteStandingPayload>;
  deleteTournament?: Maybe<DeleteTournamentPayload>;
  deleteTournamentVideo?: Maybe<DeleteTournamentVideoPayload>;
  publishArticle?: Maybe<PublishArticlePayload>;
  setUserAvatar?: Maybe<SetUserAvatarPayload>;
  stopArticle?: Maybe<StopArticlePayload>;
  updateArticle?: Maybe<UpdateArticlePayload>;
  updateAttackMove?: Maybe<UpdateAttackMovePayload>;
  updateBattle?: Maybe<UpdateBattlePayload>;
  updateCharacter?: Maybe<UpdateCharacterPayload>;
  updateCombo?: Maybe<UpdateComboPayload>;
  updateComboCategory?: Maybe<UpdateComboCategoryPayload>;
  updateCurrentUser?: Maybe<UpdateCurrentUserPayload>;
  updateMove?: Maybe<UpdateMovePayload>;
  updateMoveCategory?: Maybe<UpdateMoveCategoryPayload>;
  updateOrganizer?: Maybe<UpdateOrganizerPayload>;
  updatePlayer?: Maybe<UpdatePlayerPayload>;
  updateReversalMove?: Maybe<UpdateReversalMovePayload>;
  updateStanding?: Maybe<UpdateStandingPayload>;
  updateThrowMove?: Maybe<UpdateThrowMovePayload>;
  updateTournament?: Maybe<UpdateTournamentPayload>;
  updateTournamentVideo?: Maybe<UpdateTournamentVideoPayload>;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
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


export type MutationCreateAttackMoveArgs = {
  input: CreateAttackMoveInput;
};


export type MutationCreateBattleArgs = {
  input: CreateBattleInput;
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


export type MutationCreateMoveArgs = {
  input: CreateMoveInput;
};


export type MutationCreateMoveCategoryArgs = {
  input: CreateMoveCategoryInput;
};


export type MutationCreateMoveVideoArgs = {
  input: CreateMoveVideoInput;
};


export type MutationCreateOrganizerArgs = {
  input: CreateOrganizerInput;
};


export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type MutationCreatePlayerFromSmashggArgs = {
  input: CreatePlayerFromSmashggInput;
};


export type MutationCreateReversalMoveArgs = {
  input: CreateReversalMoveInput;
};


export type MutationCreateStandingArgs = {
  input: CreateStandingInput;
};


export type MutationCreateThrowMoveArgs = {
  input: CreateThrowMoveInput;
};


export type MutationCreateTournamentArgs = {
  input: CreateTournamentInput;
};


export type MutationCreateTournamentVideoArgs = {
  input: CreateTournamentVideoInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteArticleArgs = {
  input: DeleteArticleInput;
};


export type MutationDeleteBattleArgs = {
  input: DeleteBattleInput;
};


export type MutationDeleteComboArgs = {
  input: DeleteComboInput;
};


export type MutationDeleteComboCategoryArgs = {
  input: DeleteComboCategoryInput;
};


export type MutationDeleteMoveArgs = {
  input: DeleteMoveInput;
};


export type MutationDeleteMoveCategoryArgs = {
  input: DeleteMoveCategoryInput;
};


export type MutationDeleteMoveVideoArgs = {
  input: DeleteMoveVideoInput;
};


export type MutationDeleteOrganizerArgs = {
  input: DeleteOrganizerInput;
};


export type MutationDeletePlayerArgs = {
  input: DeletePlayerInput;
};


export type MutationDeleteStandingArgs = {
  input: DeleteStandingInput;
};


export type MutationDeleteTournamentArgs = {
  input: DeleteTournamentInput;
};


export type MutationDeleteTournamentVideoArgs = {
  input: DeleteTournamentVideoInput;
};


export type MutationPublishArticleArgs = {
  input: PublishArticleInput;
};


export type MutationSetUserAvatarArgs = {
  input: SetUserAvatarInput;
};


export type MutationStopArticleArgs = {
  input: StopArticleInput;
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};


export type MutationUpdateAttackMoveArgs = {
  input: UpdateAttackMoveInput;
};


export type MutationUpdateBattleArgs = {
  input: UpdateBattleInput;
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


export type MutationUpdateCurrentUserArgs = {
  input: UpdateCurrentUserInput;
};


export type MutationUpdateMoveArgs = {
  input: UpdateMoveInput;
};


export type MutationUpdateMoveCategoryArgs = {
  input: UpdateMoveCategoryInput;
};


export type MutationUpdateOrganizerArgs = {
  input: UpdateOrganizerInput;
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};


export type MutationUpdateReversalMoveArgs = {
  input: UpdateReversalMoveInput;
};


export type MutationUpdateStandingArgs = {
  input: UpdateStandingInput;
};


export type MutationUpdateThrowMoveArgs = {
  input: UpdateThrowMoveInput;
};


export type MutationUpdateTournamentArgs = {
  input: UpdateTournamentInput;
};


export type MutationUpdateTournamentVideoArgs = {
  input: UpdateTournamentVideoInput;
};

export enum Order {
  /** 新着 */
  New = 'new'
}

export type Organizer = {
  __typename?: 'Organizer';
  avatarUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  streamingUrl?: Maybe<Scalars['String']>;
  tonamelId?: Maybe<Scalars['String']>;
  tournaments: Array<Tournament>;
  twitterId?: Maybe<Scalars['String']>;
};

export type OrganizerAttributes = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  streamingUrl?: InputMaybe<Scalars['String']>;
  tonamelId?: InputMaybe<Scalars['String']>;
  twitterId?: InputMaybe<Scalars['String']>;
};

/** The connection type for Organizer. */
export type OrganizerConnection = {
  __typename?: 'OrganizerConnection';
  /** A list of edges. */
  edges: Array<OrganizerEdge>;
  /** A list of nodes. */
  nodes: Array<Organizer>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type OrganizerEdge = {
  __typename?: 'OrganizerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Organizer;
};

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
  avatarUrl?: Maybe<Scalars['String']>;
  battleCounts: Array<BattleCount>;
  battlesCount: Scalars['Int'];
  country?: Maybe<Country>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  smashggId?: Maybe<Scalars['String']>;
  standings: StandingConnection;
  standingsCount: Scalars['Int'];
  streamingUrl?: Maybe<Scalars['String']>;
  tonamelId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};


export type PlayerStandingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PlayerAttributes = {
  avatar?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  smashggId?: InputMaybe<Scalars['String']>;
  streamingUrl?: InputMaybe<Scalars['String']>;
  tonamelId?: InputMaybe<Scalars['String']>;
  twitterId?: InputMaybe<Scalars['String']>;
};

/** The connection type for Player. */
export type PlayerConnection = {
  __typename?: 'PlayerConnection';
  /** A list of edges. */
  edges: Array<PlayerEdge>;
  /** A list of nodes. */
  nodes: Array<Player>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Player;
};

/** Autogenerated input type of PublishArticle */
export type PublishArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
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
  article: Article;
  articles: ArticleConnection;
  battleCounts: BattleCountConnection;
  battles: BattleConnection;
  character: Character;
  characters: CharacterConnection;
  combo: Combo;
  comboCategory: ComboCategory;
  countries: Array<Country>;
  currentUser: CurrentUser;
  move: Move;
  moveCategory: MoveCategory;
  myArticle: Article;
  myArticles: ArticleConnection;
  organizer: Organizer;
  organizers: OrganizerConnection;
  player: Player;
  players: PlayerConnection;
  tournament: Tournament;
  tournamentVideo: TournamentVideo;
  tournamentVideos: TournamentVideoConnection;
  tournaments: TournamentConnection;
};


export type QueryArticleArgs = {
  articleId: Scalars['ID'];
};


export type QueryArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<ArticleCategory>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Order>;
};


export type QueryBattleCountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  characterSlug?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  playerSlug?: InputMaybe<Scalars['String']>;
};


export type QueryBattlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  characterSlug?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  playerSlug?: InputMaybe<Scalars['String']>;
  tournamentId?: InputMaybe<Scalars['ID']>;
  tournamentVideoId?: InputMaybe<Scalars['ID']>;
};


export type QueryCharacterArgs = {
  characterSlug: Scalars['String'];
};


export type QueryCharactersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CharacterOrder>;
};


export type QueryComboArgs = {
  comboId: Scalars['ID'];
};


export type QueryComboCategoryArgs = {
  comboCategoryId: Scalars['ID'];
};


export type QueryMoveArgs = {
  moveId: Scalars['ID'];
};


export type QueryMoveCategoryArgs = {
  moveCategoryId: Scalars['ID'];
};


export type QueryMyArticleArgs = {
  articleId: Scalars['ID'];
};


export type QueryMyArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryOrganizerArgs = {
  organizerSlug: Scalars['String'];
};


export type QueryOrganizersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPlayerArgs = {
  playerSlug: Scalars['String'];
};


export type QueryPlayersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTournamentArgs = {
  tournamentId: Scalars['ID'];
};


export type QueryTournamentVideoArgs = {
  tournamentVideoId: Scalars['ID'];
};


export type QueryTournamentVideosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  tournamentId?: InputMaybe<Scalars['ID']>;
};


export type QueryTournamentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  organizerId?: InputMaybe<Scalars['ID']>;
  thisWeek?: InputMaybe<Scalars['Boolean']>;
};

export type ReversalAttributes = {
  finishFrame?: InputMaybe<Scalars['Int']>;
  kind: Scalars['String'];
  startUpFrame?: InputMaybe<Scalars['Int']>;
};

export type ReversalMove = {
  __typename?: 'ReversalMove';
  finishFrame?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  kind: Scalars['String'];
  startUpFrame?: Maybe<Scalars['Int']>;
};

export type ReversalMoveAttributes = {
  move: MoveAttributes;
  reversal: ReversalAttributes;
};

/** Autogenerated input type of SetUserAvatar */
export type SetUserAvatarInput = {
  avatar: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of SetUserAvatar */
export type SetUserAvatarPayload = {
  __typename?: 'SetUserAvatarPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  user: User;
};

export type Standing = {
  __typename?: 'Standing';
  id: Scalars['ID'];
  place: Scalars['Int'];
  player: Player;
  playerId: Scalars['ID'];
  tournament: Tournament;
};

export type StandingAttributes = {
  place: Scalars['Int'];
  playerId: Scalars['ID'];
};

/** The connection type for Standing. */
export type StandingConnection = {
  __typename?: 'StandingConnection';
  /** A list of edges. */
  edges: Array<StandingEdge>;
  /** A list of nodes. */
  nodes: Array<Standing>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type StandingEdge = {
  __typename?: 'StandingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Standing;
};

/** Autogenerated input type of StopArticle */
export type StopArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of StopArticle */
export type StopArticlePayload = {
  __typename?: 'StopArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ThrowAttributes = {
  damage?: InputMaybe<Scalars['Int']>;
  startUpFrame?: InputMaybe<Scalars['Int']>;
  throwEscape: ThrowEscapeEnum;
  throwResult: ThrowMoveResultEnum;
  throwType: ThrowTypeEnum;
};

export enum ThrowEscapeEnum {
  /** 不可 */
  Inescapable = 'inescapable',
  /** LP */
  Lp = 'lp',
  /** LP OR RP */
  LpOrRp = 'lp_or_rp',
  /** RP */
  Rp = 'rp',
  /** WP */
  Wp = 'wp'
}

export type ThrowMove = {
  __typename?: 'ThrowMove';
  damage?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  startUpFrame?: Maybe<Scalars['Int']>;
  throwEscape: ThrowEscapeEnum;
  throwResult: ThrowMoveResultEnum;
  throwType: ThrowTypeEnum;
};

export type ThrowMoveAttributes = {
  move: MoveAttributes;
  throw: ThrowAttributes;
};

export enum ThrowMoveResultEnum {
  /** 空中コンボ */
  Combo = 'combo',
  /** ダウン */
  Down = 'down',
  /** - */
  Normal = 'normal'
}

export enum ThrowTypeEnum {
  /** 背面投げ */
  Back = 'back',
  /** 投げコンボ */
  Combo = 'combo',
  /** ダウン投げ */
  Down = 'down',
  /** 上段投げ */
  High = 'high',
  /** 空中投げ */
  Juggle = 'juggle',
  /** 左側面投げ */
  Left = 'left',
  /** 下段投げ */
  Low = 'low',
  /** 中段投げ */
  Middle = 'middle',
  /** 右側面投げ */
  Right = 'right',
  /** 壁投げ */
  Wall = 'wall'
}

export type Tournament = {
  __typename?: 'Tournament';
  battlesCount: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['ID'];
  mainImageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  organizerId: Scalars['ID'];
  standings: Array<Standing>;
  standingsCount: Scalars['Int'];
  startsAt: Scalars['ISO8601DateTime'];
  streamingUrl?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  videos: Array<TournamentVideo>;
  videosCount: Scalars['Int'];
};

export type TournamentAttributes = {
  description: Scalars['String'];
  mainImage?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizerId?: InputMaybe<Scalars['ID']>;
  startsAt: Scalars['String'];
  streamingUrl?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

/** The connection type for Tournament. */
export type TournamentConnection = {
  __typename?: 'TournamentConnection';
  /** A list of edges. */
  edges: Array<TournamentEdge>;
  /** A list of nodes. */
  nodes: Array<Tournament>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TournamentEdge = {
  __typename?: 'TournamentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Tournament;
};

export type TournamentVideo = {
  __typename?: 'TournamentVideo';
  battles: Array<Battle>;
  battlesCount: Scalars['Int'];
  channel: Channel;
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  tournament: Tournament;
  url: Scalars['String'];
  youtubeVideoId: Scalars['String'];
};

export type TournamentVideoAttributes = {
  label?: InputMaybe<Scalars['String']>;
  publishedAt: Scalars['String'];
  title: Scalars['String'];
};

/** The connection type for TournamentVideo. */
export type TournamentVideoConnection = {
  __typename?: 'TournamentVideoConnection';
  /** A list of edges. */
  edges: Array<TournamentVideoEdge>;
  /** A list of nodes. */
  nodes: Array<TournamentVideo>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TournamentVideoEdge = {
  __typename?: 'TournamentVideoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TournamentVideo;
};

/** Autogenerated input type of UpdateArticle */
export type UpdateArticleInput = {
  articleId: Scalars['ID'];
  attributes: ArticleAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateArticle */
export type UpdateArticlePayload = {
  __typename?: 'UpdateArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateAttackMove */
export type UpdateAttackMoveInput = {
  attributes: AttackMoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveId: Scalars['ID'];
};

/** Autogenerated return type of UpdateAttackMove */
export type UpdateAttackMovePayload = {
  __typename?: 'UpdateAttackMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of UpdateBattle */
export type UpdateBattleInput = {
  attributes: BattleAttributes;
  battleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateBattle */
export type UpdateBattlePayload = {
  __typename?: 'UpdateBattlePayload';
  battle: Battle;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateCharacter */
export type UpdateCharacterInput = {
  attributes: CharacterAttributes;
  characterSlug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
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
  attributes: ComboCategoryAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  comboCategoryId: Scalars['ID'];
};

/** Autogenerated return type of UpdateComboCategory */
export type UpdateComboCategoryPayload = {
  __typename?: 'UpdateComboCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comboCategory: ComboCategory;
};

/** Autogenerated input type of UpdateCombo */
export type UpdateComboInput = {
  attributes: ComboAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  comboId: Scalars['ID'];
};

/** Autogenerated return type of UpdateCombo */
export type UpdateComboPayload = {
  __typename?: 'UpdateComboPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  combo: Combo;
};

/** Autogenerated input type of UpdateCurrentUser */
export type UpdateCurrentUserInput = {
  attributes: CurrentUserAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCurrentUser */
export type UpdateCurrentUserPayload = {
  __typename?: 'UpdateCurrentUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentUser: CurrentUser;
};

/** Autogenerated input type of UpdateMoveCategory */
export type UpdateMoveCategoryInput = {
  attributes: MoveCategoryAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveCategoryId: Scalars['ID'];
};

/** Autogenerated return type of UpdateMoveCategory */
export type UpdateMoveCategoryPayload = {
  __typename?: 'UpdateMoveCategoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  moveCategory: MoveCategory;
};

/** Autogenerated input type of UpdateMove */
export type UpdateMoveInput = {
  attributes: MoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveId: Scalars['ID'];
};

/** Autogenerated return type of UpdateMove */
export type UpdateMovePayload = {
  __typename?: 'UpdateMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of UpdateOrganizer */
export type UpdateOrganizerInput = {
  attributes: OrganizerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizerSlug: Scalars['String'];
};

/** Autogenerated return type of UpdateOrganizer */
export type UpdateOrganizerPayload = {
  __typename?: 'UpdateOrganizerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  organizer: Organizer;
};

/** Autogenerated input type of UpdatePlayer */
export type UpdatePlayerInput = {
  attributes: PlayerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  playerSlug: Scalars['String'];
};

/** Autogenerated return type of UpdatePlayer */
export type UpdatePlayerPayload = {
  __typename?: 'UpdatePlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: Player;
};

/** Autogenerated input type of UpdateReversalMove */
export type UpdateReversalMoveInput = {
  attributes: ReversalMoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveId: Scalars['ID'];
};

/** Autogenerated return type of UpdateReversalMove */
export type UpdateReversalMovePayload = {
  __typename?: 'UpdateReversalMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of UpdateStanding */
export type UpdateStandingInput = {
  attributes: StandingAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  standingId: Scalars['ID'];
};

/** Autogenerated return type of UpdateStanding */
export type UpdateStandingPayload = {
  __typename?: 'UpdateStandingPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  standing: Standing;
};

/** Autogenerated input type of UpdateThrowMove */
export type UpdateThrowMoveInput = {
  attributes: ThrowMoveAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  moveId: Scalars['ID'];
};

/** Autogenerated return type of UpdateThrowMove */
export type UpdateThrowMovePayload = {
  __typename?: 'UpdateThrowMovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  move: Move;
};

/** Autogenerated input type of UpdateTournament */
export type UpdateTournamentInput = {
  attributes: TournamentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  tournamentId: Scalars['ID'];
};

/** Autogenerated return type of UpdateTournament */
export type UpdateTournamentPayload = {
  __typename?: 'UpdateTournamentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournament: Tournament;
};

/** Autogenerated input type of UpdateTournamentVideo */
export type UpdateTournamentVideoInput = {
  attributes: TournamentVideoAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  tournamentVideoId: Scalars['ID'];
};

/** Autogenerated return type of UpdateTournamentVideo */
export type UpdateTournamentVideoPayload = {
  __typename?: 'UpdateTournamentVideoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournamentVideo: TournamentVideo;
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  twitterId?: Maybe<Scalars['String']>;
};

export enum UserRole {
  /** 管理者 */
  Admin = 'admin',
  /** ユーザー */
  User = 'user'
}

export type VideoUpload = {
  __typename?: 'VideoUpload';
  fields: Scalars['String'];
  url: Scalars['String'];
};

export type ArticleCardFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, author: { __typename?: 'User', id: string, name: string, avatarUrl: string } };

export type ArticleCardsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
}>;


export type ArticleCardsQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', edges: Array<{ __typename?: 'ArticleEdge', cursor: string, node: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, author: { __typename?: 'User', id: string, name: string, avatarUrl: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type BattleListQueryVariables = Exact<{
  tournamentId?: InputMaybe<Scalars['ID']>;
  playerSlug?: InputMaybe<Scalars['String']>;
  characterSlug?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type BattleListQuery = { __typename?: 'Query', battles: { __typename?: 'BattleConnection', edges: Array<{ __typename?: 'BattleEdge', cursor: string, node: { __typename?: 'Battle', id: string, round: BattleRound, startSec: number, tournamentVideo: { __typename?: 'TournamentVideo', id: string, youtubeVideoId: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', id: string, rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type BattleListItemFragment = { __typename?: 'Battle', id: string, round: BattleRound, startSec: number, tournamentVideo: { __typename?: 'TournamentVideo', id: string, youtubeVideoId: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', id: string, rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> };

export type CharacterCardFragment = { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number };

export type CharacterProfileFragment = { __typename?: 'Character', slug: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string };

export type CharacterTabsFragment = { __typename?: 'Character', slug: string, battlesCount: number, combosCount: number, movesCount: number };

export type ComboListItemFragment = { __typename?: 'Combo', id: string, damage?: number | null, command: Array<string>, note?: string | null, move?: { __typename?: 'Move', id: string } | null, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type ComboMediaFragment = { __typename?: 'Combo', id: string, damage?: number | null, command: Array<string>, note?: string | null, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type AttackListItemFragment = { __typename?: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, hitFrame?: number | null, hitResult: AttackMoveResultEnum, counterFrame?: number | null, counterResult: AttackMoveResultEnum, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean };

export type ThrowListItemFragment = { __typename?: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null };

export type ReversalListItemFragment = { __typename?: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null };

type MoveListItemMoveable_AttackMove_Fragment = { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, hitFrame?: number | null, hitResult: AttackMoveResultEnum, counterFrame?: number | null, counterResult: AttackMoveResultEnum, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean };

type MoveListItemMoveable_ReversalMove_Fragment = { __typename: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null };

type MoveListItemMoveable_ThrowMove_Fragment = { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null };

export type MoveListItemMoveableFragment = MoveListItemMoveable_AttackMove_Fragment | MoveListItemMoveable_ReversalMove_Fragment | MoveListItemMoveable_ThrowMove_Fragment;

export type MoveListItemFragment = { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, note?: string | null, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, hitFrame?: number | null, hitResult: AttackMoveResultEnum, counterFrame?: number | null, counterResult: AttackMoveResultEnum, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null } };

export type MoveMediaAttackFragment = { __typename?: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, hitFrame?: number | null, hitResult: AttackMoveResultEnum, counterFrame?: number | null, counterResult: AttackMoveResultEnum, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean };

export type MoveMediaThrowFragment = { __typename?: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null };

export type MoveMediaReversalFragment = { __typename?: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null };

export type MoveMediaFragment = { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, statusAfter?: string | null, note?: string | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, hitFrame?: number | null, hitResult: AttackMoveResultEnum, counterFrame?: number | null, counterResult: AttackMoveResultEnum, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type PlayerCardFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, standingsCount: number, battlesCount: number };

export type PlayerCardsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type PlayerCardsQuery = { __typename?: 'Query', players: { __typename?: 'PlayerConnection', edges: Array<{ __typename?: 'PlayerEdge', cursor: string, node: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, standingsCount: number, battlesCount: number } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type PlayerProfileFragment = { __typename?: 'Player', id: string, name: string, slug: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null };

export type PlayerStandingCardFragment = { __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string } };

export type PlayerStandingCardsQueryVariables = Exact<{
  playerSlug: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type PlayerStandingCardsQuery = { __typename?: 'Query', player: { __typename?: 'Player', id: string, standings: { __typename?: 'StandingConnection', edges: Array<{ __typename?: 'StandingEdge', cursor: string, node: { __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } } };

export type PlayerTabsFragment = { __typename?: 'Player', slug: string, battlesCount: number, standingsCount: number };

export type PlayerBattleCountChipFragment = { __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } };

export type TournamentCardFragment = { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> };

export type TournamentCardsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type TournamentCardsQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentConnection', edges: Array<{ __typename?: 'TournamentEdge', cursor: string, node: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type TournamentTabsFragment = { __typename?: 'Tournament', id: string, battlesCount: number };

export type ArticleTableRowFragment = { __typename?: 'Article', id: string, title: string, status: ArticleStatus };

export type ArticleTableRowsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type ArticleTableRowsQuery = { __typename?: 'Query', myArticles: { __typename?: 'ArticleConnection', edges: Array<{ __typename?: 'ArticleEdge', cursor: string, node: { __typename?: 'Article', id: string, title: string, status: ArticleStatus } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type PublishArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type PublishArticleMutation = { __typename?: 'Mutation', publishArticle?: { __typename?: 'PublishArticlePayload', article: { __typename?: 'Article', id: string, title: string, status: ArticleStatus } } | null };

export type StopArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type StopArticleMutation = { __typename?: 'Mutation', stopArticle?: { __typename?: 'StopArticlePayload', article: { __typename?: 'Article', id: string, title: string, status: ArticleStatus } } | null };

export type DeleteArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle?: { __typename?: 'DeleteArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type CharacterTableRowFragment = { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, movesCount: number, combosCount: number };

export type CharacterTableRowsQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type CharacterTableRowsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterConnection', nodes: Array<{ __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, movesCount: number, combosCount: number }> } };

export type ComboDashboardCategoryFragment = { __typename?: 'ComboCategory', id: string, name: string, position: number, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> };

export type ComboDashboardFragment = { __typename?: 'Character', id: string, slug: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, position: number, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }>, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string }> }> };

export type CreateComboCategoryMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: ComboCategoryAttributes;
}>;


export type CreateComboCategoryMutation = { __typename?: 'Mutation', createComboCategory?: { __typename?: 'CreateComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, position: number, character: { __typename?: 'Character', id: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, position: number }> }, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> } } | null };

export type UpdateComboCategoryMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboCategoryAttributes;
}>;


export type UpdateComboCategoryMutation = { __typename?: 'Mutation', updateComboCategory?: { __typename?: 'UpdateComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, position: number, character: { __typename?: 'Character', id: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, position: number }> }, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> } } | null };

export type DeleteComboCategoryMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type DeleteComboCategoryMutation = { __typename?: 'Mutation', deleteComboCategory?: { __typename?: 'DeleteComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, position: number, character: { __typename?: 'Character', id: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, position: number }> }, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> } } | null };

export type ComboTableRowFragment = { __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type CreateComboMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type CreateComboMutation = { __typename?: 'Mutation', createCombo?: { __typename?: 'CreateComboPayload', combo: { __typename?: 'Combo', id: string, command: Array<string>, position: number, comboCategory: { __typename?: 'ComboCategory', id: string, combos: Array<{ __typename?: 'Combo', id: string, position: number }> }, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type UpdateComboMutationVariables = Exact<{
  comboId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type UpdateComboMutation = { __typename?: 'Mutation', updateCombo?: { __typename?: 'UpdateComboPayload', combo: { __typename?: 'Combo', id: string, command: Array<string>, position: number, comboCategory: { __typename?: 'ComboCategory', id: string, combos: Array<{ __typename?: 'Combo', id: string, position: number }> }, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type DeleteComboMutationVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type DeleteComboMutation = { __typename?: 'Mutation', deleteCombo?: { __typename?: 'DeleteComboPayload', combo: { __typename?: 'Combo', id: string, comboCategory: { __typename?: 'ComboCategory', id: string, combos: Array<{ __typename?: 'Combo', id: string }> } } } | null };

export type CreateComboVideoMutationVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type CreateComboVideoMutation = { __typename?: 'Mutation', createComboVideo?: { __typename?: 'CreateComboVideoPayload', combo: { __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } } | null };

export type MoveSelectOptionFragment = { __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string }> };

export type MoveDashboardCategoryFragment = { __typename?: 'MoveCategory', id: string, name: string, position: number, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> };

export type MoveDashboardFragment = { __typename?: 'Character', id: string, slug: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, position: number, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }> };

export type CreateMoveCategoryMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: MoveCategoryAttributes;
}>;


export type CreateMoveCategoryMutation = { __typename?: 'Mutation', createMoveCategory?: { __typename?: 'CreateMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, position: number, character: { __typename?: 'Character', id: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, position: number }> }, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> } } | null };

export type UpdateMoveCategoryMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: MoveCategoryAttributes;
}>;


export type UpdateMoveCategoryMutation = { __typename?: 'Mutation', updateMoveCategory?: { __typename?: 'UpdateMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, position: number, character: { __typename?: 'Character', id: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, position: number }> }, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> } } | null };

export type DeleteMoveCategoryMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type DeleteMoveCategoryMutation = { __typename?: 'Mutation', deleteMoveCategory?: { __typename?: 'DeleteMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, position: number, character: { __typename?: 'Character', id: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, position: number }> }, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> } } | null };

export type MoveTableRowFragment = { __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type CreateAttackMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: AttackMoveAttributes;
}>;


export type CreateAttackMoveMutation = { __typename?: 'Mutation', createAttackMove?: { __typename?: 'CreateAttackMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, moves: Array<{ __typename?: 'Move', id: string, position: number }> }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type CreateThrowMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: ThrowMoveAttributes;
}>;


export type CreateThrowMoveMutation = { __typename?: 'Mutation', createThrowMove?: { __typename?: 'CreateThrowMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, moves: Array<{ __typename?: 'Move', id: string, position: number }> }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type CreateReversalMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: ReversalMoveAttributes;
}>;


export type CreateReversalMoveMutation = { __typename?: 'Mutation', createReversalMove?: { __typename?: 'CreateReversalMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, moves: Array<{ __typename?: 'Move', id: string, position: number }> }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type UpdateAttackMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: AttackMoveAttributes;
}>;


export type UpdateAttackMoveMutation = { __typename?: 'Mutation', updateAttackMove?: { __typename?: 'UpdateAttackMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, moves: Array<{ __typename?: 'Move', id: string, position: number }> }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type UpdateThrowMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: ThrowMoveAttributes;
}>;


export type UpdateThrowMoveMutation = { __typename?: 'Mutation', updateThrowMove?: { __typename?: 'UpdateThrowMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, moves: Array<{ __typename?: 'Move', id: string, position: number }> }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type UpdateReversalMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: ReversalMoveAttributes;
}>;


export type UpdateReversalMoveMutation = { __typename?: 'Mutation', updateReversalMove?: { __typename?: 'UpdateReversalMovePayload', move: { __typename?: 'Move', id: string, moveCategory: { __typename?: 'MoveCategory', id: string, moves: Array<{ __typename?: 'Move', id: string, position: number }> } } } | null };

export type DeleteMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type DeleteMoveMutation = { __typename?: 'Mutation', deleteMove?: { __typename?: 'DeleteMovePayload', move: { __typename?: 'Move', id: string, moveCategory: { __typename?: 'MoveCategory', id: string, moves: Array<{ __typename?: 'Move', id: string }> } } } | null };

export type CreateMoveVideoMutationVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type CreateMoveVideoMutation = { __typename?: 'Mutation', createMoveVideo?: { __typename?: 'CreateMoveVideoPayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } } | null };

export type PlayerTableRowFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null };

export type PlayerTableRowsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type PlayerTableRowsQuery = { __typename?: 'Query', players: { __typename?: 'PlayerConnection', edges: Array<{ __typename?: 'PlayerEdge', cursor: string, node: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type DeletePlayerMutationVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer?: { __typename?: 'DeletePlayerPayload', player: { __typename?: 'Player', id: string } } | null };

export type CreatePlayerFromSmashggMutationVariables = Exact<{
  smashggId: Scalars['String'];
}>;


export type CreatePlayerFromSmashggMutation = { __typename?: 'Mutation', createPlayerFromSmashgg?: { __typename?: 'CreatePlayerFromSmashggPayload', player: { __typename?: 'Player', id: string } } | null };

export type TournamentTableRowFragment = { __typename?: 'Tournament', id: string, name: string, startsAt: string, videosCount: number, standingsCount: number, mainImageUrl?: string | null };

export type TournamentTableRowsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type TournamentTableRowsQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentConnection', edges: Array<{ __typename?: 'TournamentEdge', cursor: string, node: { __typename?: 'Tournament', id: string, name: string, startsAt: string, videosCount: number, standingsCount: number, mainImageUrl?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type DeleteTournamentMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DeleteTournamentMutation = { __typename?: 'Mutation', deleteTournament?: { __typename?: 'DeleteTournamentPayload', tournament: { __typename?: 'Tournament', id: string } } | null };

export type ArticleFormArticleFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, category: ArticleCategory, content: string };

export type CharacterFormFragment = { __typename?: 'Character', id: string, name: string, nameKana: string, longName: string, longNameKana: string, slug: string, country: string, fightingStyle: string, story: string, description: string, dlc: boolean };

export type ComboCategoryFormFragment = { __typename?: 'ComboCategory', id: string, name: string, position: number };

export type ComboCategoryPositionSelectFragment = { __typename?: 'ComboCategory', id: string, name: string, position: number };

export type ComboCategoryFormQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type ComboCategoryFormQuery = { __typename?: 'Query', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, position: number } };

export type ComboFormFragment = { __typename?: 'Combo', id: string, command: Array<string>, damage?: number | null, note?: string | null, position: number, move?: { __typename?: 'Move', id: string } | null };

export type ComboPositionSelectFragment = { __typename?: 'Combo', id: string, command: Array<string>, position: number };

export type ComboFormQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type ComboFormQuery = { __typename?: 'Query', combo: { __typename?: 'Combo', id: string, command: Array<string>, damage?: number | null, note?: string | null, position: number, move?: { __typename?: 'Move', id: string } | null } };

export type MoveCategoryFormFragment = { __typename?: 'MoveCategory', id: string, name: string, position: number };

export type MoveCategoryPositionSelectFragment = { __typename?: 'MoveCategory', id: string, name: string, position: number };

export type MoveCategoryFormQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type MoveCategoryFormQuery = { __typename?: 'Query', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, position: number } };

export type MoveFormAttackFragment = { __typename?: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, reach?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean };

export type MoveFormThrowFragment = { __typename?: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null };

export type MoveFormReversalFragment = { __typename?: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null };

export type MoveFormFragment = { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, statusAfter?: string | null, note?: string | null, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, name: string }, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, reach?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type MoveFormQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type MoveFormQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, statusAfter?: string | null, note?: string | null, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, name: string }, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, reach?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } };

export type MovePositionSelectFragment = { __typename?: 'Move', id: string, name: string, position: number };

export type OrganizerFormFragment = { __typename?: 'Organizer', id: string, name: string, slug: string, tonamelId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null };

export type PlayerFormFragment = { __typename?: 'Player', name: string, slug: string, tonamelId?: string | null, smashggId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string } | null };

export type CreateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserPayload', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } } | null };

export type TournamentFormFragment = { __typename?: 'Tournament', id: string, organizerId: string, name: string, url: string, streamingUrl?: string | null, startsAt: string, description: string };

export type TournamentFormQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentFormQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerConnection', nodes: Array<{ __typename?: 'Organizer', id: string, slug: string, name: string }> } };

export type CharacterBreadcrumbsFragment = { __typename?: 'Character', id: string, slug: string, name: string };

export type OrganizerBreadcrumbsFragment = { __typename?: 'Organizer', id: string, slug: string, name: string };

export type PlayerBreadcrumbsFragment = { __typename?: 'Player', id: string, slug: string, name: string };

export type TournamentBreadcrumbsFragment = { __typename?: 'Tournament', id: string, name: string };

export type TournamentVideoBreadcrumbsFragment = { __typename?: 'TournamentVideo', id: string, label?: string | null, tournament: { __typename?: 'Tournament', id: string, name: string } };

export type CreateArticleLinkMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateArticleLinkMutation = { __typename?: 'Mutation', createArticleLink?: { __typename?: 'CreateArticleLinkPayload', articleLink: { __typename?: 'ArticleLink', url: string, title: string, description?: string | null, imageUrl?: string | null } } | null };

export type CreateArticleImageMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type CreateArticleImageMutation = { __typename?: 'Mutation', createArticleImage?: { __typename?: 'CreateArticleImagePayload', url?: string | null } | null };

export type CreateArticleVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateArticleVideoMutation = { __typename?: 'Mutation', createArticleVideo?: { __typename?: 'CreateArticleVideoPayload', articleVideo: { __typename?: 'ArticleVideo', id: string, m3u8Url: string, thumbnailUrl: string }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } } | null };

export type ArticleElementComboQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type ArticleElementComboQuery = { __typename?: 'Query', combo: { __typename?: 'Combo', id: string, damage?: number | null, command: Array<string>, note?: string | null, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } };

export type ArticleElementMoveQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type ArticleElementMoveQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, statusAfter?: string | null, note?: string | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, hitFrame?: number | null, hitResult: AttackMoveResultEnum, counterFrame?: number | null, counterResult: AttackMoveResultEnum, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } };

export type CharacterSelectOptionFragment = { __typename?: 'Character', id: string, slug: string, name: string };

export type CharacterSelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterSelectOptionsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterConnection', nodes: Array<{ __typename?: 'Character', id: string, slug: string, name: string }> } };

export type ComboSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type ComboSelectOptionsQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string> }> }> } };

export type CountrySelectOptionFragment = { __typename?: 'Country', id: string, name: string, flagEmoji: string };

export type CountrySelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountrySelectOptionsQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string, name: string, flagEmoji: string }> };

export type CurrentUserFragment = { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } };

export type MoveSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type MoveSelectOptionsQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string> }> }> } };

export type OrganizerSelectOptionFragment = { __typename?: 'Organizer', id: string, slug: string, name: string };

export type PaginationFragment = { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null };

export type PlayerSelectOptionFragment = { __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: string | null, smashggId?: string | null };

export type SsgArticlePathsQueryVariables = Exact<{ [key: string]: never; }>;


export type SsgArticlePathsQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', nodes: Array<{ __typename?: 'Article', id: string }> } };

export type SsgCharacterPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type SsgCharacterPathsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterConnection', nodes: Array<{ __typename?: 'Character', id: string, slug: string }> } };

export type SsgPlayerPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type SsgPlayerPathsQuery = { __typename?: 'Query', players: { __typename?: 'PlayerConnection', nodes: Array<{ __typename?: 'Player', id: string, slug: string }> } };

export type SsgTournamentPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type SsgTournamentPathsQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentConnection', nodes: Array<{ __typename?: 'Tournament', id: string }> } };

export type SsgTournamentVideoPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type SsgTournamentVideoPathsQuery = { __typename?: 'Query', tournamentVideos: { __typename?: 'TournamentVideoConnection', nodes: Array<{ __typename?: 'TournamentVideo', id: string }> } };

export type ArticlesPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesPageQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleConnection', nodes: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, author: { __typename?: 'User', id: string, name: string, avatarUrl: string } }> } };

export type ArticlePageFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', id: string, name: string, avatarUrl: string }, relatedArticles: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, author: { __typename?: 'User', id: string, name: string, avatarUrl: string } }> };

export type ArticlePageQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type ArticlePageQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', id: string, name: string, avatarUrl: string }, relatedArticles: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, author: { __typename?: 'User', id: string, name: string, avatarUrl: string } }> } };

export type CharactersPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersPageQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterConnection', nodes: Array<{ __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number }> } };

export type CharacterPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type CharacterPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', story: string, description: string, id: string, slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number }, battleCounts: { __typename?: 'BattleCountConnection', nodes: Array<{ __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } }> } };

export type CharacterBattlesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type CharacterBattlesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number } };

export type CharacterCombosPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type CharacterCombosPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, damage?: number | null, command: Array<string>, note?: string | null, move?: { __typename?: 'Move', id: string } | null, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }>, comboStarters: Array<{ __typename?: 'Move', id: string, name: string, combosCount: number }> } };

export type CharacterMovesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type CharacterMovesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, note?: string | null, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, blockFrame?: number | null, blockResult: AttackMoveResultEnum, hitFrame?: number | null, hitResult: AttackMoveResultEnum, counterFrame?: number | null, counterResult: AttackMoveResultEnum, heights: Array<AttackTypeEnum>, damages: Array<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, kind: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, throwResult: ThrowMoveResultEnum, throwEscape: ThrowEscapeEnum, startUpFrame?: number | null, damage?: number | null } }> }> } };

export type DashboardArticlePageQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DashboardArticlePageQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, category: ArticleCategory, content: string } };

export type MyArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type MyArticleQuery = { __typename?: 'Query', myArticle: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', id: string, name: string, avatarUrl: string } } };

export type UpdateArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
  attributes: ArticleAttributes;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle?: { __typename?: 'UpdateArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type CreateArticleMutationVariables = Exact<{
  attributes: ArticleAttributes;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: { __typename?: 'CreateArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type DashboardCharacterCombosPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardCharacterCombosPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, slug: string, name: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, position: number, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }>, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string }> }> } };

export type PageAdminCharacterEditQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageAdminCharacterEditQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, name: string, nameKana: string, longName: string, longNameKana: string, slug: string, country: string, fightingStyle: string, story: string, description: string, dlc: boolean } };

export type UpdateCharacterMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: CharacterAttributes;
}>;


export type UpdateCharacterMutation = { __typename?: 'Mutation', updateCharacter?: { __typename?: 'UpdateCharacterPayload', character: { __typename?: 'Character', id: string } } | null };

export type DashboardCharacterMovesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardCharacterMovesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, slug: string, name: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, position: number, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, position: number, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }> } };

export type CreateCharacterMutationVariables = Exact<{
  attributes: CharacterAttributes;
}>;


export type CreateCharacterMutation = { __typename?: 'Mutation', createCharacter?: { __typename?: 'CreateCharacterPayload', character: { __typename?: 'Character', id: string } } | null };

export type AdminOrganizerEditPageQueryVariables = Exact<{
  organizerSlug: Scalars['String'];
}>;


export type AdminOrganizerEditPageQuery = { __typename?: 'Query', organizer: { __typename?: 'Organizer', id: string, name: string, slug: string, tonamelId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null } };

export type AdminOrganizerEditPageUpdateOrganizerMutationVariables = Exact<{
  organizerSlug: Scalars['String'];
  attributes: OrganizerAttributes;
}>;


export type AdminOrganizerEditPageUpdateOrganizerMutation = { __typename?: 'Mutation', updateOrganizer?: { __typename?: 'UpdateOrganizerPayload', organizer: { __typename?: 'Organizer', id: string, name: string, slug: string, tonamelId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null } } | null };

export type AdminOrganizersPageOrganizerFragment = { __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: string | null };

export type AdminOrganizersPageDeleteMutationVariables = Exact<{
  organizerSlug: Scalars['String'];
}>;


export type AdminOrganizersPageDeleteMutation = { __typename?: 'Mutation', deleteOrganizer?: { __typename?: 'DeleteOrganizerPayload', organizer: { __typename?: 'Organizer', id: string } } | null };

export type AdminOrganizersPageOrganizersQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type AdminOrganizersPageOrganizersQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerConnection', edges: Array<{ __typename?: 'OrganizerEdge', cursor: string, node: { __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type AdminOrganizersNewPageCreateOrganizerMutationVariables = Exact<{
  attributes: OrganizerAttributes;
}>;


export type AdminOrganizersNewPageCreateOrganizerMutation = { __typename?: 'Mutation', createOrganizer?: { __typename?: 'CreateOrganizerPayload', organizer: { __typename?: 'Organizer', id: string } } | null };

export type AdminPlayerEditPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type AdminPlayerEditPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', name: string, slug: string, tonamelId?: string | null, smashggId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null, id: string, country?: { __typename?: 'Country', id: string } | null } };

export type AdminPlayerEditPageUpdatePlayerMutationVariables = Exact<{
  playerSlug: Scalars['String'];
  attributes: PlayerAttributes;
}>;


export type AdminPlayerEditPageUpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer?: { __typename?: 'UpdatePlayerPayload', player: { __typename?: 'Player', name: string, slug: string, tonamelId?: string | null, smashggId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null, id: string, country?: { __typename?: 'Country', id: string } | null } } | null };

export type AdminPlayersNewPageCreatePlayerMutationVariables = Exact<{
  attributes: PlayerAttributes;
}>;


export type AdminPlayersNewPageCreatePlayerMutation = { __typename?: 'Mutation', createPlayer?: { __typename?: 'CreatePlayerPayload', player: { __typename?: 'Player', id: string } } | null };

export type UpdateCurrentUserMutationVariables = Exact<{
  attributes: CurrentUserAttributes;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser?: { __typename?: 'UpdateCurrentUserPayload', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } } | null };

export type CreateBattleMutationVariables = Exact<{
  attributes: BattleAttributes;
}>;


export type CreateBattleMutation = { __typename?: 'Mutation', createBattle?: { __typename?: 'CreateBattlePayload', battle: { __typename?: 'Battle', id: string } } | null };

export type UpdateBattleMutationVariables = Exact<{
  battleId: Scalars['ID'];
  attributes: BattleAttributes;
}>;


export type UpdateBattleMutation = { __typename?: 'Mutation', updateBattle?: { __typename?: 'UpdateBattlePayload', battle: { __typename?: 'Battle', id: string, round: BattleRound, startSec: number, sides: Array<{ __typename?: 'BattleSide', id: string, rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> } } | null };

export type DeleteBattleMutationVariables = Exact<{
  battleId: Scalars['ID'];
}>;


export type DeleteBattleMutation = { __typename?: 'Mutation', deleteBattle?: { __typename?: 'DeleteBattlePayload', battle: { __typename?: 'Battle', id: string } } | null };

export type AdminBattlesPageQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type AdminBattlesPageQuery = { __typename?: 'Query', tournamentVideo: { __typename?: 'TournamentVideo', id: string, title: string, youtubeVideoId: string, tournament: { __typename?: 'Tournament', id: string, name: string } }, players: { __typename?: 'PlayerConnection', nodes: Array<{ __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: string | null, smashggId?: string | null }> }, characters: { __typename?: 'CharacterConnection', nodes: Array<{ __typename?: 'Character', id: string, slug: string, name: string }> } };

export type AdminBattlesPageSideFragment = { __typename?: 'BattleSide', id: string, rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } };

export type AdminBattlesPageBattleReslutFragment = { __typename?: 'Battle', id: string, round: BattleRound, startSec: number, sides: Array<{ __typename?: 'BattleSide', id: string, rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> };

export type AdminBattlesPageBattlesQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type AdminBattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleConnection', nodes: Array<{ __typename?: 'Battle', id: string, round: BattleRound, startSec: number, sides: Array<{ __typename?: 'BattleSide', id: string, rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> }> } };

export type AdminTournamentVideoEditPageQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type AdminTournamentVideoEditPageQuery = { __typename?: 'Query', tournamentVideo: { __typename?: 'TournamentVideo', id: string, title: string, label?: string | null, publishedAt?: string | null, tournament: { __typename?: 'Tournament', id: string, name: string } } };

export type TournamentVideoFormFragment = { __typename?: 'TournamentVideo', id: string, title: string, label?: string | null, publishedAt?: string | null };

export type AdminTournamentVideoEditPageUpdateMutationVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
  attributes: TournamentVideoAttributes;
}>;


export type AdminTournamentVideoEditPageUpdateMutation = { __typename?: 'Mutation', updateTournamentVideo?: { __typename?: 'UpdateTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string, title: string, label?: string | null, publishedAt?: string | null } } | null };

export type AdminTournamentEditPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type AdminTournamentEditPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, organizerId: string, name: string, url: string, streamingUrl?: string | null, startsAt: string, description: string } };

export type AdminTournamentEditPageUpdateTournamentMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  attributes: TournamentAttributes;
}>;


export type AdminTournamentEditPageUpdateTournamentMutation = { __typename?: 'Mutation', updateTournament?: { __typename?: 'UpdateTournamentPayload', tournament: { __typename?: 'Tournament', id: string, organizerId: string, name: string, url: string, streamingUrl?: string | null, startsAt: string, description: string } } | null };

export type AdminTournamentPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type AdminTournamentPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, name: string, description: string, mainImageUrl?: string | null, startsAt: string, standingsCount: number, videosCount: number, videos: Array<{ __typename?: 'TournamentVideo', id: string, title: string, youtubeVideoId: string }> }, players: { __typename?: 'PlayerConnection', nodes: Array<{ __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: string | null, smashggId?: string | null }> } };

export type AdminTournamentPageStandingsQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type AdminTournamentPageStandingsQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string, avatarUrl?: string | null } }> } };

export type AdminTournamentPageVideosQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type AdminTournamentPageVideosQuery = { __typename?: 'Query', tournamentVideos: { __typename?: 'TournamentVideoConnection', nodes: Array<{ __typename?: 'TournamentVideo', id: string, title: string, thumbnailUrl: string, battlesCount: number, channel: { __typename?: 'Channel', id: string, name: string } }> } };

export type AdminTournamentPageCreateStandingMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  attributes: StandingAttributes;
}>;


export type AdminTournamentPageCreateStandingMutation = { __typename?: 'Mutation', createStanding?: { __typename?: 'CreateStandingPayload', standing: { __typename?: 'Standing', id: string } } | null };

export type AdminTournamentPageDeleteStandingMutationVariables = Exact<{
  standingId: Scalars['ID'];
}>;


export type AdminTournamentPageDeleteStandingMutation = { __typename?: 'Mutation', deleteStanding?: { __typename?: 'DeleteStandingPayload', standing: { __typename?: 'Standing', id: string } } | null };

export type AdminTournamentPageCreateVideoMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  url: Scalars['String'];
}>;


export type AdminTournamentPageCreateVideoMutation = { __typename?: 'Mutation', createTournamentVideo?: { __typename?: 'CreateTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string } } | null };

export type AdminTournamentPageDeleteVideoMutationVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type AdminTournamentPageDeleteVideoMutation = { __typename?: 'Mutation', deleteTournamentVideo?: { __typename?: 'DeleteTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string } } | null };

export type CreateTournamentMutationVariables = Exact<{
  attributes: TournamentAttributes;
}>;


export type CreateTournamentMutation = { __typename?: 'Mutation', createTournament?: { __typename?: 'CreateTournamentPayload', tournament: { __typename?: 'Tournament', id: string } } | null };

export type TopPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TopPageQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentConnection', nodes: Array<{ __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> }> }, players: { __typename?: 'PlayerConnection', nodes: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, standingsCount: number, battlesCount: number }> }, characters: { __typename?: 'CharacterConnection', nodes: Array<{ __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number }> }, articles: { __typename?: 'ArticleConnection', nodes: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, status: ArticleStatus, author: { __typename?: 'User', id: string, name: string, avatarUrl: string } }> } };

export type PlayersPageQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersPageQuery = { __typename?: 'Query', players: { __typename?: 'PlayerConnection', nodes: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, standingsCount: number, battlesCount: number }> } };

export type PlayerPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type PlayerPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', description?: string | null, id: string, slug: string, name: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null, battlesCount: number, standingsCount: number } };

export type PlayerBattlesPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type PlayerBattlesPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null, battlesCount: number, standingsCount: number } };

export type PlayerStandingsPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type PlayerStandingsPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null, battlesCount: number, standingsCount: number, standings: { __typename?: 'StandingConnection', nodes: Array<{ __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string } }> } } };

export type TournamentsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentsPageQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentConnection', nodes: Array<{ __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> }> } };

export type TournamentPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type TournamentPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, url: string, streamingUrl?: string | null, description: string, startsAt: string, battlesCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } }>, videos: Array<{ __typename?: 'TournamentVideo', id: string, label?: string | null, battlesCount: number }> } };

export type TournamentBattlesPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type TournamentBattlesPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, name: string, battlesCount: number } };

export const BattleListItemFragmentDoc = gql`
    fragment BattleListItem on Battle {
  id
  round
  startSec
  tournamentVideo {
    id
    youtubeVideoId
    tournament {
      id
      name
      startsAt
    }
  }
  sides {
    id
    rounds
    player {
      id
      name
    }
    character {
      id
      faceImageUrl
    }
  }
}
    `;
export const CharacterCardFragmentDoc = gql`
    fragment CharacterCard on Character {
  id
  slug
  name
  faceImageUrl
  country
  fightingStyle
  battlesCount
}
    `;
export const CharacterProfileFragmentDoc = gql`
    fragment CharacterProfile on Character {
  slug
  longName
  faceImageUrl
  country
  fightingStyle
}
    `;
export const CharacterTabsFragmentDoc = gql`
    fragment CharacterTabs on Character {
  slug
  battlesCount
  combosCount
  movesCount
}
    `;
export const ComboListItemFragmentDoc = gql`
    fragment ComboListItem on Combo {
  id
  damage
  command
  note
  move {
    id
  }
  comboVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    `;
export const ComboMediaFragmentDoc = gql`
    fragment ComboMedia on Combo {
  id
  damage
  command
  note
  comboCategory {
    id
    name
  }
  comboVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    `;
export const AttackListItemFragmentDoc = gql`
    fragment AttackListItem on AttackMove {
  id
  startUpFrame
  duration
  blockFrame
  blockResult
  hitFrame
  hitResult
  counterFrame
  counterResult
  heights
  damages
  powerCrush
  crouchingStatus
  jumpStatus
  homing
  screw
  wallBound
}
    `;
export const ThrowListItemFragmentDoc = gql`
    fragment ThrowListItem on ThrowMove {
  id
  throwType
  throwResult
  throwEscape
  startUpFrame
  damage
}
    `;
export const ReversalListItemFragmentDoc = gql`
    fragment ReversalListItem on ReversalMove {
  id
  kind
  startUpFrame
  finishFrame
}
    `;
export const MoveListItemMoveableFragmentDoc = gql`
    fragment MoveListItemMoveable on Moveable {
  __typename
  ... on AttackMove {
    ...AttackListItem
  }
  ... on ThrowMove {
    ...ThrowListItem
  }
  ... on ReversalMove {
    ...ReversalListItem
  }
}
    ${AttackListItemFragmentDoc}
${ThrowListItemFragmentDoc}
${ReversalListItemFragmentDoc}`;
export const MoveListItemFragmentDoc = gql`
    fragment MoveListItem on Move {
  id
  name
  kana
  command
  note
  moveVideo {
    id
    m3u8Url
    thumbnailUrl
  }
  moveable {
    ...MoveListItemMoveable
  }
}
    ${MoveListItemMoveableFragmentDoc}`;
export const MoveMediaAttackFragmentDoc = gql`
    fragment MoveMediaAttack on AttackMove {
  id
  startUpFrame
  duration
  blockFrame
  blockResult
  hitFrame
  hitResult
  counterFrame
  counterResult
  heights
  damages
  powerCrush
  crouchingStatus
  jumpStatus
  homing
  screw
  wallBound
}
    `;
export const MoveMediaThrowFragmentDoc = gql`
    fragment MoveMediaThrow on ThrowMove {
  id
  throwType
  throwResult
  throwEscape
  startUpFrame
  damage
}
    `;
export const MoveMediaReversalFragmentDoc = gql`
    fragment MoveMediaReversal on ReversalMove {
  id
  kind
  startUpFrame
  finishFrame
}
    `;
export const MoveMediaFragmentDoc = gql`
    fragment MoveMedia on Move {
  id
  name
  kana
  command
  statusAfter
  note
  moveable {
    __typename
    ... on AttackMove {
      ...MoveMediaAttack
    }
    ... on ThrowMove {
      ...MoveMediaThrow
    }
    ... on ReversalMove {
      ...MoveMediaReversal
    }
  }
  moveVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    ${MoveMediaAttackFragmentDoc}
${MoveMediaThrowFragmentDoc}
${MoveMediaReversalFragmentDoc}`;
export const PlayerCardFragmentDoc = gql`
    fragment PlayerCard on Player {
  id
  slug
  name
  avatarUrl
  standingsCount
  battlesCount
}
    `;
export const PlayerProfileFragmentDoc = gql`
    fragment PlayerProfile on Player {
  id
  name
  slug
  avatarUrl
  twitterId
  streamingUrl
}
    `;
export const PlayerStandingCardFragmentDoc = gql`
    fragment PlayerStandingCard on Standing {
  id
  place
  tournament {
    id
    name
    mainImageUrl
    startsAt
  }
}
    `;
export const PlayerTabsFragmentDoc = gql`
    fragment PlayerTabs on Player {
  slug
  battlesCount
  standingsCount
}
    `;
export const PlayerBattleCountChipFragmentDoc = gql`
    fragment PlayerBattleCountChip on BattleCount {
  id
  count
  player {
    id
    slug
    name
    avatarUrl
  }
}
    `;
export const TournamentCardFragmentDoc = gql`
    fragment TournamentCard on Tournament {
  id
  name
  mainImageUrl
  startsAt
  videosCount
  standings {
    id
    place
    player {
      id
      name
    }
  }
}
    `;
export const TournamentTabsFragmentDoc = gql`
    fragment TournamentTabs on Tournament {
  id
  battlesCount
}
    `;
export const ArticleTableRowFragmentDoc = gql`
    fragment ArticleTableRow on Article {
  id
  title
  status
}
    `;
export const CharacterTableRowFragmentDoc = gql`
    fragment CharacterTableRow on Character {
  id
  slug
  name
  faceImageUrl
  movesCount
  combosCount
}
    `;
export const ComboCategoryFormFragmentDoc = gql`
    fragment ComboCategoryForm on ComboCategory {
  id
  name
  position
}
    `;
export const ComboCategoryPositionSelectFragmentDoc = gql`
    fragment ComboCategoryPositionSelect on ComboCategory {
  id
  name
  position
}
    `;
export const ComboPositionSelectFragmentDoc = gql`
    fragment ComboPositionSelect on Combo {
  id
  command
  position
}
    `;
export const ComboTableRowFragmentDoc = gql`
    fragment ComboTableRow on Combo {
  id
  command
  comboVideo {
    id
    m3u8Url
    thumbnailUrl
  }
  ...ComboPositionSelect
}
    ${ComboPositionSelectFragmentDoc}`;
export const ComboDashboardCategoryFragmentDoc = gql`
    fragment ComboDashboardCategory on ComboCategory {
  id
  name
  ...ComboCategoryForm
  ...ComboCategoryPositionSelect
  combos {
    ...ComboTableRow
  }
}
    ${ComboCategoryFormFragmentDoc}
${ComboCategoryPositionSelectFragmentDoc}
${ComboTableRowFragmentDoc}`;
export const MoveSelectOptionFragmentDoc = gql`
    fragment MoveSelectOption on MoveCategory {
  id
  name
  moves {
    id
    name
  }
}
    `;
export const ComboDashboardFragmentDoc = gql`
    fragment ComboDashboard on Character {
  id
  slug
  comboCategories {
    ...ComboDashboardCategory
  }
  moveCategories {
    ...MoveSelectOption
  }
}
    ${ComboDashboardCategoryFragmentDoc}
${MoveSelectOptionFragmentDoc}`;
export const MoveCategoryFormFragmentDoc = gql`
    fragment MoveCategoryForm on MoveCategory {
  id
  name
  position
}
    `;
export const MoveCategoryPositionSelectFragmentDoc = gql`
    fragment MoveCategoryPositionSelect on MoveCategory {
  id
  name
  position
}
    `;
export const MovePositionSelectFragmentDoc = gql`
    fragment MovePositionSelect on Move {
  id
  name
  position
}
    `;
export const MoveTableRowFragmentDoc = gql`
    fragment MoveTableRow on Move {
  id
  name
  command
  ...MovePositionSelect
  moveVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    ${MovePositionSelectFragmentDoc}`;
export const MoveDashboardCategoryFragmentDoc = gql`
    fragment MoveDashboardCategory on MoveCategory {
  id
  name
  ...MoveCategoryForm
  ...MoveCategoryPositionSelect
  moves {
    ...MoveTableRow
  }
}
    ${MoveCategoryFormFragmentDoc}
${MoveCategoryPositionSelectFragmentDoc}
${MoveTableRowFragmentDoc}`;
export const MoveDashboardFragmentDoc = gql`
    fragment MoveDashboard on Character {
  id
  slug
  moveCategories {
    ...MoveDashboardCategory
  }
}
    ${MoveDashboardCategoryFragmentDoc}`;
export const PlayerTableRowFragmentDoc = gql`
    fragment PlayerTableRow on Player {
  id
  slug
  name
  avatarUrl
}
    `;
export const TournamentTableRowFragmentDoc = gql`
    fragment TournamentTableRow on Tournament {
  id
  name
  startsAt
  videosCount
  standingsCount
  mainImageUrl
}
    `;
export const ArticleFormArticleFragmentDoc = gql`
    fragment ArticleFormArticle on Article {
  id
  title
  description
  mainImageUrl
  category
  content
}
    `;
export const CharacterFormFragmentDoc = gql`
    fragment CharacterForm on Character {
  id
  name
  nameKana
  longName
  longNameKana
  slug
  country
  fightingStyle
  story
  description
  dlc
}
    `;
export const ComboFormFragmentDoc = gql`
    fragment ComboForm on Combo {
  id
  command
  damage
  note
  position
  move {
    id
  }
}
    `;
export const MoveFormAttackFragmentDoc = gql`
    fragment MoveFormAttack on AttackMove {
  id
  startUpFrame
  duration
  reach
  blockFrame
  blockResult
  blockStatus
  hitFrame
  hitResult
  hitStatus
  counterFrame
  counterResult
  counterStatus
  heights
  damages
  powerCrush
  crouchingStatus
  jumpStatus
  homing
  screw
  wallBound
}
    `;
export const MoveFormThrowFragmentDoc = gql`
    fragment MoveFormThrow on ThrowMove {
  id
  throwType
  throwResult
  throwEscape
  startUpFrame
  damage
}
    `;
export const MoveFormReversalFragmentDoc = gql`
    fragment MoveFormReversal on ReversalMove {
  id
  kind
  startUpFrame
  finishFrame
}
    `;
export const MoveFormFragmentDoc = gql`
    fragment MoveForm on Move {
  id
  name
  kana
  command
  statusAfter
  note
  position
  moveCategory {
    id
    name
  }
  moveable {
    __typename
    ... on AttackMove {
      ...MoveFormAttack
    }
    ... on ThrowMove {
      ...MoveFormThrow
    }
    ... on ReversalMove {
      ...MoveFormReversal
    }
  }
  moveVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    ${MoveFormAttackFragmentDoc}
${MoveFormThrowFragmentDoc}
${MoveFormReversalFragmentDoc}`;
export const OrganizerFormFragmentDoc = gql`
    fragment OrganizerForm on Organizer {
  id
  name
  slug
  tonamelId
  twitterId
  streamingUrl
  description
}
    `;
export const PlayerFormFragmentDoc = gql`
    fragment PlayerForm on Player {
  name
  slug
  tonamelId
  smashggId
  twitterId
  streamingUrl
  description
  country {
    id
  }
}
    `;
export const TournamentFormFragmentDoc = gql`
    fragment TournamentForm on Tournament {
  id
  organizerId
  name
  url
  streamingUrl
  startsAt
  description
}
    `;
export const CharacterBreadcrumbsFragmentDoc = gql`
    fragment CharacterBreadcrumbs on Character {
  id
  slug
  name
}
    `;
export const OrganizerBreadcrumbsFragmentDoc = gql`
    fragment OrganizerBreadcrumbs on Organizer {
  id
  slug
  name
}
    `;
export const PlayerBreadcrumbsFragmentDoc = gql`
    fragment PlayerBreadcrumbs on Player {
  id
  slug
  name
}
    `;
export const TournamentBreadcrumbsFragmentDoc = gql`
    fragment TournamentBreadcrumbs on Tournament {
  id
  name
}
    `;
export const TournamentVideoBreadcrumbsFragmentDoc = gql`
    fragment TournamentVideoBreadcrumbs on TournamentVideo {
  id
  label
  tournament {
    ...TournamentBreadcrumbs
  }
}
    ${TournamentBreadcrumbsFragmentDoc}`;
export const CharacterSelectOptionFragmentDoc = gql`
    fragment CharacterSelectOption on Character {
  id
  slug
  name
}
    `;
export const CountrySelectOptionFragmentDoc = gql`
    fragment CountrySelectOption on Country {
  id
  name
  flagEmoji
}
    `;
export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on CurrentUser {
  id
  name
  role
  avatarUrl
}
    `;
export const OrganizerSelectOptionFragmentDoc = gql`
    fragment OrganizerSelectOption on Organizer {
  id
  slug
  name
}
    `;
export const PaginationFragmentDoc = gql`
    fragment Pagination on PageInfo {
  hasNextPage
  endCursor
}
    `;
export const PlayerSelectOptionFragmentDoc = gql`
    fragment PlayerSelectOption on Player {
  id
  slug
  name
  tonamelId
  smashggId
}
    `;
export const ArticleCardFragmentDoc = gql`
    fragment ArticleCard on Article {
  id
  title
  description
  mainImageUrl
  publishedAt
  status
  author {
    id
    name
    avatarUrl
  }
}
    `;
export const ArticlePageFragmentDoc = gql`
    fragment ArticlePage on Article {
  id
  title
  description
  mainImageUrl
  publishedAt
  status
  category
  content
  author {
    id
    name
    avatarUrl
  }
  relatedArticles {
    ...ArticleCard
  }
}
    ${ArticleCardFragmentDoc}`;
export const AdminOrganizersPageOrganizerFragmentDoc = gql`
    fragment AdminOrganizersPageOrganizer on Organizer {
  id
  slug
  name
  avatarUrl
}
    `;
export const AdminBattlesPageSideFragmentDoc = gql`
    fragment AdminBattlesPageSide on BattleSide {
  id
  rounds
  player {
    id
    name
  }
  character {
    id
    faceImageUrl
  }
}
    `;
export const AdminBattlesPageBattleReslutFragmentDoc = gql`
    fragment AdminBattlesPageBattleReslut on Battle {
  id
  round
  startSec
  sides {
    ...AdminBattlesPageSide
  }
}
    ${AdminBattlesPageSideFragmentDoc}`;
export const TournamentVideoFormFragmentDoc = gql`
    fragment TournamentVideoForm on TournamentVideo {
  id
  title
  label
  publishedAt
}
    `;
export const ArticleCardsDocument = gql`
    query ArticleCards($after: String) {
  articles(first: 12, after: $after) {
    edges {
      node {
        ...ArticleCard
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${ArticleCardFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __useArticleCardsQuery__
 *
 * To run a query within a React component, call `useArticleCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleCardsQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useArticleCardsQuery(baseOptions?: Apollo.QueryHookOptions<ArticleCardsQuery, ArticleCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleCardsQuery, ArticleCardsQueryVariables>(ArticleCardsDocument, options);
      }
export function useArticleCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleCardsQuery, ArticleCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleCardsQuery, ArticleCardsQueryVariables>(ArticleCardsDocument, options);
        }
export type ArticleCardsQueryHookResult = ReturnType<typeof useArticleCardsQuery>;
export type ArticleCardsLazyQueryHookResult = ReturnType<typeof useArticleCardsLazyQuery>;
export type ArticleCardsQueryResult = Apollo.QueryResult<ArticleCardsQuery, ArticleCardsQueryVariables>;
export const BattleListDocument = gql`
    query BattleList($tournamentId: ID, $playerSlug: String, $characterSlug: String, $after: String) {
  battles(
    tournamentId: $tournamentId
    playerSlug: $playerSlug
    characterSlug: $characterSlug
    after: $after
    first: 10
  ) {
    edges {
      node {
        ...BattleListItem
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${BattleListItemFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __useBattleListQuery__
 *
 * To run a query within a React component, call `useBattleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useBattleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattleListQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      playerSlug: // value for 'playerSlug'
 *      characterSlug: // value for 'characterSlug'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useBattleListQuery(baseOptions?: Apollo.QueryHookOptions<BattleListQuery, BattleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BattleListQuery, BattleListQueryVariables>(BattleListDocument, options);
      }
export function useBattleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BattleListQuery, BattleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BattleListQuery, BattleListQueryVariables>(BattleListDocument, options);
        }
export type BattleListQueryHookResult = ReturnType<typeof useBattleListQuery>;
export type BattleListLazyQueryHookResult = ReturnType<typeof useBattleListLazyQuery>;
export type BattleListQueryResult = Apollo.QueryResult<BattleListQuery, BattleListQueryVariables>;
export const PlayerCardsDocument = gql`
    query PlayerCards($after: String, $keyword: String) {
  players(first: 20, after: $after, keyword: $keyword) {
    edges {
      node {
        ...PlayerCard
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${PlayerCardFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __usePlayerCardsQuery__
 *
 * To run a query within a React component, call `usePlayerCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerCardsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function usePlayerCardsQuery(baseOptions?: Apollo.QueryHookOptions<PlayerCardsQuery, PlayerCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerCardsQuery, PlayerCardsQueryVariables>(PlayerCardsDocument, options);
      }
export function usePlayerCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerCardsQuery, PlayerCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerCardsQuery, PlayerCardsQueryVariables>(PlayerCardsDocument, options);
        }
export type PlayerCardsQueryHookResult = ReturnType<typeof usePlayerCardsQuery>;
export type PlayerCardsLazyQueryHookResult = ReturnType<typeof usePlayerCardsLazyQuery>;
export type PlayerCardsQueryResult = Apollo.QueryResult<PlayerCardsQuery, PlayerCardsQueryVariables>;
export const PlayerStandingCardsDocument = gql`
    query PlayerStandingCards($playerSlug: String!, $after: String) {
  player(playerSlug: $playerSlug) {
    id
    standings(first: 10, after: $after) {
      edges {
        node {
          ...PlayerStandingCard
        }
        cursor
      }
      pageInfo {
        ...Pagination
      }
    }
  }
}
    ${PlayerStandingCardFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __usePlayerStandingCardsQuery__
 *
 * To run a query within a React component, call `usePlayerStandingCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerStandingCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerStandingCardsQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *      after: // value for 'after'
 *   },
 * });
 */
export function usePlayerStandingCardsQuery(baseOptions: Apollo.QueryHookOptions<PlayerStandingCardsQuery, PlayerStandingCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerStandingCardsQuery, PlayerStandingCardsQueryVariables>(PlayerStandingCardsDocument, options);
      }
export function usePlayerStandingCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerStandingCardsQuery, PlayerStandingCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerStandingCardsQuery, PlayerStandingCardsQueryVariables>(PlayerStandingCardsDocument, options);
        }
export type PlayerStandingCardsQueryHookResult = ReturnType<typeof usePlayerStandingCardsQuery>;
export type PlayerStandingCardsLazyQueryHookResult = ReturnType<typeof usePlayerStandingCardsLazyQuery>;
export type PlayerStandingCardsQueryResult = Apollo.QueryResult<PlayerStandingCardsQuery, PlayerStandingCardsQueryVariables>;
export const TournamentCardsDocument = gql`
    query TournamentCards($after: String, $keyword: String) {
  tournaments(first: 12, after: $after, keyword: $keyword) {
    edges {
      node {
        ...TournamentCard
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${TournamentCardFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __useTournamentCardsQuery__
 *
 * To run a query within a React component, call `useTournamentCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentCardsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useTournamentCardsQuery(baseOptions?: Apollo.QueryHookOptions<TournamentCardsQuery, TournamentCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentCardsQuery, TournamentCardsQueryVariables>(TournamentCardsDocument, options);
      }
export function useTournamentCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentCardsQuery, TournamentCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentCardsQuery, TournamentCardsQueryVariables>(TournamentCardsDocument, options);
        }
export type TournamentCardsQueryHookResult = ReturnType<typeof useTournamentCardsQuery>;
export type TournamentCardsLazyQueryHookResult = ReturnType<typeof useTournamentCardsLazyQuery>;
export type TournamentCardsQueryResult = Apollo.QueryResult<TournamentCardsQuery, TournamentCardsQueryVariables>;
export const ArticleTableRowsDocument = gql`
    query ArticleTableRows($after: String, $keyword: String) {
  myArticles(first: 10, after: $after, keyword: $keyword) {
    edges {
      node {
        ...ArticleTableRow
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${ArticleTableRowFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __useArticleTableRowsQuery__
 *
 * To run a query within a React component, call `useArticleTableRowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleTableRowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleTableRowsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useArticleTableRowsQuery(baseOptions?: Apollo.QueryHookOptions<ArticleTableRowsQuery, ArticleTableRowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleTableRowsQuery, ArticleTableRowsQueryVariables>(ArticleTableRowsDocument, options);
      }
export function useArticleTableRowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleTableRowsQuery, ArticleTableRowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleTableRowsQuery, ArticleTableRowsQueryVariables>(ArticleTableRowsDocument, options);
        }
export type ArticleTableRowsQueryHookResult = ReturnType<typeof useArticleTableRowsQuery>;
export type ArticleTableRowsLazyQueryHookResult = ReturnType<typeof useArticleTableRowsLazyQuery>;
export type ArticleTableRowsQueryResult = Apollo.QueryResult<ArticleTableRowsQuery, ArticleTableRowsQueryVariables>;
export const PublishArticleDocument = gql`
    mutation PublishArticle($articleId: ID!) {
  publishArticle(input: {articleId: $articleId}) {
    article {
      ...ArticleTableRow
    }
  }
}
    ${ArticleTableRowFragmentDoc}`;
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
export const StopArticleDocument = gql`
    mutation StopArticle($articleId: ID!) {
  stopArticle(input: {articleId: $articleId}) {
    article {
      ...ArticleTableRow
    }
  }
}
    ${ArticleTableRowFragmentDoc}`;
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
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($articleId: ID!) {
  deleteArticle(input: {articleId: $articleId}) {
    article {
      id
    }
  }
}
    `;
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
export const CharacterTableRowsDocument = gql`
    query CharacterTableRows($keyword: String) {
  characters(first: 100, keyword: $keyword) {
    nodes {
      ...CharacterTableRow
    }
  }
}
    ${CharacterTableRowFragmentDoc}`;

/**
 * __useCharacterTableRowsQuery__
 *
 * To run a query within a React component, call `useCharacterTableRowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterTableRowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterTableRowsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useCharacterTableRowsQuery(baseOptions?: Apollo.QueryHookOptions<CharacterTableRowsQuery, CharacterTableRowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterTableRowsQuery, CharacterTableRowsQueryVariables>(CharacterTableRowsDocument, options);
      }
export function useCharacterTableRowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterTableRowsQuery, CharacterTableRowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterTableRowsQuery, CharacterTableRowsQueryVariables>(CharacterTableRowsDocument, options);
        }
export type CharacterTableRowsQueryHookResult = ReturnType<typeof useCharacterTableRowsQuery>;
export type CharacterTableRowsLazyQueryHookResult = ReturnType<typeof useCharacterTableRowsLazyQuery>;
export type CharacterTableRowsQueryResult = Apollo.QueryResult<CharacterTableRowsQuery, CharacterTableRowsQueryVariables>;
export const CreateComboCategoryDocument = gql`
    mutation CreateComboCategory($characterSlug: String!, $attributes: ComboCategoryAttributes!) {
  createComboCategory(
    input: {characterSlug: $characterSlug, attributes: $attributes}
  ) {
    comboCategory {
      ...ComboDashboardCategory
      character {
        id
        comboCategories {
          id
          position
        }
      }
    }
  }
}
    ${ComboDashboardCategoryFragmentDoc}`;
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
export const UpdateComboCategoryDocument = gql`
    mutation UpdateComboCategory($comboCategoryId: ID!, $attributes: ComboCategoryAttributes!) {
  updateComboCategory(
    input: {comboCategoryId: $comboCategoryId, attributes: $attributes}
  ) {
    comboCategory {
      ...ComboDashboardCategory
      character {
        id
        comboCategories {
          id
          position
        }
      }
    }
  }
}
    ${ComboDashboardCategoryFragmentDoc}`;
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
export const DeleteComboCategoryDocument = gql`
    mutation DeleteComboCategory($comboCategoryId: ID!) {
  deleteComboCategory(input: {comboCategoryId: $comboCategoryId}) {
    comboCategory {
      ...ComboDashboardCategory
      character {
        id
        comboCategories {
          id
          position
        }
      }
    }
  }
}
    ${ComboDashboardCategoryFragmentDoc}`;
export type DeleteComboCategoryMutationFn = Apollo.MutationFunction<DeleteComboCategoryMutation, DeleteComboCategoryMutationVariables>;

/**
 * __useDeleteComboCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteComboCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComboCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComboCategoryMutation, { data, loading, error }] = useDeleteComboCategoryMutation({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function useDeleteComboCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteComboCategoryMutation, DeleteComboCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteComboCategoryMutation, DeleteComboCategoryMutationVariables>(DeleteComboCategoryDocument, options);
      }
export type DeleteComboCategoryMutationHookResult = ReturnType<typeof useDeleteComboCategoryMutation>;
export type DeleteComboCategoryMutationResult = Apollo.MutationResult<DeleteComboCategoryMutation>;
export type DeleteComboCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteComboCategoryMutation, DeleteComboCategoryMutationVariables>;
export const CreateComboDocument = gql`
    mutation CreateCombo($comboCategoryId: ID!, $attributes: ComboAttributes!) {
  createCombo(input: {comboCategoryId: $comboCategoryId, attributes: $attributes}) {
    combo {
      ...ComboTableRow
      comboCategory {
        id
        combos {
          id
          position
        }
      }
    }
  }
}
    ${ComboTableRowFragmentDoc}`;
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
export const UpdateComboDocument = gql`
    mutation UpdateCombo($comboId: ID!, $attributes: ComboAttributes!) {
  updateCombo(input: {comboId: $comboId, attributes: $attributes}) {
    combo {
      ...ComboTableRow
      comboCategory {
        id
        combos {
          id
          position
        }
      }
    }
  }
}
    ${ComboTableRowFragmentDoc}`;
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
export const DeleteComboDocument = gql`
    mutation DeleteCombo($comboId: ID!) {
  deleteCombo(input: {comboId: $comboId}) {
    combo {
      id
      comboCategory {
        id
        combos {
          id
        }
      }
    }
  }
}
    `;
export type DeleteComboMutationFn = Apollo.MutationFunction<DeleteComboMutation, DeleteComboMutationVariables>;

/**
 * __useDeleteComboMutation__
 *
 * To run a mutation, you first call `useDeleteComboMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComboMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComboMutation, { data, loading, error }] = useDeleteComboMutation({
 *   variables: {
 *      comboId: // value for 'comboId'
 *   },
 * });
 */
export function useDeleteComboMutation(baseOptions?: Apollo.MutationHookOptions<DeleteComboMutation, DeleteComboMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteComboMutation, DeleteComboMutationVariables>(DeleteComboDocument, options);
      }
export type DeleteComboMutationHookResult = ReturnType<typeof useDeleteComboMutation>;
export type DeleteComboMutationResult = Apollo.MutationResult<DeleteComboMutation>;
export type DeleteComboMutationOptions = Apollo.BaseMutationOptions<DeleteComboMutation, DeleteComboMutationVariables>;
export const CreateComboVideoDocument = gql`
    mutation CreateComboVideo($comboId: ID!) {
  createComboVideo(input: {comboId: $comboId}) {
    combo {
      ...ComboTableRow
    }
    videoUpload {
      url
      fields
    }
  }
}
    ${ComboTableRowFragmentDoc}`;
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
 *      comboId: // value for 'comboId'
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
export const CreateMoveCategoryDocument = gql`
    mutation CreateMoveCategory($characterSlug: String!, $attributes: MoveCategoryAttributes!) {
  createMoveCategory(
    input: {characterSlug: $characterSlug, attributes: $attributes}
  ) {
    moveCategory {
      ...MoveDashboardCategory
      character {
        id
        moveCategories {
          id
          position
        }
      }
    }
  }
}
    ${MoveDashboardCategoryFragmentDoc}`;
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
export const UpdateMoveCategoryDocument = gql`
    mutation UpdateMoveCategory($moveCategoryId: ID!, $attributes: MoveCategoryAttributes!) {
  updateMoveCategory(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    moveCategory {
      ...MoveDashboardCategory
      character {
        id
        moveCategories {
          id
          position
        }
      }
    }
  }
}
    ${MoveDashboardCategoryFragmentDoc}`;
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
export const DeleteMoveCategoryDocument = gql`
    mutation DeleteMoveCategory($moveCategoryId: ID!) {
  deleteMoveCategory(input: {moveCategoryId: $moveCategoryId}) {
    moveCategory {
      ...MoveDashboardCategory
      character {
        id
        moveCategories {
          id
          position
        }
      }
    }
  }
}
    ${MoveDashboardCategoryFragmentDoc}`;
export type DeleteMoveCategoryMutationFn = Apollo.MutationFunction<DeleteMoveCategoryMutation, DeleteMoveCategoryMutationVariables>;

/**
 * __useDeleteMoveCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteMoveCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMoveCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMoveCategoryMutation, { data, loading, error }] = useDeleteMoveCategoryMutation({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function useDeleteMoveCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMoveCategoryMutation, DeleteMoveCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMoveCategoryMutation, DeleteMoveCategoryMutationVariables>(DeleteMoveCategoryDocument, options);
      }
export type DeleteMoveCategoryMutationHookResult = ReturnType<typeof useDeleteMoveCategoryMutation>;
export type DeleteMoveCategoryMutationResult = Apollo.MutationResult<DeleteMoveCategoryMutation>;
export type DeleteMoveCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteMoveCategoryMutation, DeleteMoveCategoryMutationVariables>;
export const CreateAttackMoveDocument = gql`
    mutation CreateAttackMove($moveCategoryId: ID!, $attributes: AttackMoveAttributes!) {
  createAttackMove(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    move {
      ...MoveTableRow
      moveCategory {
        id
        moves {
          id
          position
        }
      }
    }
  }
}
    ${MoveTableRowFragmentDoc}`;
export type CreateAttackMoveMutationFn = Apollo.MutationFunction<CreateAttackMoveMutation, CreateAttackMoveMutationVariables>;

/**
 * __useCreateAttackMoveMutation__
 *
 * To run a mutation, you first call `useCreateAttackMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttackMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttackMoveMutation, { data, loading, error }] = useCreateAttackMoveMutation({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateAttackMoveMutation(baseOptions?: Apollo.MutationHookOptions<CreateAttackMoveMutation, CreateAttackMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAttackMoveMutation, CreateAttackMoveMutationVariables>(CreateAttackMoveDocument, options);
      }
export type CreateAttackMoveMutationHookResult = ReturnType<typeof useCreateAttackMoveMutation>;
export type CreateAttackMoveMutationResult = Apollo.MutationResult<CreateAttackMoveMutation>;
export type CreateAttackMoveMutationOptions = Apollo.BaseMutationOptions<CreateAttackMoveMutation, CreateAttackMoveMutationVariables>;
export const CreateThrowMoveDocument = gql`
    mutation CreateThrowMove($moveCategoryId: ID!, $attributes: ThrowMoveAttributes!) {
  createThrowMove(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    move {
      ...MoveTableRow
      moveCategory {
        id
        moves {
          id
          position
        }
      }
    }
  }
}
    ${MoveTableRowFragmentDoc}`;
export type CreateThrowMoveMutationFn = Apollo.MutationFunction<CreateThrowMoveMutation, CreateThrowMoveMutationVariables>;

/**
 * __useCreateThrowMoveMutation__
 *
 * To run a mutation, you first call `useCreateThrowMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThrowMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThrowMoveMutation, { data, loading, error }] = useCreateThrowMoveMutation({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateThrowMoveMutation(baseOptions?: Apollo.MutationHookOptions<CreateThrowMoveMutation, CreateThrowMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThrowMoveMutation, CreateThrowMoveMutationVariables>(CreateThrowMoveDocument, options);
      }
export type CreateThrowMoveMutationHookResult = ReturnType<typeof useCreateThrowMoveMutation>;
export type CreateThrowMoveMutationResult = Apollo.MutationResult<CreateThrowMoveMutation>;
export type CreateThrowMoveMutationOptions = Apollo.BaseMutationOptions<CreateThrowMoveMutation, CreateThrowMoveMutationVariables>;
export const CreateReversalMoveDocument = gql`
    mutation CreateReversalMove($moveCategoryId: ID!, $attributes: ReversalMoveAttributes!) {
  createReversalMove(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    move {
      ...MoveTableRow
      moveCategory {
        id
        moves {
          id
          position
        }
      }
    }
  }
}
    ${MoveTableRowFragmentDoc}`;
export type CreateReversalMoveMutationFn = Apollo.MutationFunction<CreateReversalMoveMutation, CreateReversalMoveMutationVariables>;

/**
 * __useCreateReversalMoveMutation__
 *
 * To run a mutation, you first call `useCreateReversalMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReversalMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReversalMoveMutation, { data, loading, error }] = useCreateReversalMoveMutation({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateReversalMoveMutation(baseOptions?: Apollo.MutationHookOptions<CreateReversalMoveMutation, CreateReversalMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReversalMoveMutation, CreateReversalMoveMutationVariables>(CreateReversalMoveDocument, options);
      }
export type CreateReversalMoveMutationHookResult = ReturnType<typeof useCreateReversalMoveMutation>;
export type CreateReversalMoveMutationResult = Apollo.MutationResult<CreateReversalMoveMutation>;
export type CreateReversalMoveMutationOptions = Apollo.BaseMutationOptions<CreateReversalMoveMutation, CreateReversalMoveMutationVariables>;
export const UpdateAttackMoveDocument = gql`
    mutation UpdateAttackMove($moveId: ID!, $attributes: AttackMoveAttributes!) {
  updateAttackMove(input: {moveId: $moveId, attributes: $attributes}) {
    move {
      ...MoveTableRow
      moveCategory {
        id
        moves {
          id
          position
        }
      }
    }
  }
}
    ${MoveTableRowFragmentDoc}`;
export type UpdateAttackMoveMutationFn = Apollo.MutationFunction<UpdateAttackMoveMutation, UpdateAttackMoveMutationVariables>;

/**
 * __useUpdateAttackMoveMutation__
 *
 * To run a mutation, you first call `useUpdateAttackMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttackMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttackMoveMutation, { data, loading, error }] = useUpdateAttackMoveMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateAttackMoveMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAttackMoveMutation, UpdateAttackMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAttackMoveMutation, UpdateAttackMoveMutationVariables>(UpdateAttackMoveDocument, options);
      }
export type UpdateAttackMoveMutationHookResult = ReturnType<typeof useUpdateAttackMoveMutation>;
export type UpdateAttackMoveMutationResult = Apollo.MutationResult<UpdateAttackMoveMutation>;
export type UpdateAttackMoveMutationOptions = Apollo.BaseMutationOptions<UpdateAttackMoveMutation, UpdateAttackMoveMutationVariables>;
export const UpdateThrowMoveDocument = gql`
    mutation UpdateThrowMove($moveId: ID!, $attributes: ThrowMoveAttributes!) {
  updateThrowMove(input: {moveId: $moveId, attributes: $attributes}) {
    move {
      ...MoveTableRow
      moveCategory {
        id
        moves {
          id
          position
        }
      }
    }
  }
}
    ${MoveTableRowFragmentDoc}`;
export type UpdateThrowMoveMutationFn = Apollo.MutationFunction<UpdateThrowMoveMutation, UpdateThrowMoveMutationVariables>;

/**
 * __useUpdateThrowMoveMutation__
 *
 * To run a mutation, you first call `useUpdateThrowMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThrowMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThrowMoveMutation, { data, loading, error }] = useUpdateThrowMoveMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateThrowMoveMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThrowMoveMutation, UpdateThrowMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThrowMoveMutation, UpdateThrowMoveMutationVariables>(UpdateThrowMoveDocument, options);
      }
export type UpdateThrowMoveMutationHookResult = ReturnType<typeof useUpdateThrowMoveMutation>;
export type UpdateThrowMoveMutationResult = Apollo.MutationResult<UpdateThrowMoveMutation>;
export type UpdateThrowMoveMutationOptions = Apollo.BaseMutationOptions<UpdateThrowMoveMutation, UpdateThrowMoveMutationVariables>;
export const UpdateReversalMoveDocument = gql`
    mutation UpdateReversalMove($moveId: ID!, $attributes: ReversalMoveAttributes!) {
  updateReversalMove(input: {moveId: $moveId, attributes: $attributes}) {
    move {
      id
      moveCategory {
        id
        moves {
          id
          position
        }
      }
    }
  }
}
    `;
export type UpdateReversalMoveMutationFn = Apollo.MutationFunction<UpdateReversalMoveMutation, UpdateReversalMoveMutationVariables>;

/**
 * __useUpdateReversalMoveMutation__
 *
 * To run a mutation, you first call `useUpdateReversalMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReversalMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReversalMoveMutation, { data, loading, error }] = useUpdateReversalMoveMutation({
 *   variables: {
 *      moveId: // value for 'moveId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateReversalMoveMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReversalMoveMutation, UpdateReversalMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReversalMoveMutation, UpdateReversalMoveMutationVariables>(UpdateReversalMoveDocument, options);
      }
export type UpdateReversalMoveMutationHookResult = ReturnType<typeof useUpdateReversalMoveMutation>;
export type UpdateReversalMoveMutationResult = Apollo.MutationResult<UpdateReversalMoveMutation>;
export type UpdateReversalMoveMutationOptions = Apollo.BaseMutationOptions<UpdateReversalMoveMutation, UpdateReversalMoveMutationVariables>;
export const DeleteMoveDocument = gql`
    mutation DeleteMove($moveId: ID!) {
  deleteMove(input: {moveId: $moveId}) {
    move {
      id
      moveCategory {
        id
        moves {
          id
        }
      }
    }
  }
}
    `;
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
export const CreateMoveVideoDocument = gql`
    mutation CreateMoveVideo($moveId: ID!) {
  createMoveVideo(input: {moveId: $moveId}) {
    move {
      ...MoveTableRow
    }
    videoUpload {
      url
      fields
    }
  }
}
    ${MoveTableRowFragmentDoc}`;
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
 *      moveId: // value for 'moveId'
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
export const PlayerTableRowsDocument = gql`
    query PlayerTableRows($after: String, $keyword: String) {
  players(first: 10, after: $after, keyword: $keyword) {
    edges {
      node {
        ...PlayerTableRow
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${PlayerTableRowFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __usePlayerTableRowsQuery__
 *
 * To run a query within a React component, call `usePlayerTableRowsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerTableRowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerTableRowsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function usePlayerTableRowsQuery(baseOptions?: Apollo.QueryHookOptions<PlayerTableRowsQuery, PlayerTableRowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerTableRowsQuery, PlayerTableRowsQueryVariables>(PlayerTableRowsDocument, options);
      }
export function usePlayerTableRowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerTableRowsQuery, PlayerTableRowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerTableRowsQuery, PlayerTableRowsQueryVariables>(PlayerTableRowsDocument, options);
        }
export type PlayerTableRowsQueryHookResult = ReturnType<typeof usePlayerTableRowsQuery>;
export type PlayerTableRowsLazyQueryHookResult = ReturnType<typeof usePlayerTableRowsLazyQuery>;
export type PlayerTableRowsQueryResult = Apollo.QueryResult<PlayerTableRowsQuery, PlayerTableRowsQueryVariables>;
export const DeletePlayerDocument = gql`
    mutation DeletePlayer($playerSlug: String!) {
  deletePlayer(input: {playerSlug: $playerSlug}) {
    player {
      id
    }
  }
}
    `;
export type DeletePlayerMutationFn = Apollo.MutationFunction<DeletePlayerMutation, DeletePlayerMutationVariables>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function useDeletePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlayerMutation, DeletePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlayerMutation, DeletePlayerMutationVariables>(DeletePlayerDocument, options);
      }
export type DeletePlayerMutationHookResult = ReturnType<typeof useDeletePlayerMutation>;
export type DeletePlayerMutationResult = Apollo.MutationResult<DeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<DeletePlayerMutation, DeletePlayerMutationVariables>;
export const CreatePlayerFromSmashggDocument = gql`
    mutation CreatePlayerFromSmashgg($smashggId: String!) {
  createPlayerFromSmashgg(input: {smashggId: $smashggId}) {
    player {
      id
    }
  }
}
    `;
export type CreatePlayerFromSmashggMutationFn = Apollo.MutationFunction<CreatePlayerFromSmashggMutation, CreatePlayerFromSmashggMutationVariables>;

/**
 * __useCreatePlayerFromSmashggMutation__
 *
 * To run a mutation, you first call `useCreatePlayerFromSmashggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerFromSmashggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerFromSmashggMutation, { data, loading, error }] = useCreatePlayerFromSmashggMutation({
 *   variables: {
 *      smashggId: // value for 'smashggId'
 *   },
 * });
 */
export function useCreatePlayerFromSmashggMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerFromSmashggMutation, CreatePlayerFromSmashggMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerFromSmashggMutation, CreatePlayerFromSmashggMutationVariables>(CreatePlayerFromSmashggDocument, options);
      }
export type CreatePlayerFromSmashggMutationHookResult = ReturnType<typeof useCreatePlayerFromSmashggMutation>;
export type CreatePlayerFromSmashggMutationResult = Apollo.MutationResult<CreatePlayerFromSmashggMutation>;
export type CreatePlayerFromSmashggMutationOptions = Apollo.BaseMutationOptions<CreatePlayerFromSmashggMutation, CreatePlayerFromSmashggMutationVariables>;
export const TournamentTableRowsDocument = gql`
    query TournamentTableRows($after: String, $keyword: String) {
  tournaments(first: 10, after: $after, keyword: $keyword) {
    edges {
      node {
        ...TournamentTableRow
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${TournamentTableRowFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __useTournamentTableRowsQuery__
 *
 * To run a query within a React component, call `useTournamentTableRowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentTableRowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentTableRowsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useTournamentTableRowsQuery(baseOptions?: Apollo.QueryHookOptions<TournamentTableRowsQuery, TournamentTableRowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentTableRowsQuery, TournamentTableRowsQueryVariables>(TournamentTableRowsDocument, options);
      }
export function useTournamentTableRowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentTableRowsQuery, TournamentTableRowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentTableRowsQuery, TournamentTableRowsQueryVariables>(TournamentTableRowsDocument, options);
        }
export type TournamentTableRowsQueryHookResult = ReturnType<typeof useTournamentTableRowsQuery>;
export type TournamentTableRowsLazyQueryHookResult = ReturnType<typeof useTournamentTableRowsLazyQuery>;
export type TournamentTableRowsQueryResult = Apollo.QueryResult<TournamentTableRowsQuery, TournamentTableRowsQueryVariables>;
export const DeleteTournamentDocument = gql`
    mutation DeleteTournament($tournamentId: ID!) {
  deleteTournament(input: {tournamentId: $tournamentId}) {
    tournament {
      id
    }
  }
}
    `;
export type DeleteTournamentMutationFn = Apollo.MutationFunction<DeleteTournamentMutation, DeleteTournamentMutationVariables>;

/**
 * __useDeleteTournamentMutation__
 *
 * To run a mutation, you first call `useDeleteTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTournamentMutation, { data, loading, error }] = useDeleteTournamentMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useDeleteTournamentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTournamentMutation, DeleteTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTournamentMutation, DeleteTournamentMutationVariables>(DeleteTournamentDocument, options);
      }
export type DeleteTournamentMutationHookResult = ReturnType<typeof useDeleteTournamentMutation>;
export type DeleteTournamentMutationResult = Apollo.MutationResult<DeleteTournamentMutation>;
export type DeleteTournamentMutationOptions = Apollo.BaseMutationOptions<DeleteTournamentMutation, DeleteTournamentMutationVariables>;
export const ComboCategoryFormDocument = gql`
    query ComboCategoryForm($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    ...ComboCategoryForm
  }
}
    ${ComboCategoryFormFragmentDoc}`;

/**
 * __useComboCategoryFormQuery__
 *
 * To run a query within a React component, call `useComboCategoryFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboCategoryFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboCategoryFormQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function useComboCategoryFormQuery(baseOptions: Apollo.QueryHookOptions<ComboCategoryFormQuery, ComboCategoryFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboCategoryFormQuery, ComboCategoryFormQueryVariables>(ComboCategoryFormDocument, options);
      }
export function useComboCategoryFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboCategoryFormQuery, ComboCategoryFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboCategoryFormQuery, ComboCategoryFormQueryVariables>(ComboCategoryFormDocument, options);
        }
export type ComboCategoryFormQueryHookResult = ReturnType<typeof useComboCategoryFormQuery>;
export type ComboCategoryFormLazyQueryHookResult = ReturnType<typeof useComboCategoryFormLazyQuery>;
export type ComboCategoryFormQueryResult = Apollo.QueryResult<ComboCategoryFormQuery, ComboCategoryFormQueryVariables>;
export const ComboFormDocument = gql`
    query ComboForm($comboId: ID!) {
  combo(comboId: $comboId) {
    ...ComboForm
  }
}
    ${ComboFormFragmentDoc}`;

/**
 * __useComboFormQuery__
 *
 * To run a query within a React component, call `useComboFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useComboFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComboFormQuery({
 *   variables: {
 *      comboId: // value for 'comboId'
 *   },
 * });
 */
export function useComboFormQuery(baseOptions: Apollo.QueryHookOptions<ComboFormQuery, ComboFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ComboFormQuery, ComboFormQueryVariables>(ComboFormDocument, options);
      }
export function useComboFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComboFormQuery, ComboFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ComboFormQuery, ComboFormQueryVariables>(ComboFormDocument, options);
        }
export type ComboFormQueryHookResult = ReturnType<typeof useComboFormQuery>;
export type ComboFormLazyQueryHookResult = ReturnType<typeof useComboFormLazyQuery>;
export type ComboFormQueryResult = Apollo.QueryResult<ComboFormQuery, ComboFormQueryVariables>;
export const MoveCategoryFormDocument = gql`
    query MoveCategoryForm($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    ...MoveCategoryForm
  }
}
    ${MoveCategoryFormFragmentDoc}`;

/**
 * __useMoveCategoryFormQuery__
 *
 * To run a query within a React component, call `useMoveCategoryFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCategoryFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCategoryFormQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function useMoveCategoryFormQuery(baseOptions: Apollo.QueryHookOptions<MoveCategoryFormQuery, MoveCategoryFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCategoryFormQuery, MoveCategoryFormQueryVariables>(MoveCategoryFormDocument, options);
      }
export function useMoveCategoryFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCategoryFormQuery, MoveCategoryFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCategoryFormQuery, MoveCategoryFormQueryVariables>(MoveCategoryFormDocument, options);
        }
export type MoveCategoryFormQueryHookResult = ReturnType<typeof useMoveCategoryFormQuery>;
export type MoveCategoryFormLazyQueryHookResult = ReturnType<typeof useMoveCategoryFormLazyQuery>;
export type MoveCategoryFormQueryResult = Apollo.QueryResult<MoveCategoryFormQuery, MoveCategoryFormQueryVariables>;
export const MoveFormDocument = gql`
    query MoveForm($moveId: ID!) {
  move(moveId: $moveId) {
    ...MoveForm
  }
}
    ${MoveFormFragmentDoc}`;

/**
 * __useMoveFormQuery__
 *
 * To run a query within a React component, call `useMoveFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveFormQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function useMoveFormQuery(baseOptions: Apollo.QueryHookOptions<MoveFormQuery, MoveFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveFormQuery, MoveFormQueryVariables>(MoveFormDocument, options);
      }
export function useMoveFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveFormQuery, MoveFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveFormQuery, MoveFormQueryVariables>(MoveFormDocument, options);
        }
export type MoveFormQueryHookResult = ReturnType<typeof useMoveFormQuery>;
export type MoveFormLazyQueryHookResult = ReturnType<typeof useMoveFormLazyQuery>;
export type MoveFormQueryResult = Apollo.QueryResult<MoveFormQuery, MoveFormQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser {
  createUser(input: {}) {
    currentUser {
      ...CurrentUser
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const TournamentFormDocument = gql`
    query TournamentForm {
  organizers(first: 100) {
    nodes {
      ...OrganizerSelectOption
    }
  }
}
    ${OrganizerSelectOptionFragmentDoc}`;

/**
 * __useTournamentFormQuery__
 *
 * To run a query within a React component, call `useTournamentFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentFormQuery({
 *   variables: {
 *   },
 * });
 */
export function useTournamentFormQuery(baseOptions?: Apollo.QueryHookOptions<TournamentFormQuery, TournamentFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentFormQuery, TournamentFormQueryVariables>(TournamentFormDocument, options);
      }
export function useTournamentFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentFormQuery, TournamentFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentFormQuery, TournamentFormQueryVariables>(TournamentFormDocument, options);
        }
export type TournamentFormQueryHookResult = ReturnType<typeof useTournamentFormQuery>;
export type TournamentFormLazyQueryHookResult = ReturnType<typeof useTournamentFormLazyQuery>;
export type TournamentFormQueryResult = Apollo.QueryResult<TournamentFormQuery, TournamentFormQueryVariables>;
export const CreateArticleLinkDocument = gql`
    mutation CreateArticleLink($url: String!) {
  createArticleLink(input: {url: $url}) {
    articleLink {
      url
      title
      description
      imageUrl
    }
  }
}
    `;
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
export const ArticleElementComboDocument = gql`
    query ArticleElementCombo($comboId: ID!) {
  combo(comboId: $comboId) {
    ...ComboMedia
  }
}
    ${ComboMediaFragmentDoc}`;

/**
 * __useArticleElementComboQuery__
 *
 * To run a query within a React component, call `useArticleElementComboQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleElementComboQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleElementComboQuery({
 *   variables: {
 *      comboId: // value for 'comboId'
 *   },
 * });
 */
export function useArticleElementComboQuery(baseOptions: Apollo.QueryHookOptions<ArticleElementComboQuery, ArticleElementComboQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleElementComboQuery, ArticleElementComboQueryVariables>(ArticleElementComboDocument, options);
      }
export function useArticleElementComboLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleElementComboQuery, ArticleElementComboQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleElementComboQuery, ArticleElementComboQueryVariables>(ArticleElementComboDocument, options);
        }
export type ArticleElementComboQueryHookResult = ReturnType<typeof useArticleElementComboQuery>;
export type ArticleElementComboLazyQueryHookResult = ReturnType<typeof useArticleElementComboLazyQuery>;
export type ArticleElementComboQueryResult = Apollo.QueryResult<ArticleElementComboQuery, ArticleElementComboQueryVariables>;
export const ArticleElementMoveDocument = gql`
    query ArticleElementMove($moveId: ID!) {
  move(moveId: $moveId) {
    ...MoveMedia
  }
}
    ${MoveMediaFragmentDoc}`;

/**
 * __useArticleElementMoveQuery__
 *
 * To run a query within a React component, call `useArticleElementMoveQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleElementMoveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleElementMoveQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function useArticleElementMoveQuery(baseOptions: Apollo.QueryHookOptions<ArticleElementMoveQuery, ArticleElementMoveQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleElementMoveQuery, ArticleElementMoveQueryVariables>(ArticleElementMoveDocument, options);
      }
export function useArticleElementMoveLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleElementMoveQuery, ArticleElementMoveQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleElementMoveQuery, ArticleElementMoveQueryVariables>(ArticleElementMoveDocument, options);
        }
export type ArticleElementMoveQueryHookResult = ReturnType<typeof useArticleElementMoveQuery>;
export type ArticleElementMoveLazyQueryHookResult = ReturnType<typeof useArticleElementMoveLazyQuery>;
export type ArticleElementMoveQueryResult = Apollo.QueryResult<ArticleElementMoveQuery, ArticleElementMoveQueryVariables>;
export const CharacterSelectOptionsDocument = gql`
    query CharacterSelectOptions {
  characters(first: 100) {
    nodes {
      ...CharacterSelectOption
    }
  }
}
    ${CharacterSelectOptionFragmentDoc}`;

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
export const ComboSelectOptionsDocument = gql`
    query ComboSelectOptions($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    id
    comboCategories {
      id
      name
      combos {
        id
        command
      }
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
export const CountrySelectOptionsDocument = gql`
    query CountrySelectOptions {
  countries {
    ...CountrySelectOption
  }
}
    ${CountrySelectOptionFragmentDoc}`;

/**
 * __useCountrySelectOptionsQuery__
 *
 * To run a query within a React component, call `useCountrySelectOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountrySelectOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountrySelectOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountrySelectOptionsQuery(baseOptions?: Apollo.QueryHookOptions<CountrySelectOptionsQuery, CountrySelectOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountrySelectOptionsQuery, CountrySelectOptionsQueryVariables>(CountrySelectOptionsDocument, options);
      }
export function useCountrySelectOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountrySelectOptionsQuery, CountrySelectOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountrySelectOptionsQuery, CountrySelectOptionsQueryVariables>(CountrySelectOptionsDocument, options);
        }
export type CountrySelectOptionsQueryHookResult = ReturnType<typeof useCountrySelectOptionsQuery>;
export type CountrySelectOptionsLazyQueryHookResult = ReturnType<typeof useCountrySelectOptionsLazyQuery>;
export type CountrySelectOptionsQueryResult = Apollo.QueryResult<CountrySelectOptionsQuery, CountrySelectOptionsQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const MoveSelectOptionsDocument = gql`
    query MoveSelectOptions($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    id
    moveCategories {
      id
      name
      moves {
        id
        name
        command
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
export const SsgArticlePathsDocument = gql`
    query SsgArticlePaths {
  articles(first: 50) {
    nodes {
      id
    }
  }
}
    `;

/**
 * __useSsgArticlePathsQuery__
 *
 * To run a query within a React component, call `useSsgArticlePathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsgArticlePathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsgArticlePathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSsgArticlePathsQuery(baseOptions?: Apollo.QueryHookOptions<SsgArticlePathsQuery, SsgArticlePathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsgArticlePathsQuery, SsgArticlePathsQueryVariables>(SsgArticlePathsDocument, options);
      }
export function useSsgArticlePathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsgArticlePathsQuery, SsgArticlePathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsgArticlePathsQuery, SsgArticlePathsQueryVariables>(SsgArticlePathsDocument, options);
        }
export type SsgArticlePathsQueryHookResult = ReturnType<typeof useSsgArticlePathsQuery>;
export type SsgArticlePathsLazyQueryHookResult = ReturnType<typeof useSsgArticlePathsLazyQuery>;
export type SsgArticlePathsQueryResult = Apollo.QueryResult<SsgArticlePathsQuery, SsgArticlePathsQueryVariables>;
export const SsgCharacterPathsDocument = gql`
    query SsgCharacterPaths {
  characters(first: 100) {
    nodes {
      id
      slug
    }
  }
}
    `;

/**
 * __useSsgCharacterPathsQuery__
 *
 * To run a query within a React component, call `useSsgCharacterPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsgCharacterPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsgCharacterPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSsgCharacterPathsQuery(baseOptions?: Apollo.QueryHookOptions<SsgCharacterPathsQuery, SsgCharacterPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsgCharacterPathsQuery, SsgCharacterPathsQueryVariables>(SsgCharacterPathsDocument, options);
      }
export function useSsgCharacterPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsgCharacterPathsQuery, SsgCharacterPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsgCharacterPathsQuery, SsgCharacterPathsQueryVariables>(SsgCharacterPathsDocument, options);
        }
export type SsgCharacterPathsQueryHookResult = ReturnType<typeof useSsgCharacterPathsQuery>;
export type SsgCharacterPathsLazyQueryHookResult = ReturnType<typeof useSsgCharacterPathsLazyQuery>;
export type SsgCharacterPathsQueryResult = Apollo.QueryResult<SsgCharacterPathsQuery, SsgCharacterPathsQueryVariables>;
export const SsgPlayerPathsDocument = gql`
    query SsgPlayerPaths {
  players(first: 50) {
    nodes {
      id
      slug
    }
  }
}
    `;

/**
 * __useSsgPlayerPathsQuery__
 *
 * To run a query within a React component, call `useSsgPlayerPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsgPlayerPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsgPlayerPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSsgPlayerPathsQuery(baseOptions?: Apollo.QueryHookOptions<SsgPlayerPathsQuery, SsgPlayerPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsgPlayerPathsQuery, SsgPlayerPathsQueryVariables>(SsgPlayerPathsDocument, options);
      }
export function useSsgPlayerPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsgPlayerPathsQuery, SsgPlayerPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsgPlayerPathsQuery, SsgPlayerPathsQueryVariables>(SsgPlayerPathsDocument, options);
        }
export type SsgPlayerPathsQueryHookResult = ReturnType<typeof useSsgPlayerPathsQuery>;
export type SsgPlayerPathsLazyQueryHookResult = ReturnType<typeof useSsgPlayerPathsLazyQuery>;
export type SsgPlayerPathsQueryResult = Apollo.QueryResult<SsgPlayerPathsQuery, SsgPlayerPathsQueryVariables>;
export const SsgTournamentPathsDocument = gql`
    query SsgTournamentPaths {
  tournaments(first: 50) {
    nodes {
      id
    }
  }
}
    `;

/**
 * __useSsgTournamentPathsQuery__
 *
 * To run a query within a React component, call `useSsgTournamentPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsgTournamentPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsgTournamentPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSsgTournamentPathsQuery(baseOptions?: Apollo.QueryHookOptions<SsgTournamentPathsQuery, SsgTournamentPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsgTournamentPathsQuery, SsgTournamentPathsQueryVariables>(SsgTournamentPathsDocument, options);
      }
export function useSsgTournamentPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsgTournamentPathsQuery, SsgTournamentPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsgTournamentPathsQuery, SsgTournamentPathsQueryVariables>(SsgTournamentPathsDocument, options);
        }
export type SsgTournamentPathsQueryHookResult = ReturnType<typeof useSsgTournamentPathsQuery>;
export type SsgTournamentPathsLazyQueryHookResult = ReturnType<typeof useSsgTournamentPathsLazyQuery>;
export type SsgTournamentPathsQueryResult = Apollo.QueryResult<SsgTournamentPathsQuery, SsgTournamentPathsQueryVariables>;
export const SsgTournamentVideoPathsDocument = gql`
    query SsgTournamentVideoPaths {
  tournamentVideos(first: 50) {
    nodes {
      id
    }
  }
}
    `;

/**
 * __useSsgTournamentVideoPathsQuery__
 *
 * To run a query within a React component, call `useSsgTournamentVideoPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSsgTournamentVideoPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSsgTournamentVideoPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSsgTournamentVideoPathsQuery(baseOptions?: Apollo.QueryHookOptions<SsgTournamentVideoPathsQuery, SsgTournamentVideoPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SsgTournamentVideoPathsQuery, SsgTournamentVideoPathsQueryVariables>(SsgTournamentVideoPathsDocument, options);
      }
export function useSsgTournamentVideoPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SsgTournamentVideoPathsQuery, SsgTournamentVideoPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SsgTournamentVideoPathsQuery, SsgTournamentVideoPathsQueryVariables>(SsgTournamentVideoPathsDocument, options);
        }
export type SsgTournamentVideoPathsQueryHookResult = ReturnType<typeof useSsgTournamentVideoPathsQuery>;
export type SsgTournamentVideoPathsLazyQueryHookResult = ReturnType<typeof useSsgTournamentVideoPathsLazyQuery>;
export type SsgTournamentVideoPathsQueryResult = Apollo.QueryResult<SsgTournamentVideoPathsQuery, SsgTournamentVideoPathsQueryVariables>;
export const ArticlesPageDocument = gql`
    query ArticlesPage {
  articles(first: 12) {
    nodes {
      ...ArticleCard
    }
  }
}
    ${ArticleCardFragmentDoc}`;

/**
 * __useArticlesPageQuery__
 *
 * To run a query within a React component, call `useArticlesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesPageQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesPageQuery, ArticlesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesPageQuery, ArticlesPageQueryVariables>(ArticlesPageDocument, options);
      }
export function useArticlesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesPageQuery, ArticlesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesPageQuery, ArticlesPageQueryVariables>(ArticlesPageDocument, options);
        }
export type ArticlesPageQueryHookResult = ReturnType<typeof useArticlesPageQuery>;
export type ArticlesPageLazyQueryHookResult = ReturnType<typeof useArticlesPageLazyQuery>;
export type ArticlesPageQueryResult = Apollo.QueryResult<ArticlesPageQuery, ArticlesPageQueryVariables>;
export const ArticlePageDocument = gql`
    query ArticlePage($articleId: ID!) {
  article(articleId: $articleId) {
    ...ArticlePage
  }
}
    ${ArticlePageFragmentDoc}`;

/**
 * __useArticlePageQuery__
 *
 * To run a query within a React component, call `useArticlePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlePageQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useArticlePageQuery(baseOptions: Apollo.QueryHookOptions<ArticlePageQuery, ArticlePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlePageQuery, ArticlePageQueryVariables>(ArticlePageDocument, options);
      }
export function useArticlePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlePageQuery, ArticlePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlePageQuery, ArticlePageQueryVariables>(ArticlePageDocument, options);
        }
export type ArticlePageQueryHookResult = ReturnType<typeof useArticlePageQuery>;
export type ArticlePageLazyQueryHookResult = ReturnType<typeof useArticlePageLazyQuery>;
export type ArticlePageQueryResult = Apollo.QueryResult<ArticlePageQuery, ArticlePageQueryVariables>;
export const CharactersPageDocument = gql`
    query CharactersPage {
  characters(first: 100) {
    nodes {
      ...CharacterCard
    }
  }
}
    ${CharacterCardFragmentDoc}`;

/**
 * __useCharactersPageQuery__
 *
 * To run a query within a React component, call `useCharactersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharactersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharactersPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharactersPageQuery(baseOptions?: Apollo.QueryHookOptions<CharactersPageQuery, CharactersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharactersPageQuery, CharactersPageQueryVariables>(CharactersPageDocument, options);
      }
export function useCharactersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharactersPageQuery, CharactersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharactersPageQuery, CharactersPageQueryVariables>(CharactersPageDocument, options);
        }
export type CharactersPageQueryHookResult = ReturnType<typeof useCharactersPageQuery>;
export type CharactersPageLazyQueryHookResult = ReturnType<typeof useCharactersPageLazyQuery>;
export type CharactersPageQueryResult = Apollo.QueryResult<CharactersPageQuery, CharactersPageQueryVariables>;
export const CharacterPageDocument = gql`
    query CharacterPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterProfile
    ...CharacterTabs
    story
    description
  }
  battleCounts(characterSlug: $characterSlug, first: 10) {
    nodes {
      ...PlayerBattleCountChip
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterProfileFragmentDoc}
${CharacterTabsFragmentDoc}
${PlayerBattleCountChipFragmentDoc}`;

/**
 * __useCharacterPageQuery__
 *
 * To run a query within a React component, call `useCharacterPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterPageQuery(baseOptions: Apollo.QueryHookOptions<CharacterPageQuery, CharacterPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterPageQuery, CharacterPageQueryVariables>(CharacterPageDocument, options);
      }
export function useCharacterPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterPageQuery, CharacterPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterPageQuery, CharacterPageQueryVariables>(CharacterPageDocument, options);
        }
export type CharacterPageQueryHookResult = ReturnType<typeof useCharacterPageQuery>;
export type CharacterPageLazyQueryHookResult = ReturnType<typeof useCharacterPageLazyQuery>;
export type CharacterPageQueryResult = Apollo.QueryResult<CharacterPageQuery, CharacterPageQueryVariables>;
export const CharacterBattlesPageDocument = gql`
    query CharacterBattlesPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterProfile
    ...CharacterTabs
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterProfileFragmentDoc}
${CharacterTabsFragmentDoc}`;

/**
 * __useCharacterBattlesPageQuery__
 *
 * To run a query within a React component, call `useCharacterBattlesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterBattlesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterBattlesPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterBattlesPageQuery(baseOptions: Apollo.QueryHookOptions<CharacterBattlesPageQuery, CharacterBattlesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterBattlesPageQuery, CharacterBattlesPageQueryVariables>(CharacterBattlesPageDocument, options);
      }
export function useCharacterBattlesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterBattlesPageQuery, CharacterBattlesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterBattlesPageQuery, CharacterBattlesPageQueryVariables>(CharacterBattlesPageDocument, options);
        }
export type CharacterBattlesPageQueryHookResult = ReturnType<typeof useCharacterBattlesPageQuery>;
export type CharacterBattlesPageLazyQueryHookResult = ReturnType<typeof useCharacterBattlesPageLazyQuery>;
export type CharacterBattlesPageQueryResult = Apollo.QueryResult<CharacterBattlesPageQuery, CharacterBattlesPageQueryVariables>;
export const CharacterCombosPageDocument = gql`
    query CharacterCombosPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterProfile
    ...CharacterTabs
    comboCategories {
      id
      name
      combos {
        ...ComboListItem
      }
    }
    comboStarters {
      id
      name
      combosCount
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterProfileFragmentDoc}
${CharacterTabsFragmentDoc}
${ComboListItemFragmentDoc}`;

/**
 * __useCharacterCombosPageQuery__
 *
 * To run a query within a React component, call `useCharacterCombosPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterCombosPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterCombosPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterCombosPageQuery(baseOptions: Apollo.QueryHookOptions<CharacterCombosPageQuery, CharacterCombosPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterCombosPageQuery, CharacterCombosPageQueryVariables>(CharacterCombosPageDocument, options);
      }
export function useCharacterCombosPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterCombosPageQuery, CharacterCombosPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterCombosPageQuery, CharacterCombosPageQueryVariables>(CharacterCombosPageDocument, options);
        }
export type CharacterCombosPageQueryHookResult = ReturnType<typeof useCharacterCombosPageQuery>;
export type CharacterCombosPageLazyQueryHookResult = ReturnType<typeof useCharacterCombosPageLazyQuery>;
export type CharacterCombosPageQueryResult = Apollo.QueryResult<CharacterCombosPageQuery, CharacterCombosPageQueryVariables>;
export const CharacterMovesPageDocument = gql`
    query CharacterMovesPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterProfile
    ...CharacterTabs
    moveCategories {
      id
      name
      moves {
        ...MoveListItem
      }
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterProfileFragmentDoc}
${CharacterTabsFragmentDoc}
${MoveListItemFragmentDoc}`;

/**
 * __useCharacterMovesPageQuery__
 *
 * To run a query within a React component, call `useCharacterMovesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterMovesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterMovesPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterMovesPageQuery(baseOptions: Apollo.QueryHookOptions<CharacterMovesPageQuery, CharacterMovesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterMovesPageQuery, CharacterMovesPageQueryVariables>(CharacterMovesPageDocument, options);
      }
export function useCharacterMovesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterMovesPageQuery, CharacterMovesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterMovesPageQuery, CharacterMovesPageQueryVariables>(CharacterMovesPageDocument, options);
        }
export type CharacterMovesPageQueryHookResult = ReturnType<typeof useCharacterMovesPageQuery>;
export type CharacterMovesPageLazyQueryHookResult = ReturnType<typeof useCharacterMovesPageLazyQuery>;
export type CharacterMovesPageQueryResult = Apollo.QueryResult<CharacterMovesPageQuery, CharacterMovesPageQueryVariables>;
export const DashboardArticlePageDocument = gql`
    query DashboardArticlePage($articleId: ID!) {
  article(articleId: $articleId) {
    ...ArticleFormArticle
  }
}
    ${ArticleFormArticleFragmentDoc}`;

/**
 * __useDashboardArticlePageQuery__
 *
 * To run a query within a React component, call `useDashboardArticlePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardArticlePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardArticlePageQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useDashboardArticlePageQuery(baseOptions: Apollo.QueryHookOptions<DashboardArticlePageQuery, DashboardArticlePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardArticlePageQuery, DashboardArticlePageQueryVariables>(DashboardArticlePageDocument, options);
      }
export function useDashboardArticlePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardArticlePageQuery, DashboardArticlePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardArticlePageQuery, DashboardArticlePageQueryVariables>(DashboardArticlePageDocument, options);
        }
export type DashboardArticlePageQueryHookResult = ReturnType<typeof useDashboardArticlePageQuery>;
export type DashboardArticlePageLazyQueryHookResult = ReturnType<typeof useDashboardArticlePageLazyQuery>;
export type DashboardArticlePageQueryResult = Apollo.QueryResult<DashboardArticlePageQuery, DashboardArticlePageQueryVariables>;
export const MyArticleDocument = gql`
    query MyArticle($articleId: ID!) {
  myArticle(articleId: $articleId) {
    id
    title
    description
    mainImageUrl
    publishedAt
    status
    category
    content
    author {
      id
      name
      avatarUrl
    }
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
export const DashboardCharacterCombosPageDocument = gql`
    query DashboardCharacterCombosPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...ComboDashboard
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${ComboDashboardFragmentDoc}`;

/**
 * __useDashboardCharacterCombosPageQuery__
 *
 * To run a query within a React component, call `useDashboardCharacterCombosPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardCharacterCombosPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardCharacterCombosPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useDashboardCharacterCombosPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardCharacterCombosPageQuery, DashboardCharacterCombosPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardCharacterCombosPageQuery, DashboardCharacterCombosPageQueryVariables>(DashboardCharacterCombosPageDocument, options);
      }
export function useDashboardCharacterCombosPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardCharacterCombosPageQuery, DashboardCharacterCombosPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardCharacterCombosPageQuery, DashboardCharacterCombosPageQueryVariables>(DashboardCharacterCombosPageDocument, options);
        }
export type DashboardCharacterCombosPageQueryHookResult = ReturnType<typeof useDashboardCharacterCombosPageQuery>;
export type DashboardCharacterCombosPageLazyQueryHookResult = ReturnType<typeof useDashboardCharacterCombosPageLazyQuery>;
export type DashboardCharacterCombosPageQueryResult = Apollo.QueryResult<DashboardCharacterCombosPageQuery, DashboardCharacterCombosPageQueryVariables>;
export const PageAdminCharacterEditDocument = gql`
    query PageAdminCharacterEdit($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterForm
  }
}
    ${CharacterFormFragmentDoc}`;

/**
 * __usePageAdminCharacterEditQuery__
 *
 * To run a query within a React component, call `usePageAdminCharacterEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageAdminCharacterEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageAdminCharacterEditQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageAdminCharacterEditQuery(baseOptions: Apollo.QueryHookOptions<PageAdminCharacterEditQuery, PageAdminCharacterEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageAdminCharacterEditQuery, PageAdminCharacterEditQueryVariables>(PageAdminCharacterEditDocument, options);
      }
export function usePageAdminCharacterEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageAdminCharacterEditQuery, PageAdminCharacterEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageAdminCharacterEditQuery, PageAdminCharacterEditQueryVariables>(PageAdminCharacterEditDocument, options);
        }
export type PageAdminCharacterEditQueryHookResult = ReturnType<typeof usePageAdminCharacterEditQuery>;
export type PageAdminCharacterEditLazyQueryHookResult = ReturnType<typeof usePageAdminCharacterEditLazyQuery>;
export type PageAdminCharacterEditQueryResult = Apollo.QueryResult<PageAdminCharacterEditQuery, PageAdminCharacterEditQueryVariables>;
export const UpdateCharacterDocument = gql`
    mutation UpdateCharacter($characterSlug: String!, $attributes: CharacterAttributes!) {
  updateCharacter(input: {characterSlug: $characterSlug, attributes: $attributes}) {
    character {
      id
    }
  }
}
    `;
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
export const DashboardCharacterMovesPageDocument = gql`
    query DashboardCharacterMovesPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...MoveDashboard
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${MoveDashboardFragmentDoc}`;

/**
 * __useDashboardCharacterMovesPageQuery__
 *
 * To run a query within a React component, call `useDashboardCharacterMovesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardCharacterMovesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardCharacterMovesPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useDashboardCharacterMovesPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardCharacterMovesPageQuery, DashboardCharacterMovesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardCharacterMovesPageQuery, DashboardCharacterMovesPageQueryVariables>(DashboardCharacterMovesPageDocument, options);
      }
export function useDashboardCharacterMovesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardCharacterMovesPageQuery, DashboardCharacterMovesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardCharacterMovesPageQuery, DashboardCharacterMovesPageQueryVariables>(DashboardCharacterMovesPageDocument, options);
        }
export type DashboardCharacterMovesPageQueryHookResult = ReturnType<typeof useDashboardCharacterMovesPageQuery>;
export type DashboardCharacterMovesPageLazyQueryHookResult = ReturnType<typeof useDashboardCharacterMovesPageLazyQuery>;
export type DashboardCharacterMovesPageQueryResult = Apollo.QueryResult<DashboardCharacterMovesPageQuery, DashboardCharacterMovesPageQueryVariables>;
export const CreateCharacterDocument = gql`
    mutation CreateCharacter($attributes: CharacterAttributes!) {
  createCharacter(input: {attributes: $attributes}) {
    character {
      id
    }
  }
}
    `;
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
export const AdminOrganizerEditPageDocument = gql`
    query AdminOrganizerEditPage($organizerSlug: String!) {
  organizer(organizerSlug: $organizerSlug) {
    ...OrganizerForm
    ...OrganizerBreadcrumbs
  }
}
    ${OrganizerFormFragmentDoc}
${OrganizerBreadcrumbsFragmentDoc}`;

/**
 * __useAdminOrganizerEditPageQuery__
 *
 * To run a query within a React component, call `useAdminOrganizerEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminOrganizerEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminOrganizerEditPageQuery({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *   },
 * });
 */
export function useAdminOrganizerEditPageQuery(baseOptions: Apollo.QueryHookOptions<AdminOrganizerEditPageQuery, AdminOrganizerEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminOrganizerEditPageQuery, AdminOrganizerEditPageQueryVariables>(AdminOrganizerEditPageDocument, options);
      }
export function useAdminOrganizerEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminOrganizerEditPageQuery, AdminOrganizerEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminOrganizerEditPageQuery, AdminOrganizerEditPageQueryVariables>(AdminOrganizerEditPageDocument, options);
        }
export type AdminOrganizerEditPageQueryHookResult = ReturnType<typeof useAdminOrganizerEditPageQuery>;
export type AdminOrganizerEditPageLazyQueryHookResult = ReturnType<typeof useAdminOrganizerEditPageLazyQuery>;
export type AdminOrganizerEditPageQueryResult = Apollo.QueryResult<AdminOrganizerEditPageQuery, AdminOrganizerEditPageQueryVariables>;
export const AdminOrganizerEditPageUpdateOrganizerDocument = gql`
    mutation AdminOrganizerEditPageUpdateOrganizer($organizerSlug: String!, $attributes: OrganizerAttributes!) {
  updateOrganizer(input: {organizerSlug: $organizerSlug, attributes: $attributes}) {
    organizer {
      ...OrganizerForm
      ...OrganizerBreadcrumbs
    }
  }
}
    ${OrganizerFormFragmentDoc}
${OrganizerBreadcrumbsFragmentDoc}`;
export type AdminOrganizerEditPageUpdateOrganizerMutationFn = Apollo.MutationFunction<AdminOrganizerEditPageUpdateOrganizerMutation, AdminOrganizerEditPageUpdateOrganizerMutationVariables>;

/**
 * __useAdminOrganizerEditPageUpdateOrganizerMutation__
 *
 * To run a mutation, you first call `useAdminOrganizerEditPageUpdateOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminOrganizerEditPageUpdateOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminOrganizerEditPageUpdateOrganizerMutation, { data, loading, error }] = useAdminOrganizerEditPageUpdateOrganizerMutation({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAdminOrganizerEditPageUpdateOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<AdminOrganizerEditPageUpdateOrganizerMutation, AdminOrganizerEditPageUpdateOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminOrganizerEditPageUpdateOrganizerMutation, AdminOrganizerEditPageUpdateOrganizerMutationVariables>(AdminOrganizerEditPageUpdateOrganizerDocument, options);
      }
export type AdminOrganizerEditPageUpdateOrganizerMutationHookResult = ReturnType<typeof useAdminOrganizerEditPageUpdateOrganizerMutation>;
export type AdminOrganizerEditPageUpdateOrganizerMutationResult = Apollo.MutationResult<AdminOrganizerEditPageUpdateOrganizerMutation>;
export type AdminOrganizerEditPageUpdateOrganizerMutationOptions = Apollo.BaseMutationOptions<AdminOrganizerEditPageUpdateOrganizerMutation, AdminOrganizerEditPageUpdateOrganizerMutationVariables>;
export const AdminOrganizersPageDeleteDocument = gql`
    mutation AdminOrganizersPageDelete($organizerSlug: String!) {
  deleteOrganizer(input: {organizerSlug: $organizerSlug}) {
    organizer {
      id
    }
  }
}
    `;
export type AdminOrganizersPageDeleteMutationFn = Apollo.MutationFunction<AdminOrganizersPageDeleteMutation, AdminOrganizersPageDeleteMutationVariables>;

/**
 * __useAdminOrganizersPageDeleteMutation__
 *
 * To run a mutation, you first call `useAdminOrganizersPageDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminOrganizersPageDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminOrganizersPageDeleteMutation, { data, loading, error }] = useAdminOrganizersPageDeleteMutation({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *   },
 * });
 */
export function useAdminOrganizersPageDeleteMutation(baseOptions?: Apollo.MutationHookOptions<AdminOrganizersPageDeleteMutation, AdminOrganizersPageDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminOrganizersPageDeleteMutation, AdminOrganizersPageDeleteMutationVariables>(AdminOrganizersPageDeleteDocument, options);
      }
export type AdminOrganizersPageDeleteMutationHookResult = ReturnType<typeof useAdminOrganizersPageDeleteMutation>;
export type AdminOrganizersPageDeleteMutationResult = Apollo.MutationResult<AdminOrganizersPageDeleteMutation>;
export type AdminOrganizersPageDeleteMutationOptions = Apollo.BaseMutationOptions<AdminOrganizersPageDeleteMutation, AdminOrganizersPageDeleteMutationVariables>;
export const AdminOrganizersPageOrganizersDocument = gql`
    query AdminOrganizersPageOrganizers($after: String, $keyword: String) {
  organizers(first: 10, after: $after, keyword: $keyword) {
    edges {
      node {
        ...AdminOrganizersPageOrganizer
      }
      cursor
    }
    pageInfo {
      ...Pagination
    }
  }
}
    ${AdminOrganizersPageOrganizerFragmentDoc}
${PaginationFragmentDoc}`;

/**
 * __useAdminOrganizersPageOrganizersQuery__
 *
 * To run a query within a React component, call `useAdminOrganizersPageOrganizersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminOrganizersPageOrganizersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminOrganizersPageOrganizersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useAdminOrganizersPageOrganizersQuery(baseOptions?: Apollo.QueryHookOptions<AdminOrganizersPageOrganizersQuery, AdminOrganizersPageOrganizersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminOrganizersPageOrganizersQuery, AdminOrganizersPageOrganizersQueryVariables>(AdminOrganizersPageOrganizersDocument, options);
      }
export function useAdminOrganizersPageOrganizersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminOrganizersPageOrganizersQuery, AdminOrganizersPageOrganizersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminOrganizersPageOrganizersQuery, AdminOrganizersPageOrganizersQueryVariables>(AdminOrganizersPageOrganizersDocument, options);
        }
export type AdminOrganizersPageOrganizersQueryHookResult = ReturnType<typeof useAdminOrganizersPageOrganizersQuery>;
export type AdminOrganizersPageOrganizersLazyQueryHookResult = ReturnType<typeof useAdminOrganizersPageOrganizersLazyQuery>;
export type AdminOrganizersPageOrganizersQueryResult = Apollo.QueryResult<AdminOrganizersPageOrganizersQuery, AdminOrganizersPageOrganizersQueryVariables>;
export const AdminOrganizersNewPageCreateOrganizerDocument = gql`
    mutation AdminOrganizersNewPageCreateOrganizer($attributes: OrganizerAttributes!) {
  createOrganizer(input: {attributes: $attributes}) {
    organizer {
      id
    }
  }
}
    `;
export type AdminOrganizersNewPageCreateOrganizerMutationFn = Apollo.MutationFunction<AdminOrganizersNewPageCreateOrganizerMutation, AdminOrganizersNewPageCreateOrganizerMutationVariables>;

/**
 * __useAdminOrganizersNewPageCreateOrganizerMutation__
 *
 * To run a mutation, you first call `useAdminOrganizersNewPageCreateOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminOrganizersNewPageCreateOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminOrganizersNewPageCreateOrganizerMutation, { data, loading, error }] = useAdminOrganizersNewPageCreateOrganizerMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAdminOrganizersNewPageCreateOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<AdminOrganizersNewPageCreateOrganizerMutation, AdminOrganizersNewPageCreateOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminOrganizersNewPageCreateOrganizerMutation, AdminOrganizersNewPageCreateOrganizerMutationVariables>(AdminOrganizersNewPageCreateOrganizerDocument, options);
      }
export type AdminOrganizersNewPageCreateOrganizerMutationHookResult = ReturnType<typeof useAdminOrganizersNewPageCreateOrganizerMutation>;
export type AdminOrganizersNewPageCreateOrganizerMutationResult = Apollo.MutationResult<AdminOrganizersNewPageCreateOrganizerMutation>;
export type AdminOrganizersNewPageCreateOrganizerMutationOptions = Apollo.BaseMutationOptions<AdminOrganizersNewPageCreateOrganizerMutation, AdminOrganizersNewPageCreateOrganizerMutationVariables>;
export const AdminPlayerEditPageDocument = gql`
    query AdminPlayerEditPage($playerSlug: String!) {
  player(playerSlug: $playerSlug) {
    ...PlayerForm
    ...PlayerBreadcrumbs
  }
}
    ${PlayerFormFragmentDoc}
${PlayerBreadcrumbsFragmentDoc}`;

/**
 * __useAdminPlayerEditPageQuery__
 *
 * To run a query within a React component, call `useAdminPlayerEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminPlayerEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminPlayerEditPageQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function useAdminPlayerEditPageQuery(baseOptions: Apollo.QueryHookOptions<AdminPlayerEditPageQuery, AdminPlayerEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminPlayerEditPageQuery, AdminPlayerEditPageQueryVariables>(AdminPlayerEditPageDocument, options);
      }
export function useAdminPlayerEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminPlayerEditPageQuery, AdminPlayerEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminPlayerEditPageQuery, AdminPlayerEditPageQueryVariables>(AdminPlayerEditPageDocument, options);
        }
export type AdminPlayerEditPageQueryHookResult = ReturnType<typeof useAdminPlayerEditPageQuery>;
export type AdminPlayerEditPageLazyQueryHookResult = ReturnType<typeof useAdminPlayerEditPageLazyQuery>;
export type AdminPlayerEditPageQueryResult = Apollo.QueryResult<AdminPlayerEditPageQuery, AdminPlayerEditPageQueryVariables>;
export const AdminPlayerEditPageUpdatePlayerDocument = gql`
    mutation AdminPlayerEditPageUpdatePlayer($playerSlug: String!, $attributes: PlayerAttributes!) {
  updatePlayer(input: {playerSlug: $playerSlug, attributes: $attributes}) {
    player {
      ...PlayerForm
      ...PlayerBreadcrumbs
    }
  }
}
    ${PlayerFormFragmentDoc}
${PlayerBreadcrumbsFragmentDoc}`;
export type AdminPlayerEditPageUpdatePlayerMutationFn = Apollo.MutationFunction<AdminPlayerEditPageUpdatePlayerMutation, AdminPlayerEditPageUpdatePlayerMutationVariables>;

/**
 * __useAdminPlayerEditPageUpdatePlayerMutation__
 *
 * To run a mutation, you first call `useAdminPlayerEditPageUpdatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminPlayerEditPageUpdatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminPlayerEditPageUpdatePlayerMutation, { data, loading, error }] = useAdminPlayerEditPageUpdatePlayerMutation({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAdminPlayerEditPageUpdatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<AdminPlayerEditPageUpdatePlayerMutation, AdminPlayerEditPageUpdatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminPlayerEditPageUpdatePlayerMutation, AdminPlayerEditPageUpdatePlayerMutationVariables>(AdminPlayerEditPageUpdatePlayerDocument, options);
      }
export type AdminPlayerEditPageUpdatePlayerMutationHookResult = ReturnType<typeof useAdminPlayerEditPageUpdatePlayerMutation>;
export type AdminPlayerEditPageUpdatePlayerMutationResult = Apollo.MutationResult<AdminPlayerEditPageUpdatePlayerMutation>;
export type AdminPlayerEditPageUpdatePlayerMutationOptions = Apollo.BaseMutationOptions<AdminPlayerEditPageUpdatePlayerMutation, AdminPlayerEditPageUpdatePlayerMutationVariables>;
export const AdminPlayersNewPageCreatePlayerDocument = gql`
    mutation AdminPlayersNewPageCreatePlayer($attributes: PlayerAttributes!) {
  createPlayer(input: {attributes: $attributes}) {
    player {
      id
    }
  }
}
    `;
export type AdminPlayersNewPageCreatePlayerMutationFn = Apollo.MutationFunction<AdminPlayersNewPageCreatePlayerMutation, AdminPlayersNewPageCreatePlayerMutationVariables>;

/**
 * __useAdminPlayersNewPageCreatePlayerMutation__
 *
 * To run a mutation, you first call `useAdminPlayersNewPageCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminPlayersNewPageCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminPlayersNewPageCreatePlayerMutation, { data, loading, error }] = useAdminPlayersNewPageCreatePlayerMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAdminPlayersNewPageCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<AdminPlayersNewPageCreatePlayerMutation, AdminPlayersNewPageCreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminPlayersNewPageCreatePlayerMutation, AdminPlayersNewPageCreatePlayerMutationVariables>(AdminPlayersNewPageCreatePlayerDocument, options);
      }
export type AdminPlayersNewPageCreatePlayerMutationHookResult = ReturnType<typeof useAdminPlayersNewPageCreatePlayerMutation>;
export type AdminPlayersNewPageCreatePlayerMutationResult = Apollo.MutationResult<AdminPlayersNewPageCreatePlayerMutation>;
export type AdminPlayersNewPageCreatePlayerMutationOptions = Apollo.BaseMutationOptions<AdminPlayersNewPageCreatePlayerMutation, AdminPlayersNewPageCreatePlayerMutationVariables>;
export const UpdateCurrentUserDocument = gql`
    mutation UpdateCurrentUser($attributes: CurrentUserAttributes!) {
  updateCurrentUser(input: {attributes: $attributes}) {
    currentUser {
      ...CurrentUser
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export type UpdateCurrentUserMutationFn = Apollo.MutationFunction<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;

/**
 * __useUpdateCurrentUserMutation__
 *
 * To run a mutation, you first call `useUpdateCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrentUserMutation, { data, loading, error }] = useUpdateCurrentUserMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>(UpdateCurrentUserDocument, options);
      }
export type UpdateCurrentUserMutationHookResult = ReturnType<typeof useUpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationResult = Apollo.MutationResult<UpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationOptions = Apollo.BaseMutationOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;
export const CreateBattleDocument = gql`
    mutation CreateBattle($attributes: BattleAttributes!) {
  createBattle(input: {attributes: $attributes}) {
    battle {
      id
    }
  }
}
    `;
export type CreateBattleMutationFn = Apollo.MutationFunction<CreateBattleMutation, CreateBattleMutationVariables>;

/**
 * __useCreateBattleMutation__
 *
 * To run a mutation, you first call `useCreateBattleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBattleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBattleMutation, { data, loading, error }] = useCreateBattleMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateBattleMutation(baseOptions?: Apollo.MutationHookOptions<CreateBattleMutation, CreateBattleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBattleMutation, CreateBattleMutationVariables>(CreateBattleDocument, options);
      }
export type CreateBattleMutationHookResult = ReturnType<typeof useCreateBattleMutation>;
export type CreateBattleMutationResult = Apollo.MutationResult<CreateBattleMutation>;
export type CreateBattleMutationOptions = Apollo.BaseMutationOptions<CreateBattleMutation, CreateBattleMutationVariables>;
export const UpdateBattleDocument = gql`
    mutation UpdateBattle($battleId: ID!, $attributes: BattleAttributes!) {
  updateBattle(input: {battleId: $battleId, attributes: $attributes}) {
    battle {
      ...AdminBattlesPageBattleReslut
    }
  }
}
    ${AdminBattlesPageBattleReslutFragmentDoc}`;
export type UpdateBattleMutationFn = Apollo.MutationFunction<UpdateBattleMutation, UpdateBattleMutationVariables>;

/**
 * __useUpdateBattleMutation__
 *
 * To run a mutation, you first call `useUpdateBattleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBattleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBattleMutation, { data, loading, error }] = useUpdateBattleMutation({
 *   variables: {
 *      battleId: // value for 'battleId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useUpdateBattleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBattleMutation, UpdateBattleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBattleMutation, UpdateBattleMutationVariables>(UpdateBattleDocument, options);
      }
export type UpdateBattleMutationHookResult = ReturnType<typeof useUpdateBattleMutation>;
export type UpdateBattleMutationResult = Apollo.MutationResult<UpdateBattleMutation>;
export type UpdateBattleMutationOptions = Apollo.BaseMutationOptions<UpdateBattleMutation, UpdateBattleMutationVariables>;
export const DeleteBattleDocument = gql`
    mutation DeleteBattle($battleId: ID!) {
  deleteBattle(input: {battleId: $battleId}) {
    battle {
      id
    }
  }
}
    `;
export type DeleteBattleMutationFn = Apollo.MutationFunction<DeleteBattleMutation, DeleteBattleMutationVariables>;

/**
 * __useDeleteBattleMutation__
 *
 * To run a mutation, you first call `useDeleteBattleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBattleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBattleMutation, { data, loading, error }] = useDeleteBattleMutation({
 *   variables: {
 *      battleId: // value for 'battleId'
 *   },
 * });
 */
export function useDeleteBattleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBattleMutation, DeleteBattleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBattleMutation, DeleteBattleMutationVariables>(DeleteBattleDocument, options);
      }
export type DeleteBattleMutationHookResult = ReturnType<typeof useDeleteBattleMutation>;
export type DeleteBattleMutationResult = Apollo.MutationResult<DeleteBattleMutation>;
export type DeleteBattleMutationOptions = Apollo.BaseMutationOptions<DeleteBattleMutation, DeleteBattleMutationVariables>;
export const AdminBattlesPageDocument = gql`
    query AdminBattlesPage($tournamentVideoId: ID!) {
  tournamentVideo(tournamentVideoId: $tournamentVideoId) {
    id
    title
    youtubeVideoId
    tournament {
      id
      name
    }
  }
  players(first: 500) {
    nodes {
      ...PlayerSelectOption
    }
  }
  characters(first: 100) {
    nodes {
      ...CharacterSelectOption
    }
  }
}
    ${PlayerSelectOptionFragmentDoc}
${CharacterSelectOptionFragmentDoc}`;

/**
 * __useAdminBattlesPageQuery__
 *
 * To run a query within a React component, call `useAdminBattlesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminBattlesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminBattlesPageQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useAdminBattlesPageQuery(baseOptions: Apollo.QueryHookOptions<AdminBattlesPageQuery, AdminBattlesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminBattlesPageQuery, AdminBattlesPageQueryVariables>(AdminBattlesPageDocument, options);
      }
export function useAdminBattlesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminBattlesPageQuery, AdminBattlesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminBattlesPageQuery, AdminBattlesPageQueryVariables>(AdminBattlesPageDocument, options);
        }
export type AdminBattlesPageQueryHookResult = ReturnType<typeof useAdminBattlesPageQuery>;
export type AdminBattlesPageLazyQueryHookResult = ReturnType<typeof useAdminBattlesPageLazyQuery>;
export type AdminBattlesPageQueryResult = Apollo.QueryResult<AdminBattlesPageQuery, AdminBattlesPageQueryVariables>;
export const AdminBattlesPageBattlesDocument = gql`
    query AdminBattlesPageBattles($tournamentVideoId: ID!) {
  battles(tournamentVideoId: $tournamentVideoId, first: 200) {
    nodes {
      ...AdminBattlesPageBattleReslut
    }
  }
}
    ${AdminBattlesPageBattleReslutFragmentDoc}`;

/**
 * __useAdminBattlesPageBattlesQuery__
 *
 * To run a query within a React component, call `useAdminBattlesPageBattlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminBattlesPageBattlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminBattlesPageBattlesQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useAdminBattlesPageBattlesQuery(baseOptions: Apollo.QueryHookOptions<AdminBattlesPageBattlesQuery, AdminBattlesPageBattlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminBattlesPageBattlesQuery, AdminBattlesPageBattlesQueryVariables>(AdminBattlesPageBattlesDocument, options);
      }
export function useAdminBattlesPageBattlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminBattlesPageBattlesQuery, AdminBattlesPageBattlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminBattlesPageBattlesQuery, AdminBattlesPageBattlesQueryVariables>(AdminBattlesPageBattlesDocument, options);
        }
export type AdminBattlesPageBattlesQueryHookResult = ReturnType<typeof useAdminBattlesPageBattlesQuery>;
export type AdminBattlesPageBattlesLazyQueryHookResult = ReturnType<typeof useAdminBattlesPageBattlesLazyQuery>;
export type AdminBattlesPageBattlesQueryResult = Apollo.QueryResult<AdminBattlesPageBattlesQuery, AdminBattlesPageBattlesQueryVariables>;
export const AdminTournamentVideoEditPageDocument = gql`
    query AdminTournamentVideoEditPage($tournamentVideoId: ID!) {
  tournamentVideo(tournamentVideoId: $tournamentVideoId) {
    ...TournamentVideoForm
    ...TournamentVideoBreadcrumbs
  }
}
    ${TournamentVideoFormFragmentDoc}
${TournamentVideoBreadcrumbsFragmentDoc}`;

/**
 * __useAdminTournamentVideoEditPageQuery__
 *
 * To run a query within a React component, call `useAdminTournamentVideoEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentVideoEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminTournamentVideoEditPageQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useAdminTournamentVideoEditPageQuery(baseOptions: Apollo.QueryHookOptions<AdminTournamentVideoEditPageQuery, AdminTournamentVideoEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminTournamentVideoEditPageQuery, AdminTournamentVideoEditPageQueryVariables>(AdminTournamentVideoEditPageDocument, options);
      }
export function useAdminTournamentVideoEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminTournamentVideoEditPageQuery, AdminTournamentVideoEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminTournamentVideoEditPageQuery, AdminTournamentVideoEditPageQueryVariables>(AdminTournamentVideoEditPageDocument, options);
        }
export type AdminTournamentVideoEditPageQueryHookResult = ReturnType<typeof useAdminTournamentVideoEditPageQuery>;
export type AdminTournamentVideoEditPageLazyQueryHookResult = ReturnType<typeof useAdminTournamentVideoEditPageLazyQuery>;
export type AdminTournamentVideoEditPageQueryResult = Apollo.QueryResult<AdminTournamentVideoEditPageQuery, AdminTournamentVideoEditPageQueryVariables>;
export const AdminTournamentVideoEditPageUpdateDocument = gql`
    mutation AdminTournamentVideoEditPageUpdate($tournamentVideoId: ID!, $attributes: TournamentVideoAttributes!) {
  updateTournamentVideo(
    input: {tournamentVideoId: $tournamentVideoId, attributes: $attributes}
  ) {
    tournamentVideo {
      ...TournamentVideoForm
    }
  }
}
    ${TournamentVideoFormFragmentDoc}`;
export type AdminTournamentVideoEditPageUpdateMutationFn = Apollo.MutationFunction<AdminTournamentVideoEditPageUpdateMutation, AdminTournamentVideoEditPageUpdateMutationVariables>;

/**
 * __useAdminTournamentVideoEditPageUpdateMutation__
 *
 * To run a mutation, you first call `useAdminTournamentVideoEditPageUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentVideoEditPageUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTournamentVideoEditPageUpdateMutation, { data, loading, error }] = useAdminTournamentVideoEditPageUpdateMutation({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAdminTournamentVideoEditPageUpdateMutation(baseOptions?: Apollo.MutationHookOptions<AdminTournamentVideoEditPageUpdateMutation, AdminTournamentVideoEditPageUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTournamentVideoEditPageUpdateMutation, AdminTournamentVideoEditPageUpdateMutationVariables>(AdminTournamentVideoEditPageUpdateDocument, options);
      }
export type AdminTournamentVideoEditPageUpdateMutationHookResult = ReturnType<typeof useAdminTournamentVideoEditPageUpdateMutation>;
export type AdminTournamentVideoEditPageUpdateMutationResult = Apollo.MutationResult<AdminTournamentVideoEditPageUpdateMutation>;
export type AdminTournamentVideoEditPageUpdateMutationOptions = Apollo.BaseMutationOptions<AdminTournamentVideoEditPageUpdateMutation, AdminTournamentVideoEditPageUpdateMutationVariables>;
export const AdminTournamentEditPageDocument = gql`
    query AdminTournamentEditPage($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
    ...TournamentForm
    ...TournamentBreadcrumbs
  }
}
    ${TournamentFormFragmentDoc}
${TournamentBreadcrumbsFragmentDoc}`;

/**
 * __useAdminTournamentEditPageQuery__
 *
 * To run a query within a React component, call `useAdminTournamentEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminTournamentEditPageQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useAdminTournamentEditPageQuery(baseOptions: Apollo.QueryHookOptions<AdminTournamentEditPageQuery, AdminTournamentEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminTournamentEditPageQuery, AdminTournamentEditPageQueryVariables>(AdminTournamentEditPageDocument, options);
      }
export function useAdminTournamentEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminTournamentEditPageQuery, AdminTournamentEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminTournamentEditPageQuery, AdminTournamentEditPageQueryVariables>(AdminTournamentEditPageDocument, options);
        }
export type AdminTournamentEditPageQueryHookResult = ReturnType<typeof useAdminTournamentEditPageQuery>;
export type AdminTournamentEditPageLazyQueryHookResult = ReturnType<typeof useAdminTournamentEditPageLazyQuery>;
export type AdminTournamentEditPageQueryResult = Apollo.QueryResult<AdminTournamentEditPageQuery, AdminTournamentEditPageQueryVariables>;
export const AdminTournamentEditPageUpdateTournamentDocument = gql`
    mutation AdminTournamentEditPageUpdateTournament($tournamentId: ID!, $attributes: TournamentAttributes!) {
  updateTournament(input: {tournamentId: $tournamentId, attributes: $attributes}) {
    tournament {
      ...TournamentForm
      ...TournamentBreadcrumbs
    }
  }
}
    ${TournamentFormFragmentDoc}
${TournamentBreadcrumbsFragmentDoc}`;
export type AdminTournamentEditPageUpdateTournamentMutationFn = Apollo.MutationFunction<AdminTournamentEditPageUpdateTournamentMutation, AdminTournamentEditPageUpdateTournamentMutationVariables>;

/**
 * __useAdminTournamentEditPageUpdateTournamentMutation__
 *
 * To run a mutation, you first call `useAdminTournamentEditPageUpdateTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentEditPageUpdateTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTournamentEditPageUpdateTournamentMutation, { data, loading, error }] = useAdminTournamentEditPageUpdateTournamentMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAdminTournamentEditPageUpdateTournamentMutation(baseOptions?: Apollo.MutationHookOptions<AdminTournamentEditPageUpdateTournamentMutation, AdminTournamentEditPageUpdateTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTournamentEditPageUpdateTournamentMutation, AdminTournamentEditPageUpdateTournamentMutationVariables>(AdminTournamentEditPageUpdateTournamentDocument, options);
      }
export type AdminTournamentEditPageUpdateTournamentMutationHookResult = ReturnType<typeof useAdminTournamentEditPageUpdateTournamentMutation>;
export type AdminTournamentEditPageUpdateTournamentMutationResult = Apollo.MutationResult<AdminTournamentEditPageUpdateTournamentMutation>;
export type AdminTournamentEditPageUpdateTournamentMutationOptions = Apollo.BaseMutationOptions<AdminTournamentEditPageUpdateTournamentMutation, AdminTournamentEditPageUpdateTournamentMutationVariables>;
export const AdminTournamentPageDocument = gql`
    query AdminTournamentPage($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
    id
    name
    description
    mainImageUrl
    startsAt
    standingsCount
    videosCount
    videos {
      id
      title
      youtubeVideoId
    }
  }
  players(first: 500) {
    nodes {
      ...PlayerSelectOption
    }
  }
}
    ${PlayerSelectOptionFragmentDoc}`;

/**
 * __useAdminTournamentPageQuery__
 *
 * To run a query within a React component, call `useAdminTournamentPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminTournamentPageQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useAdminTournamentPageQuery(baseOptions: Apollo.QueryHookOptions<AdminTournamentPageQuery, AdminTournamentPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminTournamentPageQuery, AdminTournamentPageQueryVariables>(AdminTournamentPageDocument, options);
      }
export function useAdminTournamentPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminTournamentPageQuery, AdminTournamentPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminTournamentPageQuery, AdminTournamentPageQueryVariables>(AdminTournamentPageDocument, options);
        }
export type AdminTournamentPageQueryHookResult = ReturnType<typeof useAdminTournamentPageQuery>;
export type AdminTournamentPageLazyQueryHookResult = ReturnType<typeof useAdminTournamentPageLazyQuery>;
export type AdminTournamentPageQueryResult = Apollo.QueryResult<AdminTournamentPageQuery, AdminTournamentPageQueryVariables>;
export const AdminTournamentPageStandingsDocument = gql`
    query AdminTournamentPageStandings($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
    id
    standings {
      id
      place
      player {
        id
        name
        avatarUrl
      }
    }
  }
}
    `;

/**
 * __useAdminTournamentPageStandingsQuery__
 *
 * To run a query within a React component, call `useAdminTournamentPageStandingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentPageStandingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminTournamentPageStandingsQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useAdminTournamentPageStandingsQuery(baseOptions: Apollo.QueryHookOptions<AdminTournamentPageStandingsQuery, AdminTournamentPageStandingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminTournamentPageStandingsQuery, AdminTournamentPageStandingsQueryVariables>(AdminTournamentPageStandingsDocument, options);
      }
export function useAdminTournamentPageStandingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminTournamentPageStandingsQuery, AdminTournamentPageStandingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminTournamentPageStandingsQuery, AdminTournamentPageStandingsQueryVariables>(AdminTournamentPageStandingsDocument, options);
        }
export type AdminTournamentPageStandingsQueryHookResult = ReturnType<typeof useAdminTournamentPageStandingsQuery>;
export type AdminTournamentPageStandingsLazyQueryHookResult = ReturnType<typeof useAdminTournamentPageStandingsLazyQuery>;
export type AdminTournamentPageStandingsQueryResult = Apollo.QueryResult<AdminTournamentPageStandingsQuery, AdminTournamentPageStandingsQueryVariables>;
export const AdminTournamentPageVideosDocument = gql`
    query AdminTournamentPageVideos($tournamentId: ID!) {
  tournamentVideos(tournamentId: $tournamentId) {
    nodes {
      id
      title
      thumbnailUrl
      battlesCount
      channel {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useAdminTournamentPageVideosQuery__
 *
 * To run a query within a React component, call `useAdminTournamentPageVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentPageVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminTournamentPageVideosQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useAdminTournamentPageVideosQuery(baseOptions: Apollo.QueryHookOptions<AdminTournamentPageVideosQuery, AdminTournamentPageVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminTournamentPageVideosQuery, AdminTournamentPageVideosQueryVariables>(AdminTournamentPageVideosDocument, options);
      }
export function useAdminTournamentPageVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminTournamentPageVideosQuery, AdminTournamentPageVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminTournamentPageVideosQuery, AdminTournamentPageVideosQueryVariables>(AdminTournamentPageVideosDocument, options);
        }
export type AdminTournamentPageVideosQueryHookResult = ReturnType<typeof useAdminTournamentPageVideosQuery>;
export type AdminTournamentPageVideosLazyQueryHookResult = ReturnType<typeof useAdminTournamentPageVideosLazyQuery>;
export type AdminTournamentPageVideosQueryResult = Apollo.QueryResult<AdminTournamentPageVideosQuery, AdminTournamentPageVideosQueryVariables>;
export const AdminTournamentPageCreateStandingDocument = gql`
    mutation AdminTournamentPageCreateStanding($tournamentId: ID!, $attributes: StandingAttributes!) {
  createStanding(input: {tournamentId: $tournamentId, attributes: $attributes}) {
    standing {
      id
    }
  }
}
    `;
export type AdminTournamentPageCreateStandingMutationFn = Apollo.MutationFunction<AdminTournamentPageCreateStandingMutation, AdminTournamentPageCreateStandingMutationVariables>;

/**
 * __useAdminTournamentPageCreateStandingMutation__
 *
 * To run a mutation, you first call `useAdminTournamentPageCreateStandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentPageCreateStandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTournamentPageCreateStandingMutation, { data, loading, error }] = useAdminTournamentPageCreateStandingMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useAdminTournamentPageCreateStandingMutation(baseOptions?: Apollo.MutationHookOptions<AdminTournamentPageCreateStandingMutation, AdminTournamentPageCreateStandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTournamentPageCreateStandingMutation, AdminTournamentPageCreateStandingMutationVariables>(AdminTournamentPageCreateStandingDocument, options);
      }
export type AdminTournamentPageCreateStandingMutationHookResult = ReturnType<typeof useAdminTournamentPageCreateStandingMutation>;
export type AdminTournamentPageCreateStandingMutationResult = Apollo.MutationResult<AdminTournamentPageCreateStandingMutation>;
export type AdminTournamentPageCreateStandingMutationOptions = Apollo.BaseMutationOptions<AdminTournamentPageCreateStandingMutation, AdminTournamentPageCreateStandingMutationVariables>;
export const AdminTournamentPageDeleteStandingDocument = gql`
    mutation AdminTournamentPageDeleteStanding($standingId: ID!) {
  deleteStanding(input: {standingId: $standingId}) {
    standing {
      id
    }
  }
}
    `;
export type AdminTournamentPageDeleteStandingMutationFn = Apollo.MutationFunction<AdminTournamentPageDeleteStandingMutation, AdminTournamentPageDeleteStandingMutationVariables>;

/**
 * __useAdminTournamentPageDeleteStandingMutation__
 *
 * To run a mutation, you first call `useAdminTournamentPageDeleteStandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentPageDeleteStandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTournamentPageDeleteStandingMutation, { data, loading, error }] = useAdminTournamentPageDeleteStandingMutation({
 *   variables: {
 *      standingId: // value for 'standingId'
 *   },
 * });
 */
export function useAdminTournamentPageDeleteStandingMutation(baseOptions?: Apollo.MutationHookOptions<AdminTournamentPageDeleteStandingMutation, AdminTournamentPageDeleteStandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTournamentPageDeleteStandingMutation, AdminTournamentPageDeleteStandingMutationVariables>(AdminTournamentPageDeleteStandingDocument, options);
      }
export type AdminTournamentPageDeleteStandingMutationHookResult = ReturnType<typeof useAdminTournamentPageDeleteStandingMutation>;
export type AdminTournamentPageDeleteStandingMutationResult = Apollo.MutationResult<AdminTournamentPageDeleteStandingMutation>;
export type AdminTournamentPageDeleteStandingMutationOptions = Apollo.BaseMutationOptions<AdminTournamentPageDeleteStandingMutation, AdminTournamentPageDeleteStandingMutationVariables>;
export const AdminTournamentPageCreateVideoDocument = gql`
    mutation AdminTournamentPageCreateVideo($tournamentId: ID!, $url: String!) {
  createTournamentVideo(input: {tournamentId: $tournamentId, url: $url}) {
    tournamentVideo {
      id
    }
  }
}
    `;
export type AdminTournamentPageCreateVideoMutationFn = Apollo.MutationFunction<AdminTournamentPageCreateVideoMutation, AdminTournamentPageCreateVideoMutationVariables>;

/**
 * __useAdminTournamentPageCreateVideoMutation__
 *
 * To run a mutation, you first call `useAdminTournamentPageCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentPageCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTournamentPageCreateVideoMutation, { data, loading, error }] = useAdminTournamentPageCreateVideoMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useAdminTournamentPageCreateVideoMutation(baseOptions?: Apollo.MutationHookOptions<AdminTournamentPageCreateVideoMutation, AdminTournamentPageCreateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTournamentPageCreateVideoMutation, AdminTournamentPageCreateVideoMutationVariables>(AdminTournamentPageCreateVideoDocument, options);
      }
export type AdminTournamentPageCreateVideoMutationHookResult = ReturnType<typeof useAdminTournamentPageCreateVideoMutation>;
export type AdminTournamentPageCreateVideoMutationResult = Apollo.MutationResult<AdminTournamentPageCreateVideoMutation>;
export type AdminTournamentPageCreateVideoMutationOptions = Apollo.BaseMutationOptions<AdminTournamentPageCreateVideoMutation, AdminTournamentPageCreateVideoMutationVariables>;
export const AdminTournamentPageDeleteVideoDocument = gql`
    mutation AdminTournamentPageDeleteVideo($tournamentVideoId: ID!) {
  deleteTournamentVideo(input: {tournamentVideoId: $tournamentVideoId}) {
    tournamentVideo {
      id
    }
  }
}
    `;
export type AdminTournamentPageDeleteVideoMutationFn = Apollo.MutationFunction<AdminTournamentPageDeleteVideoMutation, AdminTournamentPageDeleteVideoMutationVariables>;

/**
 * __useAdminTournamentPageDeleteVideoMutation__
 *
 * To run a mutation, you first call `useAdminTournamentPageDeleteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminTournamentPageDeleteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminTournamentPageDeleteVideoMutation, { data, loading, error }] = useAdminTournamentPageDeleteVideoMutation({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useAdminTournamentPageDeleteVideoMutation(baseOptions?: Apollo.MutationHookOptions<AdminTournamentPageDeleteVideoMutation, AdminTournamentPageDeleteVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminTournamentPageDeleteVideoMutation, AdminTournamentPageDeleteVideoMutationVariables>(AdminTournamentPageDeleteVideoDocument, options);
      }
export type AdminTournamentPageDeleteVideoMutationHookResult = ReturnType<typeof useAdminTournamentPageDeleteVideoMutation>;
export type AdminTournamentPageDeleteVideoMutationResult = Apollo.MutationResult<AdminTournamentPageDeleteVideoMutation>;
export type AdminTournamentPageDeleteVideoMutationOptions = Apollo.BaseMutationOptions<AdminTournamentPageDeleteVideoMutation, AdminTournamentPageDeleteVideoMutationVariables>;
export const CreateTournamentDocument = gql`
    mutation CreateTournament($attributes: TournamentAttributes!) {
  createTournament(input: {attributes: $attributes}) {
    tournament {
      id
    }
  }
}
    `;
export type CreateTournamentMutationFn = Apollo.MutationFunction<CreateTournamentMutation, CreateTournamentMutationVariables>;

/**
 * __useCreateTournamentMutation__
 *
 * To run a mutation, you first call `useCreateTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTournamentMutation, { data, loading, error }] = useCreateTournamentMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateTournamentMutation(baseOptions?: Apollo.MutationHookOptions<CreateTournamentMutation, CreateTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTournamentMutation, CreateTournamentMutationVariables>(CreateTournamentDocument, options);
      }
export type CreateTournamentMutationHookResult = ReturnType<typeof useCreateTournamentMutation>;
export type CreateTournamentMutationResult = Apollo.MutationResult<CreateTournamentMutation>;
export type CreateTournamentMutationOptions = Apollo.BaseMutationOptions<CreateTournamentMutation, CreateTournamentMutationVariables>;
export const TopPageDocument = gql`
    query TopPage {
  tournaments(first: 3, thisWeek: true) {
    nodes {
      ...TournamentCard
    }
  }
  players(first: 4) {
    nodes {
      ...PlayerCard
    }
  }
  characters(first: 4, order: use_rate) {
    nodes {
      ...CharacterCard
    }
  }
  articles(first: 3) {
    nodes {
      ...ArticleCard
    }
  }
}
    ${TournamentCardFragmentDoc}
${PlayerCardFragmentDoc}
${CharacterCardFragmentDoc}
${ArticleCardFragmentDoc}`;

/**
 * __useTopPageQuery__
 *
 * To run a query within a React component, call `useTopPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopPageQuery(baseOptions?: Apollo.QueryHookOptions<TopPageQuery, TopPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopPageQuery, TopPageQueryVariables>(TopPageDocument, options);
      }
export function useTopPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopPageQuery, TopPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopPageQuery, TopPageQueryVariables>(TopPageDocument, options);
        }
export type TopPageQueryHookResult = ReturnType<typeof useTopPageQuery>;
export type TopPageLazyQueryHookResult = ReturnType<typeof useTopPageLazyQuery>;
export type TopPageQueryResult = Apollo.QueryResult<TopPageQuery, TopPageQueryVariables>;
export const PlayersPageDocument = gql`
    query PlayersPage {
  players(first: 20) {
    nodes {
      ...PlayerCard
    }
  }
}
    ${PlayerCardFragmentDoc}`;

/**
 * __usePlayersPageQuery__
 *
 * To run a query within a React component, call `usePlayersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersPageQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayersPageQuery(baseOptions?: Apollo.QueryHookOptions<PlayersPageQuery, PlayersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayersPageQuery, PlayersPageQueryVariables>(PlayersPageDocument, options);
      }
export function usePlayersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayersPageQuery, PlayersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayersPageQuery, PlayersPageQueryVariables>(PlayersPageDocument, options);
        }
export type PlayersPageQueryHookResult = ReturnType<typeof usePlayersPageQuery>;
export type PlayersPageLazyQueryHookResult = ReturnType<typeof usePlayersPageLazyQuery>;
export type PlayersPageQueryResult = Apollo.QueryResult<PlayersPageQuery, PlayersPageQueryVariables>;
export const PlayerPageDocument = gql`
    query PlayerPage($playerSlug: String!) {
  player(playerSlug: $playerSlug) {
    ...PlayerBreadcrumbs
    ...PlayerProfile
    ...PlayerTabs
    description
  }
}
    ${PlayerBreadcrumbsFragmentDoc}
${PlayerProfileFragmentDoc}
${PlayerTabsFragmentDoc}`;

/**
 * __usePlayerPageQuery__
 *
 * To run a query within a React component, call `usePlayerPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerPageQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function usePlayerPageQuery(baseOptions: Apollo.QueryHookOptions<PlayerPageQuery, PlayerPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerPageQuery, PlayerPageQueryVariables>(PlayerPageDocument, options);
      }
export function usePlayerPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerPageQuery, PlayerPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerPageQuery, PlayerPageQueryVariables>(PlayerPageDocument, options);
        }
export type PlayerPageQueryHookResult = ReturnType<typeof usePlayerPageQuery>;
export type PlayerPageLazyQueryHookResult = ReturnType<typeof usePlayerPageLazyQuery>;
export type PlayerPageQueryResult = Apollo.QueryResult<PlayerPageQuery, PlayerPageQueryVariables>;
export const PlayerBattlesPageDocument = gql`
    query PlayerBattlesPage($playerSlug: String!) {
  player(playerSlug: $playerSlug) {
    ...PlayerBreadcrumbs
    ...PlayerProfile
    ...PlayerTabs
  }
}
    ${PlayerBreadcrumbsFragmentDoc}
${PlayerProfileFragmentDoc}
${PlayerTabsFragmentDoc}`;

/**
 * __usePlayerBattlesPageQuery__
 *
 * To run a query within a React component, call `usePlayerBattlesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerBattlesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerBattlesPageQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function usePlayerBattlesPageQuery(baseOptions: Apollo.QueryHookOptions<PlayerBattlesPageQuery, PlayerBattlesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerBattlesPageQuery, PlayerBattlesPageQueryVariables>(PlayerBattlesPageDocument, options);
      }
export function usePlayerBattlesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerBattlesPageQuery, PlayerBattlesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerBattlesPageQuery, PlayerBattlesPageQueryVariables>(PlayerBattlesPageDocument, options);
        }
export type PlayerBattlesPageQueryHookResult = ReturnType<typeof usePlayerBattlesPageQuery>;
export type PlayerBattlesPageLazyQueryHookResult = ReturnType<typeof usePlayerBattlesPageLazyQuery>;
export type PlayerBattlesPageQueryResult = Apollo.QueryResult<PlayerBattlesPageQuery, PlayerBattlesPageQueryVariables>;
export const PlayerStandingsPageDocument = gql`
    query PlayerStandingsPage($playerSlug: String!) {
  player(playerSlug: $playerSlug) {
    ...PlayerBreadcrumbs
    ...PlayerProfile
    ...PlayerTabs
    standings(first: 10) {
      nodes {
        ...PlayerStandingCard
      }
    }
  }
}
    ${PlayerBreadcrumbsFragmentDoc}
${PlayerProfileFragmentDoc}
${PlayerTabsFragmentDoc}
${PlayerStandingCardFragmentDoc}`;

/**
 * __usePlayerStandingsPageQuery__
 *
 * To run a query within a React component, call `usePlayerStandingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerStandingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerStandingsPageQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function usePlayerStandingsPageQuery(baseOptions: Apollo.QueryHookOptions<PlayerStandingsPageQuery, PlayerStandingsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerStandingsPageQuery, PlayerStandingsPageQueryVariables>(PlayerStandingsPageDocument, options);
      }
export function usePlayerStandingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerStandingsPageQuery, PlayerStandingsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerStandingsPageQuery, PlayerStandingsPageQueryVariables>(PlayerStandingsPageDocument, options);
        }
export type PlayerStandingsPageQueryHookResult = ReturnType<typeof usePlayerStandingsPageQuery>;
export type PlayerStandingsPageLazyQueryHookResult = ReturnType<typeof usePlayerStandingsPageLazyQuery>;
export type PlayerStandingsPageQueryResult = Apollo.QueryResult<PlayerStandingsPageQuery, PlayerStandingsPageQueryVariables>;
export const TournamentsPageDocument = gql`
    query TournamentsPage {
  tournaments(first: 12) {
    nodes {
      ...TournamentCard
    }
  }
}
    ${TournamentCardFragmentDoc}`;

/**
 * __useTournamentsPageQuery__
 *
 * To run a query within a React component, call `useTournamentsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useTournamentsPageQuery(baseOptions?: Apollo.QueryHookOptions<TournamentsPageQuery, TournamentsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentsPageQuery, TournamentsPageQueryVariables>(TournamentsPageDocument, options);
      }
export function useTournamentsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentsPageQuery, TournamentsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentsPageQuery, TournamentsPageQueryVariables>(TournamentsPageDocument, options);
        }
export type TournamentsPageQueryHookResult = ReturnType<typeof useTournamentsPageQuery>;
export type TournamentsPageLazyQueryHookResult = ReturnType<typeof useTournamentsPageLazyQuery>;
export type TournamentsPageQueryResult = Apollo.QueryResult<TournamentsPageQuery, TournamentsPageQueryVariables>;
export const TournamentPageDocument = gql`
    query TournamentPage($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
    ...TournamentTabs
    id
    name
    mainImageUrl
    url
    streamingUrl
    description
    startsAt
    standings {
      id
      place
      player {
        id
        slug
        name
        avatarUrl
      }
    }
    videos {
      id
      label
      battlesCount
    }
  }
}
    ${TournamentTabsFragmentDoc}`;

/**
 * __useTournamentPageQuery__
 *
 * To run a query within a React component, call `useTournamentPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentPageQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useTournamentPageQuery(baseOptions: Apollo.QueryHookOptions<TournamentPageQuery, TournamentPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentPageQuery, TournamentPageQueryVariables>(TournamentPageDocument, options);
      }
export function useTournamentPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentPageQuery, TournamentPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentPageQuery, TournamentPageQueryVariables>(TournamentPageDocument, options);
        }
export type TournamentPageQueryHookResult = ReturnType<typeof useTournamentPageQuery>;
export type TournamentPageLazyQueryHookResult = ReturnType<typeof useTournamentPageLazyQuery>;
export type TournamentPageQueryResult = Apollo.QueryResult<TournamentPageQuery, TournamentPageQueryVariables>;
export const TournamentBattlesPageDocument = gql`
    query TournamentBattlesPage($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
    ...TournamentBreadcrumbs
    ...TournamentTabs
  }
}
    ${TournamentBreadcrumbsFragmentDoc}
${TournamentTabsFragmentDoc}`;

/**
 * __useTournamentBattlesPageQuery__
 *
 * To run a query within a React component, call `useTournamentBattlesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentBattlesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentBattlesPageQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useTournamentBattlesPageQuery(baseOptions: Apollo.QueryHookOptions<TournamentBattlesPageQuery, TournamentBattlesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentBattlesPageQuery, TournamentBattlesPageQueryVariables>(TournamentBattlesPageDocument, options);
      }
export function useTournamentBattlesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentBattlesPageQuery, TournamentBattlesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentBattlesPageQuery, TournamentBattlesPageQueryVariables>(TournamentBattlesPageDocument, options);
        }
export type TournamentBattlesPageQueryHookResult = ReturnType<typeof useTournamentBattlesPageQuery>;
export type TournamentBattlesPageLazyQueryHookResult = ReturnType<typeof useTournamentBattlesPageLazyQuery>;
export type TournamentBattlesPageQueryResult = Apollo.QueryResult<TournamentBattlesPageQuery, TournamentBattlesPageQueryVariables>;