import React from 'react';

import { Combo, usePageDashboardCombosQuery, useUpdateComboPositionMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Routes } from '@/lib/Routes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { Breadcrumbs } from '@/components/layouts/Breadcrumbs';
import { toast } from 'react-toastify';
import { SortableCardList } from '@/components/SortableCardList';
import { SortableCardContent } from '@/components/SortableCardContent';

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
  const title = comboCategory.name;

  return (
    <DashboardContent activeTab="character">
      <Head title={title} />
      <Breadcrumbs
        parents={[
          { name: 'キャラクター', url: Routes.dashboard.character.index() },
          {
            name: `コンボ(${comboCategory.character.name})`,
            url: Routes.dashboard.comboCategory.index(comboCategory.character.slug),
          },
        ]}
        current={title}
      />
      <PageHeader title={title} addPageUrl={Routes.dashboard.combo.new(comboCategory.id)} />

      <PageContent combos={data.comboCategory.combos} />
    </DashboardContent>
  );
};

type ComboFragment = Pick<Combo, 'id' | 'name'>;

const PageContent: React.FC<{ combos: ComboFragment[] }> = ({ combos }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [updateStagePosition, { loading }] = useUpdateComboPositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <SortableCardList
      items={combos.map(c => ({ id: c.id, content: <ComboContent combo={c} /> }))}
      onMove={(comboId, newPosition) => updateStagePosition({ variables: { comboId, newPosition } })}
    />
  );
};

const ComboContent: React.FC<{ combo: ComboFragment }> = ({ combo }) => {
  return (
    <SortableCardContent
      title={combo.name}
      links={[{ text: '編集する', url: Routes.dashboard.combo.edit(combo.id) }]}
    />
  );
};

export default Page;
