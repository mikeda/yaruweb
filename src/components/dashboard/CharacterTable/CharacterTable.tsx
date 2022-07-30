import React, { useCallback } from 'react';

import { useSetRecoilState } from 'recoil';

import { CharacterTableRow } from './CharacterTableRow';

import { DashboardTable, DashboardTableSearch } from '@/components';
import { useCharacterTableRowsQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const CharacterTable: React.FC = () => {
  const { data, loading, refetch } = useCharacterTableRowsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const setLoading = useSetRecoilState(loadingState);

  const onClickSearch = useCallback((keyword: string) => {
    refetch({ keyword });
  }, []);

  setLoading(loading);

  if (!data) return null;
  const characters = data.characters.nodes;

  return (
    <>
      <DashboardTableSearch onClickSearch={onClickSearch} />

      <DashboardTable>
        {characters.map(character => (
          <CharacterTableRow key={character.id} character={character} />
        ))}
      </DashboardTable>
    </>
  );
};
