import React from 'react';

import { ComboCategoryAttributes, ComboCategoryFragment } from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import { Button } from '@mui/material';

interface Props {
  comboCategory?: ComboCategoryFragment;
  onSubmit: (attributes: ComboCategoryAttributes) => void;
}

export const ComboCategoryForm: React.FC<Props> = ({ comboCategory, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComboCategoryAttributes>({
    defaultValues: comboCategory && {
      name: comboCategory.name,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前">
        <Input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup>
        <Button type="submit" variant="contained">
          登録する
        </Button>
      </FormGroup>
    </form>
  );
};
