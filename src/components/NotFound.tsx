import React from 'react';
import { styled } from '@mui/material/styles';

export const NotFound: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled('div')(() => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '48px 16px',
  color: '#777',
  border: '2px dashed #d1d8dc',
}));
