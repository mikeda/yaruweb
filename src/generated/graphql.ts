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
  faved: Scalars['Boolean'];
  favsCount: Scalars['Int'];
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

export type ArticleCollection = {
  __typename?: 'ArticleCollection';
  paging: Paging;
  records: Array<Article>;
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
  round?: Maybe<BattleRound>;
  sides: Array<BattleSide>;
  startSec: Scalars['Int'];
  tournamentVideo: TournamentVideo;
};

export type BattleAttributes = {
  round?: InputMaybe<BattleRound>;
  sides: Array<BattleSideAttributes>;
  startSec: Scalars['Int'];
  tournamentVideoId: Scalars['ID'];
};

export type BattleCollection = {
  __typename?: 'BattleCollection';
  paging: Paging;
  records: Array<Battle>;
};

export type BattleCount = {
  __typename?: 'BattleCount';
  character: Character;
  count: Scalars['Int'];
  id: Scalars['ID'];
  player: Player;
};

export type BattleCountCollection = {
  __typename?: 'BattleCountCollection';
  paging: Paging;
  records: Array<BattleCount>;
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

export type CharacterCollection = {
  __typename?: 'CharacterCollection';
  paging: Paging;
  records: Array<Character>;
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

/** Autogenerated input type of FavArticle */
export type FavArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of FavArticle */
export type FavArticlePayload = {
  __typename?: 'FavArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  favArticle?: Maybe<FavArticlePayload>;
  publishArticle?: Maybe<PublishArticlePayload>;
  setUserAvatar?: Maybe<SetUserAvatarPayload>;
  stopArticle?: Maybe<StopArticlePayload>;
  unfavArticle?: Maybe<UnfavArticlePayload>;
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


export type MutationFavArticleArgs = {
  input: FavArticleInput;
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


export type MutationUnfavArticleArgs = {
  input: UnfavArticleInput;
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
  New = 'new',
  /** 人気 */
  Popular = 'popular'
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

export type OrganizerCollection = {
  __typename?: 'OrganizerCollection';
  paging: Paging;
  records: Array<Organizer>;
};

export type Paging = {
  __typename?: 'Paging';
  currentPage: Scalars['Int'];
  hasNext: Scalars['Boolean'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
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
  standingsCount: Scalars['Int'];
  streamingUrl?: Maybe<Scalars['String']>;
  tonamelId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
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

export type PlayerCollection = {
  __typename?: 'PlayerCollection';
  paging: Paging;
  records: Array<Player>;
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
  allArticles: Array<Article>;
  allTournamentVideos: Array<TournamentVideo>;
  allTournaments: Array<Tournament>;
  article: Article;
  articles: ArticleCollection;
  battleCounts: BattleCountCollection;
  battles: BattleCollection;
  character: Character;
  characters: CharacterCollection;
  combo: Combo;
  comboCategories: Array<ComboCategory>;
  comboCategory: ComboCategory;
  combos: Array<Combo>;
  countries: Array<Country>;
  currentUser: CurrentUser;
  move: Move;
  moveCategories: Array<MoveCategory>;
  moveCategory: MoveCategory;
  moves: Array<Move>;
  myArticle: Article;
  myArticles: ArticleCollection;
  organizer: Organizer;
  organizers: OrganizerCollection;
  player: Player;
  players: PlayerCollection;
  standings: StandingCollection;
  tournament: Tournament;
  tournamentVideo: TournamentVideo;
  tournamentVideos: TournamentVideoCollection;
  tournaments: TournamentCollection;
};


export type QueryArticleArgs = {
  articleId: Scalars['ID'];
};


export type QueryArticlesArgs = {
  category?: InputMaybe<ArticleCategory>;
  order?: InputMaybe<Order>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};


export type QueryBattleCountsArgs = {
  characterSlug?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  playerSlug?: InputMaybe<Scalars['String']>;
};


export type QueryBattlesArgs = {
  characterSlug?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  playerSlug?: InputMaybe<Scalars['String']>;
  tournamentVideoId?: InputMaybe<Scalars['ID']>;
};


export type QueryCharacterArgs = {
  characterSlug: Scalars['String'];
};


export type QueryCharactersArgs = {
  order?: InputMaybe<CharacterOrder>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};


export type QueryComboArgs = {
  comboId: Scalars['ID'];
};


export type QueryComboCategoriesArgs = {
  characterSlug?: InputMaybe<Scalars['String']>;
};


export type QueryComboCategoryArgs = {
  comboCategoryId: Scalars['ID'];
};


export type QueryCombosArgs = {
  comboCategoryId: Scalars['ID'];
};


export type QueryMoveArgs = {
  moveId: Scalars['ID'];
};


export type QueryMoveCategoriesArgs = {
  characterSlug?: InputMaybe<Scalars['String']>;
};


export type QueryMoveCategoryArgs = {
  moveCategoryId: Scalars['ID'];
};


export type QueryMovesArgs = {
  moveCategoryId: Scalars['ID'];
};


export type QueryMyArticleArgs = {
  articleId: Scalars['ID'];
};


export type QueryMyArticlesArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};


export type QueryOrganizerArgs = {
  organizerSlug: Scalars['String'];
};


export type QueryOrganizersArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};


export type QueryPlayerArgs = {
  playerSlug: Scalars['String'];
};


export type QueryPlayersArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};


export type QueryStandingsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  playerSlug?: InputMaybe<Scalars['String']>;
  tournamentId?: InputMaybe<Scalars['ID']>;
};


export type QueryTournamentArgs = {
  tournamentId: Scalars['ID'];
};


export type QueryTournamentVideoArgs = {
  tournamentVideoId: Scalars['ID'];
};


export type QueryTournamentVideosArgs = {
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  tournamentId?: InputMaybe<Scalars['ID']>;
};


export type QueryTournamentsArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  organizerId?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  thisWeek?: InputMaybe<Scalars['Boolean']>;
};

export type ReversalAttributes = {
  finishFrame?: InputMaybe<Scalars['Int']>;
  startUpFrame?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
};

export type ReversalMove = {
  __typename?: 'ReversalMove';
  finishFrame?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  startUpFrame?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
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

export type StandingCollection = {
  __typename?: 'StandingCollection';
  paging: Paging;
  records: Array<Standing>;
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

export type TournamentCollection = {
  __typename?: 'TournamentCollection';
  paging: Paging;
  records: Array<Tournament>;
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

export type TournamentVideoCollection = {
  __typename?: 'TournamentVideoCollection';
  paging: Paging;
  records: Array<TournamentVideo>;
};

/** Autogenerated input type of UnfavArticle */
export type UnfavArticleInput = {
  articleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
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

export type CurrentUserFragment = { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string };

export type AttackMoveFragment = { __typename?: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean };

export type ThrowMoveFragment = { __typename?: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum };

export type ReversalMoveFragment = { __typename?: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null };

export type PagingFragment = { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean };

export type CreateArticleImageMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type CreateArticleImageMutation = { __typename?: 'Mutation', createArticleImage?: { __typename?: 'CreateArticleImagePayload', url?: string | null } | null };

export type CreateArticleLinkMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateArticleLinkMutation = { __typename?: 'Mutation', createArticleLink?: { __typename?: 'CreateArticleLinkPayload', articleLink: { __typename?: 'ArticleLink', url: string, title: string, description?: string | null, imageUrl?: string | null } } | null };

export type CreateArticleVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateArticleVideoMutation = { __typename?: 'Mutation', createArticleVideo?: { __typename?: 'CreateArticleVideoPayload', articleVideo: { __typename?: 'ArticleVideo', id: string, m3u8Url: string, thumbnailUrl: string }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } } | null };

export type CreateCharacterMutationVariables = Exact<{
  attributes: CharacterAttributes;
}>;


export type CreateCharacterMutation = { __typename?: 'Mutation', createCharacter?: { __typename?: 'CreateCharacterPayload', character: { __typename?: 'Character', id: string } } | null };

export type CreateComboMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type CreateComboMutation = { __typename?: 'Mutation', createCombo?: { __typename?: 'CreateComboPayload', combo: { __typename?: 'Combo', id: string } } | null };

export type CreateComboCategoryMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: ComboCategoryAttributes;
}>;


export type CreateComboCategoryMutation = { __typename?: 'Mutation', createComboCategory?: { __typename?: 'CreateComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string } } | null };

export type CreateComboVideoMutationVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type CreateComboVideoMutation = { __typename?: 'Mutation', createComboVideo?: { __typename?: 'CreateComboVideoPayload', combo: { __typename?: 'Combo', id: string, command: Array<string>, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } } | null };

export type CreateMoveCategoryMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: MoveCategoryAttributes;
}>;


export type CreateMoveCategoryMutation = { __typename?: 'Mutation', createMoveCategory?: { __typename?: 'CreateMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string } } | null };

export type CreateMoveVideoMutationVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type CreateMoveVideoMutation = { __typename?: 'Mutation', createMoveVideo?: { __typename?: 'CreateMoveVideoPayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } } | null };

export type CreateTournamentMutationVariables = Exact<{
  attributes: TournamentAttributes;
}>;


export type CreateTournamentMutation = { __typename?: 'Mutation', createTournament?: { __typename?: 'CreateTournamentPayload', tournament: { __typename?: 'Tournament', id: string } } | null };

export type CreateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserPayload', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } } | null };

export type DeleteComboMutationVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type DeleteComboMutation = { __typename?: 'Mutation', deleteCombo?: { __typename?: 'DeleteComboPayload', combo: { __typename?: 'Combo', id: string } } | null };

export type DeleteComboCategoryMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type DeleteComboCategoryMutation = { __typename?: 'Mutation', deleteComboCategory?: { __typename?: 'DeleteComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string } } | null };

export type DeleteMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type DeleteMoveMutation = { __typename?: 'Mutation', deleteMove?: { __typename?: 'DeleteMovePayload', move: { __typename?: 'Move', id: string } } | null };

export type DeleteMoveCategoryMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type DeleteMoveCategoryMutation = { __typename?: 'Mutation', deleteMoveCategory?: { __typename?: 'DeleteMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string } } | null };

export type DeleteTournamentMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DeleteTournamentMutation = { __typename?: 'Mutation', deleteTournament?: { __typename?: 'DeleteTournamentPayload', tournament: { __typename?: 'Tournament', id: string } } | null };

export type FavArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type FavArticleMutation = { __typename?: 'Mutation', favArticle?: { __typename?: 'FavArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type UnfavArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type UnfavArticleMutation = { __typename?: 'Mutation', unfavArticle?: { __typename?: 'UnfavArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type UpdateArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
  attributes: ArticleAttributes;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle?: { __typename?: 'UpdateArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type UpdateCharacterMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: CharacterAttributes;
}>;


export type UpdateCharacterMutation = { __typename?: 'Mutation', updateCharacter?: { __typename?: 'UpdateCharacterPayload', character: { __typename?: 'Character', id: string } } | null };

export type UpdateComboMutationVariables = Exact<{
  comboId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type UpdateComboMutation = { __typename?: 'Mutation', updateCombo?: { __typename?: 'UpdateComboPayload', combo: { __typename?: 'Combo', id: string, comboCategory: { __typename?: 'ComboCategory', id: string } } } | null };

export type UpdateComboCategoryMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboCategoryAttributes;
}>;


export type UpdateComboCategoryMutation = { __typename?: 'Mutation', updateComboCategory?: { __typename?: 'UpdateComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string } } | null };

export type UpdateCurrentUserMutationVariables = Exact<{
  attributes: CurrentUserAttributes;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser?: { __typename?: 'UpdateCurrentUserPayload', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } } | null };

export type UpdateMoveCategoryMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: MoveCategoryAttributes;
}>;


export type UpdateMoveCategoryMutation = { __typename?: 'Mutation', updateMoveCategory?: { __typename?: 'UpdateMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string } } | null };

export type ArticlePathsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlePathsQuery = { __typename?: 'Query', allArticles: Array<{ __typename?: 'Article', id: string }> };

export type CharacterPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterPathsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string }> } };

export type CharacterSelectOptionFragment = { __typename?: 'Character', id: string, slug: string, name: string };

export type CharacterSelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterSelectOptionsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', id: string, slug: string, name: string }> } };

export type ComboSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type ComboSelectOptionsQuery = { __typename?: 'Query', comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string> }> }> };

export type CountrySelectOptionFragment = { __typename?: 'Country', id: string, name: string, flagEmoji: string };

export type CountrySelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountrySelectOptionsQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string, name: string, flagEmoji: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } };

export type MoveSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type MoveSelectOptionsQuery = { __typename?: 'Query', moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string> }> }> };

export type MyArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type MyArticleQuery = { __typename?: 'Query', myArticle: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, faved: boolean, favsCount: number, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', name: string, avatarUrl: string } } };

export type OrganizerSelectOptionFragment = { __typename?: 'Organizer', id: string, slug: string, name: string };

export type PlayerSelectOptionFragment = { __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: string | null, smashggId?: string | null };

export type PlayerSlugsQueryVariables = Exact<{
  per?: InputMaybe<Scalars['Int']>;
}>;


export type PlayerSlugsQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', slug: string }> } };

export type TournamentPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentPathsQuery = { __typename?: 'Query', allTournaments: Array<{ __typename?: 'Tournament', id: string }> };

export type TournamentVideoPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentVideoPathsQuery = { __typename?: 'Query', allTournamentVideos: Array<{ __typename?: 'TournamentVideo', id: string }> };

export type ArticleElementComboQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type ArticleElementComboQuery = { __typename?: 'Query', combo: { __typename?: 'Combo', id: string, damage?: number | null, command: Array<string>, note?: string | null, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } };

export type ArticleElementMoveQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type ArticleElementMoveQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, note?: string | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } };

export type ArticleCardFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } };

export type ArticleFormArticleFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, category: ArticleCategory, content: string };

export type BattleListItemFragment = { __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> };

export type CharacterBattleCountChipFragment = { __typename?: 'BattleCount', id: string, count: number, character: { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string } };

export type CharacterChipFragment = { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, battlesCount: number };

export type PlayerBattleCountChipFragment = { __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } };

export type PlayerChipFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, battlesCount: number };

export type CharacterCardFragment = { __typename?: 'Character', slug: string, name: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number };

export type CharacterFormFragment = { __typename?: 'Character', name: string, nameKana: string, longName: string, longNameKana: string, slug: string, country: string, fightingStyle: string, story: string, description: string, dlc: boolean };

export type ComboCategoryFormFragment = { __typename?: 'ComboCategory', id: string, name: string, position: number };

export type ComboCategoryPositionSelectFragment = { __typename?: 'ComboCategory', id: string, name: string, position: number };

export type ComboFormFragment = { __typename?: 'Combo', id: string, command: Array<string>, damage?: number | null, note?: string | null, position: number, move?: { __typename?: 'Move', id: string } | null };

export type ComboPositionSelectFragment = { __typename?: 'Combo', id: string, command: Array<string>, position: number };

export type ComboMediaFragment = { __typename?: 'Combo', id: string, damage?: number | null, command: Array<string>, note?: string | null, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type FavButtonArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type FavButtonArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', faved: boolean } };

export type MoveCategoryFormFragment = { __typename?: 'MoveCategory', id: string, name: string, position: number };

export type MoveCategoryPositionSelectFragment = { __typename?: 'MoveCategory', id: string, name: string, position: number };

export type MoveFormFragment = { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, statusAfter?: string | null, note?: string | null, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, name: string }, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type MovePositionSelectFragment = { __typename?: 'Move', id: string, name: string, position: number };

export type MoveMediaFragment = { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, note?: string | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type OrganizerFormFragment = { __typename?: 'Organizer', name: string, slug: string, tonamelId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null };

export type PlayerCardFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, standingsCount: number, battlesCount: number };

export type PlayerFormFragment = { __typename?: 'Player', name: string, slug: string, tonamelId?: string | null, smashggId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string } | null };

export type TournamentCardFragment = { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> };

export type TournamentFormFragment = { __typename?: 'Tournament', id: string, organizerId: string, name: string, url: string, streamingUrl?: string | null, startsAt: string, description: string };

export type TournamentFormQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentFormQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerCollection', records: Array<{ __typename?: 'Organizer', id: string, slug: string, name: string }> } };

export type CharacterBreadcrumbsFragment = { __typename?: 'Character', slug: string, name: string };

export type ComboCategoryBreadcrumbsFragment = { __typename?: 'ComboCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } };

export type MoveCategoryBreadcrumbsFragment = { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } };

export type MoveBreadcrumbsFragment = { __typename?: 'Move', id: string, name: string, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } };

export type OrganizerBreadcrumbsFragment = { __typename?: 'Organizer', slug: string, name: string };

export type PlayerBreadcrumbsFragment = { __typename?: 'Player', slug: string, name: string };

export type TournamentBreadcrumbsFragment = { __typename?: 'Tournament', id: string, name: string };

export type TournamentVideoBreadcrumbsFragment = { __typename?: 'TournamentVideo', id: string, label?: string | null, tournament: { __typename?: 'Tournament', id: string, name: string } };

export type ArticlePageArticleFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, favsCount: number, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', name: string, avatarUrl: string }, relatedArticles: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } }> };

export type ArticlePageArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type ArticlePageArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, favsCount: number, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', name: string, avatarUrl: string }, relatedArticles: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } }> } };

export type ArticlesPageArticlesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type ArticlesPageArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleCollection', records: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type BattlesPageQueryVariables = Exact<{ [key: string]: never; }>;


export type BattlesPageQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, battlesCount: number }> }, characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, battlesCount: number }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type BattlesPageBattlesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type BattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type CharacterBattlesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
  playerSlug?: InputMaybe<Scalars['String']>;
}>;


