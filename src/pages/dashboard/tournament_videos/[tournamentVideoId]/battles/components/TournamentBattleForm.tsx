import React from 'react';
import { Control, Controller, useForm, UseFormSetValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  CharacterSelectOptionFragment,
  PlayerSelectOptionFragment,
  TournamentBattleAttributes,
  TournamentBattleFormFragment,
  useCharacterSelectOptionsQuery,
  usePlayerSelectOptionsQuery,
} from '@/lib/graphql/types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
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
import { GetApp, PlayArrow } from '@material-ui/icons';
import { TournamentBattleRoundText } from '@/lib/graphql/enum_texts';

const schema = yup.object().shape({
  startSec: yup.number().required(),
});

interface Props {
  onClickGetPlayerTime: (callback: (playerSec: number) => void) => void;
  onClickSetPlayerTime: (startSec: number) => void;
  onSubmit: (attributes: TournamentBattleAttributes) => void;
}

export const TournamentBattleForm: React.FC<Props> = ({ onClickGetPlayerTime, onClickSetPlayerTime, onSubmit }) => {
  const { data: playerData } = usePlayerSelectOptionsQuery();
  const { data: characterData } = useCharacterSelectOptionsQuery();
  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentBattleAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <>
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
                    />
                  )}
                />
                <Tooltip title="プレイヤーの時間を取得">
                  <IconButton
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
                    onClick={() => {
                      onClickSetPlayerTime(getValues('startSec'));
                    }}
                  >
                    <PlayArrow />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>試合</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select {...field}>
                        {Object.entries(TournamentBattleRoundText).map(([key, value]) => (
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
              {playerData && characterData && (
                <>
                  <SideForm
                    index={0}
                    players={playerData.players.records}
                    characters={characterData.characters}
                    control={control}
                    setValue={setValue}
                  />
                  <SideForm
                    index={1}
                    players={playerData.players.records}
                    characters={characterData.characters}
                    control={control}
                    setValue={setValue}
                  />
                </>
              )}

              {characterData && <></>}
            </Grid>
          </CardContent>

          <Divider />

          <Box m={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              登録する
            </Button>
          </Box>
        </form>
      </Card>
    </>
  );
};

interface SideFormProps {
  index: 0 | 1;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  control: Control<TournamentBattleAttributes>;
  setValue: UseFormSetValue<TournamentBattleAttributes>;
}

export const SideForm: React.FC<SideFormProps> = ({ index, players, characters, control, setValue }) => {
  return (
    <>
      <Grid item xs={5}>
        <Autocomplete<PlayerSelectOptionFragment>
          options={players}
          getOptionLabel={player => `${player.name}(${player.slug})`}
          onChange={(e, player) => {
            if (player) setValue(`sides.${index}.playerId`, player.id);
          }}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label="プレイヤー" variant="outlined" fullWidth />}
        />
      </Grid>

      <Grid item xs={5}>
        <Autocomplete<CharacterSelectOptionFragment>
          options={characters}
          getOptionLabel={character => `${character.name}(${character.slug})`}
          onChange={(e, character) => {
            if (character) setValue(`sides.${index}.characterId`, character.id);
          }}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label="キャラクター" variant="outlined" fullWidth />}
        />
      </Grid>

      <Grid item xs={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>取得ラウンド</InputLabel>
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
