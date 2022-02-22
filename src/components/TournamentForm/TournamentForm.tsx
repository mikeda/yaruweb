import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  OrganizerSelectOptionFragment,
  TournamentAttributes,
  TournamentFormFragment,
  useTournamentFormQuery,
} from '@/lib/graphql/types';
import dayjs from '@/lib/dayjs';
import { Box, Button, Card, CardContent, Divider, Grid, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';

const schema = yup.object().shape({
  organizerId: yup.string().required(),
  name: yup.string().required(),
  url: yup.string().url().nullable(),
  streamingUrl: yup.string().url().nullable(),
  startsAt: yup.string(),
  description: yup.string().required(),
});

interface Props {
  tournament?: TournamentFormFragment;
  onSubmit: (attributes: TournamentAttributes) => void;
}

export const TournamentForm: React.FC<Props> = ({ tournament, onSubmit }) => {
  const { data } = useTournamentFormQuery();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<TournamentAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: tournament
      ? {
          organizerId: tournament.organizerId,
          name: tournament.name,
          url: tournament.url,
          streamingUrl: tournament.streamingUrl,
          startsAt: dayjs(tournament.startsAt).format('YYYY-MM-DDTHH:mm'),
          description: tournament.description,
        }
      : {
          startsAt: dayjs().add(1, 'date').hour(18).minute(0).second(0).format('YYYY-MM-DDTHH:mm'),
        },
  });
  const organizerId = getValues('organizerId');

  if (!data) return null;

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete<OrganizerSelectOptionFragment>
                options={data.organizers.records}
                getOptionLabel={organizer => `${organizer.name}(${organizer.slug})`}
                onChange={(e, organizer) => {
                  if (organizer) setValue('organizerId', organizer.id);
                }}
                defaultValue={data.organizers.records.filter(o => o.id === organizerId)[0]}
                style={{ width: 300 }}
                renderInput={params => {
                  return (
                    <TextField {...params} label="オーガナイザー" variant="outlined" defaultValue={'まんば杯(manba)'} />
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="URL"
                    error={Boolean(errors.url)}
                    helperText={errors.url?.message}
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
                    label="配信URL"
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
                    label="イベント概要"
                    multiline
                    fullWidth
                    rows={4}
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
                name="mainImageDummy"
                onChange={e => {
                  if (!e.target.files) return;
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = e => {
                    if (!e.target) return;

                    setValue('mainImage', e.target.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <input type="hidden" name="mainImage" />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="startsAt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="開始時間"
                    type="datetime-local"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.startsAt)}
                    helperText={errors.startsAt?.message}
                  />
                )}
              />
            </Grid>
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
  );
};