export type CharacterBattlesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number }, battleCounts: { __typename?: 'BattleCountCollection', records: Array<{ __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type CharacterBattlesPageBattlesQueryVariables = Exact<{
  characterSlug: Scalars['String'];
  playerSlug?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
}>;


export type CharacterBattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type CharacterCombosPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type CharacterCombosPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, damage?: number | null, command: Array<string>, note?: string | null, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }> } };

export type CharacterPageProfileFragment = { __typename?: 'Character', slug: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number };

export type PageCharacterQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageCharacterQuery = { __typename?: 'Query', character: { __typename?: 'Character', story: string, description: string, slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number }, battleCounts: { __typename?: 'BattleCountCollection', records: Array<{ __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } }> } };

type Moveable_AttackMove_Fragment = { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean };

type Moveable_ReversalMove_Fragment = { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null };

type Moveable_ThrowMove_Fragment = { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum };

export type MoveableFragment = Moveable_AttackMove_Fragment | Moveable_ReversalMove_Fragment | Moveable_ThrowMove_Fragment;

export type CharacterMovesPageMoveFragment = { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, note?: string | null, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum } };

export type CharacterMovesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type CharacterMovesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number, combosCount: number, movesCount: number, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, note?: string | null, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum } }> }> } };

export type CharactersPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersPageQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string, name: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number }> } };

export type DashboardArticlePageArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DashboardArticlePageArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, category: ArticleCategory, content: string } };

export type DashboardArticlesPageArticleFragment = { __typename?: 'Article', id: string, title: string, status: ArticleStatus };

export type DashboardArticlesPagePublishMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DashboardArticlesPagePublishMutation = { __typename?: 'Mutation', publishArticle?: { __typename?: 'PublishArticlePayload', article: { __typename?: 'Article', id: string, title: string, status: ArticleStatus } } | null };

export type DashboardArticlesPageStopMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DashboardArticlesPageStopMutation = { __typename?: 'Mutation', stopArticle?: { __typename?: 'StopArticlePayload', article: { __typename?: 'Article', id: string, title: string, status: ArticleStatus } } | null };

export type DashboardArticlesPageDeleteMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DashboardArticlesPageDeleteMutation = { __typename?: 'Mutation', deleteArticle?: { __typename?: 'DeleteArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type DashboardArticlesPageArticlesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type DashboardArticlesPageArticlesQuery = { __typename?: 'Query', myArticles: { __typename?: 'ArticleCollection', records: Array<{ __typename?: 'Article', id: string, title: string, status: ArticleStatus }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type CreateArticleMutationVariables = Exact<{
  attributes: ArticleAttributes;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: { __typename?: 'CreateArticlePayload', article: { __typename?: 'Article', id: string } } | null };

export type DashboardComboCategoriesPageComboCategoryFragment = { __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> };

export type DashboardComboCategoriesPageComboFragment = { __typename?: 'Combo', id: string, command: Array<string>, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type DashboardComboCategoriesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardComboCategoriesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string }, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, comboVideo?: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }> };

export type DashboardComboCategoryNewPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardComboCategoryNewPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, position: number }> } };

export type PageDashboardCharacterEditQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageDashboardCharacterEditQuery = { __typename?: 'Query', character: { __typename?: 'Character', name: string, nameKana: string, longName: string, longNameKana: string, slug: string, country: string, fightingStyle: string, story: string, description: string, dlc: boolean } };

export type DashboardMoveCategoriesPageMoveCategoryFragment = { __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> };

export type DashboardMoveCategoriesPageMoveFragment = { __typename?: 'Move', id: string, name: string, command: Array<string>, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null };

export type DashboardMoveCategoriesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardMoveCategoriesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string }, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string, command: Array<string>, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null }> }> };

export type DashboardMoveCategoryNewPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardMoveCategoryNewPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, position: number }> } };

export type DashboardCharactersPageQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardCharactersPageQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string, name: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number }> } };

export type MoveSelectOptionFragment = { __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string }> };

export type PageDashboardComboNewQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageDashboardComboNewQuery = { __typename?: 'Query', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number }>, character: { __typename?: 'Character', slug: string, name: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string }> }> } } };

export type PageDashboardComboCategoryEditQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageDashboardComboCategoryEditQuery = { __typename?: 'Query', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, position: number, character: { __typename?: 'Character', slug: string, name: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, position: number }> } } };

export type PageDashboardComboEditQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type PageDashboardComboEditQuery = { __typename?: 'Query', combo: { __typename?: 'Combo', id: string, command: Array<string>, damage?: number | null, note?: string | null, position: number, comboCategory: { __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, command: Array<string>, position: number }>, character: { __typename?: 'Character', slug: string, name: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string }> }> } }, move?: { __typename?: 'Move', id: string } | null } };

export type PageDashboardMoveCategoryEditQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageDashboardMoveCategoryEditQuery = { __typename?: 'Query', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, position: number, character: { __typename?: 'Character', slug: string, name: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, position: number }> } } };

export type CreateReversalMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: ReversalMoveAttributes;
}>;


export type CreateReversalMoveMutation = { __typename?: 'Mutation', createReversalMove?: { __typename?: 'CreateReversalMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type CreateThrowMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: ThrowMoveAttributes;
}>;


export type CreateThrowMoveMutation = { __typename?: 'Mutation', createThrowMove?: { __typename?: 'CreateThrowMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type PageDashboardMoveNewQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageDashboardMoveNewQuery = { __typename?: 'Query', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string }, moves: Array<{ __typename?: 'Move', id: string, name: string, position: number }> } };

export type CreateAttackMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: AttackMoveAttributes;
}>;


export type CreateAttackMoveMutation = { __typename?: 'Mutation', createAttackMove?: { __typename?: 'CreateAttackMovePayload', move: { __typename?: 'Move', id: string, name: string, command: Array<string>, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } } | null };

export type PageDashboardMoveCopyQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardMoveCopyQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, statusAfter?: string | null, note?: string | null, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string }, moves: Array<{ __typename?: 'Move', id: string, name: string, position: number }> }, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } };

export type PageDashboardMoveEditQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardMoveEditQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: string | null, command: Array<string>, statusAfter?: string | null, note?: string | null, position: number, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string }, moves: Array<{ __typename?: 'Move', id: string, name: string, position: number }> }, moveable: { __typename: 'AttackMove', id: string, startUpFrame?: number | null, duration?: number | null, heights: Array<AttackTypeEnum>, damages: Array<number>, reach?: number | null, blockResult: AttackMoveResultEnum, blockStatus?: AttackMoveStateEnum | null, blockFrame?: number | null, hitResult: AttackMoveResultEnum, hitStatus?: AttackMoveStateEnum | null, hitFrame?: number | null, counterResult: AttackMoveResultEnum, counterStatus?: AttackMoveStateEnum | null, counterFrame?: number | null, powerCrush: boolean, powerCrushFrame?: number | null, crouchingStatus: boolean, crouchingStatusFrame?: number | null, jumpStatus: boolean, jumpStatusFrame?: number | null, homing: boolean, screw: boolean, wallBound: boolean } | { __typename: 'ReversalMove', id: string, type: string, startUpFrame?: number | null, finishFrame?: number | null } | { __typename: 'ThrowMove', id: string, throwType: ThrowTypeEnum, startUpFrame?: number | null, damage?: number | null, throwEscape: ThrowEscapeEnum, throwResult: ThrowMoveResultEnum }, moveVideo?: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string } | null } };

export type UpdateAttackMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: AttackMoveAttributes;
}>;


export type UpdateAttackMoveMutation = { __typename?: 'Mutation', updateAttackMove?: { __typename?: 'UpdateAttackMovePayload', move: { __typename?: 'Move', id: string } } | null };

export type UpdateThrowMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: ThrowMoveAttributes;
}>;


export type UpdateThrowMoveMutation = { __typename?: 'Mutation', updateThrowMove?: { __typename?: 'UpdateThrowMovePayload', move: { __typename?: 'Move', id: string } } | null };

export type UpdateReversalMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: ReversalMoveAttributes;
}>;


export type UpdateReversalMoveMutation = { __typename?: 'Mutation', updateReversalMove?: { __typename?: 'UpdateReversalMovePayload', move: { __typename?: 'Move', id: string } } | null };

export type DashboardOrganizerEditPageQueryVariables = Exact<{
  organizerSlug: Scalars['String'];
}>;


export type DashboardOrganizerEditPageQuery = { __typename?: 'Query', organizer: { __typename?: 'Organizer', name: string, slug: string, tonamelId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null } };

export type DashboardOrganizerEditPageUpdateOrganizerMutationVariables = Exact<{
  organizerSlug: Scalars['String'];
  attributes: OrganizerAttributes;
}>;


export type DashboardOrganizerEditPageUpdateOrganizerMutation = { __typename?: 'Mutation', updateOrganizer?: { __typename?: 'UpdateOrganizerPayload', organizer: { __typename?: 'Organizer', name: string, slug: string, tonamelId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null } } | null };

export type DashboardOrganizersPageOrganizerFragment = { __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: string | null };

export type DashboardOrganizersPageDeleteMutationVariables = Exact<{
  organizerSlug: Scalars['String'];
}>;


export type DashboardOrganizersPageDeleteMutation = { __typename?: 'Mutation', deleteOrganizer?: { __typename?: 'DeleteOrganizerPayload', organizer: { __typename?: 'Organizer', id: string } } | null };

export type DashboardOrganizersPageOrganizersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type DashboardOrganizersPageOrganizersQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerCollection', records: Array<{ __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: string | null }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type DashboardOrganizersNewPageCreateOrganizerMutationVariables = Exact<{
  attributes: OrganizerAttributes;
}>;


export type DashboardOrganizersNewPageCreateOrganizerMutation = { __typename?: 'Mutation', createOrganizer?: { __typename?: 'CreateOrganizerPayload', organizer: { __typename?: 'Organizer', id: string } } | null };

export type DashboardPlayerEditPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type DashboardPlayerEditPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', name: string, slug: string, tonamelId?: string | null, smashggId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string } | null } };

export type DashboardPlayerEditPageUpdatePlayerMutationVariables = Exact<{
  playerSlug: Scalars['String'];
  attributes: PlayerAttributes;
}>;


export type DashboardPlayerEditPageUpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer?: { __typename?: 'UpdatePlayerPayload', player: { __typename?: 'Player', name: string, slug: string, tonamelId?: string | null, smashggId?: string | null, twitterId?: string | null, streamingUrl?: string | null, description?: string | null, country?: { __typename?: 'Country', id: string } | null } } | null };

export type DashboardPlayersPagePlayerFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null };

export type DashboardPlayersPagePlayersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type DashboardPlayersPagePlayersQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type DashboardPlayersPageDeleteMutationVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type DashboardPlayersPageDeleteMutation = { __typename?: 'Mutation', deletePlayer?: { __typename?: 'DeletePlayerPayload', player: { __typename?: 'Player', id: string } } | null };

export type DashboardPlayersPageCreatePlayerFromSmashggMutationVariables = Exact<{
  smashggId: Scalars['String'];
}>;


export type DashboardPlayersPageCreatePlayerFromSmashggMutation = { __typename?: 'Mutation', createPlayerFromSmashgg?: { __typename?: 'CreatePlayerFromSmashggPayload', player: { __typename?: 'Player', id: string } } | null };

export type DashboardPlayersNewPageCreatePlayerMutationVariables = Exact<{
  attributes: PlayerAttributes;
}>;


export type DashboardPlayersNewPageCreatePlayerMutation = { __typename?: 'Mutation', createPlayer?: { __typename?: 'CreatePlayerPayload', player: { __typename?: 'Player', id: string } } | null };

export type BattleFormFragment = { __typename?: 'Battle', id: string, startSec: number, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', slug: string }, character: { __typename?: 'Character', slug: string } }> };

export type CreateBattleMutationVariables = Exact<{
  attributes: BattleAttributes;
}>;


export type CreateBattleMutation = { __typename?: 'Mutation', createBattle?: { __typename?: 'CreateBattlePayload', battle: { __typename?: 'Battle', id: string } } | null };

export type UpdateBattleMutationVariables = Exact<{
  battleId: Scalars['ID'];
  attributes: BattleAttributes;
}>;


export type UpdateBattleMutation = { __typename?: 'Mutation', updateBattle?: { __typename?: 'UpdateBattlePayload', battle: { __typename?: 'Battle', id: string, round?: BattleRound | null, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> } } | null };

export type DeleteBattleMutationVariables = Exact<{
  battleId: Scalars['ID'];
}>;


export type DeleteBattleMutation = { __typename?: 'Mutation', deleteBattle?: { __typename?: 'DeleteBattlePayload', battle: { __typename?: 'Battle', id: string } } | null };

export type DashboardBattlesPageQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type DashboardBattlesPageQuery = { __typename?: 'Query', tournamentVideo: { __typename?: 'TournamentVideo', id: string, title: string, youtubeVideoId: string, tournament: { __typename?: 'Tournament', id: string, name: string } }, players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: string | null, smashggId?: string | null }> }, characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', id: string, slug: string, name: string }> } };

export type DashboardBattlesPageSideFragment = { __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } };

export type DashboardBattlesPageBattleReslutFragment = { __typename?: 'Battle', id: string, round?: BattleRound | null, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> };

export type DashboardBattlesPageBattlesQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type DashboardBattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> }> } };

export type DashboardTournamentVideoEditPageQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type DashboardTournamentVideoEditPageQuery = { __typename?: 'Query', tournamentVideo: { __typename?: 'TournamentVideo', id: string, title: string, label?: string | null, publishedAt?: string | null, tournament: { __typename?: 'Tournament', id: string, name: string } } };

export type TournamentVideoFormFragment = { __typename?: 'TournamentVideo', id: string, title: string, label?: string | null, publishedAt?: string | null };

export type DashboardTournamentVideoEditPageUpdateMutationVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
  attributes: TournamentVideoAttributes;
}>;


export type DashboardTournamentVideoEditPageUpdateMutation = { __typename?: 'Mutation', updateTournamentVideo?: { __typename?: 'UpdateTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string, title: string, label?: string | null, publishedAt?: string | null } } | null };

export type DashboardTournamentEditPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentEditPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, organizerId: string, name: string, url: string, streamingUrl?: string | null, startsAt: string, description: string } };

export type DashboardTournamentEditPageUpdateTournamentMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  attributes: TournamentAttributes;
}>;


export type DashboardTournamentEditPageUpdateTournamentMutation = { __typename?: 'Mutation', updateTournament?: { __typename?: 'UpdateTournamentPayload', tournament: { __typename?: 'Tournament', id: string, organizerId: string, name: string, url: string, streamingUrl?: string | null, startsAt: string, description: string } } | null };

export type DashboardTournamentPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, name: string, description: string, mainImageUrl?: string | null, startsAt: string, standingsCount: number, videosCount: number, videos: Array<{ __typename?: 'TournamentVideo', id: string, title: string, youtubeVideoId: string }> }, players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: string | null, smashggId?: string | null }> } };

export type DashboardTournamentPageStandingsQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentPageStandingsQuery = { __typename?: 'Query', standings: { __typename?: 'StandingCollection', records: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string, avatarUrl?: string | null } }> } };

export type DashboardTournamentPageVideosQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentPageVideosQuery = { __typename?: 'Query', tournamentVideos: { __typename?: 'TournamentVideoCollection', records: Array<{ __typename?: 'TournamentVideo', id: string, title: string, thumbnailUrl: string, battlesCount: number, channel: { __typename?: 'Channel', id: string, name: string } }> } };

export type DashboardTournamentPageCreateStandingMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  attributes: StandingAttributes;
}>;


export type DashboardTournamentPageCreateStandingMutation = { __typename?: 'Mutation', createStanding?: { __typename?: 'CreateStandingPayload', standing: { __typename?: 'Standing', id: string } } | null };

export type DashboardTournamentPageDeleteStandingMutationVariables = Exact<{
  standingId: Scalars['ID'];
}>;


export type DashboardTournamentPageDeleteStandingMutation = { __typename?: 'Mutation', deleteStanding?: { __typename?: 'DeleteStandingPayload', standing: { __typename?: 'Standing', id: string } } | null };

export type DashboardTournamentPageCreateVideoMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  url: Scalars['String'];
}>;


