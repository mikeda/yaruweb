import { useRecoilValue } from 'recoil';

import { viewerState } from '../states/viewerState';

export function useViewer() {
  const viewer = useRecoilValue(viewerState); // グローバルステートからviewerを取り出す
  const isAuthChecking = viewer === undefined; // ログイン情報を取得中かどうか

  return {
    viewer,
    isAuthChecking,
  };
}
