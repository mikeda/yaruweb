import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CommandAttributes, CommandFragment, OperationFragment, StateFragment } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form/FormGroup';
import { OperationListSelector } from '../OperationListSelector';

const schema = yup.object().shape({
  operationIds: yup.array().required(),
});

interface Props {
  command?: CommandFragment;
  states: StateFragment[];
  onSubmit: (attributes: CommandAttributes) => void;
}

export const CommandForm: React.FC<Props> = ({ command, states, onSubmit }) => {
  const [operations, setOperations] = useState<OperationFragment[]>(command?.operations || []);

  const { register, handleSubmit, setValue } = useForm<CommandAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: command && {
      stateId: command.state?.id,
      operationIds: command.operations.map(o => o.id),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="状態">
        <select {...register('stateId')}>
          {states.map(state => (
            <option value={state.id} key={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup label="コマンド">
        <OperationListSelector
          operations={operations}
          onClickOperation={operation => {
            const newOperations = [...operations, operation];
            setOperations(newOperations);
            setValue(
              'operationIds',
              newOperations.map(o => o.id),
            );
          }}
          onDeleteLast={() => {
            const newOperations = operations.slice(0, operations.length - 1);
            setOperations(newOperations);
            setValue(
              'operationIds',
              newOperations.map(o => o.id),
            );
          }}
        />
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" />
        </Button>
      </FormGroup>
    </form>
  );
};
