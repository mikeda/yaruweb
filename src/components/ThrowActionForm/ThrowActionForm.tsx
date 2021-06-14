import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ThorwActionStateText, ThrowEscapeEnumText, ThrowTypeEnumText } from '@/lib/graphql/enum_texts';
import { ThrowActionAttributes, ThrowActionFragment } from '@/lib/graphql/types';
import { Button, CheckBox, Input, FormGroup, FormInline } from '@/components';

const schema = yup.object().shape({
  damage: yup.number().required().integer().min(0),
});

const StateSelectOptions: React.FC = () => (
  <>
    {Object.entries(ThorwActionStateText).map(([key, value]) => (
      <option value={key} key={key}>
        {value}
      </option>
    ))}
  </>
);

interface Props {
  throwAction?: ThrowActionFragment;
  onSubmit: (attributes: ThrowActionAttributes) => void;
}

export const ThrowActionForm: React.FC<Props> = ({ throwAction, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThrowActionAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: throwAction && {
      throwType: throwAction.throwType,
      damage: throwAction.damage,
      escape: throwAction.escape,
      throwAvailable: throwAction.throwAvailable,
      throwState: throwAction.throwState,
      throwFrame: throwAction.throwFrame,
      throwEscapeAvailable: throwAction.throwEscapeAvailable,
      throwEscapeState: throwAction.throwEscapeState,
      throwEscapeFrame: throwAction.throwEscapeFrame,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="タイプ">
        <select {...register('throwType')}>
          {Object.entries(ThrowTypeEnumText).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup label="ダメージ">
        <Input type="number" {...register('damage', { valueAsNumber: true })} />
        {errors.damage && <span>{errors.damage.message}</span>}
      </FormGroup>

      <FormGroup label="投げ抜け">
        <select {...register('escape')}>
          {Object.entries(ThrowEscapeEnumText).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
      </FormGroup>

      <FormGroup label="ヒット後">
        <FormInline>
          <CheckBox id="throwAvailable" label="表示">
            <input id="throwAvailable" type="checkbox" {...register('throwAvailable')} />
          </CheckBox>

          <Input type="number" {...register('throwFrame', { valueAsNumber: true })} placeholder="フレーム" />

          <select {...register('throwState')}>
            <StateSelectOptions />
          </select>
        </FormInline>
      </FormGroup>

      <FormGroup label="投げ抜け後">
        <FormInline>
          <CheckBox id="throwEscapeAvailable" label="表示">
            <input id="throwEscapeAvailable" type="checkbox" {...register('throwEscapeAvailable')} />
          </CheckBox>

          <Input type="number" {...register('throwEscapeFrame', { valueAsNumber: true })} placeholder="フレーム" />

          <select {...register('throwEscapeState')}>
            <StateSelectOptions />
          </select>
        </FormInline>
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" />
        </Button>
      </FormGroup>
    </form>
  );
};
