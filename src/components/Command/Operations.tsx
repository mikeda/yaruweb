import React from 'react';

import { OperationEnum } from '@/lib/graphql/types';
import { Operation } from './Operation';

import { Wrapper } from './Wrapper';

interface Props {
  operations: OperationEnum[];
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
