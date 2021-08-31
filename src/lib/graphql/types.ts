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
  id: Scalars['ID'];
  move: Move;
};

export type Article = {
  __typename?: 'Article';
  author: User;
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
  user: User;
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

export type Battle = {
  __typename?: 'Battle';
  id: Scalars['ID'];
  round?: Maybe<BattleRound>;
  sides: Array<BattleSide>;
  startSec: Scalars['Int'];
  tournamentVideo: TournamentVideo;
};

export type BattleAttributes = {
  tournamentVideoId: Scalars['ID'];
  startSec: Scalars['Int'];
  round?: Maybe<BattleRound>;
  sides: Array<BattleSideAttributes>;
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
  /** Grand Final */
  GrandFinal = 'grand_final',
  /** Grand Final(リセット) */
  GrandFinalReset = 'grand_final_reset',
  /** Winners Final */
  WinnersFinal = 'winners_final',
  /** Winners Semifinal */
  WinnersSemifinal = 'winners_semifinal',
  /** Losers Final */
  LosersFinal = 'losers_final',
  /** Losers Semifinal */
  LosersSemifinal = 'losers_semifinal',
  /** Final */
  Final = 'final',
  /** Semifinal */
  Semifinal = 'semifinal'
}

export type BattleSide = {
  __typename?: 'BattleSide';
  character: Character;
  id: Scalars['ID'];
  player: Player;
  rounds: Scalars['Int'];
};

export type BattleSideAttributes = {
  playerId: Scalars['ID'];
  characterId: Scalars['ID'];
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
  slug: Scalars['String'];
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

export type Country = {
  __typename?: 'Country';
  code: Scalars['String'];
  flagEmoji: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

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

/** Autogenerated input type of CreateBattle */
export type CreateBattleInput = {
  attributes: BattleAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  characterSlug: Scalars['String'];
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

/** Autogenerated input type of CreateMoveCategory */
export type CreateMoveCategoryInput = {
  characterSlug: Scalars['String'];
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

/** Autogenerated input type of CreateOrganizer */
export type CreateOrganizerInput = {
  attributes: OrganizerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  smashggId: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreatePlayer */
export type CreatePlayerPayload = {
  __typename?: 'CreatePlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: Player;
};

/** Autogenerated input type of CreateStanding */
export type CreateStandingInput = {
  tournamentId: Scalars['ID'];
  attributes: StandingAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateStanding */
export type CreateStandingPayload = {
  __typename?: 'CreateStandingPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  standing: Standing;
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

/** Autogenerated input type of CreateTournament */
export type CreateTournamentInput = {
  attributes: TournamentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateTournament */
export type CreateTournamentPayload = {
  __typename?: 'CreateTournamentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournament: Tournament;
};

/** Autogenerated input type of CreateTournamentVideoComment */
export type CreateTournamentVideoCommentInput = {
  tournamentVideoId: Scalars['ID'];
  attributes: CommentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateTournamentVideoComment */
export type CreateTournamentVideoCommentPayload = {
  __typename?: 'CreateTournamentVideoCommentPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  tournamentVideoComment: TournamentVideoComment;
};

/** Autogenerated input type of CreateTournamentVideo */
export type CreateTournamentVideoInput = {
  tournamentId: Scalars['ID'];
  url: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  clientMutationId?: Maybe<Scalars['String']>;
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

/** Autogenerated input type of DeleteBattle */
export type DeleteBattleInput = {
  battleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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

/** Autogenerated input type of DeleteOrganizer */
export type DeleteOrganizerInput = {
  organizerSlug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  playerSlug: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  standingId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  tournamentId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  tournamentVideoId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of FavArticle */
export type FavArticlePayload = {
  __typename?: 'FavArticlePayload';
  article: Article;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};


export type League = {
  __typename?: 'League';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
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
  user: User;
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
  createBattle?: Maybe<CreateBattlePayload>;
  createCharacter?: Maybe<CreateCharacterPayload>;
  createCombo?: Maybe<CreateComboPayload>;
  createComboCategory?: Maybe<CreateComboCategoryPayload>;
  createComboVideo?: Maybe<CreateComboVideoPayload>;
  createCommand?: Maybe<CreateCommandPayload>;
  createMove?: Maybe<CreateMovePayload>;
  createMoveCategory?: Maybe<CreateMoveCategoryPayload>;
  createMoveComment?: Maybe<CreateMoveCommentPayload>;
  createMoveVideo?: Maybe<CreateMoveVideoPayload>;
  createOrganizer?: Maybe<CreateOrganizerPayload>;
  createPlayer?: Maybe<CreatePlayerPayload>;
  createPlayerFromSmashgg?: Maybe<CreatePlayerFromSmashggPayload>;
  createStanding?: Maybe<CreateStandingPayload>;
  createThrowAction?: Maybe<CreateThrowActionPayload>;
  createTournament?: Maybe<CreateTournamentPayload>;
  createTournamentVideo?: Maybe<CreateTournamentVideoPayload>;
  createTournamentVideoComment?: Maybe<CreateTournamentVideoCommentPayload>;
  createUser?: Maybe<CreateUserPayload>;
  deleteAction?: Maybe<DeleteActionPayload>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  deleteBattle?: Maybe<DeleteBattlePayload>;
  deleteCombo?: Maybe<DeleteComboPayload>;
  deleteComboCategory?: Maybe<DeleteComboCategoryPayload>;
  deleteCommand?: Maybe<DeleteCommandPayload>;
  deleteMove?: Maybe<DeleteMovePayload>;
  deleteMoveCategory?: Maybe<DeleteMoveCategoryPayload>;
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
  updateAttackAction?: Maybe<UpdateAttackActionPayload>;
  updateBattle?: Maybe<UpdateBattlePayload>;
  updateCharacter?: Maybe<UpdateCharacterPayload>;
  updateCombo?: Maybe<UpdateComboPayload>;
  updateComboCategory?: Maybe<UpdateComboCategoryPayload>;
  updateComboCategoryPosition?: Maybe<UpdateComboCategoryPositionPayload>;
  updateComboPosition?: Maybe<UpdateComboPositionPayload>;
  updateCommand?: Maybe<UpdateCommandPayload>;
  updateCurrentUser?: Maybe<UpdateCurrentUserPayload>;
  updateMove?: Maybe<UpdateMovePayload>;
  updateMoveCategory?: Maybe<UpdateMoveCategoryPayload>;
  updateMoveCategoryPosition?: Maybe<UpdateMoveCategoryPositionPayload>;
  updateMovePosition?: Maybe<UpdateMovePositionPayload>;
  updateOrganizer?: Maybe<UpdateOrganizerPayload>;
  updatePlayer?: Maybe<UpdatePlayerPayload>;
  updateStanding?: Maybe<UpdateStandingPayload>;
  updateThrowAction?: Maybe<UpdateThrowActionPayload>;
  updateTournament?: Maybe<UpdateTournamentPayload>;
  updateTournamentVideo?: Maybe<UpdateTournamentVideoPayload>;
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


export type MutationCreateCommandArgs = {
  input: CreateCommandInput;
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


export type MutationCreateOrganizerArgs = {
  input: CreateOrganizerInput;
};


export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type MutationCreatePlayerFromSmashggArgs = {
  input: CreatePlayerFromSmashggInput;
};


export type MutationCreateStandingArgs = {
  input: CreateStandingInput;
};


export type MutationCreateThrowActionArgs = {
  input: CreateThrowActionInput;
};


export type MutationCreateTournamentArgs = {
  input: CreateTournamentInput;
};


export type MutationCreateTournamentVideoArgs = {
  input: CreateTournamentVideoInput;
};


export type MutationCreateTournamentVideoCommentArgs = {
  input: CreateTournamentVideoCommentInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteActionArgs = {
  input: DeleteActionInput;
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


export type MutationDeleteCommandArgs = {
  input: DeleteCommandInput;
};


export type MutationDeleteMoveArgs = {
  input: DeleteMoveInput;
};


export type MutationDeleteMoveCategoryArgs = {
  input: DeleteMoveCategoryInput;
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


export type MutationUpdateAttackActionArgs = {
  input: UpdateAttackActionInput;
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


export type MutationUpdateComboCategoryPositionArgs = {
  input: UpdateComboCategoryPositionInput;
};


export type MutationUpdateComboPositionArgs = {
  input: UpdateComboPositionInput;
};


export type MutationUpdateCommandArgs = {
  input: UpdateCommandInput;
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


export type MutationUpdateMoveCategoryPositionArgs = {
  input: UpdateMoveCategoryPositionInput;
};


export type MutationUpdateMovePositionArgs = {
  input: UpdateMovePositionInput;
};


export type MutationUpdateOrganizerArgs = {
  input: UpdateOrganizerInput;
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};


export type MutationUpdateStandingArgs = {
  input: UpdateStandingInput;
};


export type MutationUpdateThrowActionArgs = {
  input: UpdateThrowActionInput;
};


export type MutationUpdateTournamentArgs = {
  input: UpdateTournamentInput;
};


export type MutationUpdateTournamentVideoArgs = {
  input: UpdateTournamentVideoInput;
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
  name: Scalars['String'];
  slug: Scalars['String'];
  tonamelId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
  streamingUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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
  pro: Scalars['Boolean'];
  slug: Scalars['String'];
  smashggId?: Maybe<Scalars['String']>;
  standingsCount: Scalars['Int'];
  streamingUrl?: Maybe<Scalars['String']>;
  tonamelId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type PlayerAttributes = {
  countryId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  pro: Scalars['Boolean'];
  tonamelId?: Maybe<Scalars['String']>;
  smashggId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  streamingUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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
  battleCounts: BattleCountCollection;
  battles: BattleCollection;
  character: Character;
  characters: CharacterCollection;
  combo: Combo;
  comboCategories: Array<ComboCategory>;
  comboCategory: ComboCategory;
  combos: Array<Combo>;
  command: Command;
  conditions: Array<Condition>;
  countries: Array<Country>;
  currentUser: CurrentUser;
  leagues: Array<League>;
  move: Move;
  moveCategories: Array<MoveCategory>;
  moveCategory: MoveCategory;
  moveComments: Array<MoveComment>;
  moves: Array<Move>;
  myArticle: Article;
  myArticles: ArticleCollection;
  operations: Array<Operation>;
  organizer: Organizer;
  organizers: OrganizerCollection;
  player: Player;
  players: PlayerCollection;
  standings: StandingCollection;
  states: Array<State>;
  throwAction: ThrowAction;
  tournament: Tournament;
  tournamentVideo: TournamentVideo;
  tournamentVideoComments: Array<TournamentVideoComment>;
  tournamentVideos: TournamentVideoCollection;
  tournaments: TournamentCollection;
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


export type QueryBattleCountsArgs = {
  playerSlug?: Maybe<Scalars['String']>;
  characterSlug?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
};


export type QueryBattlesArgs = {
  tournamentVideoId?: Maybe<Scalars['ID']>;
  playerSlug?: Maybe<Scalars['String']>;
  characterSlug?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
};


export type QueryCharacterArgs = {
  characterSlug: Scalars['String'];
};


export type QueryCharactersArgs = {
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  order?: Maybe<CharacterOrder>;
};


export type QueryComboArgs = {
  comboId: Scalars['ID'];
};


export type QueryComboCategoriesArgs = {
  characterSlug?: Maybe<Scalars['String']>;
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
  characterSlug: Scalars['String'];
};


export type QueryMoveArgs = {
  moveId: Scalars['ID'];
};


export type QueryMoveCategoriesArgs = {
  characterSlug?: Maybe<Scalars['String']>;
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


export type QueryOrganizerArgs = {
  organizerSlug: Scalars['String'];
};


export type QueryOrganizersArgs = {
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
};


export type QueryPlayerArgs = {
  playerSlug: Scalars['String'];
};


export type QueryPlayersArgs = {
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
};


export type QueryStandingsArgs = {
  playerSlug?: Maybe<Scalars['String']>;
  tournamentId?: Maybe<Scalars['ID']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
};


export type QueryStatesArgs = {
  characterSlug: Scalars['String'];
};


export type QueryThrowActionArgs = {
  actionId: Scalars['ID'];
};


export type QueryTournamentArgs = {
  tournamentId: Scalars['ID'];
};


export type QueryTournamentVideoArgs = {
  tournamentVideoId: Scalars['ID'];
};


export type QueryTournamentVideoCommentsArgs = {
  tournamentVideoId: Scalars['ID'];
};


export type QueryTournamentVideosArgs = {
  tournamentId?: Maybe<Scalars['ID']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
};


export type QueryTournamentsArgs = {
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  organizerId?: Maybe<Scalars['ID']>;
  keyword?: Maybe<Scalars['String']>;
  thisWeek?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of SetUserAvatar */
export type SetUserAvatarInput = {
  avatar: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  playerId: Scalars['ID'];
  place: Scalars['Int'];
};

export type StandingCollection = {
  __typename?: 'StandingCollection';
  paging: Paging;
  records: Array<Standing>;
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

export type Tournament = {
  __typename?: 'Tournament';
  description: Scalars['String'];
  id: Scalars['ID'];
  league?: Maybe<League>;
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
  organizerId?: Maybe<Scalars['ID']>;
  leagueId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  mainImage?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  streamingUrl?: Maybe<Scalars['String']>;
  startsAt: Scalars['String'];
  description: Scalars['String'];
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
  commentCount: Scalars['Int'];
  id: Scalars['ID'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  tournament: Tournament;
  url: Scalars['String'];
  youtubeVideoId: Scalars['String'];
};

export type TournamentVideoAttributes = {
  title: Scalars['String'];
};

export type TournamentVideoCollection = {
  __typename?: 'TournamentVideoCollection';
  paging: Paging;
  records: Array<TournamentVideo>;
};

export type TournamentVideoComment = {
  __typename?: 'TournamentVideoComment';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  user: User;
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

/** Autogenerated input type of UpdateBattle */
export type UpdateBattleInput = {
  battleId: Scalars['ID'];
  attributes: BattleAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  characterSlug: Scalars['String'];
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

/** Autogenerated input type of UpdateCurrentUser */
export type UpdateCurrentUserInput = {
  attributes: CurrentUserAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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

/** Autogenerated input type of UpdateOrganizer */
export type UpdateOrganizerInput = {
  organizerSlug: Scalars['String'];
  attributes: OrganizerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  playerSlug: Scalars['String'];
  attributes: PlayerAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePlayer */
export type UpdatePlayerPayload = {
  __typename?: 'UpdatePlayerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  player: Player;
};

/** Autogenerated input type of UpdateStanding */
export type UpdateStandingInput = {
  standingId: Scalars['ID'];
  attributes: StandingAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateStanding */
export type UpdateStandingPayload = {
  __typename?: 'UpdateStandingPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  standing: Standing;
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

/** Autogenerated input type of UpdateTournament */
export type UpdateTournamentInput = {
  tournamentId: Scalars['ID'];
  attributes: TournamentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  tournamentVideoId: Scalars['ID'];
  attributes: TournamentVideoAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** ユーザー */
  User = 'user',
  /** 管理者 */
  Admin = 'admin'
}

export type VideoUpload = {
  __typename?: 'VideoUpload';
  fields: Scalars['String'];
  url: Scalars['String'];
};

export type AttackActionFragment = { __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> };

export type ThrowActionFragment = { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> };

type Action_AttackAction_Fragment = { __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> };

type Action_ThrowAction_Fragment = { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> };

export type ActionFragment = Action_AttackAction_Fragment | Action_ThrowAction_Fragment;

export type ArticleLinkFragment = { __typename?: 'ArticleLink', url: string, title: string, description?: Maybe<string>, imageUrl?: Maybe<string> };

export type ArticleSummaryFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } };

export type ComboFragment = { __typename?: 'Combo', id: string, name: string, damage?: Maybe<number>, note?: Maybe<string>, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: Maybe<{ __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }>, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> };

export type ComboCategoryFragment = { __typename?: 'ComboCategory', id: string, name: string };

export type ComboVideoFragment = { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string };

export type CommandFragment = { __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> };

export type ConditionFragment = { __typename?: 'Condition', id: string, name: string };

export type CurrentUserFragment = { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string };

export type MoveFragment = { __typename?: 'Move', id: string, name: string, kana?: Maybe<string>, opponentState?: Maybe<OpponentStateEnum>, startUpFrame?: Maybe<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean, note?: Maybe<string>, moveCategory: { __typename?: 'MoveCategory', id: string, name: string }, afterState?: Maybe<{ __typename?: 'State', id: string, name: string }>, moveVideo?: Maybe<{ __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }>, actions: Array<{ __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } | { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> };

export type MoveCategoryFragment = { __typename?: 'MoveCategory', id: string, name: string };

export type MoveVideoFragment = { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string };

export type OperationFragment = { __typename?: 'Operation', id: string, name: string, key: string, icon: boolean };

export type PagingFragment = { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean };

export type StateFragment = { __typename?: 'State', id: string, name: string };

export type CreateArticleMutationVariables = Exact<{
  attributes: ArticleAttributes;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: Maybe<{ __typename?: 'CreateArticlePayload', article: { __typename?: 'Article', id: string } }> };

export type CreateArticleCommentMutationVariables = Exact<{
  articleId: Scalars['ID'];
  attributes: CommentAttributes;
}>;


export type CreateArticleCommentMutation = { __typename?: 'Mutation', createArticleComment?: Maybe<{ __typename?: 'CreateArticleCommentPayload', articleComment: { __typename?: 'ArticleComment', id: string } }> };

export type CreateArticleImageMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type CreateArticleImageMutation = { __typename?: 'Mutation', createArticleImage?: Maybe<{ __typename?: 'CreateArticleImagePayload', url?: Maybe<string> }> };

export type CreateArticleLinkMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateArticleLinkMutation = { __typename?: 'Mutation', createArticleLink?: Maybe<{ __typename?: 'CreateArticleLinkPayload', articleLink: { __typename?: 'ArticleLink', url: string, title: string, description?: Maybe<string>, imageUrl?: Maybe<string> } }> };

export type CreateArticleVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateArticleVideoMutation = { __typename?: 'Mutation', createArticleVideo?: Maybe<{ __typename?: 'CreateArticleVideoPayload', articleVideo: { __typename?: 'ArticleVideo', id: string, m3u8Url: string, thumbnailUrl: string }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } }> };

export type CreateAttackActionMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: AttackActionAttributes;
}>;


export type CreateAttackActionMutation = { __typename?: 'Mutation', createAttackAction?: Maybe<{ __typename?: 'CreateAttackActionPayload', action: { __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } }> };

export type CreateCharacterMutationVariables = Exact<{
  attributes: CharacterAttributes;
}>;


export type CreateCharacterMutation = { __typename?: 'Mutation', createCharacter?: Maybe<{ __typename?: 'CreateCharacterPayload', character: { __typename?: 'Character', id: string } }> };

export type CreateComboMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type CreateComboMutation = { __typename?: 'Mutation', createCombo?: Maybe<{ __typename?: 'CreateComboPayload', combo: { __typename?: 'Combo', id: string } }> };

export type CreateComboCategoryMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: ComboCategoryAttributes;
}>;


export type CreateComboCategoryMutation = { __typename?: 'Mutation', createComboCategory?: Maybe<{ __typename?: 'CreateComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string } }> };

export type CreateComboVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateComboVideoMutation = { __typename?: 'Mutation', createComboVideo?: Maybe<{ __typename?: 'CreateComboVideoPayload', comboVideo: { __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } }> };

export type CreateCommandMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: CommandAttributes;
}>;


export type CreateCommandMutation = { __typename?: 'Mutation', createCommand?: Maybe<{ __typename?: 'CreateCommandPayload', command: { __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> } }> };

export type CreateMoveMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: MoveAttributes;
}>;


export type CreateMoveMutation = { __typename?: 'Mutation', createMove?: Maybe<{ __typename?: 'CreateMovePayload', move: { __typename?: 'Move', id: string } }> };

export type CreateMoveCategoryMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: MoveCategoryAttributes;
}>;


export type CreateMoveCategoryMutation = { __typename?: 'Mutation', createMoveCategory?: Maybe<{ __typename?: 'CreateMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string } }> };

export type CreateMoveCommentMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: CommentAttributes;
}>;


export type CreateMoveCommentMutation = { __typename?: 'Mutation', createMoveComment?: Maybe<{ __typename?: 'CreateMoveCommentPayload', moveComment: { __typename?: 'MoveComment', id: string } }> };

export type CreateMoveVideoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateMoveVideoMutation = { __typename?: 'Mutation', createMoveVideo?: Maybe<{ __typename?: 'CreateMoveVideoPayload', moveVideo: { __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string }, videoUpload: { __typename?: 'VideoUpload', url: string, fields: string } }> };

export type CreateThrowActionMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: ThrowActionAttributes;
}>;


export type CreateThrowActionMutation = { __typename?: 'Mutation', createThrowAction?: Maybe<{ __typename?: 'CreateThrowActionPayload', action: { __typename?: 'ThrowAction', id: string } }> };

export type CreateTournamentMutationVariables = Exact<{
  attributes: TournamentAttributes;
}>;


export type CreateTournamentMutation = { __typename?: 'Mutation', createTournament?: Maybe<{ __typename?: 'CreateTournamentPayload', tournament: { __typename?: 'Tournament', id: string } }> };

export type CreateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: Maybe<{ __typename?: 'CreateUserPayload', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } }> };

export type CreateTournamentVideoCommentMutationVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
  attributes: CommentAttributes;
}>;


export type CreateTournamentVideoCommentMutation = { __typename?: 'Mutation', createTournamentVideoComment?: Maybe<{ __typename?: 'CreateTournamentVideoCommentPayload', tournamentVideoComment: { __typename?: 'TournamentVideoComment', id: string } }> };

export type DeleteActionMutationVariables = Exact<{
  actionId: Scalars['ID'];
}>;


export type DeleteActionMutation = { __typename?: 'Mutation', deleteAction?: Maybe<{ __typename?: 'DeleteActionPayload', action: { __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } | { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> } }> };

export type DeleteArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle?: Maybe<{ __typename?: 'DeleteArticlePayload', article: { __typename?: 'Article', id: string } }> };

export type DeleteComboCategoryMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type DeleteComboCategoryMutation = { __typename?: 'Mutation', deleteComboCategory?: Maybe<{ __typename?: 'DeleteComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string } }> };

export type DeleteCommandMutationVariables = Exact<{
  commandId: Scalars['ID'];
}>;


export type DeleteCommandMutation = { __typename?: 'Mutation', deleteCommand?: Maybe<{ __typename?: 'DeleteCommandPayload', command: { __typename?: 'Command', id: string } }> };

export type DeleteMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type DeleteMoveMutation = { __typename?: 'Mutation', deleteMove?: Maybe<{ __typename?: 'DeleteMovePayload', move: { __typename?: 'Move', id: string } }> };

export type DeleteMoveCategoryMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type DeleteMoveCategoryMutation = { __typename?: 'Mutation', deleteMoveCategory?: Maybe<{ __typename?: 'DeleteMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string } }> };

export type DeleteTournamentMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DeleteTournamentMutation = { __typename?: 'Mutation', deleteTournament?: Maybe<{ __typename?: 'DeleteTournamentPayload', tournament: { __typename?: 'Tournament', id: string } }> };

export type FavArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type FavArticleMutation = { __typename?: 'Mutation', favArticle?: Maybe<{ __typename?: 'FavArticlePayload', article: { __typename?: 'Article', id: string } }> };

export type PublishArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type PublishArticleMutation = { __typename?: 'Mutation', publishArticle?: Maybe<{ __typename?: 'PublishArticlePayload', article: { __typename?: 'Article', id: string } }> };

export type SetUserAvatarMutationVariables = Exact<{
  avatar: Scalars['String'];
}>;


export type SetUserAvatarMutation = { __typename?: 'Mutation', setUserAvatar?: Maybe<{ __typename?: 'SetUserAvatarPayload', user: { __typename?: 'User', avatarUrl: string } }> };

export type StopArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type StopArticleMutation = { __typename?: 'Mutation', stopArticle?: Maybe<{ __typename?: 'StopArticlePayload', article: { __typename?: 'Article', id: string } }> };

export type UnfavArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type UnfavArticleMutation = { __typename?: 'Mutation', unfavArticle?: Maybe<{ __typename?: 'UnfavArticlePayload', article: { __typename?: 'Article', id: string } }> };

export type UpdateArticleMutationVariables = Exact<{
  articleId: Scalars['ID'];
  attributes: ArticleAttributes;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle?: Maybe<{ __typename?: 'UpdateArticlePayload', article: { __typename?: 'Article', id: string } }> };

export type UpdateAttackActionMutationVariables = Exact<{
  actionId: Scalars['ID'];
  attributes: AttackActionAttributes;
}>;


export type UpdateAttackActionMutation = { __typename?: 'Mutation', updateAttackAction?: Maybe<{ __typename?: 'UpdateAttackActionPayload', action: { __typename?: 'AttackAction', id: string } }> };

export type UpdateCharacterMutationVariables = Exact<{
  characterSlug: Scalars['String'];
  attributes: CharacterAttributes;
}>;


export type UpdateCharacterMutation = { __typename?: 'Mutation', updateCharacter?: Maybe<{ __typename?: 'UpdateCharacterPayload', character: { __typename?: 'Character', id: string } }> };

export type UpdateComboMutationVariables = Exact<{
  comboId: Scalars['ID'];
  attributes: ComboAttributes;
}>;


export type UpdateComboMutation = { __typename?: 'Mutation', updateCombo?: Maybe<{ __typename?: 'UpdateComboPayload', combo: { __typename?: 'Combo', id: string, comboCategory: { __typename?: 'ComboCategory', id: string } } }> };

export type UpdateComboCategoryMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  attributes: ComboCategoryAttributes;
}>;


export type UpdateComboCategoryMutation = { __typename?: 'Mutation', updateComboCategory?: Maybe<{ __typename?: 'UpdateComboCategoryPayload', comboCategory: { __typename?: 'ComboCategory', id: string } }> };

export type UpdateComboCategoryPositionMutationVariables = Exact<{
  comboCategoryId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateComboCategoryPositionMutation = { __typename?: 'Mutation', updateComboCategoryPosition?: Maybe<{ __typename?: 'UpdateComboCategoryPositionPayload', comboCategory: { __typename?: 'ComboCategory', id: string } }> };

export type UpdateComboPositionMutationVariables = Exact<{
  comboId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateComboPositionMutation = { __typename?: 'Mutation', updateComboPosition?: Maybe<{ __typename?: 'UpdateComboPositionPayload', combo: { __typename?: 'Combo', id: string } }> };

export type UpdateCommandMutationVariables = Exact<{
  commandId: Scalars['ID'];
  attributes: CommandAttributes;
}>;


export type UpdateCommandMutation = { __typename?: 'Mutation', updateCommand?: Maybe<{ __typename?: 'UpdateCommandPayload', command: { __typename?: 'Command', id: string } }> };

export type UpdateCurrentUserMutationVariables = Exact<{
  attributes: CurrentUserAttributes;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser?: Maybe<{ __typename?: 'UpdateCurrentUserPayload', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } }> };

export type UpdateMoveMutationVariables = Exact<{
  moveId: Scalars['ID'];
  attributes: MoveAttributes;
}>;


export type UpdateMoveMutation = { __typename?: 'Mutation', updateMove?: Maybe<{ __typename?: 'UpdateMovePayload', move: { __typename?: 'Move', id: string, moveCategory: { __typename?: 'MoveCategory', id: string } } }> };

export type UpdateMoveCategoryMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  attributes: MoveCategoryAttributes;
}>;


export type UpdateMoveCategoryMutation = { __typename?: 'Mutation', updateMoveCategory?: Maybe<{ __typename?: 'UpdateMoveCategoryPayload', moveCategory: { __typename?: 'MoveCategory', id: string } }> };

export type UpdateMoveCategoryPositionMutationVariables = Exact<{
  moveCategoryId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateMoveCategoryPositionMutation = { __typename?: 'Mutation', updateMoveCategoryPosition?: Maybe<{ __typename?: 'UpdateMoveCategoryPositionPayload', moveCategory: { __typename?: 'MoveCategory', id: string } }> };

export type UpdateMovePositionMutationVariables = Exact<{
  moveId: Scalars['ID'];
  newPosition: Scalars['Int'];
}>;


export type UpdateMovePositionMutation = { __typename?: 'Mutation', updateMovePosition?: Maybe<{ __typename?: 'UpdateMovePositionPayload', move: { __typename?: 'Move', id: string } }> };

export type UpdateThrowActionMutationVariables = Exact<{
  actionId: Scalars['ID'];
  attributes: ThrowActionAttributes;
}>;


export type UpdateThrowActionMutation = { __typename?: 'Mutation', updateThrowAction?: Maybe<{ __typename?: 'UpdateThrowActionPayload', action: { __typename?: 'ThrowAction', id: string } }> };

export type ArticlePathsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlePathsQuery = { __typename?: 'Query', allArticles: Array<{ __typename?: 'Article', id: string }> };

export type CharacterPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterPathsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string }> } };

export type CharacterSelectOptionFragment = { __typename?: 'Character', id: string, slug: string, name: string };

export type CharacterSelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterSelectOptionsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', id: string, slug: string, name: string }> } };

export type CharacterSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterSlugsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string }> } };

export type ComboCategoryIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type ComboCategoryIdsQuery = { __typename?: 'Query', comboCategories: Array<{ __typename?: 'ComboCategory', id: string }> };

export type ComboSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type ComboSelectOptionsQuery = { __typename?: 'Query', comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combos: Array<{ __typename?: 'Combo', id: string, name: string }> }> };

export type CountrySelectOptionFragment = { __typename?: 'Country', id: string, name: string, flagEmoji: string };

export type CountrySelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountrySelectOptionsQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', id: string, name: string, flagEmoji: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'CurrentUser', id: string, name: string, role: UserRole, avatarUrl: string } };

export type LeagueSelectOptionFragment = { __typename?: 'League', id: string, name: string };

export type MoveCategoryIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type MoveCategoryIdsQuery = { __typename?: 'Query', moveCategories: Array<{ __typename?: 'MoveCategory', id: string }> };

export type MoveSelectOptionsQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type MoveSelectOptionsQuery = { __typename?: 'Query', moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, moves: Array<{ __typename?: 'Move', id: string, name: string, commands: Array<{ __typename?: 'Command', operations: Array<{ __typename?: 'Operation', key: string }> }> }> }> };

export type MyArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type MyArticleQuery = { __typename?: 'Query', myArticle: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, faved: boolean, favsCount: number, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', name: string, avatarUrl: string } } };

export type MyArticlesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type MyArticlesQuery = { __typename?: 'Query', myArticles: { __typename?: 'ArticleCollection', records: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type OperationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OperationsQuery = { __typename?: 'Query', operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> };

export type OrganizerSelectOptionFragment = { __typename?: 'Organizer', id: string, slug: string, name: string };

export type OrganizerSelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganizerSelectOptionsQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerCollection', records: Array<{ __typename?: 'Organizer', id: string, slug: string, name: string }> } };

export type PlayerSelectOptionFragment = { __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: Maybe<string>, smashggId?: Maybe<string> };

export type PlayerSelectOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayerSelectOptionsQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: Maybe<string>, smashggId?: Maybe<string> }> } };

export type StatesQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type StatesQuery = { __typename?: 'Query', states: Array<{ __typename?: 'State', id: string, name: string }> };

export type ArticleCardFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } };

export type ArticleElementComboQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type ArticleElementComboQuery = { __typename?: 'Query', combo: { __typename?: 'Combo', id: string, name: string, damage?: Maybe<number>, note?: Maybe<string>, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: Maybe<{ __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }>, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> } };

export type ArticleElementMoveQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type ArticleElementMoveQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: Maybe<string>, opponentState?: Maybe<OpponentStateEnum>, startUpFrame?: Maybe<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean, note?: Maybe<string>, moveCategory: { __typename?: 'MoveCategory', id: string, name: string }, afterState?: Maybe<{ __typename?: 'State', id: string, name: string }>, moveVideo?: Maybe<{ __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }>, actions: Array<{ __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } | { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> } };

export type ArticleFormArticleFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, category: ArticleCategory, content: string };

export type BattleListItemFragment = { __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> };

export type CharacterBattleCountChipFragment = { __typename?: 'BattleCount', id: string, count: number, character: { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string } };

export type CharacterChipFragment = { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, battlesCount: number };

export type PlayerBattleCountChipFragment = { __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string> } };

export type PlayerChipFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, battlesCount: number };

export type CharacterCardQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type CharacterCardQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string } };

export type CharacterCardFragment = { __typename?: 'Character', slug: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string };

export type CharacterCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterCardsQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string }> } };

export type CharacterFormFragment = { __typename?: 'Character', name: string, nameKana: string, longName: string, longNameKana: string, slug: string, country: string, fightingStyle: string, story: string, description: string, dlc: boolean };

export type ComboCategoryCardFragment = { __typename?: 'ComboCategory', id: string, name: string, combosCount: number };

export type ComboCategoryListItemFragment = { __typename?: 'ComboCategory', id: string, name: string, combosCount: number };

export type ComboMediaFragment = { __typename?: 'Combo', id: string, name: string, damage?: Maybe<number>, note?: Maybe<string>, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: Maybe<{ __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }>, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> };

export type CommentCardUserFragment = { __typename?: 'User', name: string, avatarUrl: string };

export type ArticleCommentCardFragment = { __typename?: 'ArticleComment', id: string, message: string, createdAt: string, user: { __typename?: 'User', name: string, avatarUrl: string } };

export type ArticleCommentCardsQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type ArticleCommentCardsQuery = { __typename?: 'Query', articleComments: Array<{ __typename?: 'ArticleComment', id: string, message: string, createdAt: string, user: { __typename?: 'User', name: string, avatarUrl: string } }> };

export type MoveCommentCardFragment = { __typename?: 'MoveComment', id: string, message: string, createdAt: string, user: { __typename?: 'User', name: string, avatarUrl: string } };

export type MoveCommentCardsQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type MoveCommentCardsQuery = { __typename?: 'Query', moveComments: Array<{ __typename?: 'MoveComment', id: string, message: string, createdAt: string, user: { __typename?: 'User', name: string, avatarUrl: string } }> };

export type TournamentVideoCommentCardFragment = { __typename?: 'TournamentVideoComment', id: string, message: string, createdAt: string, user: { __typename?: 'User', name: string, avatarUrl: string } };

export type TournamentVideoCommentCardsQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type TournamentVideoCommentCardsQuery = { __typename?: 'Query', tournamentVideoComments: Array<{ __typename?: 'TournamentVideoComment', id: string, message: string, createdAt: string, user: { __typename?: 'User', name: string, avatarUrl: string } }> };

export type DashboardOrganizerCardFragment = { __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, description?: Maybe<string> };

export type DashboardOrganizerCardDeleteOrganizerMutationVariables = Exact<{
  organizerSlug: Scalars['String'];
}>;


export type DashboardOrganizerCardDeleteOrganizerMutation = { __typename?: 'Mutation', deleteOrganizer?: Maybe<{ __typename?: 'DeleteOrganizerPayload', organizer: { __typename?: 'Organizer', id: string } }> };

export type DashboardPlayerCardFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, description?: Maybe<string> };

export type DashboardPlayerCardDeletePlayerMutationVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type DashboardPlayerCardDeletePlayerMutation = { __typename?: 'Mutation', deletePlayer?: Maybe<{ __typename?: 'DeletePlayerPayload', player: { __typename?: 'Player', id: string } }> };

export type DashboardTournamentCardFragment = { __typename?: 'Tournament', id: string, name: string, description: string, mainImageUrl?: Maybe<string>, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> };

export type FavButtonArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type FavButtonArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', faved: boolean } };

export type MoveCategoryCardFragment = { __typename?: 'MoveCategory', id: string, name: string, movesCount: number };

export type MoveCategoryCardsQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type MoveCategoryCardsQuery = { __typename?: 'Query', moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, movesCount: number }> };

export type MoveCategoryListItemFragment = { __typename?: 'MoveCategory', id: string, name: string, movesCount: number };

export type MoveListItemFragment = { __typename?: 'Move', id: string, name: string, crouchingStatus: boolean, jumpStatus: boolean, powerCrush: boolean, homing: boolean, screw: boolean, wallBound: boolean, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }> };

export type MoveMediaFragment = { __typename?: 'Move', id: string, name: string, kana?: Maybe<string>, opponentState?: Maybe<OpponentStateEnum>, startUpFrame?: Maybe<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean, note?: Maybe<string>, moveCategory: { __typename?: 'MoveCategory', id: string, name: string }, afterState?: Maybe<{ __typename?: 'State', id: string, name: string }>, moveVideo?: Maybe<{ __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }>, actions: Array<{ __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } | { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> };

export type OrganizerCardFragment = { __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: Maybe<string> };

export type OrganizerFormFragment = { __typename?: 'Organizer', name: string, slug: string, tonamelId?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, description?: Maybe<string> };

export type PlayerCardFragment = { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, standingsCount: number, battlesCount: number };

export type PlayerFormFragment = { __typename?: 'Player', name: string, slug: string, pro: boolean, tonamelId?: Maybe<string>, smashggId?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, description?: Maybe<string>, country?: Maybe<{ __typename?: 'Country', id: string }> };

export type StandingCardFragment = { __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string> } };

export type TournamentCardFragment = { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: Maybe<string>, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> };

export type TournamentFormFragment = { __typename?: 'Tournament', organizerId: string, name: string, url: string, streamingUrl?: Maybe<string>, startsAt: string, description: string, league?: Maybe<{ __typename?: 'League', id: string }> };

export type TournamentFormQueryVariables = Exact<{ [key: string]: never; }>;


export type TournamentFormQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerCollection', records: Array<{ __typename?: 'Organizer', id: string, slug: string, name: string }> }, leagues: Array<{ __typename?: 'League', id: string, name: string }> };

export type TournamentVideoCardFragment = { __typename?: 'TournamentVideo', id: string, title: string, thumbnailUrl: string };

export type CharacterBreadcrumbsFragment = { __typename?: 'Character', slug: string, name: string };

export type ComboCategoryBreadcrumbsFragment = { __typename?: 'ComboCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } };

export type MoveCategoryBreadcrumbsFragment = { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } };

export type MoveBreadcrumbsFragment = { __typename?: 'Move', id: string, name: string, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } };

export type OrganizerBreadcrumbsFragment = { __typename?: 'Organizer', slug: string, name: string };

export type PlayerBreadcrumbsFragment = { __typename?: 'Player', slug: string, name: string };

export type TournamentBreadcrumbsFragment = { __typename?: 'Tournament', id: string, name: string };

export type ArticlePageArticleFragment = { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, favsCount: number, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', name: string, avatarUrl: string } };

export type ArticlePageArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type ArticlePageArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, favsCount: number, status: ArticleStatus, category: ArticleCategory, content: string, author: { __typename?: 'User', name: string, avatarUrl: string } } };

export type ArticlesPageQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
}>;


export type ArticlesPageQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleCollection', records: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type BattlesPageQueryVariables = Exact<{ [key: string]: never; }>;


export type BattlesPageQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, battlesCount: number }> }, characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string, battlesCount: number }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type BattlesPageBattlesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type BattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PageCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type PageCharactersQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string }> } };

