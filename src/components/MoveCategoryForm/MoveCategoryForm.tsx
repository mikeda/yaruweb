import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MoveCategoryAttributes, MoveCategoryFragment } from '@/generated/graphql';

interface Props {
  moveCategory?: MoveCategoryFragment;
  moveCategories: MoveCategoryFragment[];
  onSubmit: (attributes: MoveCategoryAttributes) => void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const MoveCategoryForm: React.FC<Props> = ({ moveCategory, moveCategories, onSubmit }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<MoveCategoryAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: moveCategory
      ? {
          name: moveCategory.name,
          position: moveCategory.position,
        }
      : {
          position: moveCategories.length > 0 ? moveCategories[moveCategories.length - 1].position + 1 : 0,
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

          <Box mt={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>表示順</InputLabel>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={e => {
                      const position = Number(e.target.value);
                      setValue('position', position);
                    }}
                  >
                    <MenuItem value={0}>先頭</MenuItem>
                    {moveCategories.map((m, i) => (
                      <MenuItem key={m.id} value={m.position + 1}>
                        {m.name}の後ろ
                        {i == moveCategories.length && '(最後)'}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
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
