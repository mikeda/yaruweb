import { CurrentUserFragment } from '@/lib/$types';
import { atom } from 'recoil';

// undefined : まだログイン確認が完了していない状態とする
// null      : ログイン確認をした結果、ログインしていなかった状態とする
export const currentUserState = atom<undefined | null | CurrentUserFragment>({
  key: 'CurrentUser',
  default: undefined,
});
