import { ArticleCategory, Order } from './graphql/types';

const generatePath = (path: string, params?: { [key: string]: string | number | undefined }) => {
  if (!params) return path;

  const queries: string[] = [];
  Object.entries(params).filter(([k, v]) => {
    if (v) queries.push(`${k}=${v}`);
  });
  if (queries.length === 0) return path;

  return `${path}?${queries.join('&')}`;
};

export const Routes = {
  top: () => '/',
  article: {
    index: (params?: { page?: number; order?: Order; category?: ArticleCategory }) => generatePath('/articles', params),
    detail: (articleId: string) => `/articles/${articleId}`,
  },
  character: {
    index: () => '/characters',
    detail: (characterSlug: string) => `/${characterSlug}`,
  },
  comboCategory: {
    detail: (comboCategoryId: string) => `/combo_categories/${comboCategoryId}`,
  },
  tournament: {
    index: (params?: { page?: number }) => generatePath('/tournaments', params),
    detail: (tournamentId: string) => `/tournaments/${tournamentId}`,
  },
  moveCategory: {
    detail: (moveCategoryId: string) => `/move_categories/${moveCategoryId}`,
  },
  move: {
    detail: (moveId: string) => `/moves/${moveId}`,
  },
  session: {
    signup: () => '/signup',
    login: () => '/login',
    passwordReset: () => '/password/reset',
    passwordEdit: () => '/password/edit',
  },
  tournamentVideos: {
    detail: (tournamentVideoId: string) => `/tournament_videos/${tournamentVideoId}`,
  },
  dashboard: {
    top: () => '/',
    attack_action: {
      edit: (actionId: string) => `/dashboard/attack_actions/${actionId}/edit`,
    },
    article: {
      index: (page?: number) => generatePath('/dashboard/articles', { page }),
      new: () => '/dashboard/articles/new',
      edit: (articleId: string) => `/dashboard/articles/${articleId}/edit`,
    },
    character: {
      index: () => '/dashboard/characters',
      new: () => '/dashboard/characters/new',
      edit: (characterId: string) => `/dashboard/characters/${characterId}/edit`,
    },
    comboCategory: {
      index: (characterSlug: string) => `/dashboard/characters/${characterSlug}/combo_categories`,
      new: (characterSlug: string) => `/dashboard/characters/${characterSlug}/combo_categories/new`,
      edit: (comboCategoryId: string) => `/dashboard/combo_categories/${comboCategoryId}/edit`,
    },
    combo: {
      index: (comboCategoryId: string) => `/dashboard/combo_categories/${comboCategoryId}/combos`,
      new: (comboCategoryId: string) => `/dashboard/combo_categories/${comboCategoryId}/combos/new`,
      edit: (comboId: string) => `/dashboard/combos/${comboId}/edit`,
    },
    command: {
      edit: (commandId: string) => `/dashboard/commands/${commandId}/edit`,
    },
    tournament: {
      index: (page?: number) => `/dashboard/tournaments${page ? `?page=${page}` : ''}`,
      new: () => '/dashboard/tournaments/new',
      edit: (tournamentId: string) => `/dashboard/tournaments/${tournamentId}/edit`,
      video: {
        index: (tournamentId: string, page?: number) =>
          `/dashboard/tournaments/${tournamentId}/videos${page ? `?page=${page}` : ''}`,
      },
    },
    highlight: {
      edit: (highlightId: string) => `/dashboard/highlights/${highlightId}/edit`,
    },
    moveCategory: {
      index: (characterSlug: string) => `/dashboard/characters/${characterSlug}/move_categories`,
      new: (characterSlug: string) => `/dashboard/characters/${characterSlug}/move_categories/new`,
      edit: (moveCategoryId: string) => `/dashboard/move_categories/${moveCategoryId}/edit`,
    },
    move: {
      index: (moveCategoryId: string) => `/dashboard/move_categories/${moveCategoryId}/moves`,
      new: (moveCategoryId: string) => `/dashboard/move_categories/${moveCategoryId}/moves/new`,
      edit: (moveId: string) => `/dashboard/moves/${moveId}/edit`,
      actions: {
        index: (moveId: string) => `/dashboard/moves/${moveId}/actions`,
      },
      attack_actions: {
        new: (moveId: string) => `/dashboard/moves/${moveId}/attack_actions/new`,
      },
      throw_actions: {
        new: (moveId: string) => `/dashboard/moves/${moveId}/throw_actions/new`,
      },
      commands: {
        index: (moveId: string) => `/dashboard/moves/${moveId}/commands`,
        new: (moveId: string) => `/dashboard/moves/${moveId}/commands/new`,
      },
    },
    profile: {
      edit: () => `/dashboard/profile/edit`,
    },
    stage: {
      index: () => '/dashboard/stages',
      new: () => '/dashboard/stages/new',
      edit: (stageId: string) => `/dashboard/stages/${stageId}/edit`,
    },
    throw_action: {
      edit: (actionId: string) => `/dashboard/throw_actions/${actionId}/edit`,
    },
    tournamentVideo: {
      new: (tournamentId: string) => `/dashboard/tournaments/${tournamentId}/videos/new`,
      edit: (tournamentVideoId: string) => `/dashboard/tournament_videos/${tournamentVideoId}/edit`,
      highlight: {
        index: (tournamentVideoId: string) => `/dashboard/tournament_videos/${tournamentVideoId}/highlights`,
        new: (tournamentVideoId: string) => `/dashboard/tournament_videos/${tournamentVideoId}/highlights/new`,
      },
    },
  },
};
