import React from 'react';
import styled from '@mui/styles/styled';

interface Props {
  children: React.ReactNode;
  attributes: { [key: string]: unknown };
}

export const BulletedList: React.FC<Props> = ({ attributes, children }) => {
  return <Container {...attributes}>{children}</Container>;
};

const Container = styled('ul')(() => ({
  paddingLeft: '2rem',
  listStyle: 'disc',
  '& a': {
    textDecoration: 'underline',
  },
}));
