import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const schema = yup.object().shape({
  url: yup.string().required().url(),
});

interface Attributes {
  url: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (attributes: Attributes) => void;
}

export const VideoForm: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Attributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>動画を登録</DialogTitle>

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
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            登録する
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
