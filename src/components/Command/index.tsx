import React from 'react';
import { styled } from '@mui/material/styles';

import { CommandFragment } from '@/lib/graphql/types';
import { Operation, TextOperation } from './Operation';

interface Props {
  command: CommandFragment;
}

export const Command: React.FC<Props> = ({ command }) => {
  return (
    <Wrapper>
      {command.condition && <TextOperation>{command.condition}</TextOperation>}

      {command.operations.map((operation, i) => (
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
