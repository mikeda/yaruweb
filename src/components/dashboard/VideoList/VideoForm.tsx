import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().required().url(),
});

interface Attributes {
  url: string;
}

interface Props {
  onSubmit: (attributes: Attributes) => void;
}

export const VideoForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Attributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="YouTubeのURL"
              placeholder="https://www.youtube.com/watch?v=xxxxx"
              error={Boolean(errors.url)}
              helperText={errors.url?.message}
              fullWidth
            />
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button type="submit" color="primary">
          登録する
        </Button>
      </DialogActions>
    </form>
  );
};
