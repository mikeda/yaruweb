import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { arrayMove } from '@dnd-kit/sortable';
import { Button, Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { toast } from 'react-toastify';

import {
  ComboCategoryCardFragment,
  useDeleteComboCategoryMutation,
  useUpdateComboCategoryPositionMutation,
  useDashboardComboCategoriesPageQuery,
} from '@/lib/graphql/types';
import { loadingState } from '@/states/loading';
import { dashboardPath } from '@/lib';
import { useRouteParams } from './hooks';
import { DashboardContent, DashboardBreadcrumbs, DashboardComboCategoryCard, SortableCardList } from '@/components';

const Page: React.FC = () => {
  const { characterSlug } = useRouteParams();
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = useDashboardComboCategoriesPageQuery({
    variables: { characterSlug: characterSlug as string },
    skip: !characterSlug,
  });

  setLoading(loading);

  if (!data) return null;
  const { character, comboCategories } = data;

  return (
    <DashboardContent
      title="コンボ"
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
      <PageContent comboCategories={comboCategories} />
    </DashboardContent>
  );
};

const PageContent: React.FC<{ comboCategories: ComboCategoryCardFragment[] }> = ({
  comboCategories: initComboCategories,
}) => {
  const [comboCategories, setComboCategories] = useState(initComboCategories);
  const setLoading = useSetRecoilState(loadingState);
  const [updatePosition, { loading: updatePositionLoading }] = useUpdateComboCategoryPositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });
  const [deleteComboCategory, { loading: deleteLoading }] = useDeleteComboCategoryMutation({
    onCompleted: data => {
      const comboCategory = data?.deleteComboCategory?.comboCategory;
      if (!comboCategory) return;

      setComboCategories(prev => prev.filter(c => c.id !== comboCategory.id));
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(updatePositionLoading || deleteLoading);
  const onMove = (oldIndex: number, newIndex: number) => {
    const comboCategory = comboCategories[oldIndex];
    setComboCategories(prev => arrayMove(prev, oldIndex, newIndex));
    updatePosition({ variables: { comboCategoryId: comboCategory.id, newPosition: newIndex } });
  };

  return (
    <Grid container spacing={2}>
      <SortableCardList ids={comboCategories.map(comboCategory => comboCategory.id)} onMove={onMove}>
        {comboCategories.map(comboCategory => (
          <Grid key={comboCategory.id} item xs={12} sm={6}>
            <DashboardComboCategoryCard
              comboCategory={comboCategory}
              onDelete={() => {
                if (window.confirm('削除します。')) {
                  deleteComboCategory({ variables: { comboCategoryId: comboCategory.id } });
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
