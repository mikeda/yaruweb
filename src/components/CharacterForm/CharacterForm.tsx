import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CharacterAttributes, CharacterFormFragment } from '@/lib/graphql/types';
import { CheckBox, FormGrid, TextArea, Input, FormGroup } from '@/components';
import { Button } from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required(),
  nameKana: yup.string().required(),
  longName: yup.string().required(),
  longNameKana: yup.string().required(),
  slug: yup
    .string()
    .required()
    .min(3)
    .max(16)
    .matches(/^[a-z][a-z0-9_]*$/, { message: '半角英数字とアンダースコアのみ使用可能です。' }),
  country: yup.string().required(),
  fightingStyle: yup.string().required(),
  story: yup.string().required(),
  description: yup.string().required(),
});

interface Props {
  character?: CharacterFormFragment;
  onSubmit: (attributes: CharacterAttributes) => void;
}

export const CharacterForm: React.FC<Props> = ({ character, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CharacterAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: character && {
      name: character.name,
      nameKana: character.nameKana,
      longName: character.longName,
      longNameKana: character.longNameKana,
      slug: character.slug,
      country: character.country,
      fightingStyle: character.fightingStyle,
      story: character.story,
      description: character.description,
      dlc: character.dlc,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormGroup label="名前" required>
          <Input {...register('name')} />
          {errors.name && <span>This field is required</span>}
        </FormGroup>

        <FormGroup label="カナ" required>
          <Input {...register('nameKana')} />
          {errors.nameKana && <span>This field is required</span>}
        </FormGroup>
      </FormGrid>

      <FormGrid>
        <FormGroup label="正式名称" required>
          <Input {...register('longName')} />
          {errors.longName && <span>This field is required</span>}
        </FormGroup>

        <FormGroup label="カナ(正式名称)" required>
          <Input {...register('longNameKana')} />
          {errors.longNameKana && <span>This field is required</span>}
        </FormGroup>
      </FormGrid>

      <FormGrid>
        <FormGroup label="ID(URLで使う名前)" required>
          <Input {...register('slug')} />
          {errors.slug?.message && <span>{errors.slug.message}</span>}
        </FormGroup>
      </FormGrid>

      <FormGrid>
        <FormGroup label="国籍" required>
          <Input {...register('country')} />
          {errors.country && <span>This field is required</span>}
        </FormGroup>

        <FormGroup label="格闘スタイル" required>
          <Input {...register('fightingStyle')} />
          {errors.fightingStyle && <span>This field is required</span>}
        </FormGroup>
      </FormGrid>

      <FormGroup label="公式ストーリー" required>
        <TextArea {...register('story')} />
      </FormGroup>

      <FormGroup label="キャラ解説" required>
        <TextArea {...register('description')} />
      </FormGroup>

      <FormGroup label="顔画像">
        <input
          type="file"
          accept="image/*"
          name="faceImageDummy"
          onChange={e => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
              if (!e.target) return;

              setValue('faceImage', e.target.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />
        <input type="hidden" name="faceImage" />
      </FormGroup>

      <FormGroup label="全体画像">
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

      <FormGroup>
        <CheckBox id="dlc" label="DLC">
          <input id="dlc" type="checkbox" {...register('dlc')} />
        </CheckBox>
      </FormGroup>

      <FormGroup>
        <Button type="submit" variant="contained">
          登録する
        </Button>
      </FormGroup>
    </form>
  );
};
