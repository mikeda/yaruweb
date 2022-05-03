import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NullableNumberSchema } from '@/lib/yup/CustomSchema';

import { ComboAttributes, ComboFragment, ComboPositionSelectFragment, MoveSelectOptionFragment } from '@/lib/$types';
import {
  Autocomplete,
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
  Typography,
} from '@mui/material';
import { CommandForm } from './CommandForm';
import { Controller, useForm } from 'react-hook-form';
import { Command } from '..';

const schema = yup.object().shape({
  damage: NullableNumberSchema,
});

interface Option {
  id: string;
  name: string;
  categoryName: string;
}

interface Props {
  combo?: ComboFragment;
  combos: ComboPositionSelectFragment[];
  moveCategories: MoveSelectOptionFragment[];
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, combos, moveCategories, onSubmit }) => {
  const { handleSubmit, setValue, watch, control } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo
      ? {
          moveId: combo.move?.id,
          command: combo.command,
          damage: combo.damage,
          note: combo.note,
          position: combo.position,
        }
      : {
          command: [],
          position: combos.length > 0 ? combos[combos.length - 1].position + 1 : 0,
        },
  });

  const command = watch('command');

  const options: Option[] = [];
  moveCategories.forEach(moveCategory => {
    moveCategory.moves.forEach(move => {
      options.push({
        id: move.id,
        name: move.name,
        categoryName: moveCategory.name,
      });
    });
  });

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

          <Box mt={4}>
            <Controller
              name="damage"
              control={control}
              render={({ field }) => <TextField {...field} type="number" label="ダメージ" size="small" />}
            />
          </Box>

          <Box mt={4}>
            <Controller
              name="note"
              control={control}
              render={({ field }) => <TextField {...field} label="備考" size="small" multiline fullWidth />}
            />
          </Box>

          <Box mt={4}>
            <Autocomplete<Option, undefined, true>
              defaultValue={combo?.move ? options.filter(o => o.id === combo?.move?.id)[0] : undefined}
              options={options}
              getOptionLabel={option => option.name}
              groupBy={option => option.categoryName}
              onChange={(e, option) => {
                setValue('moveId', option.id);
              }}
              renderInput={params => (
                <TextField {...params} label="コンボ始動技" variant="outlined" fullWidth size="small" />
              )}
              disableClearable
            />
          </Box>

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
                    {combos.map((c, i) => (
                      <MenuItem key={c.id} value={c.position + 1}>
                        <Command command={c.command} /> の後ろ
                        {i == combos.length && '(最後)'}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
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
