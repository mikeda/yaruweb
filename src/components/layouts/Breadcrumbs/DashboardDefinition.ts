import { dashboardPath } from '@/lib';
import { BreadcrumbChainItem } from './Breadcrumbs';
import {
  ArticleParam,
  CharactersParam,
  ComboCategoryParam,
  ComboParam,
  MoveCategoryParam,
  MoveParam,
  OrganizerParam,
  PlayerParam,
  TournamentParam,
  TournamentVideoParam,
} from './params';

export type DashboardBreadcrumbParams =
  | { to: 'actions'; move: MoveParam }
  | { to: 'attackActionsNew'; move: MoveParam }
  | { to: 'attackActionEdit'; move: MoveParam }
  | { to: 'articles' }
  | { to: 'article'; article: ArticleParam }
  | { to: 'articlesNew' }
  | { to: 'articleEdit'; article: ArticleParam }
  | { to: 'characters' }
  | { to: 'character'; character: CharactersParam }
  | { to: 'charactersNew' }
  | { to: 'characterEdit'; character: CharactersParam }
  | { to: 'comboCategories'; character: CharactersParam }
  | { to: 'comboCategory'; comboCategory: ComboCategoryParam }
  | { to: 'comboCategoriesNew'; character: CharactersParam }
  | { to: 'comboCategoryEdit'; comboCategory: ComboCategoryParam }
  | { to: 'combos'; comboCategory: ComboCategoryParam }
  | { to: 'combo'; combo: ComboParam }
  | { to: 'combosNew'; comboCategory: ComboCategoryParam }
  | { to: 'comboEdit'; combo: ComboParam }
  | { to: 'commands'; move: MoveParam }
  | { to: 'commandsNew'; move: MoveParam }
  | { to: 'commandEdit'; move: MoveParam }
  | { to: 'moveCategories'; character: CharactersParam }
  | { to: 'moveCategory'; moveCategory: MoveCategoryParam }
  | { to: 'moveCategoriesNew'; character: CharactersParam }
  | { to: 'moveCategoryEdit'; moveCategory: MoveCategoryParam }
  | { to: 'moves'; moveCategory: MoveCategoryParam }
  | { to: 'move'; move: MoveParam }
  | { to: 'movesNew'; moveCategory: MoveCategoryParam }
  | { to: 'moveEdit'; move: MoveParam }
  | { to: 'organizers' }
  | { to: 'organizer'; organizer: OrganizerParam }
  | { to: 'organizersNew' }
  | { to: 'organizerEdit'; organizer: OrganizerParam }
  | { to: 'players' }
  | { to: 'player'; player: PlayerParam }
  | { to: 'playersNew' }
  | { to: 'playerEdit'; player: PlayerParam }
  | { to: 'profileEdit' }
  | { to: 'tournaments' }
  | { to: 'tournament'; tournament: TournamentParam }
  | { to: 'tournamentsNew' }
  | { to: 'tournamentEdit'; tournament: TournamentParam }
  | { to: 'tournamentBattles'; tournamentVideo: TournamentVideoParam }
  | { to: 'tournamentRankings'; tournament: TournamentParam }
  | { to: 'tournamentVideos'; tournament: TournamentParam }
  | { to: 'tournamentVideo'; tournamentVideo: TournamentVideoParam }
  | { to: 'tournamentVideosNew'; tournament: TournamentParam }
  | { to: 'throwActionsNew'; move: MoveParam }
  | { to: 'throwActionEdit'; move: MoveParam };