export type CharacterBattlesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
  playerSlug?: Maybe<Scalars['String']>;
}>;


export type CharacterBattlesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, name: string, longName: string, slug: string }, battleCounts: { __typename?: 'BattleCountCollection', records: Array<{ __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string> } }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type CharacterBattlesPageBattlesQueryVariables = Exact<{
  characterSlug: Scalars['String'];
  playerSlug?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
}>;


export type CharacterBattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PageCharacterComboCategoriesQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageCharacterComboCategoriesQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combosCount: number }> } };

export type PageCharacterQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageCharacterQuery = { __typename?: 'Query', character: { __typename?: 'Character', story: string, description: string, slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string }, battleCounts: { __typename?: 'BattleCountCollection', records: Array<{ __typename?: 'BattleCount', id: string, count: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string> } }> } };

export type PageCharacterMoveCategoriesQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageCharacterMoveCategoriesQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, movesCount: number }> } };

export type PageComboCategoryQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageComboCategoryQuery = { __typename?: 'Query', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string }, combos: Array<{ __typename?: 'Combo', id: string, name: string, damage?: Maybe<number>, note?: Maybe<string>, comboCategory: { __typename?: 'ComboCategory', id: string, name: string }, comboVideo?: Maybe<{ __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }>, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }> } };

