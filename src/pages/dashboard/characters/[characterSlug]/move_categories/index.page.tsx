import React, { useState } from 'react';

import {
  MoveCategoryCardFragment,
  useBreadcrumbsCharacterQuery,
  useDeleteMoveCategoryMutation,
  useMoveCategoryCardsQuery,
  useUpdateMoveCategoryPositionMutation,
} from '@/lib/graphql/types';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { toast } from 'react-toastify';
import { dashboardPath } from '@/lib';
import { Button, Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useRouteParams } from './hooks';
import { SortableCardList } from '@/components/SortableCardList';
import { DashboardMoveCategoryCard } from '@/components/MoveCategoryCard';
import { DashboardBreadcrumbs } from '@/components';
import { arrayMove } from '@dnd-kit/sortable';

const Page: React.FC = () => {
  const { characterSlug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data: breadcrumbData } = useBreadcrumbsCharacterQuery({
    variables: { characterSlug: characterSlug as string },
    skip: !characterSlug,
  });

  const { data, loading } = useMoveCategoryCardsQuery({
    variables: { characterSlug: characterSlug as string },
    fetchPolicy: 'network-only',
    skip: !characterSlug,
  });

  setLoading(loading);
  if (!breadcrumbData) return null;
  const { character } = breadcrumbData;

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
      {data && <PageContent moveCategories={data.moveCategories} />}
    </DashboardContent>
  );
};

const PageContent: React.FC<{ moveCategories: MoveCategoryCardFragment[] }> = ({
  moveCategories: initMoveCategories,
}) => {
  const [moveCategories, setMoveCategories] = useState(initMoveCategories);
  const setLoading = useSetRecoilState(loadingState);
  const [updatePosition, { loading: updatePositionLoading }] = useUpdateMoveCategoryPositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });
  const [deleteMoveCategory, { loading: deleteLoading }] = useDeleteMoveCategoryMutation({
    onCompleted: data => {
      const moveCategory = data?.deleteMoveCategory?.moveCategory;
      if (!moveCategory) return;

      setMoveCategories(prev => prev.filter(c => c.id !== moveCategory.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(updatePositionLoading || deleteLoading);
  const onMove = (oldIndex: number, newIndex: number) => {
    const moveCategory = moveCategories[oldIndex];
    setMoveCategories(prev => arrayMove(prev, oldIndex, newIndex));
    updatePosition({ variables: { moveCategoryId: moveCategory.id, newPosition: newIndex } });
  };

  return (
    <Grid container spacing={2}>
      <SortableCardList ids={moveCategories.map(moveCategory => moveCategory.id)} onMove={onMove}>
        {moveCategories.map(moveCategory => (
          <Grid key={moveCategory.id} item xs={12} sm={6}>
            <DashboardMoveCategoryCard
              moveCategory={moveCategory}
              onDelete={() => {
                if (window.confirm('削除します。')) {
                  deleteMoveCategory({ variables: { moveCategoryId: moveCategory.id } });
                }
              }}
            />
          </Grid>
        ))}
      </SortableCardList>
    </Grid>
  );
};

export default Page;
