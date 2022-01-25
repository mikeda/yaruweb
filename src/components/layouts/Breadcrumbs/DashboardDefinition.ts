import { pagesPath } from '@/lib/$path';
import { BreadcrumbChainItem } from './Breadcrumbs';
import {
  ArticleParam,
  CharactersParam,
  ComboCategoryParam,
  MoveCategoryParam,
  MoveParam,
  OrganizerParam,
  PlayerParam,
  TournamentParam,
  TournamentVideoParam,
} from './params';

export type DashboardBreadcrumbParams =
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
  | { to: 'combosNew'; comboCategory: ComboCategoryParam }
  | { to: 'comboEdit'; comboCategory: ComboCategoryParam }
  | { to: 'moveCategories'; character: CharactersParam }
  | { to: 'moveCategory'; moveCategory: MoveCategoryParam }
  | { to: 'moveCategoriesNew'; character: CharactersParam }
  | { to: 'moveCategoryEdit'; moveCategory: MoveCategoryParam }
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
  | { to: 'battles'; tournamentVideo: TournamentVideoParam }
  | { to: 'tournamentVideo'; tournamentVideo: TournamentVideoParam };

export const breadcrumbChain = (props: DashboardBreadcrumbParams): BreadcrumbChainItem => {
  switch (props.to) {
    case 'articles':
      return { name: '記事', url: pagesPath.dashboard.articles.$url() };
    case 'article':
      return { name: props.article.title, parent: breadcrumbChain({ to: 'articles' }) };
    case 'articlesNew':
      return { name: '記事を登録', parent: breadcrumbChain({ to: 'articles' }) };
    case 'articleEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'article', article: props.article }) };
    case 'characters':
      return { name: 'キャラクター', url: pagesPath.dashboard.characters.$url() };
    case 'character':
      return { name: props.character.name, parent: breadcrumbChain({ to: 'characters' }) };
    case 'charactersNew':
      return { name: 'キャラクターを登録', parent: breadcrumbChain({ to: 'characters' }) };
    case 'characterEdit':
      return { name: '編集', parent: breadcrumbChain({ to: 'character', character: props.character }) };
    case 'comboCategories':
      return {
        name: 'コンボ',
        url: pagesPath.dashboard.characters._slug(props.character.slug).combo_categories.$url(),
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
    case 'combosNew':
      return {
        name: 'コンボを登録',
        parent: breadcrumbChain({ to: 'comboCategories', character: props.comboCategory.character }),
      };
    case 'comboEdit':
      return {
        name: '編集',
        parent: breadcrumbChain({ to: 'comboCategories', character: props.comboCategory.character }),
      };
    case 'moveCategories':
      return {
        name: 'コマンドリスト',
        url: pagesPath.dashboard.characters._slug(props.character.slug).move_categories.$url(),
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
    case 'movesNew':
      return {
        name: '技データを登録',
        parent: breadcrumbChain({ to: 'moveCategories', character: props.moveCategory.character }),
      };
    case 'moveEdit':
      return {
        name: '編集',
        parent: breadcrumbChain({ to: 'moveCategories', character: props.move.moveCategory.character }),
      };
    case 'profileEdit':
      return { name: 'プロフィール編集' };
    case 'organizers':
      return { name: 'オーガナイザー', url: pagesPath.dashboard.organizers.$url() };
    case 'organizer':
      return { name: props.organizer.name, parent: breadcrumbChain({ to: 'organizers' }) };
    case 'organizersNew':
      return { name: 'オーガナイザーを登録', parent: breadcrumbChain({ to: 'organizers' }) };
    case 'organizerEdit':
      return { name: 'オーガナイザーを編集', parent: breadcrumbChain({ to: 'organizer', organizer: props.organizer }) };
    case 'players':
      return { name: 'プレイヤー', url: pagesPath.dashboard.players.$url() };
    case 'player':
      return { name: props.player.name, parent: breadcrumbChain({ to: 'players' }) };
    case 'playersNew':
      return { name: 'プレイヤーを登録', parent: breadcrumbChain({ to: 'players' }) };
    case 'playerEdit':
      return { name: 'プレイヤーを編集', parent: breadcrumbChain({ to: 'player', player: props.player }) };
    case 'tournaments':
      return { name: '大会', url: pagesPath.dashboard.tournaments.$url() };
    case 'tournament':
      return {
        name: props.tournament.name,
        url: pagesPath.dashboard.tournaments._id(props.tournament.id).$url(),
        parent: breadcrumbChain({ to: 'tournaments' }),
      };
    case 'tournamentsNew':
      return { name: '大会を登録', parent: breadcrumbChain({ to: 'tournaments' }) };
    case 'tournamentEdit':
      return { name: '大会を編集', parent: breadcrumbChain({ to: 'tournament', tournament: props.tournament }) };
    case 'battles':
      return {
        name: '対戦',
        url: pagesPath.dashboard.tournament_videos._id(props.tournamentVideo.id).battles.$url(),
        parent: breadcrumbChain({ to: 'tournamentVideo', tournamentVideo: props.tournamentVideo }),
      };
    case 'tournamentVideo':
      return {
        name: props.tournamentVideo.title,
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournamentVideo.tournament }),
      };
  }
};
