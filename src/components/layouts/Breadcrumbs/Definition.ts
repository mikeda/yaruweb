import { path } from '@/lib';
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

export type ChainParam =
  | { to: 'articles' }
  | { to: 'article'; article: ArticleParam }
  | { to: 'battles' }
  | { to: 'characters' }
  | { to: 'character'; character: CharactersParam }
  | { to: 'comboCategories'; character: CharactersParam }
  | { to: 'comboCategory'; comboCategory: ComboCategoryParam }
  | { to: 'login' }
  | { to: 'moveCategories'; character: CharactersParam }
  | { to: 'moveCategory'; moveCategory: MoveCategoryParam }
  | { to: 'move'; move: MoveParam }
  | { to: 'organizers' }
  | { to: 'organizer'; organizer: OrganizerParam }
  | { to: 'players' }
  | { to: 'player'; player: PlayerParam }
  | { to: 'playerBattles'; player: PlayerParam }
  | { to: 'playerStandings'; player: PlayerParam }
  | { to: 'passwordEdit' }
  | { to: 'passwordReset' }
  | { to: 'signup' }
  | { to: 'tournaments' }
  | { to: 'tournament'; tournament: TournamentParam }
  | { to: 'tournamentVideo'; tournamentVideo: TournamentVideoParam };

export const breadcrumbChain = (props: ChainParam): BreadcrumbChainItem => {
  switch (props.to) {
    case 'articles':
      return { name: '記事', url: path({ to: 'articles' }) };
    case 'article':
      return { name: props.article.title, parent: breadcrumbChain({ to: 'articles' }) };
    case 'battles':
      return { name: '対戦動画', url: path({ to: 'battles' }) };
    case 'characters':
      return { name: 'キャラクター', url: path({ to: 'characters' }) };
    case 'character':
      return {
        name: props.character.name,
        url: path({ to: 'character', characterSlug: props.character.slug }),
        parent: breadcrumbChain({ to: 'characters' }),
      };
    case 'comboCategories':
      return {
        name: 'コンボ',
        url: path({ to: 'comboCategories', characterSlug: props.character.slug }),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'comboCategory':
      return {
        name: props.comboCategory.name,
        url: path({ to: 'comboCategory', comboCategoryId: props.comboCategory.id }),
        parent: breadcrumbChain({ to: 'comboCategories', character: props.comboCategory.character }),
      };
    case 'login':
      return { name: 'ログイン' };
    case 'moveCategories':
      return {
        name: 'コマンドリスト',
        url: path({ to: 'moveCategories', characterSlug: props.character.slug }),
        parent: breadcrumbChain({ to: 'character', character: props.character }),
      };
    case 'moveCategory':
      return {
        name: props.moveCategory.name,
        url: path({ to: 'moveCategory', moveCategoryId: props.moveCategory.id }),
        parent: breadcrumbChain({ to: 'moveCategories', character: props.moveCategory.character }),
      };
    case 'move':
      return {
        name: props.move.name,
        parent: breadcrumbChain({ to: 'moveCategory', moveCategory: props.move.moveCategory }),
      };
    case 'passwordEdit':
      return { name: 'パスワード変更' };
    case 'passwordReset':
      return { name: 'パスワードリセット' };
    case 'organizer':
      return { name: props.organizer.name, parent: breadcrumbChain({ to: 'organizers' }) };
    case 'organizers':
      return { name: 'オーガナイザー', url: path({ to: 'organizers' }) };
    case 'players':
      return { name: 'プレイヤー', url: path({ to: 'players' }) };
    case 'player':
      return {
        name: props.player.name,
        url: path({ to: 'player', playerSlug: props.player.slug }),
        parent: breadcrumbChain({ to: 'players' }),
      };
    case 'playerBattles':
      return { name: '対戦動画', parent: breadcrumbChain({ to: 'player', player: props.player }) };
    case 'playerStandings':
      return { name: '大会戦績', parent: breadcrumbChain({ to: 'player', player: props.player }) };
    case 'signup':
      return { name: 'ログイン' };
    case 'tournaments':
      return { name: '大会', url: path({ to: 'tournaments' }) };
    case 'tournament':
      return {
        name: props.tournament.name,
        url: path({ to: 'tournament', tournamentId: props.tournament.id }),
        parent: breadcrumbChain({ to: 'tournaments' }),
      };
    case 'tournamentVideo':
      return {
        name: props.tournamentVideo.title,
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournamentVideo.tournament }),
      };
  }
};
