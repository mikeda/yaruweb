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
  Typography,
} from '@material-ui/core';
import { Add, Add as AddIcon, Delete, DragHandle, Edit, YouTube } from '@material-ui/icons';
import { toast } from 'react-toastify';

import {
  DashboardMoveCategoriesPageMoveFragment,
  useCreateMoveVideoMutation,
  useDashboardMoveCategoriesPageQuery,
  useDeleteMoveCategoryMutation,
  useUpdateMovePositionMutation,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';
import { useRouteParams } from './hooks';
import { DashboardContent, DashboardBreadcrumbs, Command, SortableCardList } from '@/components';
import { VideoPlayer } from '@/components/MoveMedia/VideoPlayer';
import { colors } from '@/colors';
import { useRouter } from 'next/router';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

  const [updateMovePosition, { loading: updatePositionloading }] = useUpdateMovePositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading || deleteLoading || updatePositionloading);

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
          作成する
        </Button>
      }
    >
      {moveCategories.map(moveCategory => (
        <Box key={moveCategory.id} mb={4}>
          <Typography variant="h3" gutterBottom>
            {moveCategory.name}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <SortableCardList
                  ids={moveCategory.moves.map(m => m.id)}
                  items={moveCategory.moves.map(move => (
                    <MoveRow
                      key={move.id}
                      move={move}
                      onDelete={() => {
                        if (window.confirm('削除します。')) {
                          destroy({ variables: { moveCategoryId: moveCategory.id } });
                        }
                      }}
                    />
                  ))}
                  onMove={(moveId, newPosition) => updateMovePosition({ variables: { moveId, newPosition } })}
                />
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" mt={2}>
            <MovesNewButton moveCategoryId={moveCategory.id} />
          </Box>
        </Box>
      ))}
    </DashboardContent>
  );
};

interface MoveRowProps {
  move: DashboardMoveCategoriesPageMoveFragment;
  onDelete: () => void;
}

const MoveRow = ({ move, onDelete }: MoveRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: move.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <TableRow style={style}>
      <TableCell scope="row">
        <Typography>{move.name}</Typography>

        {move.commandList.map((command, i) => (
          <Command key={i} command={command} />
        ))}
      </TableCell>

      <TableCell align="right" scope="row">
        <VideoButton move={move} />

        <IconButton href={dashboardPath({ to: 'moveEdit', moveId: move.id })}>
          <Edit />
        </IconButton>

        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>

        <IconButton edge="end" ref={setNodeRef} {...attributes} {...listeners}>
          <DragHandle />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const VideoButton: React.FC<{ move: DashboardMoveCategoriesPageMoveFragment }> = ({ move }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const setLoading = useSetRecoilState(loadingState);

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
      <IconButton onClick={() => setDialogOpen(true)}>
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
              const file = target.files[0];
              if (!file) return;

              setFile(file);
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
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleClick}>
        作成する
      </Button>
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
