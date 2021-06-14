import React from 'react';

import { OperationFragment } from '@/lib/graphql/types';
import { Operation } from './Operation';

import { Wrapper } from './Wrapper';

interface Props {
  operations: OperationFragment[];
}

export const Operations: React.FC<Props> = ({ operations }) => {
  return (
    <Wrapper>
      {operations.map((operation, i) => (
        <Operation operation={operation} key={i} />
      ))}
    </Wrapper>
  );
};
