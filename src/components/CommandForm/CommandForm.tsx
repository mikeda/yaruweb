import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CommandAttributes, CommandFragment, OperationFragment } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form/FormGroup';
import { OperationListSelector } from '../OperationListSelector';
import { Button } from '@material-ui/core';

const schema = yup.object().shape({
  operationIds: yup.array().required(),
});

interface Props {
  command?: CommandFragment;
  onSubmit: (attributes: CommandAttributes) => void;
}

export const CommandForm: React.FC<Props> = ({ command, onSubmit }) => {
  const [operations, setOperations] = useState<OperationFragment[]>(command?.operations || []);

  const { handleSubmit, setValue } = useForm<CommandAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: command && {
      operationIds: command.operations.map(o => o.id),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" variant="contained">
          登録する
        </Button>
      </FormGroup>
    </form>
  );
};
