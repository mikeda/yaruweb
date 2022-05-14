import React from 'react';

import { styled } from '@mui/material/styles';

import { Operation } from './Operation';

interface Props {
  command: string[];
}

export const Command: React.FC<Props> = ({ command }) => {
  return (
    <Wrapper>
      {command.map((operation, i) => (
        <Operation operation={operation} key={i} />
      ))}
    </Wrapper>
  );
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => <ContainerInner>{children}</ContainerInner>;

const ContainerInner = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'scroll',
  flexWrap: 'wrap',
  margin: '-4px -2px',
  cursor: 'grab',
  '& > *': {
    minWidth: '10px',
    margin: '4px 2px',
  },
}));
