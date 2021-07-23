import React from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  battle?: TournamentBattleFormFragment;
  onClickGetPlayerTime: (callback: (playerSec: number) => void) => void;
  onClickSetPlayerTime: (startSec: number) => void;
  onSubmit: (attributes: TournamentBattleAttributes) => void;
}

export const TournamentBattleForm: React.FC<Props> = ({
  battle,
  onClickGetPlayerTime,
  onClickSetPlayerTime,
  onSubmit,
}) => {
  //const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
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
    defaultValues: battle && {
      tournamentVideoId: battle.tournamentVideo.id,
      startSec: battle.startSec,
      round: battle.round,
      winner: battle.winner.slug,
      loser: battle.loser.slug,
      winnerCharacter: battle.winnerCharacter.slug,
      loserCharacter: battle.loserCharacter.slug,
      winnerRounds: battle.winnerRounds,
      loserRounds: battle.loserRounds,
    },
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
                  <Grid item xs={5}>
                    <Autocomplete<PlayerSelectOptionFragment>
                      options={playerData.players.records}
                      getOptionLabel={player => `${player.name}(${player.slug})`}
                      onChange={(e, player) => {
                        if (player) setValue('winner', player.slug);
                      }}
                      style={{ width: 300 }}
                      renderInput={params => <TextField {...params} label="Winner" variant="outlined" fullWidth />}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <Autocomplete<CharacterSelectOptionFragment>
                      options={characterData.characters}
                      getOptionLabel={character => `${character.name}(${character.slug})`}
                      onChange={(e, character) => {
                        if (character) setValue('winnerCharacter', character.slug);
                      }}
                      style={{ width: 300 }}
                      renderInput={params => (
                        <TextField {...params} label="Winner Character" variant="outlined" fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined">
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
                        name="winnerRounds"
                        defaultValue={3}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={5}>
                    <Autocomplete<PlayerSelectOptionFragment>
                      options={playerData.players.records}
                      getOptionLabel={player => `${player.name}(${player.slug})`}
                      onChange={(e, player) => {
                        if (player) setValue('loser', player.slug);
                      }}
                      style={{ width: 300 }}
                      renderInput={params => <TextField {...params} label="Loser" variant="outlined" />}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <Autocomplete<CharacterSelectOptionFragment>
                      options={characterData.characters}
                      getOptionLabel={character => `${character.name}(${character.slug})`}
                      onChange={(e, character) => {
                        if (character) setValue('loserCharacter', character.slug);
                      }}
                      style={{ width: 300 }}
                      renderInput={params => (
                        <TextField {...params} label="Loser Character" variant="outlined" fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined">
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
                        name="loserRounds"
                        defaultValue={0}
                      />
                    </FormControl>
                  </Grid>
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
