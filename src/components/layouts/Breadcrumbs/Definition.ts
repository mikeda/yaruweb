import { path } from '@/lib';
import { BreadcrumbChainItem } from './Breadcrumbs';
import {
  ArticleParam,
  CharactersParam,
  ComboCategoryParam,
  MoveCategoryParam,
  MoveParam,
  TournamentParam,
  TournamentVideoParam,
} from './params';

export type ChainParam =
  | { to: 'articles' }
  | { to: 'article'; article: ArticleParam }
  | { to: 'characters' }
  | { to: 'character'; character: CharactersParam }
  | { to: 'comboCategory'; comboCategory: ComboCategoryParam }
  | { to: 'login' }
  | { to: 'moveCategory'; moveCategory: MoveCategoryParam }
  | { to: 'move'; move: MoveParam }
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
    case 'characters':
      return { name: 'キャラクター', url: path({ to: 'characters' }) };
    case 'character':
      return { name: props.character.name, parent: breadcrumbChain({ to: 'characters' }) };
    case 'comboCategory':
      return {
        name: props.comboCategory.name,
        parent: breadcrumbChain({ to: 'character', character: props.comboCategory.character }),
      };
    case 'login':
      return { name: 'ログイン' };
    case 'moveCategory':
      return {
        name: props.moveCategory.name,
        parent: breadcrumbChain({ to: 'character', character: props.moveCategory.character }),
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
    case 'signup':
      return { name: 'ログイン' };
    case 'tournaments':
      return { name: '大会', url: path({ to: 'tournaments' }) };
    case 'tournament':
      return { name: props.tournament.name, parent: breadcrumbChain({ to: 'tournaments' }) };
    case 'tournamentVideo':
      return {
        name: props.tournamentVideo.title,
        parent: breadcrumbChain({ to: 'tournament', tournament: props.tournamentVideo.tournament }),
      };
  }
};
