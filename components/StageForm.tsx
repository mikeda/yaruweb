import React from 'react';

import { StageAttributes, StageFragment } from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { CheckBox } from '@/components/form2/CheckBox';
import { Button } from '@/components/blocks/Button';
import { FormInline } from '@/components/form2/FormInline';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';

interface Props {
  stage?: StageFragment;
  onSubmit: (attributes: StageAttributes) => void;
}

export const StageForm: React.FC<Props> = ({ stage, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StageAttributes>({
    defaultValues: stage && {
      name: stage.name,
      infinite: stage.infinite,
      wall: stage.wall,
      wallBreak: stage.wallBreak,
      floorBreak: stage.floorBreak,
      balconyBreak: stage.balconyBreak,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前">
        <Input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="画像">
        <input
          type="file"
          accept="image/*"
          name="mainImageDummy"
          onChange={e => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
              if (!e.target) return;

              setValue('mainImage', e.target.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />
        <input type="hidden" name="mainImage" />
      </FormGroup>

      <FormGroup label="ギミック">
        <FormInline>
          <CheckBox id="infinite" label="無限">
            <input id="infinite" type="checkbox" {...register('infinite')} />
          </CheckBox>
          <CheckBox id="wall" label="壁あり">
            <input id="wall" type="checkbox" {...register('wall')} />
          </CheckBox>
          <CheckBox id="wallBreak" label="ウォールブレイク">
            <input id="wallBreak" type="checkbox" {...register('wallBreak')} />
          </CheckBox>
          <CheckBox id="floorBreak" label="フロアブレイク">
            <input id="floorBreak" type="checkbox" {...register('floorBreak')} />
          </CheckBox>
          <CheckBox id="balconyBreak" label="バルコニーブレイク">
            <input id="balconyBreak" type="checkbox" {...register('balconyBreak')} />
          </CheckBox>
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
