import React from 'react';
import { ComboFragment } from '@/lib/graphql/types';
import { OperationSet } from './Command';

interface Props {
  combo: ComboFragment;
}

export const ComboMedia: React.FC<Props> = ({ combo }) => {
  return (
    <div className="bl_combo">
      <div>
        {combo.commands[0].move.name}からダメージ{combo.damage}
      </div>
      <div className="bl_command hp_mg_b_md">
        <div className="bl_command_inner">
          <OperationSet commandSet={combo.commands.map(m => m.operations)} />
        </div>
      </div>

      <div className="bl_youtube">
        <iframe
          width={854}
          height={480}
          src={`https://www.youtube.com/embed/${combo.youtubeVideoId}`}
          frameBorder={0}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="bl_move_tags">{combo.counterHit && <span>カウンターヒット限定</span>}</div>

      {combo.note && combo.note.length > 0 && <div className="bl_move_note">{combo.note}</div>}
    </div>
  );
};
