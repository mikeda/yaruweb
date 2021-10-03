import React, { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  AttackMoveAttributes,
  AttackMoveResultEnum,
  AttackMoveStateEnum,
  AttackTypeEnum,
  MoveFragment,
} from '@/lib/graphql/types';
import { Controller, useForm } from 'react-hook-form';
import { VideoPlayer } from '../MoveMedia/VideoPlayer';
import { nullableNumber } from '@/lib/validators/nullable_number';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { AttackMoveResultText, AttackMoveStateEnumText, AttackTypeEnumText } from '@/lib/graphql/enum_texts';
import { CommandForm } from './CommandForm';
import { MoveVideoInput } from './MoveVideoInput';

const schema = yup.object().shape({
  move: yup.object({
    name: yup.string().required(),
  }),
  attack: yup.object({
    startUpFrame: nullableNumber,
    blockFrame: nullableNumber,
    hitFrame: nullableNumber,
    counterFrame: nullableNumber,
  }),
});

interface Props {
  move?: MoveFragment;
  onSubmit: (attributes: AttackMoveAttributes) => void;
}

const frameCols: {
  label: string;
  result: 'attack.blockResult' | 'attack.hitResult' | 'attack.counterResult';
  frame: 'blockFrame' | 'hitFrame' | 'counterFrame';
  state: 'attack.blockState' | 'attack.hitState' | 'attack.counterState';
}[] = [
  {
    label: 'ガード',
    result: 'attack.blockResult',
    frame: 'blockFrame',
    state: 'attack.blockState',
  },
  {
    label: 'ヒット',
    result: 'attack.hitResult',
    frame: 'hitFrame',
    state: 'attack.hitState',
  },
  {
    label: 'カウンター',
    result: 'attack.counterResult',
    frame: 'counterFrame',
    state: 'attack.counterState',
  },
];

const checkboxes = [
  {
    label: 'パワークラッシュ',
    name: 'attack.powerCrush',
  },
  {
    label: 'ホーミング',
    name: 'attack.homing',
  },
  {
    label: 'スクリュー',
    name: 'attack.screw',
  },
  {
    label: 'ウォールバウンド',
    name: 'attack.wallBound',
  },
  {
    label: 'しゃがみステータス',
    name: 'attack.crouchingStatus',
  },
  {
    label: 'ジャンプステータス',
    name: 'attack.jumpStatus',
  },
] as const;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chips: {
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

export const AttackMoveForm: React.FC<Props> = ({ move, onSubmit }) => {
  const [moveVideo, setMoveVideo] = useState(move?.moveVideo);
  const classes = useStyles();

  move?.moveVideo;
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<AttackMoveAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: move
      ? {
          move: {
            moveVideoId: move.moveVideo?.id,
            name: move.name,
            kana: move.kana,
            commandList: move.commandList.map(c => ({ condition: c.condition, operations: c.operations })),
            note: move.note,
          },
          attack:
            move.moveable.__typename === 'AttackMove'
              ? {
                  startUpFrame: move.moveable.startUpFrame,
                  heights: move.moveable.heights,
                  damages: move.moveable.damages,
                  blockResult: move.moveable.blockResult,
                  blockFrame: move.moveable.blockFrame,
                  blockState: move.moveable.blockState,
                  hitResult: move.moveable.hitResult,
                  hitFrame: move.moveable.hitFrame,
                  hitState: move.moveable.hitState,
                  counterResult: move.moveable.counterResult,
                  counterFrame: move.moveable.counterFrame,
                  counterState: move.moveable.counterState,
                  powerCrush: move.moveable.powerCrush,
                  crouchingStatus: move.moveable.crouchingStatus,
                  jumpStatus: move.moveable.jumpStatus,
                  homing: move.moveable.homing,
                  screw: move.moveable.screw,
                  wallBound: move.moveable.wallBound,
                }
              : undefined,
        }
      : {
          move: {
            commandList: [],
          },
          attack: {
            heights: [],
            damages: [],
            blockResult: AttackMoveResultEnum.Normal,
            hitResult: AttackMoveResultEnum.Normal,
            counterResult: AttackMoveResultEnum.Normal,
            powerCrush: false,
            crouchingStatus: false,
            jumpStatus: false,
            homing: false,
            screw: false,
            wallBound: false,
          },
        },
  });
  const damageRef = useRef<HTMLInputElement>();
  const heightRef = useRef<HTMLSelectElement>();

  const heights = watch('attack.heights');
  const damages = watch('attack.damages');
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
              判定
            </Typography>

            <div className={classes.chips}>
              {heights.map((h, i) => (
                <Chip variant="outlined" key={i} label={AttackTypeEnumText[h]} />
              ))}
            </div>

            <div className={classes.chips}>
              <FormControl variant="outlined" size="small">
                <Select defaultValue="h" inputRef={heightRef}>
                  {Object.entries(AttackTypeEnumText).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                onClick={() => {
                  if (!heightRef.current) return;

                  const height = heightRef.current.value as AttackTypeEnum;
                  if (height) {
                    setValue('attack.heights', [...heights, height]);
                  }
                }}
              >
                追加
              </Button>

              <Button
                onClick={() => {
                  setValue('attack.heights', heights.slice(0, -1));
                }}
              >
                削除
              </Button>
            </div>
          </Box>

          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              ダメージ
            </Typography>

            <div className={classes.chips}>
              {damages.map((d, i) => (
                <Chip variant="outlined" key={i} label={d} />
              ))}
              <Chip label={`合計 ${damages.reduce((a, b) => a + b, 0)}`} />
            </div>

            <div className={classes.chips}>
              <TextField inputRef={damageRef} type="number" size="small" defaultValue={10} />
              <Button
                onClick={() => {
                  if (!damageRef.current?.value) return;

                  const damage = Number(damageRef.current.value);
                  if (damage) {
                    setValue('attack.damages', [...damages, damage]);
                  }
                }}
              >
                追加
              </Button>
              <Button
                onClick={() => {
                  setValue('attack.damages', damages.slice(0, -1));
                }}
              >
                削除
              </Button>
            </div>
          </Box>

          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              発生
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="attack.startUpFrame"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="フレーム"
                      size="small"
                      fullWidth
                      error={Boolean(errors.attack?.startUpFrame)}
                      helperText={errors.attack?.startUpFrame?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>

          {frameCols.map(({ label, result: resultKey, frame: frameKey, state: stateKey }) => (
            <Box key={label} mt={4}>
              <Typography variant="h4" gutterBottom>
                {label}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Controller
                      control={control}
                      name={resultKey}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={e => {
                            const result = e.target.value as AttackMoveResultEnum;
                            setValue(resultKey, result);
                          }}
                        >
                          {Object.entries(AttackMoveResultText).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name={`attack.${frameKey}`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="フレーム"
                        size="small"
                        fullWidth
                        error={Boolean(errors.attack && errors.attack[frameKey])}
                        helperText={errors.attack && errors.attack[frameKey]?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>相手の状態</InputLabel>
                    <Controller
                      control={control}
                      name={stateKey}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={e => {
                            const result = e.target.value as AttackMoveStateEnum;
                            setValue(stateKey, result);
                          }}
                        >
                          {Object.entries(AttackMoveStateEnumText).map(([key, value]) => (
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
          ))}

          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              ステータス
            </Typography>
            <Grid container spacing={2}>
              {checkboxes.map(({ label, name }) => (
                <Grid key={name} item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Controller
                        name={name}
                        render={({ field }) => <Checkbox {...field} checked={field.value} />}
                        control={control}
                      />
                    }
                    label={label}
                  />
                </Grid>
              ))}
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
