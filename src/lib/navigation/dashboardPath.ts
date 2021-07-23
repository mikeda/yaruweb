import { generatePath } from './generatePath';

type Options =
  | { to: 'top' }
  | { to: 'actions'; moveId: string }
  | { to: 'attackActionsNew'; moveId: string }
  | { to: 'attackActionEdit'; actionId: string }
  | { to: 'articles'; params?: { page?: number } }
  | { to: 'articlesNew' }
  | { to: 'articleEdit'; articleId: string }
  | { to: 'characters' }
  | { to: 'charactersNew' }
  | { to: 'characterEdit'; characterSlug: string }
  | { to: 'comboCategories'; characterSlug: string }
  | { to: 'comboCategoriesNew'; characterSlug: string }
  | { to: 'comboCategoryEdit'; comboCategoryId: string }
  | { to: 'combos'; comboCategoryId: string }
  | { to: 'combosNew'; comboCategoryId: string }
  | { to: 'comboEdit'; comboId: string }
  | { to: 'commands'; moveId: string }
  | { to: 'commandsNew'; moveId: string }
  | { to: 'commandEdit'; commandId: string }
  | { to: 'moveCategories'; characterSlug: string }
  | { to: 'moveCategoriesNew'; characterSlug: string }
  | { to: 'moveCategoryEdit'; moveCategoryId: string }
  | { to: 'moves'; moveCategoryId: string }
  | { to: 'movesNew'; moveCategoryId: string }
  | { to: 'moveEdit'; moveId: string }
  | { to: 'players'; params?: { page?: number } }
  | { to: 'playersNew' }
  | { to: 'playerEdit'; playerSlug: string }
  | { to: 'profileEdit' }
  | { to: 'tournaments'; params?: { page?: number } }
  | { to: 'tournamentsNew' }
  | { to: 'tournamentEdit'; tournamentId: string }
  | { to: 'tournamentBattles'; tournamentVideoId: string }
  | { to: 'tournamentRankings'; tournamentId: string }
  | { to: 'tournamentVideos'; tournamentId: string }
  | { to: 'tournamentVideosNew'; tournamentId: string }
  | { to: 'tournamentVideosEdit'; tournamentVideoId: string }
  | { to: 'tournamentEdit'; tournamentId: string }
  | { to: 'throwActionsNew'; moveId: string }
  | { to: 'throwActionEdit'; actionId: string };

export const dashboardPath = (options: Options): string => {
  switch (options.to) {
    case 'top':
      return '/dashboard';
    case 'actions':
      return `/dashboard/moves/${options.moveId}/actions`;
    case 'attackActionsNew':
      return `/dashboard/moves/${options.moveId}/attack_actions/new`;
    case 'attackActionEdit':
      return `/dashboard/attack_actions/${options.actionId}/edit`;
    case 'articles':
      return generatePath('/dashboard/articles', options.params);
    case 'articlesNew':
      return '/dashboard/articles/new';
    case 'articleEdit':
      `/dashboard/articles/${options.articleId}/edit`;
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
    case 'combos':
      return `/dashboard/combo_categories/${options.comboCategoryId}/combos`;
    case 'combosNew':
      return `/dashboard/combo_categories/${options.comboCategoryId}/combos/new`;
    case 'comboEdit':
      return `/dashboard/combos/${options.comboId}/edit`;
    case 'commands':
      return `/dashboard/moves/${options.moveId}/commands`;
    case 'commandsNew':
      return `/dashboard/moves/${options.moveId}/commands/new`;
    case 'commandEdit':
      return `/dashboard/commands/${options.commandId}/edit`;
    case 'moveCategories':
      return `/dashboard/characters/${options.characterSlug}/move_categories`;
    case 'moveCategoriesNew':
      return `/dashboard/characters/${options.characterSlug}/move_categories/new`;
    case 'moveCategoryEdit':
      return `/dashboard/move_categories/${options.moveCategoryId}/edit`;
    case 'moves':
      return `/dashboard/move_categories/${options.moveCategoryId}/moves`;
    case 'movesNew':
      return `/dashboard/move_categories/${options.moveCategoryId}/moves/new`;
    case 'moveEdit':
      return `/dashboard/moves/${options.moveId}/edit`;
    case 'players':
      return generatePath('/dashboard/players', options.params);
    case 'playersNew':
      return '/dashboard/players/new';
    case 'playerEdit':
      return `/dashboard/players/${options.playerSlug}/edit`;
    case 'profileEdit':
      return `/dashboard/profile/edit`;
    case 'tournaments':
      return generatePath('/dashboard/tournaments', options.params);
    case 'tournamentsNew':
      return '/dashboard/tournaments/new';
    case 'tournamentEdit':
      return `/dashboard/tournaments/${options.tournamentId}/edit`;
    case 'tournamentBattles':
      return `/dashboard/tournament_videos/${options.tournamentVideoId}/battles`;
    case 'tournamentRankings':
      return `/dashboard/tournaments/${options.tournamentId}/rankings`;
    case 'tournamentVideos':
      return `/dashboard/tournaments/${options.tournamentId}/videos`;
    case 'tournamentVideosNew':
      return `/dashboard/tournaments/${options.tournamentId}/videos/new`;
    case 'tournamentVideosEdit':
      return `/dashboard/tournament_videos/${options.tournamentVideoId}/edit`;
    case 'throwActionsNew':
      return `/dashboard/moves/${options.moveId}/throw_actions/new`;
    case 'throwActionEdit':
      return `/dashboard/throw_actions/${options.actionId}/edit`;
  }
};
