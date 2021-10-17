import React, { ReactNode, useState } from 'react';

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface SortableProps {
  ids: string[];
  items: ReactNode[];
  onMove: (id: string, newIndex: number) => void;
}

export const SortableCardList: React.FC<SortableProps> = ({ ids, items: initItems, onMove }) => {
  const [items, setItems] = useState(initItems);
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
        onMove(ids[oldIndex], newIndex);
        setItems(prev => arrayMove(prev, oldIndex, newIndex));
      }}
    >
      <SortableContext items={ids}>{items}</SortableContext>
    </DndContext>
  );
};
