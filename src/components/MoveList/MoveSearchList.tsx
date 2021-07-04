import React, { useState } from 'react';

import { MoveListItemFragment } from '@/lib/graphql/types';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core';
import Link from 'next/link';
import { path } from '@/lib';
import theme from '@/theme';
import { Operations } from '../Command/Operations';

const useStyles = makeStyles({
  search: {
    padding: theme.spacing(2),
  },
  list: {
    marginTop: theme.spacing(2),
  },
});

interface Props {
  moves: MoveListItemFragment[];
}

export const MoveSearchList: React.FC<Props> = ({ moves: allMoves }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    powerCrush: false,
    crouchingStatus: false,
    jumpStatus: false,
    homing: false,
    screw: false,
    wallBound: false,
  });

  const { powerCrush, crouchingStatus, jumpStatus, homing, screw, wallBound } = state;

  const moves = allMoves.filter(move => {
    if (!powerCrush && !crouchingStatus && !jumpStatus && !homing && !screw && !wallBound) return true;

    if (powerCrush && move.powerCrush) return true;
    if (crouchingStatus && move.crouchingStatus) return true;
    if (jumpStatus && move.jumpStatus) return true;
    if (homing && move.homing) return true;
    if (screw && move.screw) return true;
    if (wallBound && move.wallBound) return true;

    return false;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Paper className={classes.search}>
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

      <Paper className={classes.list}>
        <List component="div">
          {moves.map(move => (
            <Link key={move.id} href={path({ to: 'move', moveId: move.id })} passHref>
              <ListItem button component="a" divider>
                <ListItemText>
                  <Box display="flex" flexDirection="row" justifyContent="space-between">
                    {move.name}
                    {move.commands[0] && (
                      <Box>
                        <Operations operations={move.commands[0].operations} />
                      </Box>
                    )}
                  </Box>
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </>
  );
};
