import React from 'react';

import { Paper, Table, TableBody, TableContainer } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const DashboardTable: React.FC<Props> = ({ children }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};
