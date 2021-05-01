import React from 'react';
import { ComboFragment } from '@/lib/graphql/types';
import { ComboMedia } from '@/components/ComboMedia';

interface Props {
  combos: ComboFragment[];
}

export const ComboList: React.FC<Props> = ({ combos }) => {
  return (
    <>
      <div className="ly_row ly_row__mg_md">
        {combos.map(combo => {
          if (!combo) return;

          return (
            <div className="ly_col_12" key={combo.id}>
              <ComboMedia combo={combo} />
            </div>
          );
        })}
      </div>
    </>
  );
};