export type DashboardArticlePageArticleQueryVariables = Exact<{
  articleId: Scalars['ID'];
}>;


export type DashboardArticlePageArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, category: ArticleCategory, content: string } };

export type PageDashboardArticlesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type PageDashboardArticlesQuery = { __typename?: 'Query', myArticles: { __typename?: 'ArticleCollection', records: Array<{ __typename?: 'Article', id: string, title: string, status: ArticleStatus }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PageDashboardAttackActionEditQueryVariables = Exact<{
  actionId: Scalars['ID'];
}>;


export type PageDashboardAttackActionEditQuery = { __typename?: 'Query', attackAction: { __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number>, move: { __typename?: 'Move', id: string, name: string, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } } } };

export type DashboardComboCategoriesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardComboCategoriesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string }, comboCategories: Array<{ __typename?: 'ComboCategory', id: string, name: string, combosCount: number }> };

export type PageDashboardComboCategoryNewQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageDashboardComboCategoryNewQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string } };

export type PageDashboardCharacterEditQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type PageDashboardCharacterEditQuery = { __typename?: 'Query', character: { __typename?: 'Character', name: string, nameKana: string, longName: string, longNameKana: string, slug: string, country: string, fightingStyle: string, story: string, description: string, dlc: boolean } };

export type DashboardMoveCategoriesPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardMoveCategoriesPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string }, moveCategories: Array<{ __typename?: 'MoveCategory', id: string, name: string, movesCount: number }> };

