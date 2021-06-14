import React, { useState } from 'react';

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import styles from './ObjectCardList.module.scss';
import { ObjectCard, ObjectCardProps, SortableObjectCard, SortableObjectCardProps } from '../ObjectCard';

interface Props {
  items: ObjectCardProps[];
}

export const ObjectCardList: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <ObjectCard key={i} {...item} />
      ))}
    </div>
  );
};

interface SortableProps {
  items: SortableObjectCardProps[];
  onMove: (id: string, newPosition: number) => void;
}

export const SortableObjectCardList: React.FC<SortableProps> = ({ items: initItems, onMove }) => {
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
            <div key={item.id} className={styles.list}>
              {items.map(item => (
                <SortableObjectCard key={item.id} {...item} />
              ))}
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
