import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ComboAttributes, ComboFragment, useMoveSelectOptionsQuery } from '@/lib/graphql/types';
import { FormGroup } from '@/components/form/FormGroup';
import { Input } from '@/components/form/Input';
import { TextArea } from '../form/TextArea';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { CommandForm } from './CommandForm';
import { Controller, useForm } from 'react-hook-form';

const schema = yup.object().shape({
  startUpFrame: yup.number().integer().min(0),
});

interface Props {
  combo?: ComboFragment;
  characterSlug: string;
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, characterSlug, onSubmit }) => {
  const { data } = useMoveSelectOptionsQuery({ variables: { characterSlug } });

  const { register, handleSubmit, setValue, watch, control } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo
      ? {
          command: { condition: combo.command.condition, operations: combo.command.operations },
          damage: combo.damage,
          moveId: combo.move?.id,
          note: combo.note,
        }
      : {
          command: { operations: [] },
        },
  });

  if (!data) return null;

  const command = watch('command');

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
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

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>コンボ始動</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={e => {
                      const id = e.target.value as string | undefined;
                      setValue('moveId', id || null);
                    }}
                  >
                    <MenuItem>指定なし</MenuItem>
                    {data.moveCategories.map(moveCategory => [
                      <ListSubheader key={moveCategory.id}>{moveCategory.name}</ListSubheader>,
                      moveCategory.moves.map(move => (
                        <MenuItem key={move.id} value={move.id}>
                          {move.name}
                        </MenuItem>
                      )),
                    ])}
                  </Select>
                )}
                control={control}
                name="moveId"
              />
            </FormControl>
          </Grid>

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
