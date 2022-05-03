import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Add as AddIcon, MoreVert } from '@mui/icons-material';

import { loadingState } from '@/states/loading';
import {
  DashboardTournamentsPageTournamentFragment,
  useDashboardTournamentsPageTournamentsQuery,
  useDeleteTournamentMutation,
} from '@/lib/graphql/types';
import { NO_IMAGE_URL } from '@/lib/Assets';
import dayjs from '@/lib/dayjs';
import { pagesPath } from '@/lib/$path';
import { resolveUrlObject } from '@/lib';

import { DashboardContent, DashboardBreadcrumbs } from '@/components';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, fetchMore, updateQuery } = useDashboardTournamentsPageTournamentsQuery();
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

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const { records: tournaments, paging } = data.tournaments;

  return (
    <DashboardContent
      title="大会"
      breadcrumb={<DashboardBreadcrumbs to="tournaments" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.dashboard.tournaments.new.$url())}
        >
          登録する
        </Button>
      }
    >
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {tournaments.map(tournament => (
              <TournamentRow
                key={tournament.id}
                tournament={tournament}
                onDelete={() => {
                  if (window.confirm('削除します。')) {
                    destroy({ variables: { tournamentId: tournament.id } });
                  }
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {paging?.hasNext && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => {
              fetchMore({
                variables: { page: paging.currentPage + 1 },
                updateQuery: (prev, { fetchMoreResult: data }) => {
                  if (!data) return prev;

                  return {
                    tournaments: {
                      records: [...prev.tournaments.records, ...data.tournaments.records],
                      paging: data.tournaments.paging,
                    },
                  };
                },
              });
            }}
          >
            もっとみる
          </Button>
        </Box>
      )}
    </DashboardContent>
  );
};

interface TournamentRowProps {
  tournament: DashboardTournamentsPageTournamentFragment;
  onDelete: () => void;
}

const TournamentRow = ({ tournament, onDelete }: TournamentRowProps) => {
  const router = useRouter();
  return (
    <TableRow>
      <TableCell scope="row" width={80}>
        <img src={tournament.mainImageUrl || NO_IMAGE_URL} width={80} />
      </TableCell>
      <TableCell scope="row">
        <Typography>{tournament.name}</Typography>
        <Typography variant={'caption'}>{`結果${tournament.standingsCount} 動画${tournament.videosCount}`}</Typography>
      </TableCell>
      <TableCell scope="row">
        <Typography variant="body2">{dayjs(tournament.startsAt).format('YYYY/M/D H:mm')}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button
          variant="outlined"
          href={resolveUrlObject(router, pagesPath.dashboard.tournaments._id(tournament.id).edit.$url())}
        >
          編集
        </Button>
        <TournamentMenu tournament={tournament} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

const TournamentMenu = ({ tournament, onDelete }: TournamentRowProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton edge="end" onClick={handleClick} size="large">
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            router.push(pagesPath.dashboard.tournaments._id(tournament.id).$url());
            handleClose();
          }}
        >
          結果・動画を登録
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            handleClose();
          }}
        >
          削除する
        </MenuItem>
      </Menu>
    </>
  );
};

export default Page;
