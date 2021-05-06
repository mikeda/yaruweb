import React, { useState } from 'react';

import { StageFragment, useStagesQuery, useUpdateStagePositionMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { NotFound } from '@/components/NotFound';
import Link from 'next/link';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { loadingState } from 'states/loading';

const Page: React.FC = () => (
  <DashboardContent activeTab="stage">
    <Head title="ステージ" />

    <PageHeader title="ステージ" addPageUrl={Routes.dashboard.stage.new()} />

    <StageList />
  </DashboardContent>
);

function SortableItem({ stage }: { stage: StageFragment }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: stage.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td>{stage.name}</td>
      <td>
        <Link href={Routes.dashboard.stage.edit(stage.id)}>
          <a>編集</a>
        </Link>
      </td>
    </tr>
  );
}

const SortableList: React.FC<{ stages: StageFragment[] }> = props => {
  const [items, setItems] = useState(props.stages);
  const setLoading = useSetRecoilState(loadingState);
  const [updateStagePosition, { loading }] = useUpdateStagePositionMutation({
    onError: e => {
      toast.error(e.message);
    },
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  setLoading(loading);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={event => {
        const { active, over } = event;
        if (!over) return;
        if (active.id === over.id) return;

        const stage = items.find(s => s.id === active.id);
        if (!stage) return;

        const oldIndex = items.map(s => s.id).indexOf(active.id);
        const newIndex = items.map(s => s.id).indexOf(over.id);
        setItems(prev => arrayMove(prev, oldIndex, newIndex));
        updateStagePosition({ variables: { stageId: stage.id, newPosition: newIndex } });
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(stage => (
          <SortableItem key={stage.id} stage={stage} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

const StageList: React.FC = () => {
  const { data, loading } = useStagesQuery({ fetchPolicy: 'network-only' });

  if (loading) return <NotFound>読み込み中</NotFound>;
  if (!data) return <NotFound>読み込みに失敗しました</NotFound>;

  const stages = data.stages;

  return (
    <div className="bl_horizTable">
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <SortableList stages={stages} />
        </tbody>
      </table>
    </div>
  );
};

export default Page;
