import React from 'react';

import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { CreateButton } from './CreateButton';
import { MoveCategoryBox } from './MoveCategoryBox';

import {
  useMoveCategoryBoxesQuery,
  useDeleteMoveCategoryMutation,
  useCreateMoveCategoryMutation,
  useUpdateMoveCategoryMutation,
} from '@/generated/graphql';
import { loadingState } from '@/lib';

interface Props {
  characterSlug: string;
}

export const MoveCategoryBoxes: React.FC<Props> = ({ characterSlug }) => {
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading, updateQuery } = useMoveCategoryBoxesQuery({
    variables: { characterSlug },
    notifyOnNetworkStatusChange: true,
  });

  const [create, { loading: createLoading }] = useCreateMoveCategoryMutation({
    onCompleted: data => {
      const moveCategory = data.createMoveCategory?.moveCategory;
      if (!moveCategory) return;

      updateQuery(prev => ({
        ...prev,
        moveCategories: [...prev.moveCategories, moveCategory],
      }));
      toast.success('カテゴリを追加しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const [update, { loading: updateLoading }] = useUpdateMoveCategoryMutation({
    onCompleted: () => {
      toast.success('カテゴリを更新しました。');
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const [del, { loading: deleteLoading }] = useDeleteMoveCategoryMutation({
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

  setLoading(loading || createLoading || updateLoading || deleteLoading);

  if (!data) return null;
  const { moveCategories } = data;

  return (
    <>
      {moveCategories.map(moveCategory => (
        <MoveCategoryBox key={moveCategory.id} moveCategory={moveCategory} onClickDelete={() => {}} />
      ))}
      <CreateButton
        moveCategories={moveCategories}
        onSubmit={attributes => create({ variables: { characterSlug, attributes } })}
      />
    </>
  );
};
