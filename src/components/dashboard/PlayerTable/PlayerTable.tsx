import React, { useCallback } from 'react';

import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { PlayerTableRow } from './PlayerTableRow';

import { DashboardTable, DashboardTablePaging, DashboardTableSearch } from '@/components';
import { useDeletePlayerMutation, usePlayerTableRowsQuery } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const PlayerTable: React.FC = () => {
  const { data, loading, fetchMore, refetch, updateQuery } = usePlayerTableRowsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [destroy, { loading: deleteLoading }] = useDeletePlayerMutation({
    onCompleted: data => {
      const player = data.deletePlayer?.player;
      if (!player) return;

      updateQuery(prev => ({
        players: {
          ...prev.players,
          edges: prev.players.edges.filter(edge => edge.node.id !== player.id),
        },
      }));
      toast.success('プレイヤーを削除しました。');
    },
  });

  const setLoading = useSetRecoilState(loadingState);
  const onClickSearch = useCallback((keyword: string) => {
    refetch({ keyword });
  }, []);

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const players = data.players.edges.map(edge => edge.node);
  const pageInfo = data.players.pageInfo;

  const onClickMore = () => {
    fetchMore({ variables: { after: pageInfo.endCursor } });
  };

  return (
    <>
      <DashboardTableSearch onClickSearch={onClickSearch} />

      <DashboardTable>
        {players.map(player => (
          <PlayerTableRow
            key={player.id}
            player={player}
            onClickDelete={() => {
              if (window.confirm('削除します。')) {
                destroy({ variables: { playerSlug: player.slug } });
              }
            }}
          />
        ))}
      </DashboardTable>

      {pageInfo.hasNextPage && <DashboardTablePaging onClick={onClickMore} />}
    </>
  );
};
