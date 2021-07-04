import React from 'react';

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface SortableProps {
  ids: string[];
  onMove: (oldIndex: number, newIndex: number) => void;
}

export const SortableCardList: React.FC<SortableProps> = ({ ids, onMove, children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={event => {
        const { active, over } = event;
        if (!over) return;
        if (active.id === over.id) return;

        const item = ids.find(id => id === active.id);
        if (!item) return;

        const oldIndex = ids.map(id => id).indexOf(active.id);
        const newIndex = ids.map(id => id).indexOf(over.id);
        onMove(oldIndex, newIndex);
      }}
    >
      <SortableContext items={ids}>{children}</SortableContext>
    </DndContext>
  );
};