export type DashboardMoveCategoryNewPageQueryVariables = Exact<{
  characterSlug: Scalars['String'];
}>;


export type DashboardMoveCategoryNewPageQuery = { __typename?: 'Query', character: { __typename?: 'Character', slug: string, name: string } };

export type PageDashboardCombosQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageDashboardCombosQuery = { __typename?: 'Query', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string }, combos: Array<{ __typename?: 'Combo', id: string, name: string }> } };

export type PageDashboardComboNewQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageDashboardComboNewQuery = { __typename?: 'Query', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string, states: Array<{ __typename?: 'State', id: string, name: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> } } };

export type PageDashboardComboCategoryEditQueryVariables = Exact<{
  comboCategoryId: Scalars['ID'];
}>;


export type PageDashboardComboCategoryEditQuery = { __typename?: 'Query', comboCategory: { __typename?: 'ComboCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } };

export type PageDashboardComboEditQueryVariables = Exact<{
  comboId: Scalars['ID'];
}>;


export type PageDashboardComboEditQuery = { __typename?: 'Query', combo: { __typename?: 'Combo', id: string, name: string, damage?: Maybe<number>, note?: Maybe<string>, state: { __typename?: 'State', id: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }>, comboCategory: { __typename?: 'ComboCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string, states: Array<{ __typename?: 'State', id: string, name: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> } }, comboVideo?: Maybe<{ __typename?: 'ComboVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> } };

export type PageDashboardCommandEditQueryVariables = Exact<{
  commandId: Scalars['ID'];
}>;


export type PageDashboardCommandEditQuery = { __typename?: 'Query', command: { __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }>, move: { __typename?: 'Move', id: string, name: string, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string, states: Array<{ __typename?: 'State', id: string, name: string }> } } } } };

export type PageDashboardMoveCategoryEditQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageDashboardMoveCategoryEditQuery = { __typename?: 'Query', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } };

export type PageDashboardMovesQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageDashboardMovesQuery = { __typename?: 'Query', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string }, moves: Array<{ __typename?: 'Move', id: string, name: string, commandsCount: number, actionsCount: number }> } };

export type PageDashboardMoveNewQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageDashboardMoveNewQuery = { __typename?: 'Query', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> } } };

export type PageDashboardActionsQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardActionsQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, actions: Array<{ __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } | { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> }>, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } } };

export type PageDashboardActionNewQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardActionNewQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } } };

export type PageDashboardCommandsQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardCommandsQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }>, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string, states: Array<{ __typename?: 'State', id: string, name: string }> } } } };

export type PageDashboardCommandNewQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardCommandNewQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string, states: Array<{ __typename?: 'State', id: string, name: string }> } } } };

export type PageDashboardMoveEditQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageDashboardMoveEditQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: Maybe<string>, opponentState?: Maybe<OpponentStateEnum>, startUpFrame?: Maybe<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean, note?: Maybe<string>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }>, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string, states: Array<{ __typename?: 'State', id: string, name: string }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> } }, afterState?: Maybe<{ __typename?: 'State', id: string, name: string }>, moveVideo?: Maybe<{ __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }>, actions: Array<{ __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } | { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> }> } };

export type DashboardOrganizerEditPageQueryVariables = Exact<{
  organizerSlug: Scalars['String'];
}>;


export type DashboardOrganizerEditPageQuery = { __typename?: 'Query', organizer: { __typename?: 'Organizer', name: string, slug: string, tonamelId?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, description?: Maybe<string> } };

export type DashboardOrganizerEditPageUpdateOrganizerMutationVariables = Exact<{
  organizerSlug: Scalars['String'];
  attributes: OrganizerAttributes;
}>;


export type DashboardOrganizerEditPageUpdateOrganizerMutation = { __typename?: 'Mutation', updateOrganizer?: Maybe<{ __typename?: 'UpdateOrganizerPayload', organizer: { __typename?: 'Organizer', name: string, slug: string, tonamelId?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, description?: Maybe<string> } }> };

export type DashboardOrganizersPageQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
}>;


export type DashboardOrganizersPageQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerCollection', records: Array<{ __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, description?: Maybe<string> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type DashboardOrganizersNewPageCreateOrganizerMutationVariables = Exact<{
  attributes: OrganizerAttributes;
}>;


export type DashboardOrganizersNewPageCreateOrganizerMutation = { __typename?: 'Mutation', createOrganizer?: Maybe<{ __typename?: 'CreateOrganizerPayload', organizer: { __typename?: 'Organizer', id: string } }> };

export type DashboardPlayerEditPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type DashboardPlayerEditPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', name: string, slug: string, pro: boolean, tonamelId?: Maybe<string>, smashggId?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, description?: Maybe<string>, country?: Maybe<{ __typename?: 'Country', id: string }> } };

export type DashboardPlayerEditPageUpdatePlayerMutationVariables = Exact<{
  playerSlug: Scalars['String'];
  attributes: PlayerAttributes;
}>;


export type DashboardPlayerEditPageUpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer?: Maybe<{ __typename?: 'UpdatePlayerPayload', player: { __typename?: 'Player', name: string, slug: string, pro: boolean, tonamelId?: Maybe<string>, smashggId?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, description?: Maybe<string>, country?: Maybe<{ __typename?: 'Country', id: string }> } }> };

export type DashboardPlayersPageQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
}>;


export type DashboardPlayersPageQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, description?: Maybe<string> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type DashboardPlayersPageCreatePlayerFromSmashggMutationVariables = Exact<{
  smashggId: Scalars['String'];
}>;


export type DashboardPlayersPageCreatePlayerFromSmashggMutation = { __typename?: 'Mutation', createPlayerFromSmashgg?: Maybe<{ __typename?: 'CreatePlayerFromSmashggPayload', player: { __typename?: 'Player', id: string } }> };

export type DashboardPlayersNewPageCreatePlayerMutationVariables = Exact<{
  attributes: PlayerAttributes;
}>;


export type DashboardPlayersNewPageCreatePlayerMutation = { __typename?: 'Mutation', createPlayer?: Maybe<{ __typename?: 'CreatePlayerPayload', player: { __typename?: 'Player', id: string } }> };

export type PageDashboardThrowActionEditQueryVariables = Exact<{
  actionId: Scalars['ID'];
}>;


export type PageDashboardThrowActionEditQuery = { __typename?: 'Query', throwAction: { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number>, move: { __typename?: 'Move', id: string, name: string, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } } } } };

export type BattleFormFragment = { __typename?: 'Battle', id: string, startSec: number, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', slug: string }, character: { __typename?: 'Character', slug: string } }> };

export type CreateBattleMutationVariables = Exact<{
  attributes: BattleAttributes;
}>;


export type CreateBattleMutation = { __typename?: 'Mutation', createBattle?: Maybe<{ __typename?: 'CreateBattlePayload', battle: { __typename?: 'Battle', id: string } }> };

export type UpdateBattleMutationVariables = Exact<{
  battleId: Scalars['ID'];
  attributes: BattleAttributes;
}>;


export type UpdateBattleMutation = { __typename?: 'Mutation', updateBattle?: Maybe<{ __typename?: 'UpdateBattlePayload', battle: { __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> } }> };

export type DeleteBattleMutationVariables = Exact<{
  battleId: Scalars['ID'];
}>;


export type DeleteBattleMutation = { __typename?: 'Mutation', deleteBattle?: Maybe<{ __typename?: 'DeleteBattlePayload', battle: { __typename?: 'Battle', id: string } }> };

export type DashboardBattlesPageQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type DashboardBattlesPageQuery = { __typename?: 'Query', tournamentVideo: { __typename?: 'TournamentVideo', id: string, title: string, youtubeVideoId: string, tournament: { __typename?: 'Tournament', id: string, name: string } }, players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: Maybe<string>, smashggId?: Maybe<string> }> }, characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', id: string, slug: string, name: string }> } };

export type DashboardBattlesPageSideFragment = { __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } };

export type DashboardBattlesPageBattleReslutFragment = { __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> };

export type DashboardBattlesPageBattlesQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type DashboardBattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', id: string, name: string }, character: { __typename?: 'Character', id: string, faceImageUrl: string } }> }> } };

export type DashboardTournamentEditPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentEditPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', organizerId: string, name: string, url: string, streamingUrl?: Maybe<string>, startsAt: string, description: string, id: string, league?: Maybe<{ __typename?: 'League', id: string }> } };

export type DashboardTournamentEditPageUpdateTournamentMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  attributes: TournamentAttributes;
}>;


export type DashboardTournamentEditPageUpdateTournamentMutation = { __typename?: 'Mutation', updateTournament?: Maybe<{ __typename?: 'UpdateTournamentPayload', tournament: { __typename?: 'Tournament', organizerId: string, name: string, url: string, streamingUrl?: Maybe<string>, startsAt: string, description: string, id: string, league?: Maybe<{ __typename?: 'League', id: string }> } }> };

export type DashboardTournamentPageQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentPageQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, name: string, description: string, mainImageUrl?: Maybe<string>, startsAt: string, standingsCount: number, videosCount: number, videos: Array<{ __typename?: 'TournamentVideo', id: string, title: string, youtubeVideoId: string }> }, players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, tonamelId?: Maybe<string>, smashggId?: Maybe<string> }> } };

export type DashboardTournamentPageStandingsQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentPageStandingsQuery = { __typename?: 'Query', standings: { __typename?: 'StandingCollection', records: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string, avatarUrl?: Maybe<string> } }> } };

export type DashboardTournamentPageVideosQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type DashboardTournamentPageVideosQuery = { __typename?: 'Query', tournamentVideos: { __typename?: 'TournamentVideoCollection', records: Array<{ __typename?: 'TournamentVideo', id: string, title: string, thumbnailUrl: string, battlesCount: number, channel: { __typename?: 'Channel', id: string, name: string } }> } };

export type DashboardTournamentPageCreateStandingMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  attributes: StandingAttributes;
}>;


export type DashboardTournamentPageCreateStandingMutation = { __typename?: 'Mutation', createStanding?: Maybe<{ __typename?: 'CreateStandingPayload', standing: { __typename?: 'Standing', id: string } }> };

export type DashboardTournamentPageDeleteStandingMutationVariables = Exact<{
  standingId: Scalars['ID'];
}>;


