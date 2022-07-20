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
          records: prev.players.records.filter(t => t.id !== player.id),
        },
      }));
      toast.success('プレイヤーを削除しました。');
    },
  });

  const setLoading = useSetRecoilState(loadingState);
  const onClickSearch = useCallback((keyword: string) => {
    refetch({ page: 1, keyword });
  }, []);

  const onClickMore = useCallback(() => {
    fetchMore({
      variables: { page: paging.currentPage + 1 },
      updateQuery: (prev, { fetchMoreResult: data }) => {
        if (!data) return prev;

        return {
          players: {
            ...data.players,
            records: [...prev.players.records, ...data.players.records],
          },
        };
      },
    });
  }, []);

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const { records: players, paging } = data.players;

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

      {paging?.hasNext && <DashboardTablePaging onClick={onClickMore} />}
    </>
  );
};
