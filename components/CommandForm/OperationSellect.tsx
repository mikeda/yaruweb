import { CommandFragment, OperationFragment, useOperationsQuery } from '@/lib/graphql/types';
import React, { useState } from 'react';
import { Operations } from '../Operations';

interface Props {
  moveId: string;
  command: CommandFragment;
  onChange: (operations: OperationFragment[]) => void;
}

export const OperationSellect: React.FC<Props> = ({ onChange, ...props }) => {
  const { data } = useOperationsQuery();
  const [command, setCommand] = useState(props.command);

  if (!data) return null;

  return (
    <>
      <div>
        <Operations command={command} />

        <div className="el_form_select">
          <select
            onChange={e => {
              const operation = command.operations.find(o => o.id === e.target.value);
              if (!operation) return;

              const operations = [...command.operations, operation];

              setCommand(prev => ({ ...prev, operations }));
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