export type DashboardTournamentPageDeleteStandingMutation = { __typename?: 'Mutation', deleteStanding?: Maybe<{ __typename?: 'DeleteStandingPayload', standing: { __typename?: 'Standing', id: string } }> };

export type DashboardTournamentPageCreateVideoMutationVariables = Exact<{
  tournamentId: Scalars['ID'];
  url: Scalars['String'];
}>;


export type DashboardTournamentPageCreateVideoMutation = { __typename?: 'Mutation', createTournamentVideo?: Maybe<{ __typename?: 'CreateTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string } }> };

export type DashboardTournamentPageDeleteVideoMutationVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type DashboardTournamentPageDeleteVideoMutation = { __typename?: 'Mutation', deleteTournamentVideo?: Maybe<{ __typename?: 'DeleteTournamentVideoPayload', tournamentVideo: { __typename?: 'TournamentVideo', id: string } }> };

export type DashboardTournamentsPageQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
}>;


export type DashboardTournamentsPageQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentCollection', records: Array<{ __typename?: 'Tournament', id: string, name: string, description: string, mainImageUrl?: Maybe<string>, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type TopPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TopPageQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentCollection', records: Array<{ __typename?: 'Tournament', id: string, name: string, mainImageUrl?: Maybe<string>, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }> }, players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, standingsCount: number, battlesCount: number }> }, characters: { __typename?: 'CharacterCollection', records: Array<{ __typename?: 'Character', slug: string, longName: string, faceImageUrl: string, country: string, fightingStyle: string }> }, articles: { __typename?: 'ArticleCollection', records: Array<{ __typename?: 'Article', id: string, title: string, description: string, mainImageUrl?: Maybe<string>, publishedAt?: Maybe<string>, faved: boolean, favsCount: number, status: ArticleStatus, author: { __typename?: 'User', name: string, avatarUrl: string } }> } };

export type PageMoveCategoryQueryVariables = Exact<{
  moveCategoryId: Scalars['ID'];
}>;


export type PageMoveCategoryQuery = { __typename?: 'Query', moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string }, moves: Array<{ __typename?: 'Move', id: string, name: string, crouchingStatus: boolean, jumpStatus: boolean, powerCrush: boolean, homing: boolean, screw: boolean, wallBound: boolean, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }> }> } };

export type PageMoveQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type PageMoveQuery = { __typename?: 'Query', move: { __typename?: 'Move', id: string, name: string, kana?: Maybe<string>, opponentState?: Maybe<OpponentStateEnum>, startUpFrame?: Maybe<number>, powerCrush: boolean, crouchingStatus: boolean, jumpStatus: boolean, homing: boolean, screw: boolean, wallBound: boolean, note?: Maybe<string>, moveCategory: { __typename?: 'MoveCategory', id: string, name: string, character: { __typename?: 'Character', slug: string, name: string } }, afterState?: Maybe<{ __typename?: 'State', id: string, name: string }>, moveVideo?: Maybe<{ __typename?: 'MoveVideo', id: string, m3u8Url: string, thumbnailUrl: string }>, commands: Array<{ __typename?: 'Command', id: string, state: { __typename?: 'State', id: string, name: string }, operations: Array<{ __typename?: 'Operation', id: string, name: string, key: string, icon: boolean }> }>, actions: Array<{ __typename: 'AttackAction', id: string, attackType: AttackTypeEnum, damage: number, blockAvailable: boolean, blockState: AttackActionStateEnum, blockFrame?: Maybe<number>, hitAvailable: boolean, hitState: AttackActionStateEnum, hitFrame?: Maybe<number>, counterHitAvailable: boolean, counterHitState: AttackActionStateEnum, counterHitFrame?: Maybe<number>, cleanHitAvailable: boolean, cleanHitState: AttackActionStateEnum, cleanHitFrame?: Maybe<number>, crouchingHitAvailable: boolean, crouchingHitState: AttackActionStateEnum, crouchingHitFrame?: Maybe<number> } | { __typename: 'ThrowAction', id: string, throwType: ThrowTypeEnum, damage: number, escape: ThrowEscapeEnum, throwAvailable: boolean, throwState: ThrowActionStateEnum, throwFrame?: Maybe<number>, throwEscapeAvailable: boolean, throwEscapeState: ThrowActionStateEnum, throwEscapeFrame?: Maybe<number> }>, conditions: Array<{ __typename?: 'Condition', id: string, name: string }> } };

export type MovePageCommentsQueryVariables = Exact<{
  moveId: Scalars['ID'];
}>;


export type MovePageCommentsQuery = { __typename?: 'Query', moveComments: Array<{ __typename?: 'MoveComment', id: string, message: string, createdAt: string, user: { __typename?: 'User', name: string, avatarUrl: string } }> };

export type OrganizerPageQueryVariables = Exact<{
  organizerSlug: Scalars['String'];
}>;


export type OrganizerPageQuery = { __typename?: 'Query', organizer: { __typename?: 'Organizer', id: string, name: string, slug: string, avatarUrl?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, description?: Maybe<string>, tournaments: Array<{ __typename?: 'Tournament', id: string, name: string, startsAt: string }> } };

export type OrganizersPageQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
}>;


export type OrganizersPageQuery = { __typename?: 'Query', organizers: { __typename?: 'OrganizerCollection', records: Array<{ __typename?: 'Organizer', id: string, slug: string, name: string, avatarUrl?: Maybe<string> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayerBattlesPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
  characterSlug?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type PlayerBattlesPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', slug: string, name: string, id: string, avatarUrl?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, standingsCount: number, battlesCount: number }, battleCounts: { __typename?: 'BattleCountCollection', records: Array<{ __typename?: 'BattleCount', id: string, count: number, character: { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string } }> }, battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayerBattlesPageBattlesQueryVariables = Exact<{
  playerSlug: Scalars['String'];
  characterSlug?: Maybe<Scalars['String']>;
  page: Scalars['Int'];
}>;


export type PlayerBattlesPageBattlesQuery = { __typename?: 'Query', battles: { __typename?: 'BattleCollection', records: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, tournamentVideo: { __typename?: 'TournamentVideo', id: string, tournament: { __typename?: 'Tournament', id: string, name: string, startsAt: string } }, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayerStandingCardFragment = { __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: Maybe<string>, startsAt: string } };

export type PlayerPageProfileFragment = { __typename?: 'Player', id: string, name: string, slug: string, avatarUrl?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, standingsCount: number, battlesCount: number };

export type PlayerPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type PlayerPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', description?: Maybe<string>, slug: string, name: string, id: string, avatarUrl?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, standingsCount: number, battlesCount: number }, battleCounts: { __typename?: 'BattleCountCollection', records: Array<{ __typename?: 'BattleCount', id: string, count: number, character: { __typename?: 'Character', id: string, slug: string, name: string, faceImageUrl: string } }> } };

export type PlayerStandingsPageQueryVariables = Exact<{
  playerSlug: Scalars['String'];
}>;


export type PlayerStandingsPageQuery = { __typename?: 'Query', player: { __typename?: 'Player', slug: string, name: string, id: string, avatarUrl?: Maybe<string>, twitterId?: Maybe<string>, streamingUrl?: Maybe<string>, standingsCount: number, battlesCount: number }, standings: { __typename?: 'StandingCollection', records: Array<{ __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: Maybe<string>, startsAt: string } }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayerStandingsPageStandingsQueryVariables = Exact<{
  playerSlug: Scalars['String'];
  page: Scalars['Int'];
}>;


export type PlayerStandingsPageStandingsQuery = { __typename?: 'Query', standings: { __typename?: 'StandingCollection', records: Array<{ __typename?: 'Standing', id: string, place: number, tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: Maybe<string>, startsAt: string } }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type PlayersPagePlayersQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  keyword?: Maybe<Scalars['String']>;
}>;


export type PlayersPagePlayersQuery = { __typename?: 'Query', players: { __typename?: 'PlayerCollection', records: Array<{ __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string>, standingsCount: number, battlesCount: number }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export type TournamentVideoPageBattleFragment = { __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> };

export type PageTournamentVideoQueryVariables = Exact<{
  tournamentVideoId: Scalars['ID'];
}>;


export type PageTournamentVideoQuery = { __typename?: 'Query', tournamentVideo: { __typename?: 'TournamentVideo', id: string, youtubeVideoId: string, title: string, thumbnailUrl: string, commentCount: number, channel: { __typename?: 'Channel', name: string }, tournament: { __typename?: 'Tournament', id: string, name: string }, battles: Array<{ __typename?: 'Battle', id: string, round?: Maybe<BattleRound>, startSec: number, sides: Array<{ __typename?: 'BattleSide', rounds: number, player: { __typename?: 'Player', name: string }, character: { __typename?: 'Character', faceImageUrl: string } }> }> } };

export type PageTournamentQueryVariables = Exact<{
  tournamentId: Scalars['ID'];
}>;


export type PageTournamentQuery = { __typename?: 'Query', tournament: { __typename?: 'Tournament', id: string, name: string, mainImageUrl?: Maybe<string>, url: string, streamingUrl?: Maybe<string>, description: string, startsAt: string, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, slug: string, name: string, avatarUrl?: Maybe<string> } }>, videos: Array<{ __typename?: 'TournamentVideo', id: string, title: string, thumbnailUrl: string }> } };

export type TournamentsPageTournamentsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
}>;


export type TournamentsPageTournamentsQuery = { __typename?: 'Query', tournaments: { __typename?: 'TournamentCollection', records: Array<{ __typename?: 'Tournament', id: string, name: string, mainImageUrl?: Maybe<string>, startsAt: string, videosCount: number, standings: Array<{ __typename?: 'Standing', id: string, place: number, player: { __typename?: 'Player', id: string, name: string } }> }>, paging: { __typename?: 'Paging', currentPage: number, totalCount: number, totalPages: number, hasNext: boolean } } };

export const ArticleLinkFragmentDoc = gql`
    fragment articleLink on ArticleLink {
  url
  title
  description
  imageUrl
}
    `;
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
export const ComboCategoryFragmentDoc = gql`
    fragment comboCategory on ComboCategory {
  id
  name
}
    `;
export const CurrentUserFragmentDoc = gql`
    fragment currentUser on CurrentUser {
  id
  name
  role
  avatarUrl
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
export const MoveCategoryFragmentDoc = gql`
    fragment moveCategory on MoveCategory {
  id
  name
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
export const LeagueSelectOptionFragmentDoc = gql`
    fragment LeagueSelectOption on League {
  id
  name
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
  longName
  faceImageUrl
  country
  fightingStyle
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
export const ComboCategoryCardFragmentDoc = gql`
    fragment ComboCategoryCard on ComboCategory {
  id
  name
  combosCount
}
    `;
export const ComboCategoryListItemFragmentDoc = gql`
    fragment ComboCategoryListItem on ComboCategory {
  id
  name
  combosCount
}
    `;
export const ComboMediaFragmentDoc = gql`
    fragment ComboMedia on Combo {
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
export const CommentCardUserFragmentDoc = gql`
    fragment CommentCardUser on User {
  name
  avatarUrl
}
    `;
export const ArticleCommentCardFragmentDoc = gql`
    fragment ArticleCommentCard on ArticleComment {
  id
  message
  createdAt
  user {
    ...CommentCardUser
  }
}
    ${CommentCardUserFragmentDoc}`;
export const MoveCommentCardFragmentDoc = gql`
    fragment MoveCommentCard on MoveComment {
  id
  message
  createdAt
  user {
    ...CommentCardUser
  }
}
    ${CommentCardUserFragmentDoc}`;
export const TournamentVideoCommentCardFragmentDoc = gql`
    fragment TournamentVideoCommentCard on TournamentVideoComment {
  id
  message
  createdAt
  user {
    ...CommentCardUser
  }
}
    ${CommentCardUserFragmentDoc}`;
export const DashboardOrganizerCardFragmentDoc = gql`
    fragment DashboardOrganizerCard on Organizer {
  id
  slug
  name
  avatarUrl
  description
}
    `;
export const DashboardPlayerCardFragmentDoc = gql`
    fragment DashboardPlayerCard on Player {
  id
  slug
  name
  avatarUrl
  description
}
    `;
export const DashboardTournamentCardFragmentDoc = gql`
    fragment DashboardTournamentCard on Tournament {
  id
  name
  description
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
export const MoveCategoryCardFragmentDoc = gql`
    fragment MoveCategoryCard on MoveCategory {
  id
  name
  movesCount
}
    `;
export const MoveCategoryListItemFragmentDoc = gql`
    fragment MoveCategoryListItem on MoveCategory {
  id
  name
  movesCount
}
    `;
export const MoveListItemFragmentDoc = gql`
    fragment MoveListItem on Move {
  id
  name
  crouchingStatus
  jumpStatus
  powerCrush
  homing
  screw
  wallBound
  commands {
    ...command
  }
}
    ${CommandFragmentDoc}`;
export const MoveMediaFragmentDoc = gql`
    fragment MoveMedia on Move {
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
    id
    m3u8Url
    thumbnailUrl
  }
  commands {
    id
    state {
      id
      name
    }
    operations {
      id
      name
      key
      icon
    }
  }
  actions {
    ...action
  }
  conditions {
    id
    name
  }
}
    ${ActionFragmentDoc}`;
export const OrganizerCardFragmentDoc = gql`
    fragment OrganizerCard on Organizer {
  id
  slug
  name
  avatarUrl
}
    `;
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
  pro
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
export const StandingCardFragmentDoc = gql`
    fragment StandingCard on Standing {
  id
  place
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
export const TournamentFormFragmentDoc = gql`
    fragment TournamentForm on Tournament {
  organizerId
  league {
    id
  }
  name
  url
  streamingUrl
  startsAt
  description
}
    `;
export const TournamentVideoCardFragmentDoc = gql`
    fragment TournamentVideoCard on TournamentVideo {
  id
  title
  thumbnailUrl
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
export const TournamentVideoPageBattleFragmentDoc = gql`
    fragment TournamentVideoPageBattle on Battle {
  id
  round
  startSec
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
      id
    }
  }
}
    `;
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
export const CreateMoveCommentDocument = gql`
    mutation CreateMoveComment($moveId: ID!, $attributes: CommentAttributes!) {
  createMoveComment(input: {moveId: $moveId, attributes: $attributes}) {
    moveComment {
      id
    }
  }
}
    `;
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
      ...currentUser
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
export const CreateTournamentVideoCommentDocument = gql`
    mutation CreateTournamentVideoComment($tournamentVideoId: ID!, $attributes: CommentAttributes!) {
  createTournamentVideoComment(
    input: {tournamentVideoId: $tournamentVideoId, attributes: $attributes}
  ) {
    tournamentVideoComment {
      id
    }
  }
}
    `;
export type CreateTournamentVideoCommentMutationFn = Apollo.MutationFunction<CreateTournamentVideoCommentMutation, CreateTournamentVideoCommentMutationVariables>;

/**
 * __useCreateTournamentVideoCommentMutation__
 *
 * To run a mutation, you first call `useCreateTournamentVideoCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTournamentVideoCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTournamentVideoCommentMutation, { data, loading, error }] = useCreateTournamentVideoCommentMutation({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *      attributes: // value for 'attributes'
 *   },
 * });
 */
export function useCreateTournamentVideoCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateTournamentVideoCommentMutation, CreateTournamentVideoCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTournamentVideoCommentMutation, CreateTournamentVideoCommentMutationVariables>(CreateTournamentVideoCommentDocument, options);
      }
