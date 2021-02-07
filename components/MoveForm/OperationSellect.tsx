import { OperationFragment, useOperationsQuery } from '@/lib/graphql/types';
import React, { useState } from 'react';
import { Operations } from '../Operations';

interface Props {
  operations: OperationFragment[];
  onChange: (operations: OperationFragment[]) => void;
}

export const OperationSellect: React.FC<Props> = ({ onChange, ...props }) => {
  const { data } = useOperationsQuery();
  const [operations, setCommands] = useState(props.operations);

  if (!data) return null;

  return (
    <>
      <div>
        <Operations operations={operations} />

        <div className="el_form_select">
          <select
            onChange={e => {
              const operation = data.operations.find(c => c.id === e.target.value);
              if (!operation) return;

              setCommands(prev => [...prev, operation]);
              onChange(operations);
            }}
          >
            {data.operations.map(operation => (
              <option key={operation.id} value={operation.id}>
                {operation.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
