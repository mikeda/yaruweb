import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Add as AddIcon, Delete, Edit, YouTube } from '@material-ui/icons';
import { toast } from 'react-toastify';

import {
  DashboardComboCategoriesPageComboFragment,
  useCreateComboVideoMutation,
  useDashboardComboCategoriesPageQuery,
  useDeleteComboCategoryMutation,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';
import { useRouteParams } from './hooks';
import { DashboardContent, DashboardBreadcrumbs, Command } from '@/components';
import { colors } from '@/colors';
import { VideoPlayer } from '@/components/MoveMedia/VideoPlayer';

const Page: React.FC = () => {
  const { characterSlug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, updateQuery } = useDashboardComboCategoriesPageQuery({
    variables: { characterSlug: characterSlug as string },
    skip: !characterSlug,
  });

  const [destroy, { loading: deleteLoading }] = useDeleteComboCategoryMutation({
    onCompleted: data => {
      const comboCategory = data.deleteComboCategory?.comboCategory;
      if (!comboCategory) return;

      updateQuery(prev => ({
        ...prev,
        comboCategories: prev.comboCategories.filter(t => t.id !== comboCategory.id),
      }));
      toast.success('カテゴリを削除しました。');
    },
  });

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const { character, comboCategories } = data;

  return (
    <DashboardContent
      title="コマンドリスト"
      breadcrumb={<DashboardBreadcrumbs to="comboCategories" character={character} />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={dashboardPath({ to: 'comboCategoriesNew', characterSlug: character.slug })}
        >
          作成する
        </Button>
      }
    >
      {comboCategories.map(comboCategory => (
        <Box key={comboCategory.id} mb={4}>
          <Typography variant="h3" gutterBottom>
            {comboCategory.name}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {comboCategory.combos.map(combo => (
                  <ComboRow
                    key={combo.id}
                    combo={combo}
                    onDelete={() => {
                      if (window.confirm('削除します。')) {
                        destroy({ variables: { comboCategoryId: comboCategory.id } });
                      }
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="outlined" href={dashboardPath({ to: 'combosNew', comboCategoryId: comboCategory.id })}>
              作成する
            </Button>
          </Box>
        </Box>
      ))}
    </DashboardContent>
  );
};

interface ComboRowProps {
  combo: DashboardComboCategoriesPageComboFragment;
  onDelete: () => void;
}

const ComboRow = ({ combo, onDelete }: ComboRowProps) => {
  return (
    <TableRow>
      <TableCell scope="row">
        <Typography>{combo.name}</Typography>

        <Command command={combo.command} />
      </TableCell>

      <TableCell align="right" scope="row">
        <VideoButton combo={combo} />

        <IconButton href={dashboardPath({ to: 'comboEdit', comboId: combo.id })}>
          <Edit />
        </IconButton>

        <IconButton edge="end" onClick={onDelete}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const VideoButton: React.FC<{ combo: DashboardComboCategoriesPageComboFragment }> = ({ combo }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const setLoading = useSetRecoilState(loadingState);

  const [ceateComboVideo, { loading }] = useCreateComboVideoMutation({
    variables: { comboId: combo.id },
    onCompleted: data => {
      if (!data.createComboVideo) return;
      if (!file) return;

      const fields = JSON.parse(data.createComboVideo.videoUpload.fields);

      const formData = new FormData();
      for (const key in fields) {
        formData.append(key, fields[key]);
      }
      formData.append('file', file);

      fetch(data.createComboVideo.videoUpload.url, {
        method: 'POST',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      })
        .then(() => {
          if (!data.createComboVideo) return;

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
        <YouTube style={combo.comboVideo ? { fill: colors.youtube } : {}} />
      </IconButton>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          {combo.comboVideo && (
            <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} autoPlay />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>

          <Button component="label" color="primary">
            アップロード
            <input
              type="file"
              id="video"
              accept="video/mp4"
              hidden
              onChange={event => {
                const target = event.target;
                if (!target.files) return;
                const file = target.files[0];
                if (!file) return;

                setFile(file);
                ceateComboVideo();
              }}
            />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page;
