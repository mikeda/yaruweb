import React, { useCallback } from 'react';

import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { TournamentTableRow } from './TournamentTableRow';

import { DashboardTable, DashboardTablePaging, DashboardTableSearch } from '@/components';
import { useTournamentTableRowsQuery, useDeleteTournamentMutation } from '@/generated/graphql';
import { loadingState } from '@/lib';

export const TournamentTable: React.FC = () => {
  const { data, loading, fetchMore, refetch, updateQuery } = useTournamentTableRowsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [destroy, { loading: deleteLoading }] = useDeleteTournamentMutation({
    onCompleted: data => {
      const tournament = data.deleteTournament?.tournament;
      if (!tournament) return;

      updateQuery(prev => ({
        tournaments: {
          ...prev.tournaments,
          records: prev.tournaments.records.filter(t => t.id !== tournament.id),
        },
      }));
      toast.success('大会を削除しました。');
    },
  });

  const setLoading = useSetRecoilState(loadingState);

  const onClickSearch = useCallback((keyword: string) => {
    refetch({ page: 1, keyword });
  }, []);

  if (!data) return null;
  const { records: tournaments, paging } = data.tournaments;

  const onClickMore = () => {
    fetchMore({
      variables: { page: paging.currentPage + 1 },
      updateQuery: (prev, { fetchMoreResult: data }) => {
        if (!data) return prev;

        return {
          tournaments: {
            ...data.tournaments,
            records: [...prev.tournaments.records, ...data.tournaments.records],
          },
        };
      },
    });
  };

  setLoading(loading || deleteLoading);
  return (
    <>
      <DashboardTableSearch onClickSearch={onClickSearch} />

      <DashboardTable>
        {tournaments.map(tournament => (
          <TournamentTableRow
            key={tournament.id}
            tournament={tournament}
            onClickDelete={() => {
              if (window.confirm('削除します。')) {
                destroy({ variables: { tournamentId: tournament.id } });
              }
            }}
          />
        ))}
      </DashboardTable>

      {paging?.hasNext && <DashboardTablePaging onClick={onClickMore} />}
    </>
  );
};
