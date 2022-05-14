import { styled } from '@mui/material/styles';

export const HiddenInput = styled('input')(() => ({
  position: 'absolute',
  zIndex: '-1',
  width: '0.1px',
  height: '0.1px',
  overflow: 'hidden',
  opacity: '0',
}));
