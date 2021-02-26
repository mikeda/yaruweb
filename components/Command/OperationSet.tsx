import React from 'react';

import { OperationFragment } from '@/lib/graphql/types';

import { Wrapper } from './Wrapper';
import { Operation } from './Operation';

interface Props {
  commandSet: OperationFragment[][];
}

export const OperationSet: React.FC<Props> = ({ commandSet }) => {
  return (
    <Wrapper>
      {commandSet.map((operations, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <i className="fa fa-chevron-right"></i>}

          {operations.map((operation, j) => (
            <Operation operation={operation} key={j} />
          ))}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};
