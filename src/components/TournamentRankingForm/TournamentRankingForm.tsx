import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  PlayerSelectOptionFragment,
  TournamentRankingAttributes,
  TournamentRankingFormFragment,
  usePlayerSelectOptionsQuery,
} from '@/lib/graphql/types';
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
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const schema = yup.object().shape({
  place: yup.number().required().integer().min(1).max(4),
  playerId: yup.number().required().integer(),
});

interface Props {
  open: boolean;
  onClose: () => void;
  tournamentRanking?: TournamentRankingFormFragment;
  onSubmit: (attributes: TournamentRankingAttributes) => void;
}

export const TournamentRankingForm: React.FC<Props> = ({ open, onClose, tournamentRanking, onSubmit }) => {
  const { data } = usePlayerSelectOptionsQuery();

  const { handleSubmit, control, setValue } = useForm<TournamentRankingAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: tournamentRanking && {
      place: tournamentRanking.place,
      playerId: tournamentRanking.playerId,
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>順位</DialogTitle>

        <DialogContent>
          {data && data.players.records.length > 0 && (
            <Autocomplete<PlayerSelectOptionFragment>
              options={data.players.records}
              getOptionLabel={player => `${player.name}(${player.slug})`}
              onChange={(e, player) => {
                if (player) setValue('playerId', player.id);
              }}
              style={{ width: 300 }}
              renderInput={params => <TextField {...params} label="プレイヤー" />}
            />
          )}

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
