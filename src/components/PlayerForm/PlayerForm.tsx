import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

import { PlayerAttributes, PlayerFormFragment } from '@/lib/graphql/types';
import { Box, Button, Card, CardContent, Divider, Grid, TextField } from '@material-ui/core';

const schema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
});

interface Props {
  player?: PlayerFormFragment;
  onSubmit: (attributes: PlayerAttributes) => void;
}

export const PlayerForm: React.FC<Props> = ({ player, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlayerAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: player && {
      name: player.name,
      slug: player.slug,
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
                    label="プレイヤーID(URLに使用)"
                    error={Boolean(errors.slug)}
                    helperText={errors.slug?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box m={2} justifyContent="flex-end">
          <Button type="submit" variant="contained">
            登録する
          </Button>
        </Box>
      </form>
    </Card>
  );
};
