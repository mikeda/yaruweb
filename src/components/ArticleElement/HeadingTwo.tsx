import React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  id?: string;
  attributes: { [key: string]: unknown };
}

export const HeadingTwo: React.FC<Props> = ({ id, attributes, children }) => {
  return (
    <Container {...attributes} id={id}>
      {children}
    </Container>
  );
};

const Container = styled('h3')(() => ({
  margin: '2rem 0 1rem',
  fontSize: '1.25rem',
  fontWeight: 'bold',
}));
