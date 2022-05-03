import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useDashboardPlayersPageCreatePlayerFromSmashggMutation, pagesPath } from '@/lib';

const schema = yup.object().shape({
  smashggId: yup.string().required(),
});

interface Attributes {
  smashggId: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export const PlayerFormSmashgg: React.FC<Props> = ({ open, onClose }) => {
  const router = useRouter();
  const [createFromSmashgg] = useDashboardPlayersPageCreatePlayerFromSmashggMutation({
    onCompleted: () => {
      router.push(pagesPath.dashboard.players.$url());
      onClose();
    },
    onError: e => {
      toast.error(e.message);
    },
  });

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
      <form
        onSubmit={handleSubmit(({ smashggId }) => {
          createFromSmashgg({ variables: { smashggId } });
        })}
      >
        <DialogTitle>プレイヤーを登録</DialogTitle>

        <DialogContent>
          <Controller
            name="smashggId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="SmashGGのID"
                placeholder="https://smash.gg/user/<id> or <id>"
                error={Boolean(errors.smashggId)}
                helperText={errors.smashggId?.message}
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
