import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { nullableNumber } from '@/lib/validators/nullable_number';

import { ComboAttributes, ComboFragment, useMoveSelectOptionsQuery } from '@/lib/graphql/types';
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
  TextField,
  Typography,
} from '@mui/material';
import { CommandForm } from './CommandForm';
import { Controller, useForm } from 'react-hook-form';

const schema = yup.object().shape({
  damage: nullableNumber,
});

interface Props {
  combo?: ComboFragment;
  characterSlug: string;
  onSubmit: (attributes: ComboAttributes) => void;
}

export const ComboForm: React.FC<Props> = ({ combo, characterSlug, onSubmit }) => {
  const { data } = useMoveSelectOptionsQuery({ variables: { characterSlug } });

  const { handleSubmit, setValue, watch, control } = useForm<ComboAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: combo
      ? {
          command: combo.command,
          damage: combo.damage,
          moveId: combo.move?.id,
          note: combo.note,
        }
      : {
          command: [],
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
