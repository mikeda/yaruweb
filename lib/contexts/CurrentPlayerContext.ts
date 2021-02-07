import { createContext } from 'react';
import { CurrentPlayerFragment } from '@/lib/graphql/types';

function createInitialState(): CurrentPlayerFragment | undefined {
  return undefined;
}

export const CurrentPlayerContext = createContext({
  currentPlayer: createInitialState(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentPlayer: (_: CurrentPlayerFragment | undefined) => {},
});
