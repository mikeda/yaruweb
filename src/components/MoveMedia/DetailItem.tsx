import React from 'react';

import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DetailItem: React.FC<{ children: React.ReactNode; label: string }> = ({ label, children }) => (
  <Stack direction="row" spacing={1}>
    <DetailTextLabel variant="body2">{label}</DetailTextLabel>
    <Typography variant="body2">{children}</Typography>
  </Stack>
);

const DetailTextLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(0.25),
  fontWeight: 'bold',
}));
