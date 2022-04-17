import React from 'react';

import { styled } from '@mui/material/styles';

interface Props {
  children: React.ReactNode;
  id?: string;
  attributes: { [key: string]: unknown };
}

export const HeadingOne: React.FC<Props> = ({ id, attributes, children }) => {
  return (
    <Container {...attributes} id={id}>
      {children}
    </Container>
  );
};

const Container = styled('h2')(({ theme }) => ({
  paddingBottom: '8px',
  margin: '2rem 0 1rem',
  marginBottom: '16px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  borderBottomStyle: 'solid',
  borderBottomWidth: '2px',
  borderBottomColor: theme.palette.primary.main,
}));
