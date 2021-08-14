import React from 'react';
import { Control, Controller, useForm, UseFormSetValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CharacterSelectOptionFragment, PlayerSelectOptionFragment, BattleAttributes } from '@/lib/graphql/types';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { GetApp, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import { BattleRoundText } from '@/lib/graphql/enum_texts';

const schema = yup.object().shape({
  startSec: yup.number().required(),
});

interface Props {
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  onClickGetPlayerTime: (callback: (playerSec: number) => void) => void;
  onClickSetPlayerTime: (startSec: number) => void;
  onClick15SecAgo: () => void;
  onClick15SecLater: () => void;
  onSubmit: (attributes: BattleAttributes) => void;
}

export const BattleForm: React.FC<Props> = ({
  players,
  characters,
  onClickGetPlayerTime,
  onClickSetPlayerTime,
  onClick15SecAgo,
  onClick15SecLater,
  onSubmit,
}) => {
  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BattleAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Controller
            name="startSec"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="開始時間"
                error={Boolean(errors.startSec)}
                helperText={errors.startSec?.message}
                defaultValue={0}
              />
            )}
          />

          <Tooltip title="プレイヤーの時間を取得">
            <IconButton
              size="small"
              onClick={() => {
                onClickGetPlayerTime(playerSec => {
                  setValue('startSec', Math.floor(playerSec));
                });
              }}
            >
              <GetApp />
            </IconButton>
          </Tooltip>

          <Tooltip title="プレイヤーの時間を移動">
            <IconButton
              size="small"
              onClick={() => {
                onClickSetPlayerTime(getValues('startSec'));
              }}
            >
              <PlayArrow />
            </IconButton>
          </Tooltip>

          <Tooltip title="15秒戻る">
            <IconButton size="small" onClick={onClick15SecAgo}>
              <SkipPrevious />
            </IconButton>
          </Tooltip>

          <Tooltip title="15秒進む">
            <IconButton size="small" onClick={onClick15SecLater}>
              <SkipNext />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>試合</InputLabel>
            <Controller
              render={({ field }) => (
                <Select {...field}>
                  {Object.entries(BattleRoundText).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
              name="round"
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <SideForm index={0} players={players} characters={characters} control={control} setValue={setValue} />
        <SideForm index={1} players={players} characters={characters} control={control} setValue={setValue} />
      </Grid>

      <Box mt={2} display="flex" justifyContent="center">
        <Button type="submit" variant="contained">
          登録する
        </Button>
      </Box>
    </form>
  );
};

interface SideFormProps {
  index: 0 | 1;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  control: Control<BattleAttributes>;
  setValue: UseFormSetValue<BattleAttributes>;
}

export const SideForm: React.FC<SideFormProps> = ({ index, players, characters, control, setValue }) => {
  return (
    <>
      <Grid item xs={5}>
        <Autocomplete<PlayerSelectOptionFragment, undefined, true>
          options={players}
          getOptionLabel={player => `${player.name}(${player.slug})`}
          onChange={(e, player) => {
            if (player) setValue(`sides.${index}.playerId`, player.id);
          }}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label="プレイヤー" variant="outlined" fullWidth size="small" />}
          disableClearable
        />
      </Grid>

      <Grid item xs={5}>
        <Autocomplete<CharacterSelectOptionFragment, undefined, true>
          options={characters}
          getOptionLabel={character => `${character.name}(${character.slug})`}
          onChange={(e, character) => {
            if (character) setValue(`sides.${index}.characterId`, character.id);
          }}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField {...params} label="キャラクター" variant="outlined" fullWidth size="small" />
          )}
          disableClearable
        />
      </Grid>

      <Grid item xs={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>取得ラウンド</InputLabel>
          <Controller
            control={control}
            name={`sides.${index}.rounds`}
            defaultValue={3}
            render={({ field }) => (
              <Select
                {...field}
                onChange={e => {
                  const rounds = Number(e.target.value);
                  setValue(`sides.${index}.rounds`, rounds);

                  if (rounds !== 3) {
                    if (index === 0) {
                      setValue(`sides.1.rounds`, 3);
                    } else {
                      setValue(`sides.0.rounds`, 3);
                    }
                  }
                }}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
    </>
  );
};
