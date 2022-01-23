import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add, Add as AddIcon, Delete, Edit, YouTube } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

import {
  DashboardMoveCategoriesPageMoveFragment,
  useCreateMoveVideoMutation,
  useDashboardMoveCategoriesPageQuery,
  useDeleteMoveCategoryMutation,
  useDeleteMoveMutation,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';
import { useRouteParams } from './hooks';
import { DashboardContent, DashboardBreadcrumbs, Command } from '@/components';
import { VideoPlayer } from '@/components/MoveMedia/VideoPlayer';
import { colors } from '@/colors';
import { useRouter } from 'next/router';

const Page: React.FC = () => {
  const { characterSlug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, updateQuery } = useDashboardMoveCategoriesPageQuery({
    variables: { characterSlug: characterSlug as string },
    skip: !characterSlug,
  });

  const [destroy, { loading: deleteLoading }] = useDeleteMoveCategoryMutation({
    onCompleted: data => {
      const moveCategory = data.deleteMoveCategory?.moveCategory;
      if (!moveCategory) return;

      updateQuery(prev => ({
        ...prev,
        moveCategories: prev.moveCategories.filter(t => t.id !== moveCategory.id),
      }));
      toast.success('カテゴリを削除しました。');
    },
  });

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const { character, moveCategories } = data;

  return (
    <DashboardContent
      title="コマンドリスト"
      breadcrumb={<DashboardBreadcrumbs to="moveCategories" character={character} />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={dashboardPath({ to: 'moveCategoriesNew', characterSlug: character.slug })}
        >
          カテゴリ追加
        </Button>
      }
    >
      {moveCategories.map(moveCategory => (
        <Box key={moveCategory.id} mb={8}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h3" gutterBottom>
              {moveCategory.name}
            </Typography>

            <div>
              <MovesNewButton moveCategoryId={moveCategory.id} />
              <IconButton
                href={dashboardPath({ to: 'moveCategoryEdit', moveCategoryId: moveCategory.id })}
                size="large"
              >
                <Edit />
              </IconButton>

              {moveCategory.moves.length == 0 && (
                <IconButton
                  onClick={() => {
                    if (window.confirm('削除します。')) {
                      destroy({ variables: { moveCategoryId: moveCategory.id } });
                    }
                  }}
                  size="large"
                >
                  <Delete />
                </IconButton>
              )}
            </div>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {moveCategory.moves.map(move => (
                  <MoveRow
                    key={move.id}
                    move={move}
                    afterDelete={deletedMoveId => {
                      updateQuery(prev => ({
                        ...prev,
                        moveCategories: prev.moveCategories.map(moveCategory => ({
                          ...moveCategory,
                          moves: moveCategory.moves.filter(move => move.id !== deletedMoveId),
                        })),
                      }));
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </DashboardContent>
  );
};

interface MoveRowProps {
  move: DashboardMoveCategoriesPageMoveFragment;
  afterDelete: (moveId: string) => void;
}

const MoveRow = ({ move, afterDelete }: MoveRowProps) => {
  const [destroy, { loading }] = useDeleteMoveMutation({
    variables: { moveId: move.id },
    onCompleted: data => {
      const move = data.deleteMove?.move;
      if (!move) return;

      afterDelete(move.id);
      toast.success('カテゴリを削除しました。');
    },
  });
  const setLoading = useSetRecoilState(loadingState);

  setLoading(loading);

  return (
    <TableRow>
      <TableCell scope="row">
        <Typography>{move.name}</Typography>

        <Command command={move.command} />
      </TableCell>

      <TableCell align="right" scope="row">
        <VideoButton move={move} />

        <IconButton href={dashboardPath({ to: 'moveEdit', moveId: move.id })} size="large">
          <Edit />
        </IconButton>

        <IconButton href={dashboardPath({ to: 'moveCopy', moveId: move.id })} size="large">
          <ContentCopyIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            if (window.confirm('削除します。')) {
              destroy();
            }
          }}
          size="large"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const VideoButton: React.FC<{ move: DashboardMoveCategoriesPageMoveFragment }> = ({ move }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  let file: File | undefined;

  const [ceateMoveVideo, { loading }] = useCreateMoveVideoMutation({
    variables: { moveId: move.id },
    onCompleted: data => {
      if (!data.createMoveVideo) return;
      if (!file) return;

      const fields = JSON.parse(data.createMoveVideo.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(data.createMoveVideo.videoUpload.url, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          if (!data.createMoveVideo) return;

          toast.success('動画をアップロードしました。');
          setDialogOpen(false);
        })
        .catch(() => {
          toast.error('アップロードに失敗しました。');
        });
    },
    onError: () => {
      toast.error('アップロードに失敗しました。');
    },
  });

  setLoading(loading);

  return (
    <>
      <IconButton onClick={() => setDialogOpen(true)} size="large">
        <YouTube style={move.moveVideo ? { fill: colors.youtube } : {}} />
      </IconButton>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          {move.moveVideo && (
            <VideoPlayer src={move.moveVideo.m3u8Url} thumnailUrl={move.moveVideo.thumbnailUrl} autoPlay />
          )}
        </DialogContent>

        <DialogActions>
          <input
            type="file"
            id="video"
            accept="video/mp4"
            onChange={event => {
              const target = event.target;
              if (!target.files) return;

              file = target.files[0];
              if (!file) return;

              ceateMoveVideo();
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const MovesNewButton = ({ moveCategoryId }: { moveCategoryId: string }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="コマンドを作成">
        <IconButton onClick={handleClick} size="large">
          <Add />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push(dashboardPath({ to: 'movesNew', moveCategoryId, moveType: 'attack' }));
          }}
        >
          打撃
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push(dashboardPath({ to: 'movesNew', moveCategoryId, moveType: 'throw' }));
          }}
        >
          投げ
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push(dashboardPath({ to: 'movesNew', moveCategoryId, moveType: 'reversal' }));
          }}
        >
          返し技
        </MenuItem>
      </Menu>
    </>
  );
};

export default Page;
