import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { MoveAttributes, MoveFragment } from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/blocks/Button';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';
import { FormInline } from './form2/FormInline';
import { CheckBox } from './form2/CheckBox';
import { TextArea } from './form2/TextArea';

const schema = yup.object().shape({
  name: yup.string().required(),
  startUpFrame: yup.number().integer().min(0),
});

interface Props {
  move?: MoveFragment;
  onSubmit: (attributes: MoveAttributes) => void;
}

export const MoveForm: React.FC<Props> = ({ move, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MoveAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: move && {
      afterStateId: move.afterState?.id,
      opponentState: move.opponentState,
      name: move.name,
      kana: move.kana,
      startUpFrame: move.startUpFrame,
      powerCrush: move.powerCrush,
      crouchingStatus: move.crouchingStatus,
      jumpStatus: move.jumpStatus,
      homing: move.homing,
      screw: move.screw,
      wallBound: move.wallBound,
      note: move.note,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前" required>
        <Input {...register('name')} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="カナ">
        <Input {...register('kana')} />
      </FormGroup>

      <FormGroup label="発生フレーム">
        <Input type="number" {...register('startUpFrame')} />
      </FormGroup>

      <FormGroup label="ステータス">
        <FormInline>
          <CheckBox id="powerCrush" label="パワークラッシュ">
            <input id="powerCrush" type="checkbox" {...register('powerCrush')} />
          </CheckBox>
          <CheckBox id="homing" label="ホーミング">
            <input id="homing" type="checkbox" {...register('homing')} />
          </CheckBox>
          <CheckBox id="screw" label="スクリュー">
            <input id="screw" type="checkbox" {...register('screw')} />
          </CheckBox>
          <CheckBox id="wallBound" label="ウォールバウンド">
            <input id="wallBound" type="checkbox" {...register('wallBound')} />
          </CheckBox>
          <CheckBox id="crouchingStatus" label="しゃがみステータス">
            <input id="crouchingStatus" type="checkbox" {...register('crouchingStatus')} />
          </CheckBox>
          <CheckBox id="jumpStatus" label="ジャンプステータス">
            <input id="jumpStatus" type="checkbox" {...register('jumpStatus')} />
          </CheckBox>
        </FormInline>
      </FormGroup>

      <FormGroup label="備考">
        <TextArea {...register('note')} />
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" />
        </Button>
      </FormGroup>
    </form>
  );
};
