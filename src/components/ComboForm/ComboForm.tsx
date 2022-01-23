import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { nullableNumber } from '@/lib/validators/nullable_number';

import { ComboAttributes, ComboFragment, ComboPositionSelectFragment } from '@/lib/graphql/types';
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
  Typography,
} from '@mui/material';
import { CommandForm } from './CommandForm';
import { Controller, useForm } from 'react-hook-form';
import { Command } from '..';

const schema = yup.object().shape({
  damage: nullableNumber,
});

interface Props {
  combo?: ComboFragment;
  combos: ComboPositionSelectFragment[];
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, combos, onSubmit }) => {
  const { handleSubmit, setValue, watch, control } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo
      ? {
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
