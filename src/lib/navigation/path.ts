import { ArticleCategory, Order } from '../graphql/types';
import { generatePath } from './generatePath';

type Options =
  | { to: 'top' }
  | { to: 'articles'; params?: { page?: number; order?: Order; category?: ArticleCategory } }
  | { to: 'article'; articleId: string }
  | { to: 'battles' }
  | { to: 'characters' }
  | { to: 'character'; characterSlug: string }
  | { to: 'characterBattles'; characterSlug: string; playerSlug?: string; page?: number }
  | { to: 'comboCategories'; characterSlug: string }
  | { to: 'comboCategory'; comboCategoryId: string }
  | { to: 'login' }
  | { to: 'moveCategories'; characterSlug: string }
  | { to: 'moveCategory'; moveCategoryId: string }
  | { to: 'move'; moveId: string }
  | { to: 'passwordEdit' }
  | { to: 'passwordReset' }
  | { to: 'organizers'; params?: { page?: number; q?: string } }
  | { to: 'organizer'; organizerSlug: string }
  | { to: 'players'; params?: { page?: number; q?: string } }
  | { to: 'player'; playerSlug: string }
  | { to: 'playerBattles'; player: string; characterSlug?: string; page?: number }
  | { to: 'playerWinnings'; playerSlug: string; page?: number }
  | { to: 'signup' }
  | { to: 'tournaments'; params?: { page?: number } }
  | { to: 'tournament'; tournamentId: string }
  | { to: 'tournamentVideo'; tournamentVideoId: string; battleId?: string };

export const path = (options: Options): string => {
  switch (options.to) {
    case 'top':
      return '/';
    case 'articles':
      return generatePath('/articles', options.params);
    case 'article':
      return `/articles/${options.articleId}`;
    case 'battles':
      return '/battles';
    case 'characters':
      return '/characters';
    case 'character':
      return `/characters/${options.characterSlug}`;
    case 'characterBattles':
      return options.playerSlug
        ? `/characters/${options.characterSlug}/battles/${options.playerSlug}`
        : `/characters/${options.characterSlug}/battles`;
    case 'comboCategories':
      return `/characters/${options.characterSlug}/combo_categories`;
    case 'comboCategory':
      return `/combo_categories/${options.comboCategoryId}`;
    case 'login':
      return '/login';
    case 'moveCategories':
      return `/characters/${options.characterSlug}/move_categories`;
    case 'moveCategory':
      return `/move_categories/${options.moveCategoryId}`;
    case 'move':
      return `/moves/${options.moveId}`;
    case 'passwordEdit':
      return '/password/edit';
    case 'passwordReset':
      return '/password/reset';
    case 'organizers':
      return generatePath('/organizers', options.params);
    case 'organizer':
      return `/organizers/${options.organizerSlug}`;
    case 'players':
      return generatePath('/players', options.params);
    case 'player':
      return `/players/${options.playerSlug}`;
    case 'playerBattles':
      return options.characterSlug
        ? `/players/${options.player}/battles/${options.characterSlug}`
        : `/players/${options.player}/battles`;
    case 'playerWinnings':
      return generatePath(`/players/${options.playerSlug}/winnings`, { page: options.page });
    case 'tournaments':
      return generatePath('/tournaments', options.params);
    case 'tournament':
      return `/tournaments/${options.tournamentId}`;
    case 'signup':
      return '/signup';
    case 'tournamentVideo':
      return generatePath(`/tournament_videos/${options.tournamentVideoId}`, { battle: options.battleId });
  }
};
