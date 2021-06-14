import React, { useState } from 'react';

import { MoveMedia } from '../MoveMedia';
import { MoveFragment } from '@/lib/graphql/types';

interface Props {
  moves: MoveFragment[];
}

export const MoveList: React.FC<Props> = ({ moves }) => {
  const [powerCrush, setPowerCrush] = useState(false);
  const [crouchingStatus, setCrouchingStatus] = useState(false);
  const [jumpStatus, setJumpStatus] = useState(false);
  const [homing, setHoming] = useState(false);
  const [screw, setScrew] = useState(false);
  const [wallBound, setWallBound] = useState(false);

  const showMove = (move: MoveFragment) => {
    if (powerCrush && !move.powerCrush) return false;
    if (crouchingStatus && !move.crouchingStatus) return false;
    if (jumpStatus && !move.jumpStatus) return false;
    if (homing && !move.homing) return false;
    if (screw && !move.screw) return false;
    if (wallBound && !move.wallBound) return false;
    if (wallBound && !move.wallBound) return false;

    return true;
  };

  return (
    <>
      <div className="bl_box">
        <div className="bl_moveSelector">
          <MoveSelectCheckBox label="パワークラッシュ" checked={powerCrush} setChecked={setPowerCrush} />
          <MoveSelectCheckBox label="しゃがみステータス" checked={crouchingStatus} setChecked={setCrouchingStatus} />
          <MoveSelectCheckBox label="ジャンプステータス" checked={jumpStatus} setChecked={setJumpStatus} />
          <MoveSelectCheckBox label="ホーミング" checked={homing} setChecked={setHoming} />
          <MoveSelectCheckBox label="スクリュー" checked={screw} setChecked={setScrew} />
          <MoveSelectCheckBox label="ウォールバウンド" checked={wallBound} setChecked={setWallBound} />
        </div>
      </div>
      <div className="bl_sectionUnit">
        <div className="bl_section">
          {moves.map(move => {
            if (!showMove(move)) return;

            return <MoveMedia key={move.id} move={move} />;
          })}
        </div>
      </div>
    </>
  );
};

const MoveSelectCheckBox: React.FC<{
  label: string;
  checked: boolean;
  setChecked: (flag: boolean) => void;
}> = ({ label, checked, setChecked }) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
      {label}
    </label>
  );
};
