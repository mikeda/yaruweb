import { useRecoilValue } from 'recoil';
import { currentPlayerState } from 'states/currentPlayer';

export function useCurrentPlayer() {
  const currentPlayer = useRecoilValue(currentPlayerState); // グローバルステートからcurrentUserを取り出す
  const isAuthChecking = currentPlayer === undefined; // ログイン情報を取得中かどうか

  return {
    currentPlayer,
    isAuthChecking,
  };
}
