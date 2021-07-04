import React from 'react';

import { Combo, usePageDashboardCombosQuery, useUpdateComboPositionMutation } from '@/lib/graphql/types';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { DashboardContent, DashboardBreadcrumbs } from '@/components';
import { toast } from 'react-toastify';
import { SortableObjectCardList } from '@/components/ObjectCardList';
import { dashboardPath } from '@/lib';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const Page: React.FC = () => {
  const router = useRouter();
  const { comboCategoryId } = router.query;
  const setLoading = useSetRecoilState(loadingState);

  const { data, loading } = usePageDashboardCombosQuery({
    variables: { comboCategoryId: comboCategoryId as string },
    fetchPolicy: 'network-only',
    skip: !comboCategoryId,
  });

  setLoading(loading);
  if (!data) return null;

  const { comboCategory } = data;

  return (
    <DashboardContent
      title={comboCategory.name}
      breadcrumb={<DashboardBreadcrumbs to="combos" comboCategory={comboCategory} />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          href={dashboardPath({ to: 'combosNew', comboCategoryId: comboCategory.id })}
        >
          作成する
        </Button>
      }
    >
      <PageContent combos={data.comboCategory.combos} />
    </DashboardContent>
  );
};

type ComboFragment = Pick<Combo, 'id' | 'name'>;

const PageContent: React.FC<{ combos: ComboFragment[] }> = ({ combos }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [updateComboPosition, { loading }] = useUpdateComboPositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <SortableObjectCardList
      items={combos.map(combo => ({
        id: combo.id,
        title: combo.name,
        links: [{ text: '編集する', url: dashboardPath({ to: 'comboEdit', comboId: combo.id }) }],
      }))}
      onMove={(comboId, newPosition) => updateComboPosition({ variables: { comboId, newPosition } })}
    />
  );
};

export default Page;