export const breadcrumbChain = (props: DashboardBreadcrumbParams): BreadcrumbChainItem => {
  switch (props.to) {
    case 'actions':
      return {
        name: '判定',
        url: dashboardPath({ to: 'actions', moveId: props.move.id }),
        parent: breadcrumbChain({ to: 'move', move: props.move }),
      };
    case 'attackActionsNew':
      return { name: '判定を登録', parent: breadcrumbChain({ to: 'move', move: props.move }) };
    case 'attackActionEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'actions', move: props.move }) };
    case 'articles':
      return { name: '記事', url: dashboardPath({ to: 'articles' }) };
    case 'article':
      return { name: props.article.title, parent: breadcrumbChain({ to: 'articles' }) };
    case 'articlesNew':
      return { name: '記事を登録', parent: breadcrumbChain({ to: 'articles' }) };
    case 'articleEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'article', article: props.article }) };
    case 'characters':
      return { name: 'キャラクター', url: dashboardPath({ to: 'characters' }) };
    case 'character':
      return { name: props.character.name, parent: breadcrumbChain({ to: 'characters' }) };
    case 'charactersNew':
      return { name: 'キャラクターを登録', parent: breadcrumbChain({ to: 'characters' }) };
    case 'characterEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'character', character: props.character }) };
    case 'comboCategories':
      return {
        name: 'コンボ',
        url: dashboardPath({ to: 'comboCategories', characterSlug: props.character.slug }),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'comboCategory':
      return {
        name: props.comboCategory.name,
        parent: breadcrumbChain({ to: 'comboCategories', character: props.comboCategory.character }),
      };
    case 'comboCategoriesNew':
      return {
        name: 'カテゴリを登録',
        parent: breadcrumbChain({ to: 'comboCategories', character: props.character }),
      };
    case 'comboCategoryEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'comboCategory', comboCategory: props.comboCategory }) };
    case 'combos':
      return {
        name: props.comboCategory.name,
        url: dashboardPath({ to: 'combos', comboCategoryId: props.comboCategory.id }),
        parent: breadcrumbChain({ to: 'comboCategories', character: props.comboCategory.character }),
      };
    case 'combo':
      return {
        name: props.combo.name,
        parent: breadcrumbChain({ to: 'combos', comboCategory: props.combo.comboCategory }),
      };
    case 'combosNew':
      return { name: 'コンボを登録', parent: breadcrumbChain({ to: 'combos', comboCategory: props.comboCategory }) };
    case 'comboEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'combos', comboCategory: props.combo.comboCategory }) };
    case 'commands':
      return {
        name: 'コマンド',
        parent: breadcrumbChain({ to: 'move', move: props.move }),
      };
    case 'commandsNew':
      return { name: '登録', parent: breadcrumbChain({ to: 'commands', move: props.move }) };
    case 'commandEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'commands', move: props.move }) };
    case 'moveCategories':
      return {
        name: 'コマンドリスト',
        url: dashboardPath({ to: 'moveCategories', characterSlug: props.character.slug }),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'moveCategory':
      return {
        name: props.moveCategory.name,
        parent: breadcrumbChain({ to: 'moveCategories', character: props.moveCategory.character }),
      };
    case 'moveCategoriesNew':
      return {
        name: 'カテゴリを登録',
        parent: breadcrumbChain({ to: 'moveCategories', character: props.character }),
      };
    case 'moveCategoryEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'moveCategory', moveCategory: props.moveCategory }) };
    case 'moves':
      return {
        name: props.moveCategory.name,
        url: dashboardPath({ to: 'moves', moveCategoryId: props.moveCategory.id }),
        parent: breadcrumbChain({ to: 'moveCategories', character: props.moveCategory.character }),
      };
    case 'move':
      return {
        name: props.move.name,
        parent: breadcrumbChain({ to: 'moves', moveCategory: props.move.moveCategory }),
      };
    case 'movesNew':
      return { name: '技データを登録', parent: breadcrumbChain({ to: 'moves', moveCategory: props.moveCategory }) };
    case 'moveEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'moves', moveCategory: props.move.moveCategory }) };
    case 'profileEdit':
      return { name: 'プロフィール編集' };
    case 'organizers':
      return { name: 'オーガナイザー', url: dashboardPath({ to: 'organizers' }) };
    case 'organizer':
      return { name: props.organizer.name, parent: breadcrumbChain({ to: 'organizers' }) };
    case 'organizersNew':
      return { name: 'オーガナイザーを登録', parent: breadcrumbChain({ to: 'organizers' }) };
    case 'organizerEdit':
      return { name: 'オーガナイザーを編集', parent: breadcrumbChain({ to: 'organizer', organizer: props.organizer }) };
    case 'players':
      return { name: 'プレイヤー', url: dashboardPath({ to: 'players' }) };
    case 'player':
      return { name: props.player.name, parent: breadcrumbChain({ to: 'players' }) };
    case 'playersNew':
      return { name: 'プレイヤーを登録', parent: breadcrumbChain({ to: 'players' }) };
    case 'playerEdit':
      return { name: 'プレイヤーを編集', parent: breadcrumbChain({ to: 'player', player: props.player }) };
    case 'tournaments':
      return { name: '大会', url: dashboardPath({ to: 'tournaments' }) };
    case 'tournament':
      return { name: props.tournament.name, parent: breadcrumbChain({ to: 'tournaments' }) };
    case 'tournamentsNew':
      return { name: '大会を登録', parent: breadcrumbChain({ to: 'tournaments' }) };
    case 'tournamentEdit':
      return { name: '大会を編集', parent: breadcrumbChain({ to: 'tournament', tournament: props.tournament }) };
    case 'tournamentBattles':
      return {
        name: '対戦',
        url: dashboardPath({ to: 'tournamentBattles', tournamentVideoId: props.tournamentVideo.id }),
        parent: breadcrumbChain({ to: 'tournamentVideo', tournamentVideo: props.tournamentVideo }),
      };
    case 'tournamentRankings':
      return {
        name: '順位',
        url: dashboardPath({ to: 'tournamentRankings', tournamentId: props.tournament.id }),
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournament }),
      };
    case 'tournamentVideos':
      return {
        name: '動画',
        url: dashboardPath({ to: 'tournamentVideos', tournamentId: props.tournament.id }),
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournament }),
      };
    case 'tournamentVideo':
      return {
        name: props.tournamentVideo.title,
        parent: breadcrumbChain({ to: 'tournamentVideos', tournament: props.tournamentVideo.tournament }),
      };
    case 'tournamentVideosNew':
      return { name: '動画を登録', parent: breadcrumbChain({ to: 'tournament', tournament: props.tournament }) };
    case 'throwActionsNew':
      return { name: '投げ判定を登録', parent: breadcrumbChain({ to: 'move', move: props.move }) };
    case 'throwActionEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'actions', move: props.move }) };
  }
};
