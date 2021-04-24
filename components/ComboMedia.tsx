import React from 'react';
import { ComboFragment } from '@/lib/graphql/types';
import { Operations } from './Command/Operations';

interface Props {
  combo: ComboFragment;
}

export const ComboMedia: React.FC<Props> = ({ combo }) => {
  return (
    <div className="bl_combo">
      <div>{combo.name}</div>
      <div className="bl_command hp_mg_b_md">
        <div className="bl_command_inner">
          <Operations operations={combo.operations} />
        </div>
      </div>

      {combo.note && combo.note.length > 0 && <div className="bl_move_note">{combo.note}</div>}
    </div>
  );
};
