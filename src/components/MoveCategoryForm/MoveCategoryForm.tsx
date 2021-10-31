import React from 'react';
import * as yup from 'yup';

import { MoveCategoryAttributes, MoveCategoryFragment } from '@/lib/graphql/types';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Card, CardContent, Divider, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  moveCategory?: MoveCategoryFragment;
  onSubmit: (attributes: MoveCategoryAttributes) => void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const MoveCategoryForm: React.FC<Props> = ({ moveCategory, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MoveCategoryAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: moveCategory && {
      name: moveCategory.name,
    },
  });

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="名前" error={Boolean(errors.name)} helperText={errors.name?.message} />
            )}
          />
        </CardContent>
        <Divider />
        <Box m={2} justifyContent="flex-end">
          <Button type="submit" variant="contained">
            登録する
          </Button>
        </Box>
      </form>
    </Card>
  );
};