export type CreateTournamentVideoCommentMutationHookResult = ReturnType<typeof useCreateTournamentVideoCommentMutation>;
export type CreateTournamentVideoCommentMutationResult = Apollo.MutationResult<CreateTournamentVideoCommentMutation>;
export type CreateTournamentVideoCommentMutationOptions = Apollo.BaseMutationOptions<CreateTournamentVideoCommentMutation, CreateTournamentVideoCommentMutationVariables>;
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
export const PublishArticleDocument = gql`
    mutation PublishArticle($articleId: ID!) {
  publishArticle(input: {articleId: $articleId}) {
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
export const SetUserAvatarDocument = gql`
    mutation SetUserAvatar($avatar: String!) {
  setUserAvatar(input: {avatar: $avatar}) {
    user {
      avatarUrl
    }
  }
}
    `;
export type SetUserAvatarMutationFn = Apollo.MutationFunction<SetUserAvatarMutation, SetUserAvatarMutationVariables>;

/**
 * __useSetUserAvatarMutation__
 *
 * To run a mutation, you first call `useSetUserAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserAvatarMutation, { data, loading, error }] = useSetUserAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useSetUserAvatarMutation(baseOptions?: Apollo.MutationHookOptions<SetUserAvatarMutation, SetUserAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserAvatarMutation, SetUserAvatarMutationVariables>(SetUserAvatarDocument, options);
      }
