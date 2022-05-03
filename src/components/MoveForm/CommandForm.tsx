import React, { useState } from 'react';

import { Box, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Command, OperationListSelector } from '@/components';

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
            <EditIcon />
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
