import React from 'react';

import { Box, TableCell, TableRow } from '@mui/material';

import { ComboTableRow } from './ComboTableRow';
import { CreateButton } from './CreateButton';

import { DashboardTable } from '@/components';
import { ComboTableRowFragment, MoveSelectOptionFragment } from '@/generated/graphql';

interface Props {
  comboCategoryId: string;
  combos: ComboTableRowFragment[];
  moveCategories: MoveSelectOptionFragment[];
}

export const ComboTable: React.FC<Props> = ({ comboCategoryId, combos, moveCategories }) => {
  return (
    <>
      <DashboardTable>
        {combos.map(combo => (
          <ComboTableRow
            key={combo.id}
            combo={combo}
            comboCategoryId={comboCategoryId}
            combos={combos}
            moveCategories={moveCategories}
          />
        ))}
        <TableRow>
          <TableCell scope='row' colSpan={10}>
            <Box display='flex' justifyContent='center'>
              <CreateButton comboCategoryId={comboCategoryId} combos={combos} moveCategories={moveCategories} />
            </Box>
          </TableCell>
        </TableRow>
      </DashboardTable>
    </>
  );
};
