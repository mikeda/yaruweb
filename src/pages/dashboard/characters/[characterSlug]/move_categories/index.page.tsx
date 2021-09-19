import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
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
} from '@material-ui/core';
import { Add as AddIcon, MoreVert } from '@material-ui/icons';
import { toast } from 'react-toastify';

import {
  DashboardMoveCategoriesPageMoveCategoryFragment,
  useDashboardMoveCategoriesPageQuery,
  useDeleteMoveCategoryMutation,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';
import { useRouteParams } from './hooks';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';
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
          作成する
        </Button>
      }
    >
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {moveCategories.map(moveCategory => (
              <MoveCategoryRow
                key={moveCategory.id}
                moveCategory={moveCategory}
                onDelete={() => {
                  if (window.confirm('削除します。')) {
                    destroy({ variables: { moveCategoryId: moveCategory.id } });
                  }
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContent>
  );
};

interface MoveCategoryRowProps {
  moveCategory: DashboardMoveCategoriesPageMoveCategoryFragment;
  onDelete: () => void;
}

const MoveCategoryRow = ({ moveCategory, onDelete }: MoveCategoryRowProps) => {
  return (
    <TableRow>
      <TableCell scope="row">
        <Typography>{moveCategory.name}</Typography>
        <Typography variant="caption">技数 {moveCategory.movesCount}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button variant="outlined" href={dashboardPath({ to: 'moveCategoryEdit', moveCategoryId: moveCategory.id })}>
          編集
        </Button>
        <MoveCategoryMenu moveCategory={moveCategory} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

const MoveCategoryMenu = ({ moveCategory, onDelete }: MoveCategoryRowProps) => {
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
      <IconButton edge="end" onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            router.push(dashboardPath({ to: 'moves', moveCategoryId: moveCategory.id }));
            handleClose();
          }}
        >
          技登録
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
