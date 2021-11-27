import React, { useState } from 'react';

import { Box, IconButton, Paper } from '@mui/material';
import { Command, OperationListSelector } from '..';
import { Edit } from '@mui/icons-material';

interface Props {
  command: string[];
  onChange: (newCommand: string[]) => void;
}

export const CommandForm: React.FC<Props> = ({ command, onChange }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Paper>
      <Box px={2} mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <Command command={command} />

        <div>
          <IconButton onClick={() => setDialogOpen(true)} size="large">
            <Edit />
          </IconButton>
        </div>
      </Box>

      <OperationListSelector
        open={dialogOpen}
        command={command}
        onChange={newCommand => {
          onChange(newCommand);
        }}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
    </Paper>
  );
};
