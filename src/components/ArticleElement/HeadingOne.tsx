import React from 'react';

import { styled } from '@mui/material/styles';

interface Props {
  attributes: { [key: string]: unknown };
}

export const HeadingOne: React.FC<Props> = ({ attributes, children }) => {
  return <Container {...attributes}>{children}</Container>;
};

const Container = styled('h2')(() => ({
  paddingBottom: '8px',
  margin: '2rem 0 1rem',
  marginBottom: '16px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  borderBottom: '2px solid $color-main',
}));
