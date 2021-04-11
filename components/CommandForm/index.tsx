import React, { useState } from 'react';
import { CommandFragment, OperationFragment, StateFragment, useCreateCommandMutation } from '@/lib/graphql/types';
import { Operations } from '../Command/Operations';
import { StateOptions } from '../MoveForm/StateOptions';
import { Operation } from '../Command/Operation';

interface Props {
  moveId: string;
  states: StateFragment[];
  allOperations: OperationFragment[];
  onCreate: (command: CommandFragment) => void;
}

export const CommandForm: React.FC<Props> = ({ moveId, states, allOperations, onCreate }) => {
  const [operations, setOperations] = useState<OperationFragment[]>([]);
  const [state, setState] = useState<StateFragment | null>(null);
  const [createCommand, { loading }] = useCreateCommandMutation({
    onCompleted: data => {
      const command = data.createCommand?.command;
      if (!command) return;

      setOperations([]);
      onCreate(command);
    },
    onError: e => {
      alert(e.message);
    },
  });

  return (
    <>
      <div>
        <div className="el_form_group">
          <div className="el_form_select">
            <select
              className="el_form_input"
              value={state?.id}
              onChange={event => {
                event.preventDefault();
                const selectedState = states.find(s => s.id === event.target.value);
                setState(selectedState || null);
              }}
            >
              <StateOptions states={states} />
            </select>
          </div>
        </div>

        {operations.length > 0 && (
          <div className="el_form_group">
            <Operations operations={operations} />
          </div>
        )}

        <div className="el_form_group">
          {allOperations.map(operation => {
            return (
              <button
                key={operation.id}
                onClick={e => {
                  e.preventDefault();
                  setOperations(prev => [...prev, operation]);
                }}
              >
                <Operation operation={operation} />
              </button>
            );
          })}
        </div>

        <div className="el_form_group">
          <button
            type="submit"
            onClick={() =>
              createCommand({
                variables: {
                  moveId,
                  attributes: { stateId: state?.id, operationIds: operations.map(o => o.id) },
                },
              })
            }
            disabled={operations.length === 0 || loading}
            className="el_btn"
          >
            登録する
          </button>
        </div>
      </div>
    </>
  );
};
