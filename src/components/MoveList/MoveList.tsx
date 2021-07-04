import React, { useState } from 'react';

import { MoveListItemFragment } from '@/lib/graphql/types';
import { Checkbox, FormControlLabel, FormGroup, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import Link from 'next/link';
import { path } from '@/lib';

interface Props {
  moves: MoveListItemFragment[];
}

export const MoveList: React.FC<Props> = ({ moves: allMoves }) => {
  const [state, setState] = useState({
    powerCrush: false,
    crouchingStatus: false,
    jumpStatus: false,
    homing: false,
    screw: false,
    wallBound: false,
  });

  const { powerCrush, crouchingStatus, jumpStatus, homing, screw, wallBound } = state;

  let moves = allMoves;
  if (crouchingStatus) moves = moves.filter(move => move.crouchingStatus);
  if (jumpStatus) moves = moves.filter(move => move.jumpStatus);
  if (powerCrush) moves = moves.filter(move => move.powerCrush);
  if (homing) moves = moves.filter(move => move.homing);
  if (screw) moves = moves.filter(move => move.screw);
  if (wallBound) moves = moves.filter(move => move.wallBound);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Paper>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={crouchingStatus} onChange={handleChange} name="crouchingStatus" />}
            label="しゃがみステータス"
          />
          <FormControlLabel
            control={<Checkbox checked={jumpStatus} onChange={handleChange} name="jumpStatus" />}
            label="ジャンプステータス"
          />
          <FormControlLabel
            control={<Checkbox checked={powerCrush} onChange={handleChange} name="powerCrush" />}
            label="パワークラッシュ"
          />
          <FormControlLabel
            control={<Checkbox checked={homing} onChange={handleChange} name="homing" />}
            label="ホーミング"
          />
          <FormControlLabel
            control={<Checkbox checked={screw} onChange={handleChange} name="screw" />}
            label="スクリュー"
          />
          <FormControlLabel
            control={<Checkbox checked={wallBound} onChange={handleChange} name="wallBound" />}
            label="ウォールバウンド"
          />
        </FormGroup>
      </Paper>

      <Paper>
        <List component="div">
          {moves.map(move => (
            <Link key={move.id} href={path({ to: 'move', moveId: move.id })} passHref>
              <ListItem button component="a">
                <ListItemText primary={move.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </>
  );
};
