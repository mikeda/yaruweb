import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CommandForm } from './CommandForm';

import { ReversalMoveAttributes, MoveFragment, MovePositionSelectFragment } from '@/generated/graphql';
import { NullableNumberSchema } from '@/lib';

const schema = yup.object().shape({
  move: yup.object({
    name: yup.string().required(),
  }),
  reversal: yup.object({
    type: yup.string().required(),
    startUpFrame: NullableNumberSchema,
    finishFrame: NullableNumberSchema,
  }),
});

interface Props {
  move?: MoveFragment;
  moves: MovePositionSelectFragment[];
  onSubmit: (attributes: ReversalMoveAttributes) => void;
  copy?: boolean;
}

export const ReversalMoveForm: React.FC<Props> = ({ move, moves, onSubmit, copy }) => {
  move?.moveVideo;
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ReversalMoveAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: move
      ? {
          move: {
            name: move.name,
            kana: move.kana,
            command: move.command,
            statusAfter: move.statusAfter,
            note: move.note,
            position: copy ? move.position + 1 : move.position,
          },
          reversal:
            move.moveable.__typename === 'ReversalMove'
              ? {
                  type: move.moveable.type,
                  startUpFrame: move.moveable.startUpFrame,
                  finishFrame: move.moveable.finishFrame,
                }
              : undefined,
        }
      : {
          move: {
            command: [],
            position: moves.length > 0 ? moves[moves.length - 1].position + 1 : 0,
          },
          reversal: {
            type: '',
          },
        },
  });

  const command = watch('move.command');

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="move.name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="名前"
                    error={Boolean(errors.move?.name)}
                    helperText={errors.move?.name?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="move.kana"
                control={control}
                render={({ field }) => <TextField {...field} label="カナ" size="small" fullWidth />}
              />
            </Grid>
          </Grid>

          <Box mt={4} mb={4}>
            <Typography variant="h4" gutterBottom>
              コマンド
            </Typography>

            <CommandForm
              command={command}
              onChange={newCommand => {
                setValue(`move.command`, newCommand);
              }}
            />
          </Box>

          <Box mt={4}>
            <Controller
              name="move.statusAfter"
              control={control}
              render={({ field }) => <TextField {...field} type="text" label="技後の状態" size="small" fullWidth />}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="reversal.type"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="種別"
                    error={Boolean(errors.reversal?.type)}
                    helperText={errors.reversal?.type?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="reversal.startUpFrame"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="受付開始フレーム"
                    error={Boolean(errors.reversal?.startUpFrame)}
                    helperText={errors.reversal?.startUpFrame?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="reversal.finishFrame"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="受付終了フレーム"
                    error={Boolean(errors.reversal?.startUpFrame)}
                    helperText={errors.reversal?.startUpFrame?.message}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="move.note"
                  control={control}
                  render={({ field }) => <TextField {...field} label="備考" fullWidth multiline />}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mt={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>表示順</InputLabel>
              <Controller
                name="move.position"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={e => {
                      const position = Number(e.target.value);
                      setValue('move.position', position);
                    }}
                  >
                    <MenuItem value={0}>先頭</MenuItem>
                    {moves.map((m, i) => (
                      <MenuItem key={m.id} value={m.position + 1}>
                        {m.name}の後ろ
                        {i == moves.length && '(最後)'}
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
