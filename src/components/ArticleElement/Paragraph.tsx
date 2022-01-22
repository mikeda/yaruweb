import React from 'react';
import styled from '@mui/styles/styled';

interface Props {
  attributes: { [key: string]: unknown };
}

export const Paragraph: React.FC<Props> = ({ attributes, children }) => {
  return <Container {...attributes}>{children}</Container>;
};

const Container = styled('p')(() => ({
  margin: '1rem 0',
  lineHeight: 2,
  '& a': {
    textDecoration: 'underline',
  },
}));
