import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ComboAttributes, ComboFragment, OperationFragment } from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/blocks/Button';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';
import { TextArea } from './form2/TextArea';
import { OperationListSelector } from './OperationListSelector';

const schema = yup.object().shape({
  name: yup.string().required(),
  startUpFrame: yup.number().integer().min(0),
});

interface Props {
  combo?: ComboFragment;
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, onSubmit }) => {
  const [operations, setOperations] = useState<OperationFragment[]>(combo?.operations || []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo && {
      name: combo.name,
      damage: combo.damage,
      note: combo.note,
      operationIds: combo.operations.map(o => o.id),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前" required>
        <Input {...register('name')} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="ダメージ">
        <Input type="number" {...register('damage', { valueAsNumber: true })} />
      </FormGroup>

      <FormGroup label="備考">
        <TextArea {...register('note')} />
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