export type SetUserAvatarMutationHookResult = ReturnType<typeof useSetUserAvatarMutation>;
export type SetUserAvatarMutationResult = Apollo.MutationResult<SetUserAvatarMutation>;
export type SetUserAvatarMutationOptions = Apollo.BaseMutationOptions<SetUserAvatarMutation, SetUserAvatarMutationVariables>;
export const StopArticleDocument = gql`
    mutation StopArticle($articleId: ID!) {
  stopArticle(input: {articleId: $articleId}) {
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
export const UpdateCurrentUserDocument = gql`
    mutation UpdateCurrentUser($attributes: CurrentUserAttributes!) {
  updateCurrentUser(input: {attributes: $attributes}) {
    currentUser {
      ...currentUser
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
export const CharacterSlugsDocument = gql`
    query CharacterSlugs {
  characters {
    records {
      slug
    }
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
    query ComboSelectOptions($characterSlug: String!) {
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
    ...currentUser
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
export const MoveSelectOptionsDocument = gql`
    query MoveSelectOptions($characterSlug: String!) {
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
export const OrganizerSelectOptionsDocument = gql`
    query OrganizerSelectOptions {
  organizers(per: 500) {
    records {
      ...OrganizerSelectOption
    }
  }
}
    ${OrganizerSelectOptionFragmentDoc}`;

/**
 * __useOrganizerSelectOptionsQuery__
 *
 * To run a query within a React component, call `useOrganizerSelectOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizerSelectOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizerSelectOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrganizerSelectOptionsQuery(baseOptions?: Apollo.QueryHookOptions<OrganizerSelectOptionsQuery, OrganizerSelectOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizerSelectOptionsQuery, OrganizerSelectOptionsQueryVariables>(OrganizerSelectOptionsDocument, options);
      }
export function useOrganizerSelectOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizerSelectOptionsQuery, OrganizerSelectOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizerSelectOptionsQuery, OrganizerSelectOptionsQueryVariables>(OrganizerSelectOptionsDocument, options);
        }
export type OrganizerSelectOptionsQueryHookResult = ReturnType<typeof useOrganizerSelectOptionsQuery>;
export type OrganizerSelectOptionsLazyQueryHookResult = ReturnType<typeof useOrganizerSelectOptionsLazyQuery>;
export type OrganizerSelectOptionsQueryResult = Apollo.QueryResult<OrganizerSelectOptionsQuery, OrganizerSelectOptionsQueryVariables>;
export const PlayerSelectOptionsDocument = gql`
    query PlayerSelectOptions {
  players(per: 500) {
    records {
      ...PlayerSelectOption
    }
  }
}
    ${PlayerSelectOptionFragmentDoc}`;

/**
 * __usePlayerSelectOptionsQuery__
 *
 * To run a query within a React component, call `usePlayerSelectOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerSelectOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerSelectOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayerSelectOptionsQuery(baseOptions?: Apollo.QueryHookOptions<PlayerSelectOptionsQuery, PlayerSelectOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerSelectOptionsQuery, PlayerSelectOptionsQueryVariables>(PlayerSelectOptionsDocument, options);
      }
export function usePlayerSelectOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerSelectOptionsQuery, PlayerSelectOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerSelectOptionsQuery, PlayerSelectOptionsQueryVariables>(PlayerSelectOptionsDocument, options);
        }
export type PlayerSelectOptionsQueryHookResult = ReturnType<typeof usePlayerSelectOptionsQuery>;
export type PlayerSelectOptionsLazyQueryHookResult = ReturnType<typeof usePlayerSelectOptionsLazyQuery>;
export type PlayerSelectOptionsQueryResult = Apollo.QueryResult<PlayerSelectOptionsQuery, PlayerSelectOptionsQueryVariables>;
export const StatesDocument = gql`
    query States($characterSlug: String!) {
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
export const CharacterCardDocument = gql`
    query CharacterCard($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterCard
  }
}
    ${CharacterCardFragmentDoc}`;

/**
 * __useCharacterCardQuery__
 *
 * To run a query within a React component, call `useCharacterCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterCardQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useCharacterCardQuery(baseOptions: Apollo.QueryHookOptions<CharacterCardQuery, CharacterCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterCardQuery, CharacterCardQueryVariables>(CharacterCardDocument, options);
      }
export function useCharacterCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterCardQuery, CharacterCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterCardQuery, CharacterCardQueryVariables>(CharacterCardDocument, options);
        }
export type CharacterCardQueryHookResult = ReturnType<typeof useCharacterCardQuery>;
export type CharacterCardLazyQueryHookResult = ReturnType<typeof useCharacterCardLazyQuery>;
export type CharacterCardQueryResult = Apollo.QueryResult<CharacterCardQuery, CharacterCardQueryVariables>;
export const CharacterCardsDocument = gql`
    query CharacterCards {
  characters {
    records {
      ...CharacterCard
    }
  }
}
    ${CharacterCardFragmentDoc}`;

/**
 * __useCharacterCardsQuery__
 *
 * To run a query within a React component, call `useCharacterCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharacterCardsQuery(baseOptions?: Apollo.QueryHookOptions<CharacterCardsQuery, CharacterCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterCardsQuery, CharacterCardsQueryVariables>(CharacterCardsDocument, options);
      }
export function useCharacterCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterCardsQuery, CharacterCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterCardsQuery, CharacterCardsQueryVariables>(CharacterCardsDocument, options);
        }
export type CharacterCardsQueryHookResult = ReturnType<typeof useCharacterCardsQuery>;
export type CharacterCardsLazyQueryHookResult = ReturnType<typeof useCharacterCardsLazyQuery>;
export type CharacterCardsQueryResult = Apollo.QueryResult<CharacterCardsQuery, CharacterCardsQueryVariables>;
export const ArticleCommentCardsDocument = gql`
    query ArticleCommentCards($articleId: ID!) {
  articleComments(articleId: $articleId) {
    ...ArticleCommentCard
  }
}
    ${ArticleCommentCardFragmentDoc}`;

/**
 * __useArticleCommentCardsQuery__
 *
 * To run a query within a React component, call `useArticleCommentCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleCommentCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleCommentCardsQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useArticleCommentCardsQuery(baseOptions: Apollo.QueryHookOptions<ArticleCommentCardsQuery, ArticleCommentCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleCommentCardsQuery, ArticleCommentCardsQueryVariables>(ArticleCommentCardsDocument, options);
      }
export function useArticleCommentCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleCommentCardsQuery, ArticleCommentCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleCommentCardsQuery, ArticleCommentCardsQueryVariables>(ArticleCommentCardsDocument, options);
        }
export type ArticleCommentCardsQueryHookResult = ReturnType<typeof useArticleCommentCardsQuery>;
export type ArticleCommentCardsLazyQueryHookResult = ReturnType<typeof useArticleCommentCardsLazyQuery>;
export type ArticleCommentCardsQueryResult = Apollo.QueryResult<ArticleCommentCardsQuery, ArticleCommentCardsQueryVariables>;
export const MoveCommentCardsDocument = gql`
    query MoveCommentCards($moveId: ID!) {
  moveComments(moveId: $moveId) {
    ...MoveCommentCard
  }
}
    ${MoveCommentCardFragmentDoc}`;

/**
 * __useMoveCommentCardsQuery__
 *
 * To run a query within a React component, call `useMoveCommentCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCommentCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCommentCardsQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function useMoveCommentCardsQuery(baseOptions: Apollo.QueryHookOptions<MoveCommentCardsQuery, MoveCommentCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCommentCardsQuery, MoveCommentCardsQueryVariables>(MoveCommentCardsDocument, options);
      }
export function useMoveCommentCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCommentCardsQuery, MoveCommentCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCommentCardsQuery, MoveCommentCardsQueryVariables>(MoveCommentCardsDocument, options);
        }
export type MoveCommentCardsQueryHookResult = ReturnType<typeof useMoveCommentCardsQuery>;
export type MoveCommentCardsLazyQueryHookResult = ReturnType<typeof useMoveCommentCardsLazyQuery>;
export type MoveCommentCardsQueryResult = Apollo.QueryResult<MoveCommentCardsQuery, MoveCommentCardsQueryVariables>;
export const TournamentVideoCommentCardsDocument = gql`
    query TournamentVideoCommentCards($tournamentVideoId: ID!) {
  tournamentVideoComments(tournamentVideoId: $tournamentVideoId) {
    ...TournamentVideoCommentCard
  }
}
    ${TournamentVideoCommentCardFragmentDoc}`;

/**
 * __useTournamentVideoCommentCardsQuery__
 *
 * To run a query within a React component, call `useTournamentVideoCommentCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentVideoCommentCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentVideoCommentCardsQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function useTournamentVideoCommentCardsQuery(baseOptions: Apollo.QueryHookOptions<TournamentVideoCommentCardsQuery, TournamentVideoCommentCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentVideoCommentCardsQuery, TournamentVideoCommentCardsQueryVariables>(TournamentVideoCommentCardsDocument, options);
      }
export function useTournamentVideoCommentCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentVideoCommentCardsQuery, TournamentVideoCommentCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentVideoCommentCardsQuery, TournamentVideoCommentCardsQueryVariables>(TournamentVideoCommentCardsDocument, options);
        }
export type TournamentVideoCommentCardsQueryHookResult = ReturnType<typeof useTournamentVideoCommentCardsQuery>;
export type TournamentVideoCommentCardsLazyQueryHookResult = ReturnType<typeof useTournamentVideoCommentCardsLazyQuery>;
export type TournamentVideoCommentCardsQueryResult = Apollo.QueryResult<TournamentVideoCommentCardsQuery, TournamentVideoCommentCardsQueryVariables>;
export const DashboardOrganizerCardDeleteOrganizerDocument = gql`
    mutation DashboardOrganizerCardDeleteOrganizer($organizerSlug: String!) {
  deleteOrganizer(input: {organizerSlug: $organizerSlug}) {
    organizer {
      id
    }
  }
}
    `;
export type DashboardOrganizerCardDeleteOrganizerMutationFn = Apollo.MutationFunction<DashboardOrganizerCardDeleteOrganizerMutation, DashboardOrganizerCardDeleteOrganizerMutationVariables>;

/**
 * __useDashboardOrganizerCardDeleteOrganizerMutation__
 *
 * To run a mutation, you first call `useDashboardOrganizerCardDeleteOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardOrganizerCardDeleteOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardOrganizerCardDeleteOrganizerMutation, { data, loading, error }] = useDashboardOrganizerCardDeleteOrganizerMutation({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *   },
 * });
 */
export function useDashboardOrganizerCardDeleteOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<DashboardOrganizerCardDeleteOrganizerMutation, DashboardOrganizerCardDeleteOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardOrganizerCardDeleteOrganizerMutation, DashboardOrganizerCardDeleteOrganizerMutationVariables>(DashboardOrganizerCardDeleteOrganizerDocument, options);
      }
export type DashboardOrganizerCardDeleteOrganizerMutationHookResult = ReturnType<typeof useDashboardOrganizerCardDeleteOrganizerMutation>;
export type DashboardOrganizerCardDeleteOrganizerMutationResult = Apollo.MutationResult<DashboardOrganizerCardDeleteOrganizerMutation>;
export type DashboardOrganizerCardDeleteOrganizerMutationOptions = Apollo.BaseMutationOptions<DashboardOrganizerCardDeleteOrganizerMutation, DashboardOrganizerCardDeleteOrganizerMutationVariables>;
export const DashboardPlayerCardDeletePlayerDocument = gql`
    mutation DashboardPlayerCardDeletePlayer($playerSlug: String!) {
  deletePlayer(input: {playerSlug: $playerSlug}) {
    player {
      id
    }
  }
}
    `;
export type DashboardPlayerCardDeletePlayerMutationFn = Apollo.MutationFunction<DashboardPlayerCardDeletePlayerMutation, DashboardPlayerCardDeletePlayerMutationVariables>;

/**
 * __useDashboardPlayerCardDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDashboardPlayerCardDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayerCardDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dashboardPlayerCardDeletePlayerMutation, { data, loading, error }] = useDashboardPlayerCardDeletePlayerMutation({
 *   variables: {
 *      playerSlug: // value for 'playerSlug'
 *   },
 * });
 */
export function useDashboardPlayerCardDeletePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DashboardPlayerCardDeletePlayerMutation, DashboardPlayerCardDeletePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DashboardPlayerCardDeletePlayerMutation, DashboardPlayerCardDeletePlayerMutationVariables>(DashboardPlayerCardDeletePlayerDocument, options);
      }
export type DashboardPlayerCardDeletePlayerMutationHookResult = ReturnType<typeof useDashboardPlayerCardDeletePlayerMutation>;
export type DashboardPlayerCardDeletePlayerMutationResult = Apollo.MutationResult<DashboardPlayerCardDeletePlayerMutation>;
export type DashboardPlayerCardDeletePlayerMutationOptions = Apollo.BaseMutationOptions<DashboardPlayerCardDeletePlayerMutation, DashboardPlayerCardDeletePlayerMutationVariables>;
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
export const MoveCategoryCardsDocument = gql`
    query MoveCategoryCards($characterSlug: String!) {
  moveCategories(characterSlug: $characterSlug) {
    ...MoveCategoryCard
  }
}
    ${MoveCategoryCardFragmentDoc}`;

/**
 * __useMoveCategoryCardsQuery__
 *
 * To run a query within a React component, call `useMoveCategoryCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoveCategoryCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoveCategoryCardsQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function useMoveCategoryCardsQuery(baseOptions: Apollo.QueryHookOptions<MoveCategoryCardsQuery, MoveCategoryCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoveCategoryCardsQuery, MoveCategoryCardsQueryVariables>(MoveCategoryCardsDocument, options);
      }
export function useMoveCategoryCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoveCategoryCardsQuery, MoveCategoryCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoveCategoryCardsQuery, MoveCategoryCardsQueryVariables>(MoveCategoryCardsDocument, options);
        }
export type MoveCategoryCardsQueryHookResult = ReturnType<typeof useMoveCategoryCardsQuery>;
export type MoveCategoryCardsLazyQueryHookResult = ReturnType<typeof useMoveCategoryCardsLazyQuery>;
export type MoveCategoryCardsQueryResult = Apollo.QueryResult<MoveCategoryCardsQuery, MoveCategoryCardsQueryVariables>;
export const TournamentFormDocument = gql`
    query TournamentForm {
  organizers(per: 100) {
    records {
      ...OrganizerSelectOption
    }
  }
  leagues {
    ...LeagueSelectOption
  }
}
    ${OrganizerSelectOptionFragmentDoc}
${LeagueSelectOptionFragmentDoc}`;

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
export const ArticlesPageDocument = gql`
    query ArticlesPage($page: Int, $order: Order) {
  articles(page: $page, per: 10, order: $order) {
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
 *      page: // value for 'page'
 *      order: // value for 'order'
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
export const PageCharactersDocument = gql`
    query PageCharacters {
  characters {
    records {
      ...CharacterCard
    }
  }
}
    ${CharacterCardFragmentDoc}`;

/**
 * __usePageCharactersQuery__
 *
 * To run a query within a React component, call `usePageCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePageCharactersQuery(baseOptions?: Apollo.QueryHookOptions<PageCharactersQuery, PageCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageCharactersQuery, PageCharactersQueryVariables>(PageCharactersDocument, options);
      }
export function usePageCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageCharactersQuery, PageCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageCharactersQuery, PageCharactersQueryVariables>(PageCharactersDocument, options);
        }
export type PageCharactersQueryHookResult = ReturnType<typeof usePageCharactersQuery>;
export type PageCharactersLazyQueryHookResult = ReturnType<typeof usePageCharactersLazyQuery>;
export type PageCharactersQueryResult = Apollo.QueryResult<PageCharactersQuery, PageCharactersQueryVariables>;
export const CharacterBattlesPageDocument = gql`
    query CharacterBattlesPage($characterSlug: String!, $playerSlug: String) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    id
    name
    longName
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
export const PageCharacterComboCategoriesDocument = gql`
    query PageCharacterComboCategories($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterCard
    comboCategories {
      ...ComboCategoryListItem
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterCardFragmentDoc}
${ComboCategoryListItemFragmentDoc}`;

/**
 * __usePageCharacterComboCategoriesQuery__
 *
 * To run a query within a React component, call `usePageCharacterComboCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageCharacterComboCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageCharacterComboCategoriesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageCharacterComboCategoriesQuery(baseOptions: Apollo.QueryHookOptions<PageCharacterComboCategoriesQuery, PageCharacterComboCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageCharacterComboCategoriesQuery, PageCharacterComboCategoriesQueryVariables>(PageCharacterComboCategoriesDocument, options);
      }
export function usePageCharacterComboCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageCharacterComboCategoriesQuery, PageCharacterComboCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageCharacterComboCategoriesQuery, PageCharacterComboCategoriesQueryVariables>(PageCharacterComboCategoriesDocument, options);
        }
export type PageCharacterComboCategoriesQueryHookResult = ReturnType<typeof usePageCharacterComboCategoriesQuery>;
export type PageCharacterComboCategoriesLazyQueryHookResult = ReturnType<typeof usePageCharacterComboCategoriesLazyQuery>;
export type PageCharacterComboCategoriesQueryResult = Apollo.QueryResult<PageCharacterComboCategoriesQuery, PageCharacterComboCategoriesQueryVariables>;
export const PageCharacterDocument = gql`
    query PageCharacter($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterCard
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
${CharacterCardFragmentDoc}
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
export const PageCharacterMoveCategoriesDocument = gql`
    query PageCharacterMoveCategories($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
    ...CharacterCard
    moveCategories {
      ...MoveCategoryListItem
    }
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${CharacterCardFragmentDoc}
${MoveCategoryListItemFragmentDoc}`;

/**
 * __usePageCharacterMoveCategoriesQuery__
 *
 * To run a query within a React component, call `usePageCharacterMoveCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageCharacterMoveCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageCharacterMoveCategoriesQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageCharacterMoveCategoriesQuery(baseOptions: Apollo.QueryHookOptions<PageCharacterMoveCategoriesQuery, PageCharacterMoveCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageCharacterMoveCategoriesQuery, PageCharacterMoveCategoriesQueryVariables>(PageCharacterMoveCategoriesDocument, options);
      }
export function usePageCharacterMoveCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageCharacterMoveCategoriesQuery, PageCharacterMoveCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageCharacterMoveCategoriesQuery, PageCharacterMoveCategoriesQueryVariables>(PageCharacterMoveCategoriesDocument, options);
        }
export type PageCharacterMoveCategoriesQueryHookResult = ReturnType<typeof usePageCharacterMoveCategoriesQuery>;
export type PageCharacterMoveCategoriesLazyQueryHookResult = ReturnType<typeof usePageCharacterMoveCategoriesLazyQuery>;
export type PageCharacterMoveCategoriesQueryResult = Apollo.QueryResult<PageCharacterMoveCategoriesQuery, PageCharacterMoveCategoriesQueryVariables>;
export const PageComboCategoryDocument = gql`
    query PageComboCategory($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    id
    name
    character {
      slug
      name
    }
    combos {
      ...ComboMedia
    }
  }
}
    ${ComboMediaFragmentDoc}`;

/**
 * __usePageComboCategoryQuery__
 *
 * To run a query within a React component, call `usePageComboCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageComboCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageComboCategoryQuery({
 *   variables: {
 *      comboCategoryId: // value for 'comboCategoryId'
 *   },
 * });
 */
export function usePageComboCategoryQuery(baseOptions: Apollo.QueryHookOptions<PageComboCategoryQuery, PageComboCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageComboCategoryQuery, PageComboCategoryQueryVariables>(PageComboCategoryDocument, options);
      }
export function usePageComboCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageComboCategoryQuery, PageComboCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageComboCategoryQuery, PageComboCategoryQueryVariables>(PageComboCategoryDocument, options);
        }
export type PageComboCategoryQueryHookResult = ReturnType<typeof usePageComboCategoryQuery>;
export type PageComboCategoryLazyQueryHookResult = ReturnType<typeof usePageComboCategoryLazyQuery>;
export type PageComboCategoryQueryResult = Apollo.QueryResult<PageComboCategoryQuery, PageComboCategoryQueryVariables>;
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
export const DashboardComboCategoriesPageDocument = gql`
    query DashboardComboCategoriesPage($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
  }
  comboCategories(characterSlug: $characterSlug) {
    ...ComboCategoryCard
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${ComboCategoryCardFragmentDoc}`;

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
export const PageDashboardComboCategoryNewDocument = gql`
    query PageDashboardComboCategoryNew($characterSlug: String!) {
  character(characterSlug: $characterSlug) {
    ...CharacterBreadcrumbs
  }
}
    ${CharacterBreadcrumbsFragmentDoc}`;

/**
 * __usePageDashboardComboCategoryNewQuery__
 *
 * To run a query within a React component, call `usePageDashboardComboCategoryNewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDashboardComboCategoryNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDashboardComboCategoryNewQuery({
 *   variables: {
 *      characterSlug: // value for 'characterSlug'
 *   },
 * });
 */
export function usePageDashboardComboCategoryNewQuery(baseOptions: Apollo.QueryHookOptions<PageDashboardComboCategoryNewQuery, PageDashboardComboCategoryNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDashboardComboCategoryNewQuery, PageDashboardComboCategoryNewQueryVariables>(PageDashboardComboCategoryNewDocument, options);
      }
export function usePageDashboardComboCategoryNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDashboardComboCategoryNewQuery, PageDashboardComboCategoryNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDashboardComboCategoryNewQuery, PageDashboardComboCategoryNewQueryVariables>(PageDashboardComboCategoryNewDocument, options);
        }
export type PageDashboardComboCategoryNewQueryHookResult = ReturnType<typeof usePageDashboardComboCategoryNewQuery>;
export type PageDashboardComboCategoryNewLazyQueryHookResult = ReturnType<typeof usePageDashboardComboCategoryNewLazyQuery>;
export type PageDashboardComboCategoryNewQueryResult = Apollo.QueryResult<PageDashboardComboCategoryNewQuery, PageDashboardComboCategoryNewQueryVariables>;
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
    ...MoveCategoryCard
  }
}
    ${CharacterBreadcrumbsFragmentDoc}
