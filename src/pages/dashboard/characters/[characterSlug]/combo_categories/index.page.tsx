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
  DashboardComboCategoriesPageComboCategoryFragment,
  useDashboardComboCategoriesPageQuery,
  useDeleteComboCategoryMutation,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';
import { useRouteParams } from './hooks';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';
import { useRouter } from 'next/router';

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {comboCategories.map(comboCategory => (
              <ComboCategoryRow
                key={comboCategory.id}
                comboCategory={comboCategory}
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
    </DashboardContent>
  );
};

interface ComboCategoryRowProps {
  comboCategory: DashboardComboCategoriesPageComboCategoryFragment;
  onDelete: () => void;
}

const ComboCategoryRow = ({ comboCategory, onDelete }: ComboCategoryRowProps) => {
  return (
    <TableRow>
      <TableCell scope="row">
        <Typography>{comboCategory.name}</Typography>
        <Typography variant="caption">コンボ数 {comboCategory.combosCount}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button variant="outlined" href={dashboardPath({ to: 'comboCategoryEdit', comboCategoryId: comboCategory.id })}>
          編集
        </Button>
        <ComboCategoryMenu comboCategory={comboCategory} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

const ComboCategoryMenu = ({ comboCategory, onDelete }: ComboCategoryRowProps) => {
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
            router.push(dashboardPath({ to: 'combos', comboCategoryId: comboCategory.id }));
            handleClose();
          }}
        >
          コンボ登録
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