export type DashboardTournamentPageCreateVideoMutation = { __typename?: 'Mutation', createTournamentVideo?: { __typename?: 'CreateTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string } } | null };

export type DashboardTournamentPageDeleteVideoMutationVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type DashboardTournamentPageDeleteVideoMutation = { __typename?: 'Mutation', deleteTournamentVideo?: { __typename?: 'DeleteTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string } } | null };

export type DashboardTournamentsPageTournamentFragment = { __typename?: 'Tournament', id: string, name: string, startsAt: string, videosCount: number, standingsCount: number, mainImageUrl?: string | null };

export type DashboardTournamentsPageTournamentsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type DashboardTournamentsPageTournamentsQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentCollection', records: Array<{ __typename?: 'Tournament', id: string, name: string, startsAt: string, videosCount: number, standingsCount: number, mainImageUrl?: string | null }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type TopPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TopPageQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentCollection', records: Array<{ __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }> }, players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, standingsCount: number, battlesCount: number }> }, characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string, name: string, faceImageUrl: string, country: string, fightingStyle: string, battlesCount: number }> }, articles: { __typename?: 'ArticleCollection', records: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: string | null, publishedAt?: string | null, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } }> } };

export type PlayerBattlesPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
  page?: InputMaybe<Scalars['Int']>;
}>;


export type PlayerBattlesPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', slug: string, name: string, id: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null, standingsCount: number, battlesCount: number }, battleCounts: { __typename?: 'BattleCountCollection', records: Array<{ __typename?: 'BattleCount', id: string, count: number, character: { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string } }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayerBattlesPageBattlesQueryVariables = Exact<{
  playerSlug: Scalars['String'];
  characterSlug?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
}>;


export type PlayerBattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayerStandingCardFragment = { __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string } };

export type PlayerPageProfileFragment = { __typename?: 'Player', id: string, name: string, slug: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null, standingsCount: number, battlesCount: number };

export type PlayerPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type PlayerPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', description?: string | null, slug: string, name: string, id: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null, standingsCount: number, battlesCount: number } };

export type PlayerStandingsPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type PlayerStandingsPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', slug: string, name: string, id: string, avatarUrl?: string | null, twitterId?: string | null, streamingUrl?: string | null, standingsCount: number, battlesCount: number }, standings: { __typename?: 'StandingCollection', records: Array<{ __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string } }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayerStandingsPageStandingsQueryVariables = Exact<{
  playerSlug: Scalars['String'];
  page: Scalars['Int'];
}>;


export type PlayerStandingsPageStandingsQuery = { __typename?: 'Query', standings: { __typename?: 'StandingCollection', records: Array<{ __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string } }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayersPagePlayersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  keyword?: InputMaybe<Scalars['String']>;
}>;


export type PlayersPagePlayersQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null, standingsCount: number, battlesCount: number }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type TournamentVideoPageBattleFragment = { __typename?: 'Battle', id: string, round?: BattleRound | null, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> };

export type TournamentVideoPageBattleSideFragment = { __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } };

export type TournamentVideoPageQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type TournamentVideoPageQuery = { __typename?: 'Query', tournamentVideo: { __typename?: 'TournamentVideo', id: string, label?: string | null, youtubeVideoId: string, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null }, battles: Array<{ __typename?: 'Battle', id: string, round?: BattleRound | null, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }> } };

export type TournamentPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type TournamentPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, url: string, streamingUrl?: string | null, description: string, startsAt: string, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: string | null } }>, videos: Array<{ __typename?: 'TournamentVideo', id: string, label?: string | null, battlesCount: number }> } };

