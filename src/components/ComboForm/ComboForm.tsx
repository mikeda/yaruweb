import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ComboAttributes, ComboFragment } from '@/lib/graphql/types';
import { Controller, useForm } from 'react-hook-form';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import { TextArea } from '../form/TextArea';
import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { CommandForm } from './CommandForm';

const schema = yup.object().shape({
  name: yup.string().required(),
  startUpFrame: yup.number().integer().min(0),
});

interface Props {
  combo?: ComboFragment;
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo
      ? {
          name: combo.name,
          command: { condition: combo.command.condition, operations: combo.command.operations },
          damage: combo.damage,
          note: combo.note,
        }
      : {
          command: { operations: [] },
        },
  });

  const command = watch('command');

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="名前"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              コマンド
            </Typography>

            <CommandForm
              command={command}
              onChange={newCommand => {
                setValue(`command`, newCommand);
              }}
            />
          </Box>

          <FormGroup label="ダメージ">
            <Input type="number" {...register('damage', { valueAsNumber: true })} />
          </FormGroup>

          <FormGroup label="備考">
            <TextArea {...register('note')} />
          </FormGroup>
        </CardContent>

        <Divider />

        <Box m={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained">
            登録する
          </Button>
        </Box>
      </form>
    </Card>
  );
};
