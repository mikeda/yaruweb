import React, { useState } from 'react';
import { CurrentPlayerContext } from '@/lib/contexts/CurrentPlayerContext';
import { CurrentPlayerFragment, useCurrentPlayerQuery } from '@/lib/graphql/types';

export const WithCurrentPlayer: React.FC = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayerFragment>();

  useCurrentPlayerQuery({
    onCompleted: res => {
      setCurrentPlayer(res.currentPlayer);
    },
  });

  return (
    <CurrentPlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </CurrentPlayerContext.Provider>
  );
};
