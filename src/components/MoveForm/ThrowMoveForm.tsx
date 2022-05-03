import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
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

import {
  ThrowMoveAttributes,
  MoveFragment,
  ThrowMoveResultEnum,
  ThrowTypeEnum,
  ThrowEscapeEnum,
  MovePositionSelectFragment,
  NullableNumberSchema,
  ThrowEscapeEnumText,
  ThrowMoveResultText,
  ThrowTypeEnumText,
} from '@/lib';
import { CommandForm } from './CommandForm';

const schema = yup.object().shape({
  move: yup.object({
    name: yup.string().required(),
  }),
  throw: yup.object({
    damage: yup.number().required(),
    startUpFrame: NullableNumberSchema,
    finishFrame: NullableNumberSchema,
  }),
});

interface Props {
  move?: MoveFragment;
  moves: MovePositionSelectFragment[];
  onSubmit: (attributes: ThrowMoveAttributes) => void;
  copy?: boolean;
}

export const ThrowMoveForm: React.FC<Props> = ({ move, moves, onSubmit, copy = false }) => {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ThrowMoveAttributes>({
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
          throw:
            move.moveable.__typename === 'ThrowMove'
              ? {
                  throwType: move.moveable.throwType,
                  startUpFrame: move.moveable.startUpFrame,
                  damage: move.moveable.damage || undefined,
                  throwResult: move.moveable.throwResult,
                  throwEscape: move.moveable.throwEscape,
                }
              : undefined,
        }
      : {
          move: {
            command: [],
            position: moves.length > 0 ? moves[moves.length - 1].position + 1 : 0,
          },
          throw: {
            throwType: ThrowTypeEnum.High,
            throwResult: ThrowMoveResultEnum.Down,
            throwEscape: ThrowEscapeEnum.LpOrRp,
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

          <Box mt={4}>
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

          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>種別</InputLabel>
                  <Controller
                    control={control}
                    name="throw.throwType"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={e => {
                          const result = e.target.value as ThrowTypeEnum;
                          setValue('throw.throwType', result);
                        }}
                      >
                        {Object.entries(ThrowTypeEnumText).map(([key, value]) => (
                          <MenuItem key={key} value={key}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="throw.startUpFrame"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type="number" label="発生フレーム" size="small" fullWidth />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="throw.damage"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="ダメージ"
                      error={Boolean(errors.throw?.damage)}
                      helperText={errors.throw?.damage?.message}
                      size="small"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>投げ後の相手</InputLabel>
                  <Controller
                    control={control}
                    name="throw.throwResult"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={e => {
                          const result = e.target.value as ThrowMoveResultEnum;
                          setValue('throw.throwResult', result);
                        }}
                      >
                        {Object.entries(ThrowMoveResultText).map(([key, value]) => (
                          <MenuItem key={key} value={key}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>投げ抜け</InputLabel>
                  <Controller
                    control={control}
                    name="throw.throwEscape"
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={e => {
                          const result = e.target.value as ThrowEscapeEnum;
                          setValue('throw.throwEscape', result);
                        }}
                      >
                        {Object.entries(ThrowEscapeEnumText).map(([key, value]) => (
                          <MenuItem key={key} value={key}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>

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
