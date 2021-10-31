import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { DashboardContent, DashboardBreadcrumbs, SearchWord } from '@/components';
import { dashboardPath } from '@/lib';
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
import { PlayerFormSmashgg } from './components/PlayerFormSmashgg';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import {
  DashboardPlayersPagePlayerFragment,
  useDashboardPlayersPageDeleteMutation,
  useDashboardPlayersPagePlayersQuery,
} from '@/lib/graphql/types';
import { toast } from 'react-toastify';
import { DEFAULT_AVATAR_URL } from '@/lib/Assets';

const Page: React.FC = () => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, fetchMore, updateQuery, refetch } = useDashboardPlayersPagePlayersQuery();
  const [destroy, { loading: deleteLoading }] = useDashboardPlayersPageDeleteMutation({
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
  const keywordRef = useRef<string>();

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const { records: players, paging } = data.players;

  return (
    <DashboardContent title="プレイヤー" breadcrumb={<DashboardBreadcrumbs to="players" />} actions={<CreateButton />}>
      <Box mb={2}>
        <SearchWord
          onSearch={word => {
            if (keywordRef.current === word) return;

            keywordRef.current = word;
            setLoading(true);
            refetch({ page: 1, keyword: keywordRef.current });
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {players.map(player => (
              <PlayerRow
                key={player.id}
                player={player}
                onDelete={() => {
                  if (window.confirm('削除します。')) {
                    destroy({ variables: { playerSlug: player.slug } });
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
                    players: {
                      records: [...prev.players.records, ...data.players.records],
                      paging: data.players.paging,
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

interface PlayerRowProps {
  player: DashboardPlayersPagePlayerFragment;
  onDelete: () => void;
}

const PlayerRow = ({ player, onDelete }: PlayerRowProps) => {
  return (
    <TableRow>
      <TableCell scope="row" width={64}>
        <img src={player.avatarUrl || DEFAULT_AVATAR_URL} width={64} />
      </TableCell>
      <TableCell scope="row">
        <Typography>{player.name}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button variant="outlined" href={dashboardPath({ to: 'playerEdit', playerSlug: player.slug })}>
          編集
        </Button>
        <PlayerMenu player={player} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

const PlayerMenu = ({ onDelete }: PlayerRowProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <IconButton edge="end" onClick={handleClick} size="large">
      <MoreVert />
    </IconButton>

    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem
        onClick={() => {
          onDelete();
          handleClose();
        }}
      >
        削除する
      </MenuItem>
    </Menu>
  </>;
};

const CreateButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        作成する
      </Button>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            router.push(dashboardPath({ to: 'playersNew' }));
          }}
        >
          フォームで登録
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          SmashGG IDで登録
        </MenuItem>
      </Menu>

      <PlayerFormSmashgg open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default Page;
