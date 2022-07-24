import React from 'react';

import { Box } from '@mui/material';

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
      </DashboardTable>

      <Box display="flex" justifyContent="center" mt={2}>
        <CreateButton moveCategoryId={moveCategoryId} moves={moves} />
      </Box>
    </>
  );
};
