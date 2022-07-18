import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
} from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { useRouteParams } from './hooks';

import { AdminContent, AdminBreadcrumbs, Command, VideoPlayer } from '@/components';
import { pagesPath } from '@/generated/$path';
import {
  AdminComboCategoriesPageComboFragment,
  useCreateComboVideoMutation,
  useAdminComboCategoriesPageQuery,
  useDeleteComboCategoryMutation,
  useDeleteComboMutation,
} from '@/generated/graphql';
import { colors, loadingState, resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const { slug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, updateQuery } = useAdminComboCategoriesPageQuery({
    variables: { characterSlug: slug as string },
    skip: !slug,
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
    <AdminContent
      title="コンボ"
      breadcrumb={<AdminBreadcrumbs to="comboCategories" character={character} />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.admin.characters._slug(character.slug).combo_categories.new.$url())}
        >
          カテゴリ追加
        </Button>
      }
    >
      {comboCategories.map(comboCategory => (
        <Box key={comboCategory.id} mb={8}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h3" gutterBottom>
              {comboCategory.name}
            </Typography>

            <div>
              <IconButton
                href={resolveUrlObject(
                  router,
                  pagesPath.admin.combo_categories._id(comboCategory.id).combos.new.$url(),
                )}
                size="large"
              >
                <AddIcon />
              </IconButton>

              <IconButton
                href={resolveUrlObject(router, pagesPath.admin.combo_categories._id(comboCategory.id).edit.$url())}
                size="large"
              >
                <EditIcon />
              </IconButton>

              {comboCategory.combos.length == 0 && (
                <IconButton
                  onClick={() => {
                    if (window.confirm('削除します。')) {
                      destroy({ variables: { comboCategoryId: comboCategory.id } });
                    }
                  }}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {comboCategory.combos.map(combo => (
                  <ComboRow
                    key={combo.id}
                    combo={combo}
                    afterDelete={deletedComboId => {
                      updateQuery(prev => ({
                        ...prev,
                        comboCategories: prev.comboCategories.map(comboCategory => ({
                          ...comboCategory,
                          combos: comboCategory.combos.filter(combo => combo.id !== deletedComboId),
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
    </AdminContent>
  );
};

interface ComboRowProps {
  combo: AdminComboCategoriesPageComboFragment;
  afterDelete: (comboId: string) => void;
}

const ComboRow = ({ combo, afterDelete }: ComboRowProps) => {
  const router = useRouter();
  const [destroy, { loading }] = useDeleteComboMutation({
    variables: { comboId: combo.id },
    onCompleted: data => {
      const combo = data.deleteCombo?.combo;
      if (!combo) return;

      afterDelete(combo.id);
      toast.success('カテゴリを削除しました。');
    },
  });
  const setLoading = useSetRecoilState(loadingState);

  setLoading(loading);

  return (
    <TableRow>
      <TableCell scope="row">
        <Command command={combo.command} />
      </TableCell>

      <TableCell align="right" scope="row">
        <VideoButton combo={combo} />

        <IconButton href={resolveUrlObject(router, pagesPath.admin.combos._id(combo.id).edit.$url())} size="large">
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            if (window.confirm('削除します。')) {
              destroy();
            }
          }}
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const VideoButton: React.FC<{ combo: AdminComboCategoriesPageComboFragment }> = ({ combo }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  let file: File | undefined;

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
      <IconButton onClick={() => setDialogOpen(true)} size="large">
        <YouTubeIcon style={combo.comboVideo ? { fill: colors.youtube } : {}} />
      </IconButton>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          {combo.comboVideo && (
            <VideoPlayer src={combo.comboVideo.m3u8Url} thumnailUrl={combo.comboVideo.thumbnailUrl} autoPlay />
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

              ceateComboVideo();
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page;
