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

const Wrapper: React.FC = ({ children }) => (
  <Container>
    <ContainerInner>{children}</ContainerInner>
  </Container>
);

const Container = styled('div')(() => ({
  display: 'inline-block',
}));

const ContainerInner = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  cursor: 'grab',
}));
