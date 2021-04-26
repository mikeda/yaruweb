import { Order } from './graphql/types';

export const Routes = {
  top: () => '/',
  article: {
    index: (order?: Order) => (order === Order.Popular ? '/articles?order=popular' : '/articles'),
    detail: (articleId: string) => `/articles/${articleId}`,
  },
  character: {
    index: () => '/characters',
    detail: (characterSlug: string) => `/${characterSlug}`,
  },
  combo: {
    index: (characterSlug: string) => `/${characterSlug}/combos`,
  },
  comboCategory: {
    detail: (comboCategoryId: string) => `/combo_categories/${comboCategoryId}`,
  },
  event: {
    index: () => '/events',
  },
  move: {
    index: (characterSlug: string) => `/${characterSlug}/moves`,
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
    article: {
      index: () => '/dashboard/articles',
      new: () => '/dashboard/articles/new',
      edit: (articleId: string) => `/dashboard/articles/${articleId}/edit`,
    },
    character: {
      index: () => '/dashboard/characters',
    },
    comboCategory: {
      index: (characterSlug: string) => `/dashboard/characters/${characterSlug}/combo_categories`,
    },
    combo: {
      index: (comboCategoryId: string) => `/dashboard/combo_categories/${comboCategoryId}/combos`,
    },
    event: {
      index: () => '/dashboard/events',
    },
    moveCategory: {
      index: (characterSlug: string) => `/dashboard/characters/${characterSlug}/move_categories`,
    },
    move: {
      index: (moveCategoryId: string) => `/dashboard/move_categories/${moveCategoryId}/moves`,
    },
    video: {
      index: () => '/dashboard/videos',
    },
  },
};
