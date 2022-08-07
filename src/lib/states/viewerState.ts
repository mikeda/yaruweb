import { atom } from 'recoil';

import { ViewerFragment } from '@/generated/graphql';

// undefined : まだログイン確認が完了していない状態とする
// null      : ログイン確認をした結果、ログインしていなかった状態とする
export const viewerState = atom<undefined | null | ViewerFragment>({
  key: 'CurrentUser',
  default: undefined,
});
