import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

import { PlayerSelectOptionFragment, StandingAttributes } from '@/lib/graphql/types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Autocomplete } from '@mui/material';

const schema = yup.object().shape({
  place: yup.number().required().integer().min(1).max(4),
  playerId: yup.number().required().integer(),
});

interface Props {
  open: boolean;
  players: PlayerSelectOptionFragment[];
  onClose: () => void;
  onSubmit: (attributes: StandingAttributes) => void;
}

export const StandingForm: React.FC<Props> = ({ open, players, onClose, onSubmit }) => {
  const { handleSubmit, control, setValue } = useForm<StandingAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>順位</DialogTitle>

        <DialogContent>
          <Autocomplete<PlayerSelectOptionFragment>
            options={players}
            getOptionLabel={player => `${player.name}(${player.slug})`}
            onChange={(e, player) => {
              if (player) setValue('playerId', player.id);
            }}
            style={{ width: 300 }}
            renderInput={params => <TextField {...params} label="プレイヤー" />}
          />

          <Box mt={2}>
            <FormControl>
              <InputLabel>順位</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field} style={{ minWidth: 120 }}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                )}
                control={control}
                name="place"
                defaultValue={1}
              />
            </FormControl>
          </Box>
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
