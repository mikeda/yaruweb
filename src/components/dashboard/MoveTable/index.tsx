import React from 'react';

import { useSetRecoilState } from 'recoil';

import { MoveTableRow } from './MoveTableRow';

import { DashboardTable } from '@/components';
import { useMoveTableRowsQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  moveCategoryId: string;
}

export const MoveTable: React.FC<Props> = ({ moveCategoryId }) => {
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, updateQuery } = useMoveTableRowsQuery({
    variables: { moveCategoryId },
    notifyOnNetworkStatusChange: true,
  });

  setLoading(loading);

  if (!data) return null;
  const { moves } = data;

  return (
    <DashboardTable>
      {moves.map(move => (
        <MoveTableRow
          key={move.id}
          move={move}
          afterDelete={deletedMoveId => {
            updateQuery(prev => ({
              ...prev,
              moves: prev.moves.filter(move => move.id !== deletedMoveId),
            }));
          }}
        />
      ))}
    </DashboardTable>
  );
};
