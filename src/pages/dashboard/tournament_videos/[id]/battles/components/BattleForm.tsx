import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { GetApp, PlayArrow } from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import { createFilterOptions } from '@mui/material/useAutocomplete';
import { Control, Controller, useForm, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import YouTube from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

import { YouTubeWrapper } from '@/components';

import * as yup from 'yup';

import {
  CharacterSelectOptionFragment,
  PlayerSelectOptionFragment,
  BattleAttributes,
  BattleRound,
  AdminBattlesPageBattleReslutFragment,
} from '@/generated/graphql';
import { BattleRoundText } from '@/lib';

const schema = yup.object().shape({
  startSec: yup.number().required(),
});

interface Props {
  youtubeVideoId: string;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  battle?: AdminBattlesPageBattleReslutFragment;
  onSubmit: (attributes: BattleAttributes) => void;
}

export const BattleForm: React.FC<Props> = ({ youtubeVideoId, players, characters, battle, onSubmit }) => {
  const [youTubePlayer, setYouTubePlayer] = useState<YouTubePlayer>();
  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BattleAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: battle
      ? {
          startSec: battle.startSec,
          round: battle.round,
          sides: battle.sides.map(s => ({
            playerId: s.player.id,
            characterId: s.character.id,
            rounds: s.rounds,
          })),
        }
      : {
          startSec: 0,
          round: BattleRound.Unspecified,
          sides: [
            { playerId: players[0]?.id, characterId: characters[0]?.id, rounds: 3 },
            { playerId: players[0]?.id, characterId: characters[0]?.id, rounds: 3 },
          ],
        },
  });

  const onClickGetPlayerTime = async () => {
    if (!youTubePlayer) return;

    const playerSec = await youTubePlayer.getCurrentTime();
    setValue('startSec', Math.floor(playerSec));
  };

  const onClickSetPlayerTime = () => {
    youTubePlayer?.seekTo(getValues('startSec'), true);
  };

  const onClick5SecAgo = async () => {
    if (!youTubePlayer) return;

    const currentTime = await youTubePlayer.getCurrentTime();
    youTubePlayer.seekTo(currentTime - 5, true);
  };

  const onClick5SecLater = async () => {
    if (!youTubePlayer) return;

    const currentTime = await youTubePlayer.getCurrentTime();
    youTubePlayer.seekTo(currentTime + 5, true);
  };

  const onClick15SecAgo = async () => {
    if (!youTubePlayer) return;

    const currentTime = await youTubePlayer.getCurrentTime();
    youTubePlayer.seekTo(currentTime - 15, true);
  };

  const onClick15SecLater = async () => {
    if (!youTubePlayer) return;

    const currentTime = await youTubePlayer.getCurrentTime();
    youTubePlayer.seekTo(currentTime + 15, true);
  };

  const onClickSwapSides = () => {
    const left = getValues('sides.0');
    const right = getValues('sides.1');
    setValue('sides.0', { ...right });
    setValue('sides.1', { ...left });
  };

  return (
    <>
      <Box display="flex" justifyContent="center" mb={2}>
        <Box width="100%" maxWidth={640}>
          <YouTubeWrapper>
            <YouTube
              videoId={youtubeVideoId}
              opts={{
                width: '854',
                height: '480',
                playerVars: { playsinline: 1, start: battle?.startSec, autoplay: battle ? 1 : 0 },
              }}
              onReady={event => {
                setYouTubePlayer(event.target);
              }}
            />
          </YouTubeWrapper>
        </Box>
      </Box>

      <Box p={2} component={Paper}>
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
                    type="number"
                    label="開始時間"
                    error={Boolean(errors.startSec)}
                    helperText={errors.startSec?.message}
                    defaultValue={0}
                  />
                )}
              />

              <Tooltip title="プレイヤーの時間を取得">
                <IconButton size="small" onClick={onClickGetPlayerTime}>
                  <GetApp />
                </IconButton>
              </Tooltip>

              <Tooltip title="プレイヤーの時間を移動">
                <IconButton size="small" onClick={onClickSetPlayerTime}>
                  <PlayArrow />
                </IconButton>
              </Tooltip>

              <Tooltip title="15秒戻る">
                <IconButton size="small" onClick={onClick15SecAgo}>
                  <KeyboardDoubleArrowLeftIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="5秒戻る">
                <IconButton size="small" onClick={onClick5SecAgo}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="5秒進む">
                <IconButton size="small" onClick={onClick5SecLater}>
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="15秒進む">
                <IconButton size="small" onClick={onClick15SecLater}>
                  <KeyboardDoubleArrowRightIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="サイド入れ替え">
                <IconButton size="small" onClick={onClickSwapSides}>
                  <SwapVertIcon />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>試合</InputLabel>
                <Controller
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={e => {
                        const round = e.target.value as BattleRound;
                        setValue('round', round);
                      }}
                    >
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

          <Grid container spacing={2} mt={1}>
            <SideForm
              index={0}
              players={players}
              characters={characters}
              control={control}
              playerId={getValues(`sides.0.playerId`)}
              characterId={getValues(`sides.0.characterId`)}
              getValues={getValues}
              setValue={setValue}
            />
            <SideForm
              index={1}
              players={players}
              characters={characters}
              control={control}
              playerId={getValues(`sides.1.playerId`)}
              characterId={getValues(`sides.1.characterId`)}
              getValues={getValues}
              setValue={setValue}
            />
          </Grid>

          <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              登録する
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

interface SideFormProps {
  index: 0 | 1;
  characterId?: string;
  playerId?: string;
  players: PlayerSelectOptionFragment[];
  characters: CharacterSelectOptionFragment[];
  control: Control<BattleAttributes>;
  getValues: UseFormGetValues<BattleAttributes>;
  setValue: UseFormSetValue<BattleAttributes>;
}

const SideForm: React.FC<SideFormProps> = ({ index, players, characters, control, setValue }) => {
  return (
    <>
      <Grid item xs={5}>
        <Controller
          control={control}
          name={`sides.${index}.playerId`}
          defaultValue={players[0]?.id}
          render={({ field }) => {
            const playerId = field.value;
            const player = playerId && players.filter(p => p.id === playerId)[0];

            return (
              <Autocomplete<PlayerSelectOptionFragment, undefined, true>
                {...field}
                value={player || undefined}
                options={players}
                getOptionLabel={player => `${player.name}(${player.slug})`}
                filterOptions={createFilterOptions({
                  stringify: player => {
                    const targets = [player.name, player.slug];
                    if (player.tonamelId) targets.push(player.tonamelId);
                    if (player.smashggId) targets.push(player.smashggId);

                    return targets.join(' ');
                  },
                })}
                onChange={(e, player) => {
                  if (player) setValue(`sides.${index}.playerId`, player.id);
                }}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="プレイヤー" variant="outlined" fullWidth size="small" />
                )}
                disableClearable
              />
            );
          }}
        />
      </Grid>

      <Grid item xs={5}>
        <Controller
          control={control}
          name={`sides.${index}.characterId`}
          defaultValue={characters[0]?.id}
          render={({ field }) => {
            const characterId = field.value;
            const character = characterId && characters.filter(c => c.id === characterId)[0];

            return (
              <Autocomplete<CharacterSelectOptionFragment, undefined, true>
                {...field}
                value={character || undefined}
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
            );
          }}
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
