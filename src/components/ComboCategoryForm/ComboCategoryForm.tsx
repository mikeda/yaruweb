import React from 'react';
import * as yup from 'yup';

import { Controller, useForm } from 'react-hook-form';
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
import { yupResolver } from '@hookform/resolvers/yup';

import { ComboCategoryAttributes, ComboCategoryFragment } from '@/lib';

interface Props {
  comboCategory?: ComboCategoryFragment;
  comboCategories: ComboCategoryFragment[];
  onSubmit: (attributes: ComboCategoryAttributes) => void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const ComboCategoryForm: React.FC<Props> = ({ comboCategory, comboCategories, onSubmit }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ComboCategoryAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: comboCategory
      ? {
          name: comboCategory.name,
          position: comboCategory.position,
        }
      : {
          position: comboCategories.length > 0 ? comboCategories[comboCategories.length - 1].position + 1 : 0,
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
                    {comboCategories.map((m, i) => (
                      <MenuItem key={m.id} value={m.position + 1}>
                        {m.name}の後ろ
                        {i == comboCategories.length && '(最後)'}
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