export type TournamentsPageTournamentsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type TournamentsPageTournamentsQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentCollection', records: Array<{ __typename?: 'Tournament', id: string, name: string, mainImageUrl?: string | null, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on CurrentUser {
  id
  name
  role
  avatarUrl
}
    `;
export const PagingFragmentDoc = gql`
    fragment paging on Paging {
  currentPage
  totalCount
  totalPages
  hasNext
}
    `;
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
export const OrganizerSelectOptionFragmentDoc = gql`
    fragment OrganizerSelectOption on Organizer {
  id
  slug
  name
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
export const BattleListItemFragmentDoc = gql`
    fragment BattleListItem on Battle {
  id
  round
  tournamentVideo {
    id
    tournament {
      id
      name
      startsAt
    }
  }
  sides {
    player {
      name
    }
    character {
      faceImageUrl
    }
    rounds
  }
}
    `;
export const CharacterBattleCountChipFragmentDoc = gql`
    fragment CharacterBattleCountChip on BattleCount {
  id
  count
  character {
    id
    slug
    name
    faceImageUrl
  }
}
    `;
export const CharacterChipFragmentDoc = gql`
    fragment CharacterChip on Character {
  id
  slug
  name
  faceImageUrl
  battlesCount
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
export const PlayerChipFragmentDoc = gql`
    fragment PlayerChip on Player {
  id
  slug
  name
  avatarUrl
  battlesCount
}
    `;
export const CharacterCardFragmentDoc = gql`
    fragment CharacterCard on Character {
  slug
  name
  faceImageUrl
  country
  fightingStyle
  battlesCount
}
    `;
export const CharacterFormFragmentDoc = gql`
    fragment CharacterForm on Character {
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
export const ComboPositionSelectFragmentDoc = gql`
    fragment ComboPositionSelect on Combo {
  id
  command
  position
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
export const AttackMoveFragmentDoc = gql`
    fragment attackMove on AttackMove {
  id
  startUpFrame
  duration
  heights
  damages
  reach
  blockResult
  blockStatus
  blockFrame
  hitResult
  hitStatus
  hitFrame
  counterResult
  counterStatus
  counterFrame
  powerCrush
  powerCrushFrame
  crouchingStatus
  crouchingStatusFrame
  jumpStatus
  jumpStatusFrame
  homing
  screw
  wallBound
}
    `;
export const ThrowMoveFragmentDoc = gql`
    fragment throwMove on ThrowMove {
  id
  throwType
  startUpFrame
  damage
  throwEscape
  throwResult
}
    `;
export const ReversalMoveFragmentDoc = gql`
    fragment reversalMove on ReversalMove {
  id
  type
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
      ...attackMove
    }
    ... on ThrowMove {
      ...throwMove
    }
    ... on ReversalMove {
      ...reversalMove
    }
  }
  moveVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    ${AttackMoveFragmentDoc}
${ThrowMoveFragmentDoc}
${ReversalMoveFragmentDoc}`;
export const MovePositionSelectFragmentDoc = gql`
    fragment MovePositionSelect on Move {
  id
  name
  position
}
    `;
export const MoveableFragmentDoc = gql`
    fragment moveable on Moveable {
  __typename
  ... on AttackMove {
    ...attackMove
  }
  ... on ThrowMove {
    ...throwMove
  }
  ... on ReversalMove {
    ...reversalMove
  }
}
    ${AttackMoveFragmentDoc}
${ThrowMoveFragmentDoc}
${ReversalMoveFragmentDoc}`;
export const MoveMediaFragmentDoc = gql`
    fragment MoveMedia on Move {
  id
  name
  kana
  command
  note
  moveable {
    ...moveable
  }
  moveVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    ${MoveableFragmentDoc}`;
export const OrganizerFormFragmentDoc = gql`
    fragment OrganizerForm on Organizer {
  name
  slug
  tonamelId
  twitterId
  streamingUrl
  description
}
    `;
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
  slug
  name
}
    `;
export const ComboCategoryBreadcrumbsFragmentDoc = gql`
    fragment ComboCategoryBreadcrumbs on ComboCategory {
  id
  name
  character {
    ...CharacterBreadcrumbs
  }
}
    ${CharacterBreadcrumbsFragmentDoc}`;
export const MoveCategoryBreadcrumbsFragmentDoc = gql`
    fragment MoveCategoryBreadcrumbs on MoveCategory {
  id
  name
  character {
    ...CharacterBreadcrumbs
  }
}
    ${CharacterBreadcrumbsFragmentDoc}`;
export const MoveBreadcrumbsFragmentDoc = gql`
    fragment MoveBreadcrumbs on Move {
  id
  name
  moveCategory {
    ...MoveCategoryBreadcrumbs
  }
}
    ${MoveCategoryBreadcrumbsFragmentDoc}`;
export const OrganizerBreadcrumbsFragmentDoc = gql`
    fragment OrganizerBreadcrumbs on Organizer {
  slug
  name
}
    `;
export const PlayerBreadcrumbsFragmentDoc = gql`
    fragment PlayerBreadcrumbs on Player {
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
export const ArticleCardFragmentDoc = gql`
    fragment ArticleCard on Article {
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
export const ArticlePageArticleFragmentDoc = gql`
    fragment ArticlePageArticle on Article {
  id
  title
  description
  mainImageUrl
  publishedAt
  favsCount
  status
  category
  content
  author {
    name
    avatarUrl
  }
  relatedArticles {
    ...ArticleCard
  }
}
    ${ArticleCardFragmentDoc}`;
export const CharacterPageProfileFragmentDoc = gql`
    fragment CharacterPageProfile on Character {
  slug
  longName
  faceImageUrl
  country
  fightingStyle
  battlesCount
  combosCount
  movesCount
}
    `;
export const CharacterMovesPageMoveFragmentDoc = gql`
    fragment CharacterMovesPageMove on Move {
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
    ...moveable
  }
}
    ${MoveableFragmentDoc}`;
export const DashboardArticlesPageArticleFragmentDoc = gql`
    fragment DashboardArticlesPageArticle on Article {
  id
  title
  status
}
    `;
export const DashboardComboCategoriesPageComboFragmentDoc = gql`
    fragment DashboardComboCategoriesPageCombo on Combo {
  id
  command
  comboVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    `;
export const DashboardComboCategoriesPageComboCategoryFragmentDoc = gql`
    fragment DashboardComboCategoriesPageComboCategory on ComboCategory {
  id
  name
  combos {
    ...DashboardComboCategoriesPageCombo
  }
}
    ${DashboardComboCategoriesPageComboFragmentDoc}`;
export const DashboardMoveCategoriesPageMoveFragmentDoc = gql`
    fragment DashboardMoveCategoriesPageMove on Move {
  id
  name
  command
  moveVideo {
    id
    m3u8Url
    thumbnailUrl
  }
}
    `;
export const DashboardMoveCategoriesPageMoveCategoryFragmentDoc = gql`
    fragment DashboardMoveCategoriesPageMoveCategory on MoveCategory {
  id
  name
  moves {
    ...DashboardMoveCategoriesPageMove
  }
}
    ${DashboardMoveCategoriesPageMoveFragmentDoc}`;
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
export const DashboardOrganizersPageOrganizerFragmentDoc = gql`
    fragment DashboardOrganizersPageOrganizer on Organizer {
  id
  slug
  name
  avatarUrl
}
    `;
export const DashboardPlayersPagePlayerFragmentDoc = gql`
    fragment DashboardPlayersPagePlayer on Player {
  id
  slug
  name
  avatarUrl
}
    `;
export const BattleFormFragmentDoc = gql`
    fragment BattleForm on Battle {
  id
  tournamentVideo {
    id
  }
  startSec
  round
  sides {
    player {
      slug
    }
    character {
      slug
    }
    rounds
  }
}
    `;
export const DashboardBattlesPageSideFragmentDoc = gql`
    fragment DashboardBattlesPageSide on BattleSide {
  player {
    id
    name
  }
  character {
    id
    faceImageUrl
  }
  rounds
}
    `;
export const DashboardBattlesPageBattleReslutFragmentDoc = gql`
    fragment DashboardBattlesPageBattleReslut on Battle {
  id
  round
  startSec
  sides {
    ...DashboardBattlesPageSide
  }
}
    ${DashboardBattlesPageSideFragmentDoc}`;
export const TournamentVideoFormFragmentDoc = gql`
    fragment TournamentVideoForm on TournamentVideo {
  id
  title
  label
  publishedAt
}
    `;
export const DashboardTournamentsPageTournamentFragmentDoc = gql`
    fragment DashboardTournamentsPageTournament on Tournament {
  id
  name
  startsAt
  videosCount
  standingsCount
  mainImageUrl
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
export const PlayerPageProfileFragmentDoc = gql`
    fragment PlayerPageProfile on Player {
  id
  name
  slug
  avatarUrl
  twitterId
  streamingUrl
  standingsCount
  battlesCount
}
    `;
export const TournamentVideoPageBattleSideFragmentDoc = gql`
    fragment TournamentVideoPageBattleSide on BattleSide {
  player {
    name
  }
  character {
    faceImageUrl
  }
  rounds
}
    `;
export const TournamentVideoPageBattleFragmentDoc = gql`
    fragment TournamentVideoPageBattle on Battle {
  id
  round
  startSec
  sides {
    ...TournamentVideoPageBattleSide
  }
}
    ${TournamentVideoPageBattleSideFragmentDoc}`;
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
    mutation CreateComboCategory($characterSlug: String!, $attributes: ComboCategoryAttributes!) {
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
    mutation CreateComboVideo($comboId: ID!) {
  createComboVideo(input: {comboId: $comboId}) {
    combo {
      ...DashboardComboCategoriesPageCombo
    }
    videoUpload {
      url
      fields
    }
  }
}
    ${DashboardComboCategoriesPageComboFragmentDoc}`;
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
export const CreateMoveVideoDocument = gql`
    mutation CreateMoveVideo($moveId: ID!) {
  createMoveVideo(input: {moveId: $moveId}) {
    move {
      ...DashboardMoveCategoriesPageMove
    }
    videoUpload {
      url
      fields
    }
  }
}
    ${DashboardMoveCategoriesPageMoveFragmentDoc}`;
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
export const DeleteComboDocument = gql`
    mutation DeleteCombo($comboId: ID!) {
  deleteCombo(input: {comboId: $comboId}) {
    combo {
      id
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
export const DeleteComboCategoryDocument = gql`
    mutation DeleteComboCategory($comboCategoryId: ID!) {
  deleteComboCategory(input: {comboCategoryId: $comboCategoryId}) {
    comboCategory {
      id
    }
  }
}
    `;
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
export const DeleteMoveDocument = gql`
    mutation DeleteMove($moveId: ID!) {
  deleteMove(input: {moveId: $moveId}) {
    move {
      id
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
export const DeleteMoveCategoryDocument = gql`
    mutation DeleteMoveCategory($moveCategoryId: ID!) {
  deleteMoveCategory(input: {moveCategoryId: $moveCategoryId}) {
    moveCategory {
      id
    }
  }
}
    `;
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
export const CharacterPathsDocument = gql`
    query CharacterPaths {
  characters {
    records {
      slug
    }
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
    records {
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
  comboCategories(characterSlug: $characterSlug) {
    id
    name
    combos {
      id
      command
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
  moveCategories(characterSlug: $characterSlug) {
    id
    name
    moves {
      id
      name
      command
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
export const MyArticleDocument = gql`
    query MyArticle($articleId: ID!) {
  myArticle(articleId: $articleId) {
    id
    title
    description
    mainImageUrl
    publishedAt
    faved
    favsCount
    status
    category
    content
    author {
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
export const PlayerSlugsDocument = gql`
    query PlayerSlugs($per: Int) {
  players(per: $per) {
    records {
      slug
    }
  }
}
    `;

/**
 * __usePlayerSlugsQuery__
 *
 * To run a query within a React component, call `usePlayerSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerSlugsQuery({
 *   variables: {
 *      per: // value for 'per'
 *   },
 * });
 */
export function usePlayerSlugsQuery(baseOptions?: Apollo.QueryHookOptions<PlayerSlugsQuery, PlayerSlugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerSlugsQuery, PlayerSlugsQueryVariables>(PlayerSlugsDocument, options);
      }
export function usePlayerSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerSlugsQuery, PlayerSlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerSlugsQuery, PlayerSlugsQueryVariables>(PlayerSlugsDocument, options);
        }
export type PlayerSlugsQueryHookResult = ReturnType<typeof usePlayerSlugsQuery>;
export type PlayerSlugsLazyQueryHookResult = ReturnType<typeof usePlayerSlugsLazyQuery>;
export type PlayerSlugsQueryResult = Apollo.QueryResult<PlayerSlugsQuery, PlayerSlugsQueryVariables>;
export const TournamentPathsDocument = gql`
    query TournamentPaths {
  allTournaments {
    id
  }
}
    `;

/**
 * __useTournamentPathsQuery__
 *
 * To run a query within a React component, call `useTournamentPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTournamentPathsQuery(baseOptions?: Apollo.QueryHookOptions<TournamentPathsQuery, TournamentPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentPathsQuery, TournamentPathsQueryVariables>(TournamentPathsDocument, options);
      }
export function useTournamentPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentPathsQuery, TournamentPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentPathsQuery, TournamentPathsQueryVariables>(TournamentPathsDocument, options);
        }
export type TournamentPathsQueryHookResult = ReturnType<typeof useTournamentPathsQuery>;
export type TournamentPathsLazyQueryHookResult = ReturnType<typeof useTournamentPathsLazyQuery>;
export type TournamentPathsQueryResult = Apollo.QueryResult<TournamentPathsQuery, TournamentPathsQueryVariables>;
export const TournamentVideoPathsDocument = gql`
    query TournamentVideoPaths {
  allTournamentVideos {
    id
  }
}
    `;

/**
 * __useTournamentVideoPathsQuery__
 *
 * To run a query within a React component, call `useTournamentVideoPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentVideoPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentVideoPathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTournamentVideoPathsQuery(baseOptions?: Apollo.QueryHookOptions<TournamentVideoPathsQuery, TournamentVideoPathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentVideoPathsQuery, TournamentVideoPathsQueryVariables>(TournamentVideoPathsDocument, options);
      }
export function useTournamentVideoPathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentVideoPathsQuery, TournamentVideoPathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentVideoPathsQuery, TournamentVideoPathsQueryVariables>(TournamentVideoPathsDocument, options);
        }
export type TournamentVideoPathsQueryHookResult = ReturnType<typeof useTournamentVideoPathsQuery>;
export type TournamentVideoPathsLazyQueryHookResult = ReturnType<typeof useTournamentVideoPathsLazyQuery>;
export type TournamentVideoPathsQueryResult = Apollo.QueryResult<TournamentVideoPathsQuery, TournamentVideoPathsQueryVariables>;
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
export const FavButtonArticleDocument = gql`
    query FavButtonArticle($articleId: ID!) {
  article(articleId: $articleId) {
    faved
  }
}
    `;

/**
 * __useFavButtonArticleQuery__
 *
 * To run a query within a React component, call `useFavButtonArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavButtonArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavButtonArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useFavButtonArticleQuery(baseOptions: Apollo.QueryHookOptions<FavButtonArticleQuery, FavButtonArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavButtonArticleQuery, FavButtonArticleQueryVariables>(FavButtonArticleDocument, options);
      }
export function useFavButtonArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavButtonArticleQuery, FavButtonArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavButtonArticleQuery, FavButtonArticleQueryVariables>(FavButtonArticleDocument, options);
        }
export type FavButtonArticleQueryHookResult = ReturnType<typeof useFavButtonArticleQuery>;
export type FavButtonArticleLazyQueryHookResult = ReturnType<typeof useFavButtonArticleLazyQuery>;
export type FavButtonArticleQueryResult = Apollo.QueryResult<FavButtonArticleQuery, FavButtonArticleQueryVariables>;
export const TournamentFormDocument = gql`
    query TournamentForm {
  organizers(per: 100) {
    records {
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
export const ArticlePageArticleDocument = gql`
    query ArticlePageArticle($articleId: ID!) {
  article(articleId: $articleId) {
    ...ArticlePageArticle
  }
}
    ${ArticlePageArticleFragmentDoc}`;

/**
 * __useArticlePageArticleQuery__
 *
 * To run a query within a React component, call `useArticlePageArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlePageArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlePageArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useArticlePageArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticlePageArticleQuery, ArticlePageArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlePageArticleQuery, ArticlePageArticleQueryVariables>(ArticlePageArticleDocument, options);
      }
export function useArticlePageArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlePageArticleQuery, ArticlePageArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlePageArticleQuery, ArticlePageArticleQueryVariables>(ArticlePageArticleDocument, options);
        }
export type ArticlePageArticleQueryHookResult = ReturnType<typeof useArticlePageArticleQuery>;
export type ArticlePageArticleLazyQueryHookResult = ReturnType<typeof useArticlePageArticleLazyQuery>;
export type ArticlePageArticleQueryResult = Apollo.QueryResult<ArticlePageArticleQuery, ArticlePageArticleQueryVariables>;
export const ArticlesPageArticlesDocument = gql`
    query ArticlesPageArticles($page: Int) {
  articles(page: $page, per: 12) {
    records {
      ...ArticleCard
    }
    paging {
      ...paging
    }
  }
}
    ${ArticleCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useArticlesPageArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesPageArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesPageArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesPageArticlesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useArticlesPageArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesPageArticlesQuery, ArticlesPageArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesPageArticlesQuery, ArticlesPageArticlesQueryVariables>(ArticlesPageArticlesDocument, options);
      }
export function useArticlesPageArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesPageArticlesQuery, ArticlesPageArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesPageArticlesQuery, ArticlesPageArticlesQueryVariables>(ArticlesPageArticlesDocument, options);
        }
export type ArticlesPageArticlesQueryHookResult = ReturnType<typeof useArticlesPageArticlesQuery>;
export type ArticlesPageArticlesLazyQueryHookResult = ReturnType<typeof useArticlesPageArticlesLazyQuery>;
export type ArticlesPageArticlesQueryResult = Apollo.QueryResult<ArticlesPageArticlesQuery, ArticlesPageArticlesQueryVariables>;
export const BattlesPageDocument = gql`
    query BattlesPage {
  players(per: 10) {
    records {
      ...PlayerChip
    }
  }
  characters(order: use_rate, per: 10) {
    records {
      ...CharacterChip
    }
  }
  battles(per: 10) {
    records {
      ...BattleListItem
    }
    paging {
      ...paging
    }
  }
}
    ${PlayerChipFragmentDoc}
${CharacterChipFragmentDoc}
${BattleListItemFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useBattlesPageQuery__
 *
 * To run a query within a React component, call `useBattlesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useBattlesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattlesPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useBattlesPageQuery(baseOptions?: Apollo.QueryHookOptions<BattlesPageQuery, BattlesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BattlesPageQuery, BattlesPageQueryVariables>(BattlesPageDocument, options);
      }
export function useBattlesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BattlesPageQuery, BattlesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BattlesPageQuery, BattlesPageQueryVariables>(BattlesPageDocument, options);
        }
export type BattlesPageQueryHookResult = ReturnType<typeof useBattlesPageQuery>;
export type BattlesPageLazyQueryHookResult = ReturnType<typeof useBattlesPageLazyQuery>;
export type BattlesPageQueryResult = Apollo.QueryResult<BattlesPageQuery, BattlesPageQueryVariables>;
export const BattlesPageBattlesDocument = gql`
    query BattlesPageBattles($page: Int!) {
  battles(page: $page, per: 10) {
    records {
      ...BattleListItem
    }
    paging {
      ...paging
    }
  }
}
    ${BattleListItemFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useBattlesPageBattlesQuery__
 *
 * To run a query within a React component, call `useBattlesPageBattlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBattlesPageBattlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattlesPageBattlesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useBattlesPageBattlesQuery(baseOptions: Apollo.QueryHookOptions<BattlesPageBattlesQuery, BattlesPageBattlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BattlesPageBattlesQuery, BattlesPageBattlesQueryVariables>(BattlesPageBattlesDocument, options);
      }
export function useBattlesPageBattlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BattlesPageBattlesQuery, BattlesPageBattlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BattlesPageBattlesQuery, BattlesPageBattlesQueryVariables>(BattlesPageBattlesDocument, options);
        }
export type BattlesPageBattlesQueryHookResult = ReturnType<typeof useBattlesPageBattlesQuery>;
export type BattlesPageBattlesLazyQueryHookResult = ReturnType<typeof useBattlesPageBattlesLazyQuery>;
export type BattlesPageBattlesQueryResult = Apollo.QueryResult<BattlesPageBattlesQuery, BattlesPageBattlesQueryVariables>;
export const CharacterBattlesPageDocument = gql`
    query CharacterBattlesPage($characterSlug: String!, $playerSlug: String) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterPageProfile
  }
  battleCounts(characterSlug: $characterSlug, per: 10) {
    records {
      ...PlayerBattleCountChip
    }
  }
  battles(characterSlug: $characterSlug, playerSlug: $playerSlug, per: 10) {
    records {
      ...BattleListItem
    }
    paging {
      ...paging
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterPageProfileFragmentDoc}
${PlayerBattleCountChipFragmentDoc}
${BattleListItemFragmentDoc}
${PagingFragmentDoc}`;

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
 *      playerSlug: // value for 'playerSlug'
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
export const CharacterBattlesPageBattlesDocument = gql`
    query CharacterBattlesPageBattles($characterSlug: String!, $playerSlug: String, $page: Int!) {
  battles(
    characterSlug: $characterSlug
    playerSlug: $playerSlug
    page: $page
    per: 10
  ) {
    records {
      ...BattleListItem
    }
    paging {
      ...paging
    }
  }
}
    ${BattleListItemFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useCharacterBattlesPageBattlesQuery__
 *
 * To run a query within a React component, call `useCharacterBattlesPageBattlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterBattlesPageBattlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterBattlesPageBattlesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *      playerSlug: // value for 'playerSlug'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useCharacterBattlesPageBattlesQuery(baseOptions: Apollo.QueryHookOptions<CharacterBattlesPageBattlesQuery, CharacterBattlesPageBattlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterBattlesPageBattlesQuery, CharacterBattlesPageBattlesQueryVariables>(CharacterBattlesPageBattlesDocument, options);
      }
export function useCharacterBattlesPageBattlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterBattlesPageBattlesQuery, CharacterBattlesPageBattlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterBattlesPageBattlesQuery, CharacterBattlesPageBattlesQueryVariables>(CharacterBattlesPageBattlesDocument, options);
        }
export type CharacterBattlesPageBattlesQueryHookResult = ReturnType<typeof useCharacterBattlesPageBattlesQuery>;
export type CharacterBattlesPageBattlesLazyQueryHookResult = ReturnType<typeof useCharacterBattlesPageBattlesLazyQuery>;
export type CharacterBattlesPageBattlesQueryResult = Apollo.QueryResult<CharacterBattlesPageBattlesQuery, CharacterBattlesPageBattlesQueryVariables>;
export const CharacterCombosPageDocument = gql`
    query CharacterCombosPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterPageProfile
    comboCategories {
      id
      name
      combos {
        ...ComboMedia
      }
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterPageProfileFragmentDoc}
${ComboMediaFragmentDoc}`;

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
export const PageCharacterDocument = gql`
    query PageCharacter($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterPageProfile
    story
    description
  }
  battleCounts(characterSlug: $characterSlug, per: 10) {
    records {
      ...PlayerBattleCountChip
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterPageProfileFragmentDoc}
${PlayerBattleCountChipFragmentDoc}`;

/**
 * __usePageCharacterQuery__
 *
 * To run a query within a React component, call `usePageCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageCharacterQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageCharacterQuery(baseOptions: Apollo.QueryHookOptions<PageCharacterQuery, PageCharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageCharacterQuery, PageCharacterQueryVariables>(PageCharacterDocument, options);
      }
export function usePageCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageCharacterQuery, PageCharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageCharacterQuery, PageCharacterQueryVariables>(PageCharacterDocument, options);
        }
export type PageCharacterQueryHookResult = ReturnType<typeof usePageCharacterQuery>;
export type PageCharacterLazyQueryHookResult = ReturnType<typeof usePageCharacterLazyQuery>;
export type PageCharacterQueryResult = Apollo.QueryResult<PageCharacterQuery, PageCharacterQueryVariables>;
export const CharacterMovesPageDocument = gql`
    query CharacterMovesPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterPageProfile
    moveCategories {
      id
      name
      moves {
        ...CharacterMovesPageMove
      }
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterPageProfileFragmentDoc}
${CharacterMovesPageMoveFragmentDoc}`;

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
export const CharactersPageDocument = gql`
    query CharactersPage {
  characters {
    records {
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
export const DashboardArticlePageArticleDocument = gql`
    query DashboardArticlePageArticle($articleId: ID!) {
  article(articleId: $articleId) {
    ...ArticleFormArticle
  }
}
    ${ArticleFormArticleFragmentDoc}`;

/**
 * __useDashboardArticlePageArticleQuery__
 *
 * To run a query within a React component, call `useDashboardArticlePageArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardArticlePageArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardArticlePageArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useDashboardArticlePageArticleQuery(baseOptions: Apollo.QueryHookOptions<DashboardArticlePageArticleQuery, DashboardArticlePageArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardArticlePageArticleQuery, DashboardArticlePageArticleQueryVariables>(DashboardArticlePageArticleDocument, options);
      }
export function useDashboardArticlePageArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardArticlePageArticleQuery, DashboardArticlePageArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardArticlePageArticleQuery, DashboardArticlePageArticleQueryVariables>(DashboardArticlePageArticleDocument, options);
        }
export type DashboardArticlePageArticleQueryHookResult = ReturnType<typeof useDashboardArticlePageArticleQuery>;
export type DashboardArticlePageArticleLazyQueryHookResult = ReturnType<typeof useDashboardArticlePageArticleLazyQuery>;
export type DashboardArticlePageArticleQueryResult = Apollo.QueryResult<DashboardArticlePageArticleQuery, DashboardArticlePageArticleQueryVariables>;
export const DashboardArticlesPagePublishDocument = gql`
    mutation DashboardArticlesPagePublish($articleId: ID!) {
  publishArticle(input: {articleId: $articleId}) {
    article {
      ...DashboardArticlesPageArticle
    }
  }
}
    ${DashboardArticlesPageArticleFragmentDoc}`;
export type DashboardArticlesPagePublishMutationFn = Apollo.MutationFunction<DashboardArticlesPagePublishMutation, DashboardArticlesPagePublishMutationVariables>;

/**
 * __useDashboardArticlesPagePublishMutation__
 *
 * To run a mutation, you first call `useDashboardArticlesPagePublishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardArticlesPagePublishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardArticlesPagePublishMutation, { data, loading, error }] = useDashboardArticlesPagePublishMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useDashboardArticlesPagePublishMutation(baseOptions?: Apollo.MutationHookOptions<DashboardArticlesPagePublishMutation, DashboardArticlesPagePublishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardArticlesPagePublishMutation, DashboardArticlesPagePublishMutationVariables>(DashboardArticlesPagePublishDocument, options);
      }
export type DashboardArticlesPagePublishMutationHookResult = ReturnType<typeof useDashboardArticlesPagePublishMutation>;
export type DashboardArticlesPagePublishMutationResult = Apollo.MutationResult<DashboardArticlesPagePublishMutation>;
export type DashboardArticlesPagePublishMutationOptions = Apollo.BaseMutationOptions<DashboardArticlesPagePublishMutation, DashboardArticlesPagePublishMutationVariables>;
export const DashboardArticlesPageStopDocument = gql`
    mutation DashboardArticlesPageStop($articleId: ID!) {
  stopArticle(input: {articleId: $articleId}) {
    article {
      ...DashboardArticlesPageArticle
    }
  }
}
    ${DashboardArticlesPageArticleFragmentDoc}`;
export type DashboardArticlesPageStopMutationFn = Apollo.MutationFunction<DashboardArticlesPageStopMutation, DashboardArticlesPageStopMutationVariables>;

/**
 * __useDashboardArticlesPageStopMutation__
 *
 * To run a mutation, you first call `useDashboardArticlesPageStopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardArticlesPageStopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardArticlesPageStopMutation, { data, loading, error }] = useDashboardArticlesPageStopMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useDashboardArticlesPageStopMutation(baseOptions?: Apollo.MutationHookOptions<DashboardArticlesPageStopMutation, DashboardArticlesPageStopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardArticlesPageStopMutation, DashboardArticlesPageStopMutationVariables>(DashboardArticlesPageStopDocument, options);
      }
export type DashboardArticlesPageStopMutationHookResult = ReturnType<typeof useDashboardArticlesPageStopMutation>;
export type DashboardArticlesPageStopMutationResult = Apollo.MutationResult<DashboardArticlesPageStopMutation>;
export type DashboardArticlesPageStopMutationOptions = Apollo.BaseMutationOptions<DashboardArticlesPageStopMutation, DashboardArticlesPageStopMutationVariables>;
export const DashboardArticlesPageDeleteDocument = gql`
    mutation DashboardArticlesPageDelete($articleId: ID!) {
  deleteArticle(input: {articleId: $articleId}) {
    article {
      id
    }
  }
}
    `;
export type DashboardArticlesPageDeleteMutationFn = Apollo.MutationFunction<DashboardArticlesPageDeleteMutation, DashboardArticlesPageDeleteMutationVariables>;

/**
 * __useDashboardArticlesPageDeleteMutation__
 *
 * To run a mutation, you first call `useDashboardArticlesPageDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardArticlesPageDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardArticlesPageDeleteMutation, { data, loading, error }] = useDashboardArticlesPageDeleteMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useDashboardArticlesPageDeleteMutation(baseOptions?: Apollo.MutationHookOptions<DashboardArticlesPageDeleteMutation, DashboardArticlesPageDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardArticlesPageDeleteMutation, DashboardArticlesPageDeleteMutationVariables>(DashboardArticlesPageDeleteDocument, options);
      }
export type DashboardArticlesPageDeleteMutationHookResult = ReturnType<typeof useDashboardArticlesPageDeleteMutation>;
export type DashboardArticlesPageDeleteMutationResult = Apollo.MutationResult<DashboardArticlesPageDeleteMutation>;
export type DashboardArticlesPageDeleteMutationOptions = Apollo.BaseMutationOptions<DashboardArticlesPageDeleteMutation, DashboardArticlesPageDeleteMutationVariables>;
export const DashboardArticlesPageArticlesDocument = gql`
    query DashboardArticlesPageArticles($page: Int = 1, $keyword: String) {
  myArticles(page: $page, per: 10, keyword: $keyword) {
    records {
      ...DashboardArticlesPageArticle
    }
    paging {
      ...paging
    }
  }
}
    ${DashboardArticlesPageArticleFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useDashboardArticlesPageArticlesQuery__
 *
 * To run a query within a React component, call `useDashboardArticlesPageArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardArticlesPageArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardArticlesPageArticlesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDashboardArticlesPageArticlesQuery(baseOptions?: Apollo.QueryHookOptions<DashboardArticlesPageArticlesQuery, DashboardArticlesPageArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardArticlesPageArticlesQuery, DashboardArticlesPageArticlesQueryVariables>(DashboardArticlesPageArticlesDocument, options);
      }
export function useDashboardArticlesPageArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardArticlesPageArticlesQuery, DashboardArticlesPageArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardArticlesPageArticlesQuery, DashboardArticlesPageArticlesQueryVariables>(DashboardArticlesPageArticlesDocument, options);
        }
export type DashboardArticlesPageArticlesQueryHookResult = ReturnType<typeof useDashboardArticlesPageArticlesQuery>;
export type DashboardArticlesPageArticlesLazyQueryHookResult = ReturnType<typeof useDashboardArticlesPageArticlesLazyQuery>;
export type DashboardArticlesPageArticlesQueryResult = Apollo.QueryResult<DashboardArticlesPageArticlesQuery, DashboardArticlesPageArticlesQueryVariables>;
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
export const DashboardComboCategoriesPageDocument = gql`
    query DashboardComboCategoriesPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
  }
  comboCategories(characterSlug: $characterSlug) {
    ...DashboardComboCategoriesPageComboCategory
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${DashboardComboCategoriesPageComboCategoryFragmentDoc}`;

/**
 * __useDashboardComboCategoriesPageQuery__
 *
 * To run a query within a React component, call `useDashboardComboCategoriesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardComboCategoriesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardComboCategoriesPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useDashboardComboCategoriesPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardComboCategoriesPageQuery, DashboardComboCategoriesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardComboCategoriesPageQuery, DashboardComboCategoriesPageQueryVariables>(DashboardComboCategoriesPageDocument, options);
      }
export function useDashboardComboCategoriesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardComboCategoriesPageQuery, DashboardComboCategoriesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardComboCategoriesPageQuery, DashboardComboCategoriesPageQueryVariables>(DashboardComboCategoriesPageDocument, options);
        }
export type DashboardComboCategoriesPageQueryHookResult = ReturnType<typeof useDashboardComboCategoriesPageQuery>;
export type DashboardComboCategoriesPageLazyQueryHookResult = ReturnType<typeof useDashboardComboCategoriesPageLazyQuery>;
export type DashboardComboCategoriesPageQueryResult = Apollo.QueryResult<DashboardComboCategoriesPageQuery, DashboardComboCategoriesPageQueryVariables>;
export const DashboardComboCategoryNewPageDocument = gql`
    query DashboardComboCategoryNewPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    comboCategories {
      ...ComboCategoryPositionSelect
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${ComboCategoryPositionSelectFragmentDoc}`;

/**
 * __useDashboardComboCategoryNewPageQuery__
 *
 * To run a query within a React component, call `useDashboardComboCategoryNewPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardComboCategoryNewPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardComboCategoryNewPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useDashboardComboCategoryNewPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardComboCategoryNewPageQuery, DashboardComboCategoryNewPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardComboCategoryNewPageQuery, DashboardComboCategoryNewPageQueryVariables>(DashboardComboCategoryNewPageDocument, options);
      }
export function useDashboardComboCategoryNewPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardComboCategoryNewPageQuery, DashboardComboCategoryNewPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardComboCategoryNewPageQuery, DashboardComboCategoryNewPageQueryVariables>(DashboardComboCategoryNewPageDocument, options);
        }
export type DashboardComboCategoryNewPageQueryHookResult = ReturnType<typeof useDashboardComboCategoryNewPageQuery>;
export type DashboardComboCategoryNewPageLazyQueryHookResult = ReturnType<typeof useDashboardComboCategoryNewPageLazyQuery>;
export type DashboardComboCategoryNewPageQueryResult = Apollo.QueryResult<DashboardComboCategoryNewPageQuery, DashboardComboCategoryNewPageQueryVariables>;
export const PageDashboardCharacterEditDocument = gql`
    query PageDashboardCharacterEdit($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterForm
  }
}
    ${CharacterFormFragmentDoc}`;

/**
 * __usePageDashboardCharacterEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardCharacterEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardCharacterEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardCharacterEditQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageDashboardCharacterEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardCharacterEditQuery, PageDashboardCharacterEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardCharacterEditQuery, PageDashboardCharacterEditQueryVariables>(PageDashboardCharacterEditDocument, options);
      }
export function usePageDashboardCharacterEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardCharacterEditQuery, PageDashboardCharacterEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardCharacterEditQuery, PageDashboardCharacterEditQueryVariables>(PageDashboardCharacterEditDocument, options);
        }
export type PageDashboardCharacterEditQueryHookResult = ReturnType<typeof usePageDashboardCharacterEditQuery>;
export type PageDashboardCharacterEditLazyQueryHookResult = ReturnType<typeof usePageDashboardCharacterEditLazyQuery>;
export type PageDashboardCharacterEditQueryResult = Apollo.QueryResult<PageDashboardCharacterEditQuery, PageDashboardCharacterEditQueryVariables>;
export const DashboardMoveCategoriesPageDocument = gql`
    query DashboardMoveCategoriesPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
  }
  moveCategories(characterSlug: $characterSlug) {
    ...DashboardMoveCategoriesPageMoveCategory
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${DashboardMoveCategoriesPageMoveCategoryFragmentDoc}`;

/**
 * __useDashboardMoveCategoriesPageQuery__
 *
 * To run a query within a React component, call `useDashboardMoveCategoriesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardMoveCategoriesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardMoveCategoriesPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useDashboardMoveCategoriesPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardMoveCategoriesPageQuery, DashboardMoveCategoriesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardMoveCategoriesPageQuery, DashboardMoveCategoriesPageQueryVariables>(DashboardMoveCategoriesPageDocument, options);
      }
export function useDashboardMoveCategoriesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardMoveCategoriesPageQuery, DashboardMoveCategoriesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardMoveCategoriesPageQuery, DashboardMoveCategoriesPageQueryVariables>(DashboardMoveCategoriesPageDocument, options);
        }
export type DashboardMoveCategoriesPageQueryHookResult = ReturnType<typeof useDashboardMoveCategoriesPageQuery>;
export type DashboardMoveCategoriesPageLazyQueryHookResult = ReturnType<typeof useDashboardMoveCategoriesPageLazyQuery>;
export type DashboardMoveCategoriesPageQueryResult = Apollo.QueryResult<DashboardMoveCategoriesPageQuery, DashboardMoveCategoriesPageQueryVariables>;
export const DashboardMoveCategoryNewPageDocument = gql`
    query DashboardMoveCategoryNewPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    moveCategories {
      ...MoveCategoryPositionSelect
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${MoveCategoryPositionSelectFragmentDoc}`;

/**
 * __useDashboardMoveCategoryNewPageQuery__
 *
 * To run a query within a React component, call `useDashboardMoveCategoryNewPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardMoveCategoryNewPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardMoveCategoryNewPageQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useDashboardMoveCategoryNewPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardMoveCategoryNewPageQuery, DashboardMoveCategoryNewPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardMoveCategoryNewPageQuery, DashboardMoveCategoryNewPageQueryVariables>(DashboardMoveCategoryNewPageDocument, options);
      }
export function useDashboardMoveCategoryNewPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardMoveCategoryNewPageQuery, DashboardMoveCategoryNewPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardMoveCategoryNewPageQuery, DashboardMoveCategoryNewPageQueryVariables>(DashboardMoveCategoryNewPageDocument, options);
        }
export type DashboardMoveCategoryNewPageQueryHookResult = ReturnType<typeof useDashboardMoveCategoryNewPageQuery>;
export type DashboardMoveCategoryNewPageLazyQueryHookResult = ReturnType<typeof useDashboardMoveCategoryNewPageLazyQuery>;
export type DashboardMoveCategoryNewPageQueryResult = Apollo.QueryResult<DashboardMoveCategoryNewPageQuery, DashboardMoveCategoryNewPageQueryVariables>;
export const DashboardCharactersPageDocument = gql`
    query DashboardCharactersPage {
  characters {
    records {
      ...CharacterCard
    }
  }
}
    ${CharacterCardFragmentDoc}`;

/**
 * __useDashboardCharactersPageQuery__
 *
 * To run a query within a React component, call `useDashboardCharactersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardCharactersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardCharactersPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardCharactersPageQuery(baseOptions?: Apollo.QueryHookOptions<DashboardCharactersPageQuery, DashboardCharactersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardCharactersPageQuery, DashboardCharactersPageQueryVariables>(DashboardCharactersPageDocument, options);
      }
export function useDashboardCharactersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardCharactersPageQuery, DashboardCharactersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardCharactersPageQuery, DashboardCharactersPageQueryVariables>(DashboardCharactersPageDocument, options);
        }
export type DashboardCharactersPageQueryHookResult = ReturnType<typeof useDashboardCharactersPageQuery>;
export type DashboardCharactersPageLazyQueryHookResult = ReturnType<typeof useDashboardCharactersPageLazyQuery>;
export type DashboardCharactersPageQueryResult = Apollo.QueryResult<DashboardCharactersPageQuery, DashboardCharactersPageQueryVariables>;
export const PageDashboardComboNewDocument = gql`
    query PageDashboardComboNew($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    id
    name
    combos {
      ...ComboPositionSelect
    }
    character {
      slug
      name
      moveCategories {
        ...MoveSelectOption
      }
    }
  }
}
    ${ComboPositionSelectFragmentDoc}
${MoveSelectOptionFragmentDoc}`;

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
export const PageDashboardComboCategoryEditDocument = gql`
    query PageDashboardComboCategoryEdit($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    id
    name
    position
    character {
      slug
      name
      comboCategories {
        ...ComboCategoryPositionSelect
      }
    }
  }
}
    ${ComboCategoryPositionSelectFragmentDoc}`;

/**
 * __usePageDashboardComboCategoryEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardComboCategoryEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardComboCategoryEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardComboCategoryEditQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function usePageDashboardComboCategoryEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardComboCategoryEditQuery, PageDashboardComboCategoryEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardComboCategoryEditQuery, PageDashboardComboCategoryEditQueryVariables>(PageDashboardComboCategoryEditDocument, options);
      }
export function usePageDashboardComboCategoryEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardComboCategoryEditQuery, PageDashboardComboCategoryEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardComboCategoryEditQuery, PageDashboardComboCategoryEditQueryVariables>(PageDashboardComboCategoryEditDocument, options);
        }
export type PageDashboardComboCategoryEditQueryHookResult = ReturnType<typeof usePageDashboardComboCategoryEditQuery>;
export type PageDashboardComboCategoryEditLazyQueryHookResult = ReturnType<typeof usePageDashboardComboCategoryEditLazyQuery>;
export type PageDashboardComboCategoryEditQueryResult = Apollo.QueryResult<PageDashboardComboCategoryEditQuery, PageDashboardComboCategoryEditQueryVariables>;
export const PageDashboardComboEditDocument = gql`
    query PageDashboardComboEdit($comboId: ID!) {
  combo(comboId: $comboId) {
    ...ComboForm
    comboCategory {
      id
      name
      combos {
        ...ComboPositionSelect
      }
      character {
        slug
        name
        moveCategories {
          ...MoveSelectOption
        }
      }
    }
  }
}
    ${ComboFormFragmentDoc}
${ComboPositionSelectFragmentDoc}
${MoveSelectOptionFragmentDoc}`;

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
export const PageDashboardMoveCategoryEditDocument = gql`
    query PageDashboardMoveCategoryEdit($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    ...MoveCategoryForm
    character {
      slug
      name
      moveCategories {
        ...MoveCategoryPositionSelect
      }
    }
  }
}
    ${MoveCategoryFormFragmentDoc}
${MoveCategoryPositionSelectFragmentDoc}`;

/**
 * __usePageDashboardMoveCategoryEditQuery__
 *
 * To run a query within a React component, call `usePageDashboardMoveCategoryEditQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardMoveCategoryEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardMoveCategoryEditQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function usePageDashboardMoveCategoryEditQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardMoveCategoryEditQuery, PageDashboardMoveCategoryEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardMoveCategoryEditQuery, PageDashboardMoveCategoryEditQueryVariables>(PageDashboardMoveCategoryEditDocument, options);
      }
export function usePageDashboardMoveCategoryEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardMoveCategoryEditQuery, PageDashboardMoveCategoryEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardMoveCategoryEditQuery, PageDashboardMoveCategoryEditQueryVariables>(PageDashboardMoveCategoryEditDocument, options);
        }
export type PageDashboardMoveCategoryEditQueryHookResult = ReturnType<typeof usePageDashboardMoveCategoryEditQuery>;
export type PageDashboardMoveCategoryEditLazyQueryHookResult = ReturnType<typeof usePageDashboardMoveCategoryEditLazyQuery>;
export type PageDashboardMoveCategoryEditQueryResult = Apollo.QueryResult<PageDashboardMoveCategoryEditQuery, PageDashboardMoveCategoryEditQueryVariables>;
export const CreateReversalMoveDocument = gql`
    mutation CreateReversalMove($moveCategoryId: ID!, $attributes: ReversalMoveAttributes!) {
  createReversalMove(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    move {
      ...DashboardMoveCategoriesPageMove
    }
  }
}
    ${DashboardMoveCategoriesPageMoveFragmentDoc}`;
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
export const CreateThrowMoveDocument = gql`
    mutation CreateThrowMove($moveCategoryId: ID!, $attributes: ThrowMoveAttributes!) {
  createThrowMove(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    move {
      ...DashboardMoveCategoriesPageMove
    }
  }
}
    ${DashboardMoveCategoriesPageMoveFragmentDoc}`;
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
export const PageDashboardMoveNewDocument = gql`
    query PageDashboardMoveNew($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    id
    name
    character {
      slug
      name
    }
    moves {
      ...MovePositionSelect
    }
  }
}
    ${MovePositionSelectFragmentDoc}`;

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
export const CreateAttackMoveDocument = gql`
    mutation CreateAttackMove($moveCategoryId: ID!, $attributes: AttackMoveAttributes!) {
  createAttackMove(
    input: {moveCategoryId: $moveCategoryId, attributes: $attributes}
  ) {
    move {
      ...DashboardMoveCategoriesPageMove
    }
  }
}
    ${DashboardMoveCategoriesPageMoveFragmentDoc}`;
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
export const PageDashboardMoveCopyDocument = gql`
    query PageDashboardMoveCopy($moveId: ID!) {
  move(moveId: $moveId) {
    ...MoveForm
    moveCategory {
      id
      name
      character {
        slug
        name
      }
      moves {
        ...MovePositionSelect
      }
    }
  }
}
    ${MoveFormFragmentDoc}
${MovePositionSelectFragmentDoc}`;

/**
 * __usePageDashboardMoveCopyQuery__
 *
 * To run a query within a React component, call `usePageDashboardMoveCopyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardMoveCopyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardMoveCopyQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function usePageDashboardMoveCopyQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardMoveCopyQuery, PageDashboardMoveCopyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardMoveCopyQuery, PageDashboardMoveCopyQueryVariables>(PageDashboardMoveCopyDocument, options);
      }
export function usePageDashboardMoveCopyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardMoveCopyQuery, PageDashboardMoveCopyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardMoveCopyQuery, PageDashboardMoveCopyQueryVariables>(PageDashboardMoveCopyDocument, options);
        }
export type PageDashboardMoveCopyQueryHookResult = ReturnType<typeof usePageDashboardMoveCopyQuery>;
export type PageDashboardMoveCopyLazyQueryHookResult = ReturnType<typeof usePageDashboardMoveCopyLazyQuery>;
export type PageDashboardMoveCopyQueryResult = Apollo.QueryResult<PageDashboardMoveCopyQuery, PageDashboardMoveCopyQueryVariables>;
export const PageDashboardMoveEditDocument = gql`
    query PageDashboardMoveEdit($moveId: ID!) {
  move(moveId: $moveId) {
    ...MoveForm
    moveCategory {
      id
      name
      character {
        slug
        name
      }
      moves {
        ...MovePositionSelect
      }
    }
  }
}
    ${MoveFormFragmentDoc}
${MovePositionSelectFragmentDoc}`;

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
export const UpdateAttackMoveDocument = gql`
    mutation UpdateAttackMove($moveId: ID!, $attributes: AttackMoveAttributes!) {
  updateAttackMove(input: {moveId: $moveId, attributes: $attributes}) {
    move {
      id
    }
  }
}
    `;
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
      id
    }
  }
}
    `;
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
export const DashboardOrganizerEditPageDocument = gql`
    query DashboardOrganizerEditPage($organizerSlug: String!) {
  organizer(organizerSlug: $organizerSlug) {
    ...OrganizerForm
    ...OrganizerBreadcrumbs
  }
}
    ${OrganizerFormFragmentDoc}
${OrganizerBreadcrumbsFragmentDoc}`;

/**
 * __useDashboardOrganizerEditPageQuery__
 *
 * To run a query within a React component, call `useDashboardOrganizerEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardOrganizerEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardOrganizerEditPageQuery({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *   },
 * });
 */
export function useDashboardOrganizerEditPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardOrganizerEditPageQuery, DashboardOrganizerEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardOrganizerEditPageQuery, DashboardOrganizerEditPageQueryVariables>(DashboardOrganizerEditPageDocument, options);
      }
export function useDashboardOrganizerEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardOrganizerEditPageQuery, DashboardOrganizerEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardOrganizerEditPageQuery, DashboardOrganizerEditPageQueryVariables>(DashboardOrganizerEditPageDocument, options);
        }
export type DashboardOrganizerEditPageQueryHookResult = ReturnType<typeof useDashboardOrganizerEditPageQuery>;
export type DashboardOrganizerEditPageLazyQueryHookResult = ReturnType<typeof useDashboardOrganizerEditPageLazyQuery>;
export type DashboardOrganizerEditPageQueryResult = Apollo.QueryResult<DashboardOrganizerEditPageQuery, DashboardOrganizerEditPageQueryVariables>;
export const DashboardOrganizerEditPageUpdateOrganizerDocument = gql`
    mutation DashboardOrganizerEditPageUpdateOrganizer($organizerSlug: String!, $attributes: OrganizerAttributes!) {
  updateOrganizer(input: {organizerSlug: $organizerSlug, attributes: $attributes}) {
    organizer {
      ...OrganizerForm
      ...OrganizerBreadcrumbs
    }
  }
}
    ${OrganizerFormFragmentDoc}
${OrganizerBreadcrumbsFragmentDoc}`;
export type DashboardOrganizerEditPageUpdateOrganizerMutationFn = Apollo.MutationFunction<DashboardOrganizerEditPageUpdateOrganizerMutation, DashboardOrganizerEditPageUpdateOrganizerMutationVariables>;

/**
 * __useDashboardOrganizerEditPageUpdateOrganizerMutation__
 *
 * To run a mutation, you first call `useDashboardOrganizerEditPageUpdateOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardOrganizerEditPageUpdateOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardOrganizerEditPageUpdateOrganizerMutation, { data, loading, error }] = useDashboardOrganizerEditPageUpdateOrganizerMutation({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useDashboardOrganizerEditPageUpdateOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<DashboardOrganizerEditPageUpdateOrganizerMutation, DashboardOrganizerEditPageUpdateOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardOrganizerEditPageUpdateOrganizerMutation, DashboardOrganizerEditPageUpdateOrganizerMutationVariables>(DashboardOrganizerEditPageUpdateOrganizerDocument, options);
      }
export type DashboardOrganizerEditPageUpdateOrganizerMutationHookResult = ReturnType<typeof useDashboardOrganizerEditPageUpdateOrganizerMutation>;
export type DashboardOrganizerEditPageUpdateOrganizerMutationResult = Apollo.MutationResult<DashboardOrganizerEditPageUpdateOrganizerMutation>;
export type DashboardOrganizerEditPageUpdateOrganizerMutationOptions = Apollo.BaseMutationOptions<DashboardOrganizerEditPageUpdateOrganizerMutation, DashboardOrganizerEditPageUpdateOrganizerMutationVariables>;
export const DashboardOrganizersPageDeleteDocument = gql`
    mutation DashboardOrganizersPageDelete($organizerSlug: String!) {
  deleteOrganizer(input: {organizerSlug: $organizerSlug}) {
    organizer {
      id
    }
  }
}
    `;
export type DashboardOrganizersPageDeleteMutationFn = Apollo.MutationFunction<DashboardOrganizersPageDeleteMutation, DashboardOrganizersPageDeleteMutationVariables>;

/**
 * __useDashboardOrganizersPageDeleteMutation__
 *
 * To run a mutation, you first call `useDashboardOrganizersPageDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardOrganizersPageDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardOrganizersPageDeleteMutation, { data, loading, error }] = useDashboardOrganizersPageDeleteMutation({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *   },
 * });
 */
export function useDashboardOrganizersPageDeleteMutation(baseOptions?: Apollo.MutationHookOptions<DashboardOrganizersPageDeleteMutation, DashboardOrganizersPageDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardOrganizersPageDeleteMutation, DashboardOrganizersPageDeleteMutationVariables>(DashboardOrganizersPageDeleteDocument, options);
      }
export type DashboardOrganizersPageDeleteMutationHookResult = ReturnType<typeof useDashboardOrganizersPageDeleteMutation>;
export type DashboardOrganizersPageDeleteMutationResult = Apollo.MutationResult<DashboardOrganizersPageDeleteMutation>;
export type DashboardOrganizersPageDeleteMutationOptions = Apollo.BaseMutationOptions<DashboardOrganizersPageDeleteMutation, DashboardOrganizersPageDeleteMutationVariables>;
export const DashboardOrganizersPageOrganizersDocument = gql`
    query DashboardOrganizersPageOrganizers($page: Int = 1, $keyword: String) {
  organizers(page: $page, per: 10, keyword: $keyword) {
    records {
      ...DashboardOrganizersPageOrganizer
    }
    paging {
      ...paging
    }
  }
}
    ${DashboardOrganizersPageOrganizerFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useDashboardOrganizersPageOrganizersQuery__
 *
 * To run a query within a React component, call `useDashboardOrganizersPageOrganizersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardOrganizersPageOrganizersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardOrganizersPageOrganizersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDashboardOrganizersPageOrganizersQuery(baseOptions?: Apollo.QueryHookOptions<DashboardOrganizersPageOrganizersQuery, DashboardOrganizersPageOrganizersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardOrganizersPageOrganizersQuery, DashboardOrganizersPageOrganizersQueryVariables>(DashboardOrganizersPageOrganizersDocument, options);
      }
export function useDashboardOrganizersPageOrganizersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardOrganizersPageOrganizersQuery, DashboardOrganizersPageOrganizersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardOrganizersPageOrganizersQuery, DashboardOrganizersPageOrganizersQueryVariables>(DashboardOrganizersPageOrganizersDocument, options);
        }
export type DashboardOrganizersPageOrganizersQueryHookResult = ReturnType<typeof useDashboardOrganizersPageOrganizersQuery>;
export type DashboardOrganizersPageOrganizersLazyQueryHookResult = ReturnType<typeof useDashboardOrganizersPageOrganizersLazyQuery>;
export type DashboardOrganizersPageOrganizersQueryResult = Apollo.QueryResult<DashboardOrganizersPageOrganizersQuery, DashboardOrganizersPageOrganizersQueryVariables>;
export const DashboardOrganizersNewPageCreateOrganizerDocument = gql`
    mutation DashboardOrganizersNewPageCreateOrganizer($attributes: OrganizerAttributes!) {
  createOrganizer(input: {attributes: $attributes}) {
    organizer {
      id
    }
  }
}
    `;
export type DashboardOrganizersNewPageCreateOrganizerMutationFn = Apollo.MutationFunction<DashboardOrganizersNewPageCreateOrganizerMutation, DashboardOrganizersNewPageCreateOrganizerMutationVariables>;

/**
 * __useDashboardOrganizersNewPageCreateOrganizerMutation__
 *
 * To run a mutation, you first call `useDashboardOrganizersNewPageCreateOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardOrganizersNewPageCreateOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardOrganizersNewPageCreateOrganizerMutation, { data, loading, error }] = useDashboardOrganizersNewPageCreateOrganizerMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useDashboardOrganizersNewPageCreateOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<DashboardOrganizersNewPageCreateOrganizerMutation, DashboardOrganizersNewPageCreateOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardOrganizersNewPageCreateOrganizerMutation, DashboardOrganizersNewPageCreateOrganizerMutationVariables>(DashboardOrganizersNewPageCreateOrganizerDocument, options);
      }
export type DashboardOrganizersNewPageCreateOrganizerMutationHookResult = ReturnType<typeof useDashboardOrganizersNewPageCreateOrganizerMutation>;
export type DashboardOrganizersNewPageCreateOrganizerMutationResult = Apollo.MutationResult<DashboardOrganizersNewPageCreateOrganizerMutation>;
export type DashboardOrganizersNewPageCreateOrganizerMutationOptions = Apollo.BaseMutationOptions<DashboardOrganizersNewPageCreateOrganizerMutation, DashboardOrganizersNewPageCreateOrganizerMutationVariables>;
export const DashboardPlayerEditPageDocument = gql`
    query DashboardPlayerEditPage($playerSlug: String!) {
  player(playerSlug: $playerSlug) {
    ...PlayerForm
    ...PlayerBreadcrumbs
  }
}
    ${PlayerFormFragmentDoc}
${PlayerBreadcrumbsFragmentDoc}`;

/**
 * __useDashboardPlayerEditPageQuery__
 *
 * To run a query within a React component, call `useDashboardPlayerEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayerEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardPlayerEditPageQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function useDashboardPlayerEditPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardPlayerEditPageQuery, DashboardPlayerEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardPlayerEditPageQuery, DashboardPlayerEditPageQueryVariables>(DashboardPlayerEditPageDocument, options);
      }
export function useDashboardPlayerEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardPlayerEditPageQuery, DashboardPlayerEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardPlayerEditPageQuery, DashboardPlayerEditPageQueryVariables>(DashboardPlayerEditPageDocument, options);
        }
export type DashboardPlayerEditPageQueryHookResult = ReturnType<typeof useDashboardPlayerEditPageQuery>;
export type DashboardPlayerEditPageLazyQueryHookResult = ReturnType<typeof useDashboardPlayerEditPageLazyQuery>;
export type DashboardPlayerEditPageQueryResult = Apollo.QueryResult<DashboardPlayerEditPageQuery, DashboardPlayerEditPageQueryVariables>;
export const DashboardPlayerEditPageUpdatePlayerDocument = gql`
    mutation DashboardPlayerEditPageUpdatePlayer($playerSlug: String!, $attributes: PlayerAttributes!) {
  updatePlayer(input: {playerSlug: $playerSlug, attributes: $attributes}) {
    player {
      ...PlayerForm
      ...PlayerBreadcrumbs
    }
  }
}
    ${PlayerFormFragmentDoc}
${PlayerBreadcrumbsFragmentDoc}`;
export type DashboardPlayerEditPageUpdatePlayerMutationFn = Apollo.MutationFunction<DashboardPlayerEditPageUpdatePlayerMutation, DashboardPlayerEditPageUpdatePlayerMutationVariables>;

/**
 * __useDashboardPlayerEditPageUpdatePlayerMutation__
 *
 * To run a mutation, you first call `useDashboardPlayerEditPageUpdatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayerEditPageUpdatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardPlayerEditPageUpdatePlayerMutation, { data, loading, error }] = useDashboardPlayerEditPageUpdatePlayerMutation({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useDashboardPlayerEditPageUpdatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DashboardPlayerEditPageUpdatePlayerMutation, DashboardPlayerEditPageUpdatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardPlayerEditPageUpdatePlayerMutation, DashboardPlayerEditPageUpdatePlayerMutationVariables>(DashboardPlayerEditPageUpdatePlayerDocument, options);
      }
export type DashboardPlayerEditPageUpdatePlayerMutationHookResult = ReturnType<typeof useDashboardPlayerEditPageUpdatePlayerMutation>;
export type DashboardPlayerEditPageUpdatePlayerMutationResult = Apollo.MutationResult<DashboardPlayerEditPageUpdatePlayerMutation>;
export type DashboardPlayerEditPageUpdatePlayerMutationOptions = Apollo.BaseMutationOptions<DashboardPlayerEditPageUpdatePlayerMutation, DashboardPlayerEditPageUpdatePlayerMutationVariables>;
export const DashboardPlayersPagePlayersDocument = gql`
    query DashboardPlayersPagePlayers($page: Int = 1, $keyword: String) {
  players(page: $page, per: 10, keyword: $keyword) {
    records {
      ...DashboardPlayersPagePlayer
    }
    paging {
      ...paging
    }
  }
}
    ${DashboardPlayersPagePlayerFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useDashboardPlayersPagePlayersQuery__
 *
 * To run a query within a React component, call `useDashboardPlayersPagePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayersPagePlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardPlayersPagePlayersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDashboardPlayersPagePlayersQuery(baseOptions?: Apollo.QueryHookOptions<DashboardPlayersPagePlayersQuery, DashboardPlayersPagePlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardPlayersPagePlayersQuery, DashboardPlayersPagePlayersQueryVariables>(DashboardPlayersPagePlayersDocument, options);
      }
export function useDashboardPlayersPagePlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardPlayersPagePlayersQuery, DashboardPlayersPagePlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardPlayersPagePlayersQuery, DashboardPlayersPagePlayersQueryVariables>(DashboardPlayersPagePlayersDocument, options);
        }
export type DashboardPlayersPagePlayersQueryHookResult = ReturnType<typeof useDashboardPlayersPagePlayersQuery>;
export type DashboardPlayersPagePlayersLazyQueryHookResult = ReturnType<typeof useDashboardPlayersPagePlayersLazyQuery>;
export type DashboardPlayersPagePlayersQueryResult = Apollo.QueryResult<DashboardPlayersPagePlayersQuery, DashboardPlayersPagePlayersQueryVariables>;
export const DashboardPlayersPageDeleteDocument = gql`
    mutation DashboardPlayersPageDelete($playerSlug: String!) {
  deletePlayer(input: {playerSlug: $playerSlug}) {
    player {
      id
    }
  }
}
    `;
export type DashboardPlayersPageDeleteMutationFn = Apollo.MutationFunction<DashboardPlayersPageDeleteMutation, DashboardPlayersPageDeleteMutationVariables>;

/**
 * __useDashboardPlayersPageDeleteMutation__
 *
 * To run a mutation, you first call `useDashboardPlayersPageDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayersPageDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardPlayersPageDeleteMutation, { data, loading, error }] = useDashboardPlayersPageDeleteMutation({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function useDashboardPlayersPageDeleteMutation(baseOptions?: Apollo.MutationHookOptions<DashboardPlayersPageDeleteMutation, DashboardPlayersPageDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardPlayersPageDeleteMutation, DashboardPlayersPageDeleteMutationVariables>(DashboardPlayersPageDeleteDocument, options);
      }
export type DashboardPlayersPageDeleteMutationHookResult = ReturnType<typeof useDashboardPlayersPageDeleteMutation>;
export type DashboardPlayersPageDeleteMutationResult = Apollo.MutationResult<DashboardPlayersPageDeleteMutation>;
export type DashboardPlayersPageDeleteMutationOptions = Apollo.BaseMutationOptions<DashboardPlayersPageDeleteMutation, DashboardPlayersPageDeleteMutationVariables>;
export const DashboardPlayersPageCreatePlayerFromSmashggDocument = gql`
    mutation DashboardPlayersPageCreatePlayerFromSmashgg($smashggId: String!) {
  createPlayerFromSmashgg(input: {smashggId: $smashggId}) {
    player {
      id
    }
  }
}
    `;
export type DashboardPlayersPageCreatePlayerFromSmashggMutationFn = Apollo.MutationFunction<DashboardPlayersPageCreatePlayerFromSmashggMutation, DashboardPlayersPageCreatePlayerFromSmashggMutationVariables>;

/**
 * __useDashboardPlayersPageCreatePlayerFromSmashggMutation__
 *
 * To run a mutation, you first call `useDashboardPlayersPageCreatePlayerFromSmashggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayersPageCreatePlayerFromSmashggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardPlayersPageCreatePlayerFromSmashggMutation, { data, loading, error }] = useDashboardPlayersPageCreatePlayerFromSmashggMutation({
 *   variables: {
 *      smashggId: // value for 'smashggId'
 *   },
 * });
 */
export function useDashboardPlayersPageCreatePlayerFromSmashggMutation(baseOptions?: Apollo.MutationHookOptions<DashboardPlayersPageCreatePlayerFromSmashggMutation, DashboardPlayersPageCreatePlayerFromSmashggMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardPlayersPageCreatePlayerFromSmashggMutation, DashboardPlayersPageCreatePlayerFromSmashggMutationVariables>(DashboardPlayersPageCreatePlayerFromSmashggDocument, options);
      }
export type DashboardPlayersPageCreatePlayerFromSmashggMutationHookResult = ReturnType<typeof useDashboardPlayersPageCreatePlayerFromSmashggMutation>;
export type DashboardPlayersPageCreatePlayerFromSmashggMutationResult = Apollo.MutationResult<DashboardPlayersPageCreatePlayerFromSmashggMutation>;
export type DashboardPlayersPageCreatePlayerFromSmashggMutationOptions = Apollo.BaseMutationOptions<DashboardPlayersPageCreatePlayerFromSmashggMutation, DashboardPlayersPageCreatePlayerFromSmashggMutationVariables>;
export const DashboardPlayersNewPageCreatePlayerDocument = gql`
    mutation DashboardPlayersNewPageCreatePlayer($attributes: PlayerAttributes!) {
  createPlayer(input: {attributes: $attributes}) {
    player {
      id
    }
  }
}
    `;
export type DashboardPlayersNewPageCreatePlayerMutationFn = Apollo.MutationFunction<DashboardPlayersNewPageCreatePlayerMutation, DashboardPlayersNewPageCreatePlayerMutationVariables>;

/**
 * __useDashboardPlayersNewPageCreatePlayerMutation__
 *
 * To run a mutation, you first call `useDashboardPlayersNewPageCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayersNewPageCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardPlayersNewPageCreatePlayerMutation, { data, loading, error }] = useDashboardPlayersNewPageCreatePlayerMutation({
 *   variables: {
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useDashboardPlayersNewPageCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DashboardPlayersNewPageCreatePlayerMutation, DashboardPlayersNewPageCreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardPlayersNewPageCreatePlayerMutation, DashboardPlayersNewPageCreatePlayerMutationVariables>(DashboardPlayersNewPageCreatePlayerDocument, options);
      }
export type DashboardPlayersNewPageCreatePlayerMutationHookResult = ReturnType<typeof useDashboardPlayersNewPageCreatePlayerMutation>;
export type DashboardPlayersNewPageCreatePlayerMutationResult = Apollo.MutationResult<DashboardPlayersNewPageCreatePlayerMutation>;
export type DashboardPlayersNewPageCreatePlayerMutationOptions = Apollo.BaseMutationOptions<DashboardPlayersNewPageCreatePlayerMutation, DashboardPlayersNewPageCreatePlayerMutationVariables>;
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
      ...DashboardBattlesPageBattleReslut
    }
  }
}
    ${DashboardBattlesPageBattleReslutFragmentDoc}`;
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
export const DashboardBattlesPageDocument = gql`
    query DashboardBattlesPage($tournamentVideoId: ID!) {
  tournamentVideo(tournamentVideoId: $tournamentVideoId) {
    id
    title
    youtubeVideoId
    tournament {
      id
      name
    }
  }
  players(per: 500) {
    records {
      ...PlayerSelectOption
    }
  }
  characters {
    records {
      ...CharacterSelectOption
    }
  }
}
    ${PlayerSelectOptionFragmentDoc}
${CharacterSelectOptionFragmentDoc}`;

/**
 * __useDashboardBattlesPageQuery__
 *
 * To run a query within a React component, call `useDashboardBattlesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardBattlesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardBattlesPageQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useDashboardBattlesPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardBattlesPageQuery, DashboardBattlesPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardBattlesPageQuery, DashboardBattlesPageQueryVariables>(DashboardBattlesPageDocument, options);
      }
export function useDashboardBattlesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardBattlesPageQuery, DashboardBattlesPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardBattlesPageQuery, DashboardBattlesPageQueryVariables>(DashboardBattlesPageDocument, options);
        }
export type DashboardBattlesPageQueryHookResult = ReturnType<typeof useDashboardBattlesPageQuery>;
export type DashboardBattlesPageLazyQueryHookResult = ReturnType<typeof useDashboardBattlesPageLazyQuery>;
export type DashboardBattlesPageQueryResult = Apollo.QueryResult<DashboardBattlesPageQuery, DashboardBattlesPageQueryVariables>;
export const DashboardBattlesPageBattlesDocument = gql`
    query DashboardBattlesPageBattles($tournamentVideoId: ID!) {
  battles(tournamentVideoId: $tournamentVideoId, per: 200) {
    records {
      ...DashboardBattlesPageBattleReslut
    }
  }
}
    ${DashboardBattlesPageBattleReslutFragmentDoc}`;

/**
 * __useDashboardBattlesPageBattlesQuery__
 *
 * To run a query within a React component, call `useDashboardBattlesPageBattlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardBattlesPageBattlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardBattlesPageBattlesQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useDashboardBattlesPageBattlesQuery(baseOptions: Apollo.QueryHookOptions<DashboardBattlesPageBattlesQuery, DashboardBattlesPageBattlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardBattlesPageBattlesQuery, DashboardBattlesPageBattlesQueryVariables>(DashboardBattlesPageBattlesDocument, options);
      }
export function useDashboardBattlesPageBattlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardBattlesPageBattlesQuery, DashboardBattlesPageBattlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardBattlesPageBattlesQuery, DashboardBattlesPageBattlesQueryVariables>(DashboardBattlesPageBattlesDocument, options);
        }
export type DashboardBattlesPageBattlesQueryHookResult = ReturnType<typeof useDashboardBattlesPageBattlesQuery>;
export type DashboardBattlesPageBattlesLazyQueryHookResult = ReturnType<typeof useDashboardBattlesPageBattlesLazyQuery>;
export type DashboardBattlesPageBattlesQueryResult = Apollo.QueryResult<DashboardBattlesPageBattlesQuery, DashboardBattlesPageBattlesQueryVariables>;
export const DashboardTournamentVideoEditPageDocument = gql`
    query DashboardTournamentVideoEditPage($tournamentVideoId: ID!) {
  tournamentVideo(tournamentVideoId: $tournamentVideoId) {
    ...TournamentVideoForm
    ...TournamentVideoBreadcrumbs
  }
}
    ${TournamentVideoFormFragmentDoc}
${TournamentVideoBreadcrumbsFragmentDoc}`;

/**
 * __useDashboardTournamentVideoEditPageQuery__
 *
 * To run a query within a React component, call `useDashboardTournamentVideoEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentVideoEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardTournamentVideoEditPageQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useDashboardTournamentVideoEditPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardTournamentVideoEditPageQuery, DashboardTournamentVideoEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTournamentVideoEditPageQuery, DashboardTournamentVideoEditPageQueryVariables>(DashboardTournamentVideoEditPageDocument, options);
      }
export function useDashboardTournamentVideoEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTournamentVideoEditPageQuery, DashboardTournamentVideoEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTournamentVideoEditPageQuery, DashboardTournamentVideoEditPageQueryVariables>(DashboardTournamentVideoEditPageDocument, options);
        }
export type DashboardTournamentVideoEditPageQueryHookResult = ReturnType<typeof useDashboardTournamentVideoEditPageQuery>;
export type DashboardTournamentVideoEditPageLazyQueryHookResult = ReturnType<typeof useDashboardTournamentVideoEditPageLazyQuery>;
export type DashboardTournamentVideoEditPageQueryResult = Apollo.QueryResult<DashboardTournamentVideoEditPageQuery, DashboardTournamentVideoEditPageQueryVariables>;
export const DashboardTournamentVideoEditPageUpdateDocument = gql`
    mutation DashboardTournamentVideoEditPageUpdate($tournamentVideoId: ID!, $attributes: TournamentVideoAttributes!) {
  updateTournamentVideo(
    input: {tournamentVideoId: $tournamentVideoId, attributes: $attributes}
  ) {
    tournamentVideo {
      ...TournamentVideoForm
    }
  }
}
    ${TournamentVideoFormFragmentDoc}`;
export type DashboardTournamentVideoEditPageUpdateMutationFn = Apollo.MutationFunction<DashboardTournamentVideoEditPageUpdateMutation, DashboardTournamentVideoEditPageUpdateMutationVariables>;

/**
 * __useDashboardTournamentVideoEditPageUpdateMutation__
 *
 * To run a mutation, you first call `useDashboardTournamentVideoEditPageUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentVideoEditPageUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardTournamentVideoEditPageUpdateMutation, { data, loading, error }] = useDashboardTournamentVideoEditPageUpdateMutation({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useDashboardTournamentVideoEditPageUpdateMutation(baseOptions?: Apollo.MutationHookOptions<DashboardTournamentVideoEditPageUpdateMutation, DashboardTournamentVideoEditPageUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardTournamentVideoEditPageUpdateMutation, DashboardTournamentVideoEditPageUpdateMutationVariables>(DashboardTournamentVideoEditPageUpdateDocument, options);
      }
export type DashboardTournamentVideoEditPageUpdateMutationHookResult = ReturnType<typeof useDashboardTournamentVideoEditPageUpdateMutation>;
export type DashboardTournamentVideoEditPageUpdateMutationResult = Apollo.MutationResult<DashboardTournamentVideoEditPageUpdateMutation>;
export type DashboardTournamentVideoEditPageUpdateMutationOptions = Apollo.BaseMutationOptions<DashboardTournamentVideoEditPageUpdateMutation, DashboardTournamentVideoEditPageUpdateMutationVariables>;
export const DashboardTournamentEditPageDocument = gql`
    query DashboardTournamentEditPage($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
    ...TournamentForm
    ...TournamentBreadcrumbs
  }
}
    ${TournamentFormFragmentDoc}
${TournamentBreadcrumbsFragmentDoc}`;

/**
 * __useDashboardTournamentEditPageQuery__
 *
 * To run a query within a React component, call `useDashboardTournamentEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardTournamentEditPageQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useDashboardTournamentEditPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardTournamentEditPageQuery, DashboardTournamentEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTournamentEditPageQuery, DashboardTournamentEditPageQueryVariables>(DashboardTournamentEditPageDocument, options);
      }
export function useDashboardTournamentEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTournamentEditPageQuery, DashboardTournamentEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTournamentEditPageQuery, DashboardTournamentEditPageQueryVariables>(DashboardTournamentEditPageDocument, options);
        }
export type DashboardTournamentEditPageQueryHookResult = ReturnType<typeof useDashboardTournamentEditPageQuery>;
export type DashboardTournamentEditPageLazyQueryHookResult = ReturnType<typeof useDashboardTournamentEditPageLazyQuery>;
export type DashboardTournamentEditPageQueryResult = Apollo.QueryResult<DashboardTournamentEditPageQuery, DashboardTournamentEditPageQueryVariables>;
export const DashboardTournamentEditPageUpdateTournamentDocument = gql`
    mutation DashboardTournamentEditPageUpdateTournament($tournamentId: ID!, $attributes: TournamentAttributes!) {
  updateTournament(input: {tournamentId: $tournamentId, attributes: $attributes}) {
    tournament {
      ...TournamentForm
      ...TournamentBreadcrumbs
    }
  }
}
    ${TournamentFormFragmentDoc}
${TournamentBreadcrumbsFragmentDoc}`;
export type DashboardTournamentEditPageUpdateTournamentMutationFn = Apollo.MutationFunction<DashboardTournamentEditPageUpdateTournamentMutation, DashboardTournamentEditPageUpdateTournamentMutationVariables>;

/**
 * __useDashboardTournamentEditPageUpdateTournamentMutation__
 *
 * To run a mutation, you first call `useDashboardTournamentEditPageUpdateTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentEditPageUpdateTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardTournamentEditPageUpdateTournamentMutation, { data, loading, error }] = useDashboardTournamentEditPageUpdateTournamentMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useDashboardTournamentEditPageUpdateTournamentMutation(baseOptions?: Apollo.MutationHookOptions<DashboardTournamentEditPageUpdateTournamentMutation, DashboardTournamentEditPageUpdateTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardTournamentEditPageUpdateTournamentMutation, DashboardTournamentEditPageUpdateTournamentMutationVariables>(DashboardTournamentEditPageUpdateTournamentDocument, options);
      }
export type DashboardTournamentEditPageUpdateTournamentMutationHookResult = ReturnType<typeof useDashboardTournamentEditPageUpdateTournamentMutation>;
export type DashboardTournamentEditPageUpdateTournamentMutationResult = Apollo.MutationResult<DashboardTournamentEditPageUpdateTournamentMutation>;
export type DashboardTournamentEditPageUpdateTournamentMutationOptions = Apollo.BaseMutationOptions<DashboardTournamentEditPageUpdateTournamentMutation, DashboardTournamentEditPageUpdateTournamentMutationVariables>;
export const DashboardTournamentPageDocument = gql`
    query DashboardTournamentPage($tournamentId: ID!) {
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
  players(per: 500) {
    records {
      ...PlayerSelectOption
    }
  }
}
    ${PlayerSelectOptionFragmentDoc}`;

/**
 * __useDashboardTournamentPageQuery__
 *
 * To run a query within a React component, call `useDashboardTournamentPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardTournamentPageQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useDashboardTournamentPageQuery(baseOptions: Apollo.QueryHookOptions<DashboardTournamentPageQuery, DashboardTournamentPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTournamentPageQuery, DashboardTournamentPageQueryVariables>(DashboardTournamentPageDocument, options);
      }
export function useDashboardTournamentPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTournamentPageQuery, DashboardTournamentPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTournamentPageQuery, DashboardTournamentPageQueryVariables>(DashboardTournamentPageDocument, options);
        }
export type DashboardTournamentPageQueryHookResult = ReturnType<typeof useDashboardTournamentPageQuery>;
export type DashboardTournamentPageLazyQueryHookResult = ReturnType<typeof useDashboardTournamentPageLazyQuery>;
export type DashboardTournamentPageQueryResult = Apollo.QueryResult<DashboardTournamentPageQuery, DashboardTournamentPageQueryVariables>;
export const DashboardTournamentPageStandingsDocument = gql`
    query DashboardTournamentPageStandings($tournamentId: ID!) {
  standings(tournamentId: $tournamentId, per: 100) {
    records {
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
 * __useDashboardTournamentPageStandingsQuery__
 *
 * To run a query within a React component, call `useDashboardTournamentPageStandingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentPageStandingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardTournamentPageStandingsQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useDashboardTournamentPageStandingsQuery(baseOptions: Apollo.QueryHookOptions<DashboardTournamentPageStandingsQuery, DashboardTournamentPageStandingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTournamentPageStandingsQuery, DashboardTournamentPageStandingsQueryVariables>(DashboardTournamentPageStandingsDocument, options);
      }
export function useDashboardTournamentPageStandingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTournamentPageStandingsQuery, DashboardTournamentPageStandingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTournamentPageStandingsQuery, DashboardTournamentPageStandingsQueryVariables>(DashboardTournamentPageStandingsDocument, options);
        }
export type DashboardTournamentPageStandingsQueryHookResult = ReturnType<typeof useDashboardTournamentPageStandingsQuery>;
export type DashboardTournamentPageStandingsLazyQueryHookResult = ReturnType<typeof useDashboardTournamentPageStandingsLazyQuery>;
export type DashboardTournamentPageStandingsQueryResult = Apollo.QueryResult<DashboardTournamentPageStandingsQuery, DashboardTournamentPageStandingsQueryVariables>;
export const DashboardTournamentPageVideosDocument = gql`
    query DashboardTournamentPageVideos($tournamentId: ID!) {
  tournamentVideos(tournamentId: $tournamentId) {
    records {
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
 * __useDashboardTournamentPageVideosQuery__
 *
 * To run a query within a React component, call `useDashboardTournamentPageVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentPageVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardTournamentPageVideosQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function useDashboardTournamentPageVideosQuery(baseOptions: Apollo.QueryHookOptions<DashboardTournamentPageVideosQuery, DashboardTournamentPageVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTournamentPageVideosQuery, DashboardTournamentPageVideosQueryVariables>(DashboardTournamentPageVideosDocument, options);
      }
export function useDashboardTournamentPageVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTournamentPageVideosQuery, DashboardTournamentPageVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTournamentPageVideosQuery, DashboardTournamentPageVideosQueryVariables>(DashboardTournamentPageVideosDocument, options);
        }
export type DashboardTournamentPageVideosQueryHookResult = ReturnType<typeof useDashboardTournamentPageVideosQuery>;
export type DashboardTournamentPageVideosLazyQueryHookResult = ReturnType<typeof useDashboardTournamentPageVideosLazyQuery>;
export type DashboardTournamentPageVideosQueryResult = Apollo.QueryResult<DashboardTournamentPageVideosQuery, DashboardTournamentPageVideosQueryVariables>;
export const DashboardTournamentPageCreateStandingDocument = gql`
    mutation DashboardTournamentPageCreateStanding($tournamentId: ID!, $attributes: StandingAttributes!) {
  createStanding(input: {tournamentId: $tournamentId, attributes: $attributes}) {
    standing {
      id
    }
  }
}
    `;
export type DashboardTournamentPageCreateStandingMutationFn = Apollo.MutationFunction<DashboardTournamentPageCreateStandingMutation, DashboardTournamentPageCreateStandingMutationVariables>;

/**
 * __useDashboardTournamentPageCreateStandingMutation__
 *
 * To run a mutation, you first call `useDashboardTournamentPageCreateStandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentPageCreateStandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardTournamentPageCreateStandingMutation, { data, loading, error }] = useDashboardTournamentPageCreateStandingMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useDashboardTournamentPageCreateStandingMutation(baseOptions?: Apollo.MutationHookOptions<DashboardTournamentPageCreateStandingMutation, DashboardTournamentPageCreateStandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardTournamentPageCreateStandingMutation, DashboardTournamentPageCreateStandingMutationVariables>(DashboardTournamentPageCreateStandingDocument, options);
      }
export type DashboardTournamentPageCreateStandingMutationHookResult = ReturnType<typeof useDashboardTournamentPageCreateStandingMutation>;
export type DashboardTournamentPageCreateStandingMutationResult = Apollo.MutationResult<DashboardTournamentPageCreateStandingMutation>;
export type DashboardTournamentPageCreateStandingMutationOptions = Apollo.BaseMutationOptions<DashboardTournamentPageCreateStandingMutation, DashboardTournamentPageCreateStandingMutationVariables>;
export const DashboardTournamentPageDeleteStandingDocument = gql`
    mutation DashboardTournamentPageDeleteStanding($standingId: ID!) {
  deleteStanding(input: {standingId: $standingId}) {
    standing {
      id
    }
  }
}
    `;
export type DashboardTournamentPageDeleteStandingMutationFn = Apollo.MutationFunction<DashboardTournamentPageDeleteStandingMutation, DashboardTournamentPageDeleteStandingMutationVariables>;

/**
 * __useDashboardTournamentPageDeleteStandingMutation__
 *
 * To run a mutation, you first call `useDashboardTournamentPageDeleteStandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentPageDeleteStandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardTournamentPageDeleteStandingMutation, { data, loading, error }] = useDashboardTournamentPageDeleteStandingMutation({
 *   variables: {
 *      standingId: // value for 'standingId'
 *   },
 * });
 */
export function useDashboardTournamentPageDeleteStandingMutation(baseOptions?: Apollo.MutationHookOptions<DashboardTournamentPageDeleteStandingMutation, DashboardTournamentPageDeleteStandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardTournamentPageDeleteStandingMutation, DashboardTournamentPageDeleteStandingMutationVariables>(DashboardTournamentPageDeleteStandingDocument, options);
      }
export type DashboardTournamentPageDeleteStandingMutationHookResult = ReturnType<typeof useDashboardTournamentPageDeleteStandingMutation>;
export type DashboardTournamentPageDeleteStandingMutationResult = Apollo.MutationResult<DashboardTournamentPageDeleteStandingMutation>;
export type DashboardTournamentPageDeleteStandingMutationOptions = Apollo.BaseMutationOptions<DashboardTournamentPageDeleteStandingMutation, DashboardTournamentPageDeleteStandingMutationVariables>;
export const DashboardTournamentPageCreateVideoDocument = gql`
    mutation DashboardTournamentPageCreateVideo($tournamentId: ID!, $url: String!) {
  createTournamentVideo(input: {tournamentId: $tournamentId, url: $url}) {
    tournamentVideo {
      id
    }
  }
}
    `;
export type DashboardTournamentPageCreateVideoMutationFn = Apollo.MutationFunction<DashboardTournamentPageCreateVideoMutation, DashboardTournamentPageCreateVideoMutationVariables>;

/**
 * __useDashboardTournamentPageCreateVideoMutation__
 *
 * To run a mutation, you first call `useDashboardTournamentPageCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentPageCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardTournamentPageCreateVideoMutation, { data, loading, error }] = useDashboardTournamentPageCreateVideoMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useDashboardTournamentPageCreateVideoMutation(baseOptions?: Apollo.MutationHookOptions<DashboardTournamentPageCreateVideoMutation, DashboardTournamentPageCreateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardTournamentPageCreateVideoMutation, DashboardTournamentPageCreateVideoMutationVariables>(DashboardTournamentPageCreateVideoDocument, options);
      }
export type DashboardTournamentPageCreateVideoMutationHookResult = ReturnType<typeof useDashboardTournamentPageCreateVideoMutation>;
export type DashboardTournamentPageCreateVideoMutationResult = Apollo.MutationResult<DashboardTournamentPageCreateVideoMutation>;
export type DashboardTournamentPageCreateVideoMutationOptions = Apollo.BaseMutationOptions<DashboardTournamentPageCreateVideoMutation, DashboardTournamentPageCreateVideoMutationVariables>;
export const DashboardTournamentPageDeleteVideoDocument = gql`
    mutation DashboardTournamentPageDeleteVideo($tournamentVideoId: ID!) {
  deleteTournamentVideo(input: {tournamentVideoId: $tournamentVideoId}) {
    tournamentVideo {
      id
    }
  }
}
    `;
export type DashboardTournamentPageDeleteVideoMutationFn = Apollo.MutationFunction<DashboardTournamentPageDeleteVideoMutation, DashboardTournamentPageDeleteVideoMutationVariables>;

/**
 * __useDashboardTournamentPageDeleteVideoMutation__
 *
 * To run a mutation, you first call `useDashboardTournamentPageDeleteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentPageDeleteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardTournamentPageDeleteVideoMutation, { data, loading, error }] = useDashboardTournamentPageDeleteVideoMutation({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useDashboardTournamentPageDeleteVideoMutation(baseOptions?: Apollo.MutationHookOptions<DashboardTournamentPageDeleteVideoMutation, DashboardTournamentPageDeleteVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardTournamentPageDeleteVideoMutation, DashboardTournamentPageDeleteVideoMutationVariables>(DashboardTournamentPageDeleteVideoDocument, options);
      }
export type DashboardTournamentPageDeleteVideoMutationHookResult = ReturnType<typeof useDashboardTournamentPageDeleteVideoMutation>;
export type DashboardTournamentPageDeleteVideoMutationResult = Apollo.MutationResult<DashboardTournamentPageDeleteVideoMutation>;
export type DashboardTournamentPageDeleteVideoMutationOptions = Apollo.BaseMutationOptions<DashboardTournamentPageDeleteVideoMutation, DashboardTournamentPageDeleteVideoMutationVariables>;
export const DashboardTournamentsPageTournamentsDocument = gql`
    query DashboardTournamentsPageTournaments($page: Int = 1, $keyword: String) {
  tournaments(page: $page, per: 10, keyword: $keyword) {
    records {
      ...DashboardTournamentsPageTournament
    }
    paging {
      ...paging
    }
  }
}
    ${DashboardTournamentsPageTournamentFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useDashboardTournamentsPageTournamentsQuery__
 *
 * To run a query within a React component, call `useDashboardTournamentsPageTournamentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentsPageTournamentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardTournamentsPageTournamentsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDashboardTournamentsPageTournamentsQuery(baseOptions?: Apollo.QueryHookOptions<DashboardTournamentsPageTournamentsQuery, DashboardTournamentsPageTournamentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTournamentsPageTournamentsQuery, DashboardTournamentsPageTournamentsQueryVariables>(DashboardTournamentsPageTournamentsDocument, options);
      }
export function useDashboardTournamentsPageTournamentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTournamentsPageTournamentsQuery, DashboardTournamentsPageTournamentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTournamentsPageTournamentsQuery, DashboardTournamentsPageTournamentsQueryVariables>(DashboardTournamentsPageTournamentsDocument, options);
        }
export type DashboardTournamentsPageTournamentsQueryHookResult = ReturnType<typeof useDashboardTournamentsPageTournamentsQuery>;
export type DashboardTournamentsPageTournamentsLazyQueryHookResult = ReturnType<typeof useDashboardTournamentsPageTournamentsLazyQuery>;
export type DashboardTournamentsPageTournamentsQueryResult = Apollo.QueryResult<DashboardTournamentsPageTournamentsQuery, DashboardTournamentsPageTournamentsQueryVariables>;
export const TopPageDocument = gql`
    query TopPage {
  tournaments(thisWeek: true, per: 3) {
    records {
      ...TournamentCard
    }
  }
  battles(per: 3) {
    records {
      ...BattleListItem
    }
  }
  players(per: 4) {
    records {
      ...PlayerCard
    }
  }
  characters(order: use_rate, per: 4) {
    records {
      ...CharacterCard
    }
  }
  articles(per: 3) {
    records {
      ...ArticleCard
    }
  }
}
    ${TournamentCardFragmentDoc}
${BattleListItemFragmentDoc}
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
export const PlayerBattlesPageDocument = gql`
    query PlayerBattlesPage($playerSlug: String!, $page: Int) {
  player(playerSlug: $playerSlug) {
    ...PlayerBreadcrumbs
    ...PlayerPageProfile
  }
  battleCounts(playerSlug: $playerSlug, per: 10) {
    records {
      ...CharacterBattleCountChip
    }
  }
  battles(playerSlug: $playerSlug, page: $page, per: 10) {
    records {
      ...BattleListItem
    }
    paging {
      ...paging
    }
  }
}
    ${PlayerBreadcrumbsFragmentDoc}
${PlayerPageProfileFragmentDoc}
${CharacterBattleCountChipFragmentDoc}
${BattleListItemFragmentDoc}
${PagingFragmentDoc}`;

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
 *      page: // value for 'page'
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
export const PlayerBattlesPageBattlesDocument = gql`
    query PlayerBattlesPageBattles($playerSlug: String!, $characterSlug: String, $page: Int!) {
  battles(
    playerSlug: $playerSlug
    characterSlug: $characterSlug
    page: $page
    per: 10
  ) {
    records {
      ...BattleListItem
    }
    paging {
      ...paging
    }
  }
}
    ${BattleListItemFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __usePlayerBattlesPageBattlesQuery__
 *
 * To run a query within a React component, call `usePlayerBattlesPageBattlesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerBattlesPageBattlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerBattlesPageBattlesQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *      characterSlug: // value for 'characterSlug'
 *      page: // value for 'page'
 *   },
 * });
 */
export function usePlayerBattlesPageBattlesQuery(baseOptions: Apollo.QueryHookOptions<PlayerBattlesPageBattlesQuery, PlayerBattlesPageBattlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerBattlesPageBattlesQuery, PlayerBattlesPageBattlesQueryVariables>(PlayerBattlesPageBattlesDocument, options);
      }
export function usePlayerBattlesPageBattlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerBattlesPageBattlesQuery, PlayerBattlesPageBattlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerBattlesPageBattlesQuery, PlayerBattlesPageBattlesQueryVariables>(PlayerBattlesPageBattlesDocument, options);
        }
export type PlayerBattlesPageBattlesQueryHookResult = ReturnType<typeof usePlayerBattlesPageBattlesQuery>;
export type PlayerBattlesPageBattlesLazyQueryHookResult = ReturnType<typeof usePlayerBattlesPageBattlesLazyQuery>;
export type PlayerBattlesPageBattlesQueryResult = Apollo.QueryResult<PlayerBattlesPageBattlesQuery, PlayerBattlesPageBattlesQueryVariables>;
export const PlayerPageDocument = gql`
    query PlayerPage($playerSlug: String!) {
  player(playerSlug: $playerSlug) {
    ...PlayerBreadcrumbs
    ...PlayerPageProfile
    description
  }
}
    ${PlayerBreadcrumbsFragmentDoc}
${PlayerPageProfileFragmentDoc}`;

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
export const PlayerStandingsPageDocument = gql`
    query PlayerStandingsPage($playerSlug: String!) {
  player(playerSlug: $playerSlug) {
    ...PlayerBreadcrumbs
    ...PlayerPageProfile
  }
  standings(playerSlug: $playerSlug, per: 10) {
    records {
      ...PlayerStandingCard
    }
    paging {
      ...paging
    }
  }
}
    ${PlayerBreadcrumbsFragmentDoc}
${PlayerPageProfileFragmentDoc}
${PlayerStandingCardFragmentDoc}
${PagingFragmentDoc}`;

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
export const PlayerStandingsPageStandingsDocument = gql`
    query PlayerStandingsPageStandings($playerSlug: String!, $page: Int!) {
  standings(playerSlug: $playerSlug, page: $page, per: 10) {
    records {
      ...PlayerStandingCard
    }
    paging {
      ...paging
    }
  }
}
    ${PlayerStandingCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __usePlayerStandingsPageStandingsQuery__
 *
 * To run a query within a React component, call `usePlayerStandingsPageStandingsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerStandingsPageStandingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerStandingsPageStandingsQuery({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *      page: // value for 'page'
 *   },
 * });
 */
export function usePlayerStandingsPageStandingsQuery(baseOptions: Apollo.QueryHookOptions<PlayerStandingsPageStandingsQuery, PlayerStandingsPageStandingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerStandingsPageStandingsQuery, PlayerStandingsPageStandingsQueryVariables>(PlayerStandingsPageStandingsDocument, options);
      }
export function usePlayerStandingsPageStandingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerStandingsPageStandingsQuery, PlayerStandingsPageStandingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerStandingsPageStandingsQuery, PlayerStandingsPageStandingsQueryVariables>(PlayerStandingsPageStandingsDocument, options);
        }
export type PlayerStandingsPageStandingsQueryHookResult = ReturnType<typeof usePlayerStandingsPageStandingsQuery>;
export type PlayerStandingsPageStandingsLazyQueryHookResult = ReturnType<typeof usePlayerStandingsPageStandingsLazyQuery>;
export type PlayerStandingsPageStandingsQueryResult = Apollo.QueryResult<PlayerStandingsPageStandingsQuery, PlayerStandingsPageStandingsQueryVariables>;
export const PlayersPagePlayersDocument = gql`
    query PlayersPagePlayers($page: Int, $keyword: String) {
  players(page: $page, per: 20, keyword: $keyword) {
    records {
      ...PlayerCard
    }
    paging {
      ...paging
    }
  }
}
    ${PlayerCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __usePlayersPagePlayersQuery__
 *
 * To run a query within a React component, call `usePlayersPagePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersPagePlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersPagePlayersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function usePlayersPagePlayersQuery(baseOptions?: Apollo.QueryHookOptions<PlayersPagePlayersQuery, PlayersPagePlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayersPagePlayersQuery, PlayersPagePlayersQueryVariables>(PlayersPagePlayersDocument, options);
      }
export function usePlayersPagePlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayersPagePlayersQuery, PlayersPagePlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayersPagePlayersQuery, PlayersPagePlayersQueryVariables>(PlayersPagePlayersDocument, options);
        }
export type PlayersPagePlayersQueryHookResult = ReturnType<typeof usePlayersPagePlayersQuery>;
export type PlayersPagePlayersLazyQueryHookResult = ReturnType<typeof usePlayersPagePlayersLazyQuery>;
export type PlayersPagePlayersQueryResult = Apollo.QueryResult<PlayersPagePlayersQuery, PlayersPagePlayersQueryVariables>;
export const TournamentVideoPageDocument = gql`
    query TournamentVideoPage($tournamentVideoId: ID!) {
  tournamentVideo(tournamentVideoId: $tournamentVideoId) {
    id
    label
    youtubeVideoId
    tournament {
      id
      name
      mainImageUrl
    }
    battles {
      ...TournamentVideoPageBattle
    }
  }
}
    ${TournamentVideoPageBattleFragmentDoc}`;

/**
 * __useTournamentVideoPageQuery__
 *
 * To run a query within a React component, call `useTournamentVideoPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentVideoPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentVideoPageQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useTournamentVideoPageQuery(baseOptions: Apollo.QueryHookOptions<TournamentVideoPageQuery, TournamentVideoPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentVideoPageQuery, TournamentVideoPageQueryVariables>(TournamentVideoPageDocument, options);
      }
export function useTournamentVideoPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentVideoPageQuery, TournamentVideoPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentVideoPageQuery, TournamentVideoPageQueryVariables>(TournamentVideoPageDocument, options);
        }
export type TournamentVideoPageQueryHookResult = ReturnType<typeof useTournamentVideoPageQuery>;
export type TournamentVideoPageLazyQueryHookResult = ReturnType<typeof useTournamentVideoPageLazyQuery>;
export type TournamentVideoPageQueryResult = Apollo.QueryResult<TournamentVideoPageQuery, TournamentVideoPageQueryVariables>;
export const TournamentPageDocument = gql`
    query TournamentPage($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
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
    `;

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
export const TournamentsPageTournamentsDocument = gql`
    query TournamentsPageTournaments($page: Int) {
  tournaments(page: $page, per: 12) {
    records {
      ...TournamentCard
    }
    paging {
      ...paging
    }
  }
}
    ${TournamentCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useTournamentsPageTournamentsQuery__
 *
 * To run a query within a React component, call `useTournamentsPageTournamentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentsPageTournamentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentsPageTournamentsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTournamentsPageTournamentsQuery(baseOptions?: Apollo.QueryHookOptions<TournamentsPageTournamentsQuery, TournamentsPageTournamentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentsPageTournamentsQuery, TournamentsPageTournamentsQueryVariables>(TournamentsPageTournamentsDocument, options);
      }
export function useTournamentsPageTournamentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentsPageTournamentsQuery, TournamentsPageTournamentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentsPageTournamentsQuery, TournamentsPageTournamentsQueryVariables>(TournamentsPageTournamentsDocument, options);
        }
export type TournamentsPageTournamentsQueryHookResult = ReturnType<typeof useTournamentsPageTournamentsQuery>;
export type TournamentsPageTournamentsLazyQueryHookResult = ReturnType<typeof useTournamentsPageTournamentsLazyQuery>;
export type TournamentsPageTournamentsQueryResult = Apollo.QueryResult<TournamentsPageTournamentsQuery, TournamentsPageTournamentsQueryVariables>;