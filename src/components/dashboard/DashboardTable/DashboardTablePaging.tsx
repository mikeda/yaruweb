import React from 'react';

import { Box, Button } from '@mui/material';

interface Props {
  onClick: () => void;
}

export const DashboardTablePaging: React.FC<Props> = ({ onClick }) => {
  return (
    <Box pt={2} pb={2} display="flex" justifyContent="center">
      <Button variant="outlined" onClick={onClick}>
        もっとみる
      </Button>
    </Box>
  );
};
