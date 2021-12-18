import { generatePath } from './generatePath';

type Options =
  | { to: 'top' }
  | { to: 'articles' }
  | { to: 'articlesNew' }
  | { to: 'articleEdit'; articleId: string }
  | { to: 'characters' }
  | { to: 'charactersNew' }
  | { to: 'characterEdit'; characterSlug: string }
  | { to: 'comboCategories'; characterSlug: string }
  | { to: 'comboCategoriesNew'; characterSlug: string }
  | { to: 'comboCategoryEdit'; comboCategoryId: string }
  | { to: 'combosNew'; comboCategoryId: string }
  | { to: 'comboEdit'; comboId: string }
  | { to: 'moveCategories'; characterSlug: string }
  | { to: 'moveCategoriesNew'; characterSlug: string }
  | { to: 'moveCategoryEdit'; moveCategoryId: string }
  | { to: 'movesNew'; moveCategoryId: string; moveType: 'attack' | 'throw' | 'reversal' }
  | { to: 'moveEdit'; moveId: string }
  | { to: 'moveCopy'; moveId: string }
  | { to: 'organizers'; q?: string }
  | { to: 'organizersNew' }
  | { to: 'organizerEdit'; organizerSlug: string }
  | { to: 'players'; q?: string }
  | { to: 'playersNew' }
  | { to: 'playerEdit'; playerSlug: string }
  | { to: 'profileEdit' }
  | { to: 'tournaments'; q?: string }
  | { to: 'tournament'; tournamentId: string }
  | { to: 'tournamentsNew' }
  | { to: 'tournamentEdit'; tournamentId: string }
  | { to: 'battles'; tournamentVideoId: string }
  | { to: 'tournamentEdit'; tournamentId: string };

export const dashboardPath = (options: Options): string => {
  switch (options.to) {
    case 'top':
      return '/dashboard';
    case 'articles':
      return '/dashboard/articles';
    case 'articlesNew':
      return '/dashboard/articles/new';
    case 'articleEdit':
      return `/dashboard/articles/${options.articleId}/edit`;
    case 'characters':
      return '/dashboard/characters';
    case 'charactersNew':
      return '/dashboard/characters/new';
    case 'characterEdit':
      return `/dashboard/characters/${options.characterSlug}/edit`;
    case 'comboCategories':
      return `/dashboard/characters/${options.characterSlug}/combo_categories`;
    case 'comboCategoriesNew':
      return `/dashboard/characters/${options.characterSlug}/combo_categories/new`;
    case 'comboCategoryEdit':
      `/dashboard/combo_categories/${options.comboCategoryId}/edit`;
    case 'combosNew':
      return `/dashboard/combo_categories/${options.comboCategoryId}/combos/new`;
    case 'comboEdit':
      return `/dashboard/combos/${options.comboId}/edit`;
    case 'moveCategories':
      return `/dashboard/characters/${options.characterSlug}/move_categories`;
    case 'moveCategoriesNew':
      return `/dashboard/characters/${options.characterSlug}/move_categories/new`;
    case 'moveCategoryEdit':
      return `/dashboard/move_categories/${options.moveCategoryId}/edit`;
    case 'movesNew':
      return `/dashboard/move_categories/${options.moveCategoryId}/moves/new?move_type=${options.moveType}`;
    case 'moveEdit':
      return `/dashboard/moves/${options.moveId}/edit`;
    case 'moveCopy':
      return `/dashboard/moves/${options.moveId}/copy`;
    case 'organizers':
      return generatePath('/dashboard/organizers', { q: options.q });
    case 'organizersNew':
      return '/dashboard/organizers/new';
    case 'organizerEdit':
      return `/dashboard/organizers/${options.organizerSlug}/edit`;
    case 'players':
      return generatePath('/dashboard/players', { q: options.q });
    case 'playersNew':
      return '/dashboard/players/new';
    case 'playerEdit':
      return `/dashboard/players/${options.playerSlug}/edit`;
    case 'profileEdit':
      return `/dashboard/profile/edit`;
    case 'tournaments':
      return generatePath('/dashboard/tournaments', { q: options.q });
    case 'tournament':
      return `/dashboard/tournaments/${options.tournamentId}`;
    case 'tournamentsNew':
      return '/dashboard/tournaments/new';
    case 'tournamentEdit':
      return `/dashboard/tournaments/${options.tournamentId}/edit`;
    case 'battles':
      return `/dashboard/tournament_videos/${options.tournamentVideoId}/battles`;
  }
};
