import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ThrowMoveAttributes, MoveFragment } from '@/lib/graphql/types';
import { Controller, useForm } from 'react-hook-form';
import { VideoPlayer } from '../MoveMedia/VideoPlayer';
import { nullableNumber } from '@/lib/validators/nullable_number';
import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { CommandForm } from './CommandForm';
import { MoveVideoInput } from './MoveVideoInput';

const schema = yup.object().shape({
  move: yup.object({
    name: yup.string().required(),
  }),
  throw: yup.object({
    startUpFrame: nullableNumber,
  }),
});

interface Props {
  move?: MoveFragment;
  onSubmit: (attributes: ThrowMoveAttributes) => void;
}

export const ThrowMoveForm: React.FC<Props> = ({ move, onSubmit }) => {
  const [moveVideo, setMoveVideo] = useState(move?.moveVideo);

  move?.moveVideo;
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ThrowMoveAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: move && {
      move: {
        moveVideoId: move.moveVideo?.id,
        name: move.name,
        kana: move.kana,
        commandList: move.commandList.map(c => ({ condition: c.condition, operations: c.operations })),
        note: move.note,
      },
      throw:
        move.moveable.__typename === 'ThrowMove'
          ? {
              startUpFrame: move.moveable.startUpFrame,
              damage: move.moveable.damage,
              throwResult: move.moveable.throwResult,
              throwEscape: move.moveable.throwEscape,
            }
          : undefined,
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

          <Box mt={4}>
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

          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              発生
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="throw.startUpFrame"
                  control={control}
                  render={({ field }) => <TextField {...field} type="number" label="フレーム" size="small" fullWidth />}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              動画
            </Typography>
            <Box>
              <MoveVideoInput
                onCreate={moveVideo => {
                  setValue('move.moveVideoId', moveVideo.id);
                  setMoveVideo(null);
                }}
              />
            </Box>

            {moveVideo && (
              <Box mt={1}>
                <VideoPlayer src={moveVideo.m3u8Url} thumnailUrl={moveVideo.thumbnailUrl} width={320} />
              </Box>
            )}
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
