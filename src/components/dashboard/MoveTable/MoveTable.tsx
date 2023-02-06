import React from 'react';

import { Box, TableCell, TableRow } from '@mui/material';

import { CreateButton } from './CreateButton';
import { MoveTableRow } from './MoveTableRow';

import { DashboardTable } from '@/components';
import { MoveTableRowFragment } from '@/generated/graphql';

interface Props {
  moveCategoryId: string;
  moves: MoveTableRowFragment[];
}

export const MoveTable: React.FC<Props> = ({ moveCategoryId, moves }) => {
  return (
    <>
      <DashboardTable>
        {moves.map(move => (
          <MoveTableRow key={move.id} move={move} moveCategoryId={moveCategoryId} moves={moves} />
        ))}
        <TableRow>
          <TableCell scope='row' colSpan={10}>
            <Box display='flex' justifyContent='center'>
              <CreateButton moveCategoryId={moveCategoryId} moves={moves} />
            </Box>
          </TableCell>
        </TableRow>
      </DashboardTable>
    </>
  );
};
