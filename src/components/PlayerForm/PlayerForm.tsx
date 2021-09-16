import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { PlayerAttributes, PlayerFormFragment, useCountrySelectOptionsQuery } from '@/lib/graphql/types';
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

const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  tonamelId: yup.string().nullable(),
  twitterId: yup.string().nullable(),
  streamingUrl: yup.string().nullable(),
  description: yup.string().nullable(),
});

interface Props {
  player?: PlayerFormFragment;
  onSubmit: (attributes: PlayerAttributes) => void;
}

export const PlayerForm: React.FC<Props> = ({ player, onSubmit }) => {
  const { data } = useCountrySelectOptionsQuery();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PlayerAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: player && {
      name: player.name,
      slug: player.slug,
      countryId: player.country?.id,
      tonamelId: player.tonamelId,
      smashggId: player.smashggId,
      twitterId: player.twitterId,
      streamingUrl: player.streamingUrl,
      description: player.description,
    },
  });

  if (!data) return null;

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="名前"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="プレイヤーID(URLに使用)"
                    error={Boolean(errors.slug)}
                    helperText={errors.slug?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>国籍</InputLabel>
                <Controller
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={e => {
                        const id = e.target.value as string | undefined;
                        setValue('countryId', id || null);
                      }}
                    >
                      <MenuItem>不明</MenuItem>
                      {data.countries.map(country => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.flagEmoji}
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  control={control}
                  name="countryId"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="tonamelId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tonamel ID"
                    error={Boolean(errors.tonamelId)}
                    helperText={errors.tonamelId?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="smashggId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="smash.gg ID"
                    error={Boolean(errors.smashggId)}
                    helperText={errors.smashggId?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="twitterId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Twitter ID"
                    error={Boolean(errors.twitterId)}
                    helperText={errors.twitterId?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="streamingUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ストリーミングURL"
                    error={Boolean(errors.streamingUrl)}
                    helperText={errors.streamingUrl?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="概要"
                    multiline
                    fullWidth
                    rows={5}
                    variant="outlined"
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                    style={{ backgroundColor: 'white' }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                name="avatarDummy"
                onChange={e => {
                  if (!e.target.files) return;
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = e => {
                    if (!e.target) return;

                    setValue('avatar', e.target.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <input type="hidden" name="avatar" />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box m={2} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained">
            登録する
          </Button>
        </Box>
      </form>
    </Card>
  );
};
