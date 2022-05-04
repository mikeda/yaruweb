import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Divider, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { TournamentVideoAttributes, TournamentVideoFormFragment } from '@/generated/graphql';
import { dayjs } from '@/lib';

const schema = yup.object().shape({
  title: yup.string().required(),
  publishedAt: yup.string().required(),
});

interface Props {
  tournamentVideo: TournamentVideoFormFragment;
  onSubmit: (attributes: TournamentVideoAttributes) => void;
}

export const TournamentVideoEditForm: React.FC<Props> = ({ tournamentVideo, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TournamentVideoAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: tournamentVideo.title,
      label: tournamentVideo.label,
      publishedAt: dayjs(tournamentVideo.publishedAt).format('YYYY-MM-DDTHH:mm'),
    },
  });

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="タイトル"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="label"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="ラベル" placeholder="予選Aブロック(複数ある場合の区別用)" fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="publishedAt"
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
                    error={Boolean(errors.publishedAt)}
                    helperText={errors.publishedAt?.message}
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
