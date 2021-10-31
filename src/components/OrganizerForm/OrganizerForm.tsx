import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { OrganizerAttributes, OrganizerFormFragment } from '@/lib/graphql/types';
import { Box, Button, Card, CardContent, Divider, Grid, TextField } from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  tonamelId: yup.string().nullable(),
  twitterId: yup.string().nullable(),
  streamingUrl: yup.string().nullable(),
  description: yup.string().nullable(),
});

interface Props {
  organizer?: OrganizerFormFragment;
  onSubmit: (attributes: OrganizerAttributes) => void;
}

export const OrganizerForm: React.FC<Props> = ({ organizer, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrganizerAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: organizer && {
      name: organizer.name,
      slug: organizer.slug,
      tonamelId: organizer.tonamelId,
      twitterId: organizer.twitterId,
      streamingUrl: organizer.streamingUrl,
      description: organizer.description,
    },
  });

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
                    label="オーガナイザーID(URLに使用)"
                    error={Boolean(errors.slug)}
                    helperText={errors.slug?.message}
                    fullWidth
                  />
                )}
              />
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
                    label="コメント"
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
