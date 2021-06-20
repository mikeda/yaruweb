import React from 'react';

import { StageFragment, useStagesQuery, useUpdateStagePositionMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import { PageHeader } from '@/components/layouts/PageHeader';

import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import { SortableObjectCardList } from '@/components/ObjectCardList';
import { dashboardPath } from '@/lib';

const Page: React.FC = () => (
  <DashboardContent activeTab="stage">
    <Head title="ステージ" />

    <PageHeader title="ステージ" addPageUrl={dashboardPath({ to: 'stagesNew' })} />

    <PageContent />
  </DashboardContent>
);

const SortableList: React.FC<{ stages: StageFragment[] }> = ({ stages }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [updateStagePosition, { loading }] = useUpdateStagePositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });

  setLoading(loading);

  return (
    <SortableObjectCardList
      items={stages.map(stage => ({
        id: stage.id,
        title: stage.name,
        links: [{ text: '編集する', url: dashboardPath({ to: 'stageEdit', stageId: stage.id }) }],
      }))}
      onMove={(stageId, newPosition) => updateStagePosition({ variables: { stageId, newPosition } })}
    />
  );
};

const PageContent: React.FC = () => {
  const { data, loading } = useStagesQuery({ fetchPolicy: 'network-only' });

  if (loading) return <NotFound>読み込み中</NotFound>;
  if (!data) return <NotFound>読み込みに失敗しました</NotFound>;

  return <SortableList stages={data.stages} />;
};

export default Page;
