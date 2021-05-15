import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AttackActionStateText, AttackTypeEnumText } from '@/lib/graphql/enum_texts';
import { AttackActionAttributes, AttackActionFragment } from '@/lib/graphql/types';
import { FormGroup } from './form2/FormGroup';
import { Button } from './blocks/Button';
import { Input } from './form2/Input';
import { CheckBox } from './form2/CheckBox';
import { FormInline } from './form2/FormInline';

const schema = yup.object().shape({
  damage: yup.number().required().integer().min(0),
});

const StateSelectOptions: React.FC = () => (
  <>
    {Object.entries(AttackActionStateText).map(([key, value]) => (
      <option value={key} key={key}>
        {value}
      </option>
    ))}
  </>
);

interface Props {
  attackAction?: AttackActionFragment;
  onSubmit: (attributes: AttackActionAttributes) => void;
}

export const AttackActionForm: React.FC<Props> = ({ attackAction, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttackActionAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: attackAction && {
      attackType: attackAction.attackType,
      damage: attackAction.damage,
      blockAvailable: attackAction.blockAvailable,
      blockState: attackAction.blockState,
      blockFrame: attackAction.blockFrame,
      hitAvailable: attackAction.hitAvailable,
      hitState: attackAction.hitState,
      hitFrame: attackAction.hitFrame,
      counterHitAvailable: attackAction.counterHitAvailable,
      counterHitState: attackAction.counterHitState,
      counterHitFrame: attackAction.counterHitFrame,
      cleanHitAvailable: attackAction.cleanHitAvailable,
      cleanHitState: attackAction.cleanHitState,
      cleanHitFrame: attackAction.cleanHitFrame,
      crouchingHitAvailable: attackAction.crouchingHitAvailable,
      crouchingHitState: attackAction.crouchingHitState,
      crouchingHitFrame: attackAction.crouchingHitFrame,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('attackType', { required: true })}>
        {Object.entries(AttackTypeEnumText).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </select>

      <FormGroup label="ダメージ">
        <Input type="number" {...register('damage', { valueAsNumber: true })} />
        {errors.damage && <span>{errors.damage.message}</span>}
      </FormGroup>

      <FormGroup label="ガード">
        <FormInline>
          <CheckBox id="blockAvailable" label="表示">
            <input id="blockAvailable" type="checkbox" {...register('blockAvailable')} />
          </CheckBox>

          <Input type="number" {...register('blockFrame', { valueAsNumber: true })} placeholder="フレーム" />

          <select {...register('blockState')}>
            <StateSelectOptions />
          </select>
        </FormInline>
      </FormGroup>

      <FormGroup label="ヒット">
        <FormInline>
          <CheckBox id="hitAvailable" label="表示">
            <input id="hitAvailable" type="checkbox" {...register('hitAvailable')} />
          </CheckBox>

          <Input type="number" {...register('hitFrame', { valueAsNumber: true })} placeholder="フレーム" />

          <select {...register('hitState')}>
            <StateSelectOptions />
          </select>
        </FormInline>
      </FormGroup>

      <FormGroup label="クリーンヒット">
        <FormInline>
          <CheckBox id="cleanHitAvailable" label="表示">
            <input id="cleanHitAvailable" type="checkbox" {...register('cleanHitAvailable')} />
          </CheckBox>

          <Input type="number" {...register('cleanHitFrame', { valueAsNumber: true })} placeholder="フレーム" />

          <select {...register('cleanHitState')}>
            <StateSelectOptions />
          </select>
        </FormInline>
      </FormGroup>

      <FormGroup label="カウンターヒット">
        <FormInline>
          <CheckBox id="counterHitAvailable" label="表示">
            <input id="counterHitAvailable" type="checkbox" {...register('counterHitAvailable')} />
          </CheckBox>

          <Input type="number" {...register('counterHitFrame', { valueAsNumber: true })} placeholder="フレーム" />

          <select {...register('counterHitState')}>
            <StateSelectOptions />
          </select>
        </FormInline>
      </FormGroup>

      <FormGroup label="しゃがみにヒット">
        <FormInline>
          <CheckBox id="crouchingHitAvailable" label="表示">
            <input id="crouchingHitAvailable" type="checkbox" {...register('crouchingHitAvailable')} />
          </CheckBox>

          <Input type="number" {...register('crouchingHitFrame', { valueAsNumber: true })} placeholder="フレーム" />

          <select {...register('crouchingHitState')}>
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
