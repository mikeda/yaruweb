import { AttackTypeEnumText } from '@/lib/graphql/enum_texts';
import { AttackActionAttributes, useCreateAttackActionMutation } from '@/lib/graphql/types';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  moveId: string;
  onCreate: () => void;
}

export const AttackActionForm: React.FC<Props> = ({ moveId, onCreate }) => {
  const { register, handleSubmit } = useForm<AttackActionAttributes>();
  const [createAttackAction, { loading }] = useCreateAttackActionMutation({
    onCompleted: data => {
      const action = data.createAttackAction?.action;
      if (!action) return;

      onCreate();
    },
    onError: e => {
      alert(e.message);
    },
  });

  const onSubmit = (attributes: AttackActionAttributes) => {
    createAttackAction({ variables: { moveId, attributes } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('attackType', { required: true })}>
        {Object.entries(AttackTypeEnumText).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
      </select>

      <input type="number" {...register('damage', { valueAsNumber: true })} />

      <input type="submit" disabled={loading} />
    </form>
  );
};
