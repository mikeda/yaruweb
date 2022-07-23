import React, { useCallback } from 'react';

import { Box, Divider, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { CreateButton } from './CreateButton';
import { DashboardMoveCategory } from './DashboardMoveCategory';

import {
  useDashboardMoveCategoriesQuery,
  useDeleteMoveCategoryMutation,
  useCreateMoveCategoryMutation,
  useUpdateMoveCategoryMutation,
  MoveCategoryAttributes,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  characterSlug: string;
}

// 作成・更新したレコード以外のデータについても内部的にpositionが更新される。
// レスポンスとしては作成・更新したレコードのデータしか受け取っていないため、
// 並び順がおかしくなる場合があるので内部キャッシュ更新ではなく毎回全データをrefetchしている。
// 効率悪いのでやりかたを考える。
export const DashboardMoveCategories: React.FC<Props> = ({ characterSlug }) => {
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, refetch } = useDashboardMoveCategoriesQuery({
    variables: { characterSlug },
    notifyOnNetworkStatusChange: true,
  });

  const [create, { loading: createLoading }] = useCreateMoveCategoryMutation({
    onCompleted: () => {
      refetch();
      toast.success('カテゴリを作成しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const [update, { loading: updateLoading }] = useUpdateMoveCategoryMutation({
    onCompleted: () => {
      refetch();
      toast.success('カテゴリを更新しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const [del, { loading: deleteLoading }] = useDeleteMoveCategoryMutation({
    onCompleted: () => {
      refetch();
      toast.success('カテゴリを削除しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onClickCreate = useCallback((characterSlug: string, attributes: MoveCategoryAttributes) => {
    create({ variables: { characterSlug, attributes } });
  }, []);

  const onClickUpdate = useCallback((moveCategoryId: string, attributes: MoveCategoryAttributes) => {
    update({ variables: { moveCategoryId, attributes } });
  }, []);

  const onClickDelete = useCallback((moveCategoryId: string) => {
    del({ variables: { moveCategoryId } });
  }, []);

  setLoading(loading || createLoading || updateLoading || deleteLoading);

  if (!data) return null;
  const { moveCategories } = data;

  return (
    <>
      <Stack divider={<Divider />} spacing={2}>
        {moveCategories.map(moveCategory => (
          <DashboardMoveCategory
            key={moveCategory.id}
            moveCategory={moveCategory}
            moveCategories={moveCategories}
            onClickUpdate={onClickUpdate}
            onClickDelete={onClickDelete}
          />
        ))}
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box display="flex" justifyContent="center">
        <CreateButton characterSlug={characterSlug} moveCategories={moveCategories} onClickCreate={onClickCreate} />
      </Box>
    </>
  );
};
