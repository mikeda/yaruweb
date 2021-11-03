import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReversalMoveAttributes, MoveFragment } from '@/lib/graphql/types';
import { Controller, useForm } from 'react-hook-form';
import { nullableNumber } from '@/lib/validators/nullable_number';
import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material';
import { CommandForm } from './CommandForm';

const schema = yup.object().shape({
  move: yup.object({
    name: yup.string().required(),
  }),
  reversal: yup.object({
    type: yup.string().required(),
    startUpFrame: nullableNumber,
    finishFrame: nullableNumber,
  }),
});

interface Props {
  move?: MoveFragment;
  onSubmit: (attributes: ReversalMoveAttributes) => void;
}

export const ReversalMoveForm: React.FC<Props> = ({ move, onSubmit }) => {
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
            commandList: move.commandList.map(c => ({ condition: c.condition, operations: c.operations })),
            note: move.note,
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
            commandList: [],
          },
          reversal: {
            type: '',
          },
        },
  });

  const commandList = watch('move.commandList');

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

            {commandList.map((command, i) => (
              <CommandForm
                key={i}
                command={command}
                onChange={newCommand => {
                  setValue(
                    `move.commandList`,
                    commandList.map((command, j) => (i === j ? { ...newCommand } : { ...command })),
                  );
                }}
                onDelete={() => {
                  setValue(
                    `move.commandList`,
                    commandList.filter((command, j) => i !== j),
                  );
                }}
              />
            ))}

            <Button
              variant="outlined"
              onClick={() => {
                setValue(`move.commandList`, [...commandList, { operations: [] }]);
              }}
            >
              Add
            </Button>
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
