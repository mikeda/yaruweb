import React, { useState } from 'react';

import { CommandAttributes } from '@/lib/graphql/types';
import { Box, IconButton, Paper } from '@material-ui/core';
import { Command, OperationListSelector } from '..';
import { Delete, Edit } from '@material-ui/icons';

interface Props {
  command: CommandAttributes;
  onChange: (newCommand: CommandAttributes) => void;
  onDelete: () => void;
}

export const CommandForm: React.FC<Props> = ({ command, onChange, onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Paper>
      <Box px={2} mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <Command command={command} />

        <div>
          <IconButton onClick={() => setDialogOpen(true)}>
            <Edit />
          </IconButton>
          <IconButton edge="end" onClick={onDelete}>
            <Delete />
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
