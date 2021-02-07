import { MoveCategoryFragment } from '@/lib/graphql/types';
import React from 'react';

interface Props {
  moveCategories: MoveCategoryFragment[];
}

export const MoveCategoryOptions: React.FC<Props> = ({ moveCategories }) => {
  return (
    <>
      {moveCategories.map(moveCategory => (
        <option key={`moveCategory-${moveCategory.id}`} value={moveCategory.id}>
          {moveCategory.name}
        </option>
      ))}
    </>
  );
};
