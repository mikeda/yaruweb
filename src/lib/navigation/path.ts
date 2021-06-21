import { ArticleCategory, Order } from '../graphql/types';
import { generatePath } from './generatePath';

type Options =
  | { to: 'top' }
  | { to: 'articles'; params?: { page?: number; order?: Order; category?: ArticleCategory } }
  | { to: 'article'; articleId: string }
  | { to: 'characters' }
  | { to: 'character'; characterSlug: string }
  | { to: 'comboCategory'; comboCategoryId: string }
  | { to: 'login' }
  | { to: 'moveCategory'; moveCategoryId: string }
  | { to: 'move'; moveId: string }
  | { to: 'passwordEdit' }
  | { to: 'passwordReset' }
  | { to: 'signup' }
  | { to: 'tournaments'; params?: { page?: number } }
  | { to: 'tournament'; tournamentId: string }
  | { to: 'tournamentVideo'; tournamentVideoId: string };

export const path = (options: Options): string => {
  switch (options.to) {
    case 'top':
      return '/';
    case 'articles':
      return generatePath('/articles', options.params);
    case 'article':
      return `/articles/${options.articleId}`;
    case 'characters':
      return '/characters';
    case 'character':
      return `/${options.characterSlug}`;
    case 'comboCategory':
      return `/combo_categories/${options.comboCategoryId}`;
    case 'login':
      return '/login';
    case 'moveCategory':
      return `/move_categories/${options.moveCategoryId}`;
    case 'move':
      return `/moves/${options.moveId}`;
    case 'passwordEdit':
      return '/password/edit';
    case 'passwordReset':
      return '/password/reset';
    case 'tournaments':
      return generatePath('/tournaments', options.params);
    case 'tournament':
      return `/tournaments/${options.tournamentId}`;
    case 'signup':
      return '/signup';
    case 'tournamentVideo':
      return `/tournament_videos/${options.tournamentVideoId}`;
  }
};
