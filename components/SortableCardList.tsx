import React, { useState } from 'react';

import { SortableCard } from './SortableCard';

import styles from './SortableCardList.module.scss';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface ItemProps {
  id: string;
  content: React.ReactNode;
}

interface Props {
  items: ItemProps[];
  onMove: (id: string, newPosition: number) => void;
}

export const SortableCardList: React.FC<Props> = ({ items: initItems, onMove }) => {
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

        const item = items.find(s => s.id === active.id);
        if (!item) return;

        const oldIndex = items.map(s => s.id).indexOf(active.id);
        const newIndex = items.map(s => s.id).indexOf(over.id);
        setItems(prev => arrayMove(prev, oldIndex, newIndex));
        onMove(item.id, newIndex);
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className={styles.list}>
          {items.map(item => (
            <SortableCard key={item.id} id={item.id}>
              {item.content}
            </SortableCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
