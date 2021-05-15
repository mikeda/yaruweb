import { ArticleCategory, Order } from './graphql/types';

const generatePath = (path: string, params?: { [key: string]: string | undefined }) => {
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
    index: (params?: { order?: Order; category?: ArticleCategory }) => generatePath('/articles', params),
    detail: (articleId: string) => `/articles/${articleId}`,
  },
  character: {
    index: () => '/characters',
    detail: (characterSlug: string) => `/${characterSlug}`,
  },
  comboCategory: {
    detail: (comboCategoryId: string) => `/combo_categories/${comboCategoryId}`,
  },
  event: {
    index: () => '/events',
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
  video: {
    index: (order?: Order) => (order === Order.Popular ? '/videos?order=popular' : '/videos'),
    detail: (id: string) => `/videos/${id}`,
  },
  dashboard: {
    top: () => '/',
    action: {
      edit: (actionId: string) => `/dashboard/actions/${actionId}/edit`,
    },
    article: {
      index: () => '/dashboard/articles',
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
    event: {
      index: () => '/dashboard/events',
      new: () => '/dashboard/events/new',
      edit: (eventId: string) => `/dashboard/events/${eventId}/edit`,
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
    },
    profile: {
      edit: () => `/dashboard/profile/edit`,
    },
    stage: {
      index: () => '/dashboard/stages',
      new: () => '/dashboard/stages/new',
      edit: (stageId: string) => `/dashboard/stages/${stageId}/edit`,
    },
    video: {
      index: () => '/dashboard/videos',
      new: () => '/dashboard/videos/new',
      edit: (videoId: string) => `/dashboard/videos/${videoId}/edit`,
    },
  },
};
