import React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  attributes: { [key: string]: unknown };
}

export const HeadingTwo: React.FC<Props> = ({ attributes, children }) => {
  return <Container {...attributes}>{children}</Container>;
};

const Container = styled('h3')(() => ({
  margin: '2rem 0 1rem',
  fontSize: '1.25rem',
  fontWeight: 'bold',
}));
