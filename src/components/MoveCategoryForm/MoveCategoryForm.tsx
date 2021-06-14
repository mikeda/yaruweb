import React from 'react';

import { MoveCategoryAttributes, MoveCategoryFragment } from '@/lib/graphql/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Button';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';

interface Props {
  moveCategory?: MoveCategoryFragment;
  onSubmit: (attributes: MoveCategoryAttributes) => void;
}

export const MoveCategoryForm: React.FC<Props> = ({ moveCategory, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MoveCategoryAttributes>({
    defaultValues: moveCategory && {
      name: moveCategory.name,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前">
        <Input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" />
        </Button>
      </FormGroup>
    </form>
  );
};