${MoveCategoryCardFragmentDoc}`;

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
  }
}
    ${CharacterBreadcrumbsFragmentDoc}`;

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
export const PageDashboardComboCategoryEditDocument = gql`
    query PageDashboardComboCategoryEdit($comboCategoryId: ID!) {
  comboCategory(comboCategoryId: $comboCategoryId) {
    id
    name
    character {
      slug
      name
    }
  }
}
    `;

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
export const PageDashboardMoveCategoryEditDocument = gql`
    query PageDashboardMoveCategoryEdit($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    id
    name
    character {
      slug
      name
    }
  }
}
    `;

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
export const DashboardOrganizersPageDocument = gql`
    query DashboardOrganizersPage($page: Int, $keyword: String) {
  organizers(page: $page, per: 12, keyword: $keyword) {
    records {
      ...DashboardOrganizerCard
    }
    paging {
      ...paging
    }
  }
}
    ${DashboardOrganizerCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useDashboardOrganizersPageQuery__
 *
 * To run a query within a React component, call `useDashboardOrganizersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardOrganizersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardOrganizersPageQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDashboardOrganizersPageQuery(baseOptions?: Apollo.QueryHookOptions<DashboardOrganizersPageQuery, DashboardOrganizersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardOrganizersPageQuery, DashboardOrganizersPageQueryVariables>(DashboardOrganizersPageDocument, options);
      }
export function useDashboardOrganizersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardOrganizersPageQuery, DashboardOrganizersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardOrganizersPageQuery, DashboardOrganizersPageQueryVariables>(DashboardOrganizersPageDocument, options);
        }
export type DashboardOrganizersPageQueryHookResult = ReturnType<typeof useDashboardOrganizersPageQuery>;
export type DashboardOrganizersPageLazyQueryHookResult = ReturnType<typeof useDashboardOrganizersPageLazyQuery>;
export type DashboardOrganizersPageQueryResult = Apollo.QueryResult<DashboardOrganizersPageQuery, DashboardOrganizersPageQueryVariables>;
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
export const DashboardPlayersPageDocument = gql`
    query DashboardPlayersPage($page: Int, $keyword: String) {
  players(page: $page, per: 12, keyword: $keyword) {
    records {
      ...DashboardPlayerCard
    }
    paging {
      ...paging
    }
  }
}
    ${DashboardPlayerCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useDashboardPlayersPageQuery__
 *
 * To run a query within a React component, call `useDashboardPlayersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardPlayersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardPlayersPageQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDashboardPlayersPageQuery(baseOptions?: Apollo.QueryHookOptions<DashboardPlayersPageQuery, DashboardPlayersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardPlayersPageQuery, DashboardPlayersPageQueryVariables>(DashboardPlayersPageDocument, options);
      }
export function useDashboardPlayersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardPlayersPageQuery, DashboardPlayersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardPlayersPageQuery, DashboardPlayersPageQueryVariables>(DashboardPlayersPageDocument, options);
        }
export type DashboardPlayersPageQueryHookResult = ReturnType<typeof useDashboardPlayersPageQuery>;
export type DashboardPlayersPageLazyQueryHookResult = ReturnType<typeof useDashboardPlayersPageLazyQuery>;
export type DashboardPlayersPageQueryResult = Apollo.QueryResult<DashboardPlayersPageQuery, DashboardPlayersPageQueryVariables>;
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
export const DashboardTournamentsPageDocument = gql`
    query DashboardTournamentsPage($page: Int, $per: Int, $keyword: String) {
  tournaments(page: $page, per: $per, keyword: $keyword) {
    records {
      ...DashboardTournamentCard
    }
    paging {
      ...paging
    }
  }
}
    ${DashboardTournamentCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useDashboardTournamentsPageQuery__
 *
 * To run a query within a React component, call `useDashboardTournamentsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardTournamentsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardTournamentsPageQuery({
 *   variables: {
 *      page: // value for 'page'
 *      per: // value for 'per'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useDashboardTournamentsPageQuery(baseOptions?: Apollo.QueryHookOptions<DashboardTournamentsPageQuery, DashboardTournamentsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTournamentsPageQuery, DashboardTournamentsPageQueryVariables>(DashboardTournamentsPageDocument, options);
      }
export function useDashboardTournamentsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTournamentsPageQuery, DashboardTournamentsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTournamentsPageQuery, DashboardTournamentsPageQueryVariables>(DashboardTournamentsPageDocument, options);
        }
export type DashboardTournamentsPageQueryHookResult = ReturnType<typeof useDashboardTournamentsPageQuery>;
export type DashboardTournamentsPageLazyQueryHookResult = ReturnType<typeof useDashboardTournamentsPageLazyQuery>;
export type DashboardTournamentsPageQueryResult = Apollo.QueryResult<DashboardTournamentsPageQuery, DashboardTournamentsPageQueryVariables>;
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
export const PageMoveCategoryDocument = gql`
    query PageMoveCategory($moveCategoryId: ID!) {
  moveCategory(moveCategoryId: $moveCategoryId) {
    id
    name
    character {
      slug
      name
    }
    moves {
      ...MoveListItem
    }
  }
}
    ${MoveListItemFragmentDoc}`;

/**
 * __usePageMoveCategoryQuery__
 *
 * To run a query within a React component, call `usePageMoveCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageMoveCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageMoveCategoryQuery({
 *   variables: {
 *      moveCategoryId: // value for 'moveCategoryId'
 *   },
 * });
 */
export function usePageMoveCategoryQuery(baseOptions: Apollo.QueryHookOptions<PageMoveCategoryQuery, PageMoveCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageMoveCategoryQuery, PageMoveCategoryQueryVariables>(PageMoveCategoryDocument, options);
      }
export function usePageMoveCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageMoveCategoryQuery, PageMoveCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageMoveCategoryQuery, PageMoveCategoryQueryVariables>(PageMoveCategoryDocument, options);
        }
export type PageMoveCategoryQueryHookResult = ReturnType<typeof usePageMoveCategoryQuery>;
export type PageMoveCategoryLazyQueryHookResult = ReturnType<typeof usePageMoveCategoryLazyQuery>;
export type PageMoveCategoryQueryResult = Apollo.QueryResult<PageMoveCategoryQuery, PageMoveCategoryQueryVariables>;
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
export const MovePageCommentsDocument = gql`
    query MovePageComments($moveId: ID!) {
  moveComments(moveId: $moveId) {
    ...MoveCommentCard
  }
}
    ${MoveCommentCardFragmentDoc}`;

/**
 * __useMovePageCommentsQuery__
 *
 * To run a query within a React component, call `useMovePageCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovePageCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovePageCommentsQuery({
 *   variables: {
 *      moveId: // value for 'moveId'
 *   },
 * });
 */
export function useMovePageCommentsQuery(baseOptions: Apollo.QueryHookOptions<MovePageCommentsQuery, MovePageCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MovePageCommentsQuery, MovePageCommentsQueryVariables>(MovePageCommentsDocument, options);
      }
export function useMovePageCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovePageCommentsQuery, MovePageCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MovePageCommentsQuery, MovePageCommentsQueryVariables>(MovePageCommentsDocument, options);
        }
export type MovePageCommentsQueryHookResult = ReturnType<typeof useMovePageCommentsQuery>;
export type MovePageCommentsLazyQueryHookResult = ReturnType<typeof useMovePageCommentsLazyQuery>;
export type MovePageCommentsQueryResult = Apollo.QueryResult<MovePageCommentsQuery, MovePageCommentsQueryVariables>;
export const OrganizerPageDocument = gql`
    query OrganizerPage($organizerSlug: String!) {
  organizer(organizerSlug: $organizerSlug) {
    ...OrganizerBreadcrumbs
    id
    name
    slug
    avatarUrl
    twitterId
    streamingUrl
    description
    tournaments {
      id
      name
      startsAt
    }
  }
}
    ${OrganizerBreadcrumbsFragmentDoc}`;

/**
 * __useOrganizerPageQuery__
 *
 * To run a query within a React component, call `useOrganizerPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizerPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizerPageQuery({
 *   variables: {
 *      organizerSlug: // value for 'organizerSlug'
 *   },
 * });
 */
export function useOrganizerPageQuery(baseOptions: Apollo.QueryHookOptions<OrganizerPageQuery, OrganizerPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizerPageQuery, OrganizerPageQueryVariables>(OrganizerPageDocument, options);
      }
export function useOrganizerPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizerPageQuery, OrganizerPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizerPageQuery, OrganizerPageQueryVariables>(OrganizerPageDocument, options);
        }
export type OrganizerPageQueryHookResult = ReturnType<typeof useOrganizerPageQuery>;
export type OrganizerPageLazyQueryHookResult = ReturnType<typeof useOrganizerPageLazyQuery>;
export type OrganizerPageQueryResult = Apollo.QueryResult<OrganizerPageQuery, OrganizerPageQueryVariables>;
export const OrganizersPageDocument = gql`
    query OrganizersPage($page: Int, $keyword: String) {
  organizers(page: $page, per: 20, keyword: $keyword) {
    records {
      ...OrganizerCard
    }
    paging {
      ...paging
    }
  }
}
    ${OrganizerCardFragmentDoc}
${PagingFragmentDoc}`;

/**
 * __useOrganizersPageQuery__
 *
 * To run a query within a React component, call `useOrganizersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizersPageQuery({
 *   variables: {
 *      page: // value for 'page'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useOrganizersPageQuery(baseOptions?: Apollo.QueryHookOptions<OrganizersPageQuery, OrganizersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizersPageQuery, OrganizersPageQueryVariables>(OrganizersPageDocument, options);
      }
export function useOrganizersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizersPageQuery, OrganizersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizersPageQuery, OrganizersPageQueryVariables>(OrganizersPageDocument, options);
        }
export type OrganizersPageQueryHookResult = ReturnType<typeof useOrganizersPageQuery>;
export type OrganizersPageLazyQueryHookResult = ReturnType<typeof useOrganizersPageLazyQuery>;
export type OrganizersPageQueryResult = Apollo.QueryResult<OrganizersPageQuery, OrganizersPageQueryVariables>;
export const PlayerBattlesPageDocument = gql`
    query PlayerBattlesPage($playerSlug: String!, $characterSlug: String, $page: Int) {
  player(playerSlug: $playerSlug) {
    ...PlayerBreadcrumbs
    ...PlayerPageProfile
  }
  battleCounts(playerSlug: $playerSlug, per: 10) {
    records {
      ...CharacterBattleCountChip
    }
  }
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
 *      characterSlug: // value for 'characterSlug'
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
  battleCounts(playerSlug: $playerSlug, per: 10) {
    records {
      ...CharacterBattleCountChip
    }
  }
}
    ${PlayerBreadcrumbsFragmentDoc}
${PlayerPageProfileFragmentDoc}
${CharacterBattleCountChipFragmentDoc}`;

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
export const PageTournamentVideoDocument = gql`
    query PageTournamentVideo($tournamentVideoId: ID!) {
  tournamentVideo(tournamentVideoId: $tournamentVideoId) {
    id
    youtubeVideoId
    title
    thumbnailUrl
    commentCount
    channel {
      name
    }
    tournament {
      id
      name
    }
    battles {
      ...TournamentVideoPageBattle
    }
  }
}
    ${TournamentVideoPageBattleFragmentDoc}`;

/**
 * __usePageTournamentVideoQuery__
 *
 * To run a query within a React component, call `usePageTournamentVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageTournamentVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageTournamentVideoQuery({
 *   variables: {
 *      tournamentVideoId: // value for 'tournamentVideoId'
 *   },
 * });
 */
export function usePageTournamentVideoQuery(baseOptions: Apollo.QueryHookOptions<PageTournamentVideoQuery, PageTournamentVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageTournamentVideoQuery, PageTournamentVideoQueryVariables>(PageTournamentVideoDocument, options);
      }
export function usePageTournamentVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageTournamentVideoQuery, PageTournamentVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageTournamentVideoQuery, PageTournamentVideoQueryVariables>(PageTournamentVideoDocument, options);
        }
export type PageTournamentVideoQueryHookResult = ReturnType<typeof usePageTournamentVideoQuery>;
export type PageTournamentVideoLazyQueryHookResult = ReturnType<typeof usePageTournamentVideoLazyQuery>;
export type PageTournamentVideoQueryResult = Apollo.QueryResult<PageTournamentVideoQuery, PageTournamentVideoQueryVariables>;
export const PageTournamentDocument = gql`
    query PageTournament($tournamentId: ID!) {
  tournament(tournamentId: $tournamentId) {
    id
    name
    mainImageUrl
    url
    streamingUrl
    description
    startsAt
    standings {
      ...StandingCard
    }
    videos {
      ...TournamentVideoCard
    }
  }
}
    ${StandingCardFragmentDoc}
${TournamentVideoCardFragmentDoc}`;

/**
 * __usePageTournamentQuery__
 *
 * To run a query within a React component, call `usePageTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageTournamentQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *   },
 * });
 */
export function usePageTournamentQuery(baseOptions: Apollo.QueryHookOptions<PageTournamentQuery, PageTournamentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageTournamentQuery, PageTournamentQueryVariables>(PageTournamentDocument, options);
      }
export function usePageTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageTournamentQuery, PageTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageTournamentQuery, PageTournamentQueryVariables>(PageTournamentDocument, options);
        }
export type PageTournamentQueryHookResult = ReturnType<typeof usePageTournamentQuery>;
export type PageTournamentLazyQueryHookResult = ReturnType<typeof usePageTournamentLazyQuery>;
export type PageTournamentQueryResult = Apollo.QueryResult<PageTournamentQuery, PageTournamentQueryVariables>;
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