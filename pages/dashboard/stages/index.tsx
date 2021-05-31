import React from 'react';

import { StageFragment, useStagesQuery, useUpdateStagePositionMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';

import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';
import { SortableCardList } from '@/components/SortableCardList';

const Page: React.FC = () => (
  <DashboardContent activeTab="stage">
    <Head title="ステージ" />

    <PageHeader title="ステージ" addPageUrl={Routes.dashboard.stage.new()} />

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
    <SortableCardList
      items={stages.map(s => ({ id: s.id, content: <StageContent stage={s} /> }))}
      onMove={(stageId, newPosition) => updateStagePosition({ variables: { stageId, newPosition } })}
    />
  );
};

const StageContent: React.FC<{ stage: StageFragment }> = ({ stage }) => {
  return (
    <div>
      <div>{stage.name}</div>
      <Link href={Routes.dashboard.stage.edit(stage.id)}>
        <a>編集する</a>
      </Link>
    </div>
  );
};

const PageContent: React.FC = () => {
  const { data, loading } = useStagesQuery({ fetchPolicy: 'network-only' });

  if (loading) return <NotFound>読み込み中</NotFound>;
  if (!data) return <NotFound>読み込みに失敗しました</NotFound>;

  return <SortableList stages={data.stages} />;
};

export default Page;
