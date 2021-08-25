import React from 'react';
import { Control, Controller, useForm, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  CharacterSelectOptionFragment,
  DashboardBattlesPageBattleReslutFragment,
  DashboardBattlesPageSideFragment,
  PlayerSelectOptionFragment,
  BattleAttributes,
  BattleRound,
} from '@/lib/graphql/types';
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
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { BattleRoundText } from '@/lib/graphql/enum_texts';

const schema = yup.object().shape({
  startSec: yup.number().required(),
});

interface Props {
  battle: DashboardBattlesPageBattleReslutFragment;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  onSubmit: (attributes: BattleAttributes) => void;
}

export const BattleUpdateForm: React.FC<Props> = ({ battle, players, characters, onSubmit }) => {
  const {
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BattleAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      startSec: battle.startSec,
      round: battle.round,
      sides: battle.sides.map(s => ({
        playerId: s.player.id,
        characterId: s.character.id,
        rounds: s.rounds,
      })),
    },
  });

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Controller
                name="startSec"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="開始時間"
                    error={Boolean(errors.startSec)}
                    helperText={errors.startSec?.message}
                    defaultValue={0}
                    size="small"
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>試合</InputLabel>
                <Controller
                  name="round"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={e => {
                        const round = e.target.value as BattleRound | undefined;
                        setValue('round', round || null);
                      }}
                    >
                      <MenuItem>指定なし</MenuItem>
                      {Object.entries(BattleRoundText).map(([key, value]) => (
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

          <Grid container spacing={2}>
            <SideForm
              index={0}
              side={battle.sides[0]}
              players={players}
              characters={characters}
              control={control}
              setValue={setValue}
              getValues={getValues}
            />
            <SideForm
              index={1}
              side={battle.sides[1]}
              players={players}
              characters={characters}
              control={control}
              setValue={setValue}
              getValues={getValues}
            />
          </Grid>
        </CardContent>

        <Divider />

        <Box m={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained">
            更新する
          </Button>
        </Box>
      </form>
    </Card>
  );
};

interface SideFormProps {
  index: 0 | 1;
  side: DashboardBattlesPageSideFragment;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  control: Control<BattleAttributes>;
  getValues: UseFormGetValues<BattleAttributes>;
  setValue: UseFormSetValue<BattleAttributes>;
}

export const SideForm: React.FC<SideFormProps> = ({ index, side, players, characters, control, setValue }) => {
  const player = players.filter(p => p.id === side.player.id)[0];
  const character = characters.filter(c => c.id === side.character.id)[0];

  return (
    <>
      <Grid item xs={5}>
        <Autocomplete<PlayerSelectOptionFragment, undefined, true>
          options={players}
          defaultValue={player}
          getOptionLabel={player => `${player.name}(${player.slug})`}
          onChange={(e, player) => {
            if (player) setValue(`sides.${index}.playerId`, player.id);
          }}
          renderInput={params => <TextField {...params} label="プレイヤー" variant="outlined" fullWidth size="small" />}
          disableClearable
        />
      </Grid>

      <Grid item xs={5}>
        <Autocomplete<CharacterSelectOptionFragment, undefined, true>
          options={characters}
          defaultValue={character}
          getOptionLabel={character => `${character.name}(${character.slug})`}
          onChange={(e, character) => {
            if (character) setValue(`sides.${index}.characterId`, character.id);
          }}
          renderInput={params => (
            <TextField {...params} label="キャラクター" variant="outlined" fullWidth size="small" />
          )}
          disableClearable
        />
      </Grid>

      <Grid item xs={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>ラウンド</InputLabel>
          <Controller
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            )}
            control={control}
            name={`sides.${index}.rounds`}
            defaultValue={3}
          />
        </FormControl>
      </Grid>
    </>
  );
};
