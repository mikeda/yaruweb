import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

import {
  TournamentRankingAttributes,
  TournamentRankingFormFragment,
  useTournamentRankingFormPlayersQuery,
} from '@/lib/graphql/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

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
  const { data } = useTournamentRankingFormPlayersQuery();

  const { handleSubmit, control } = useForm<TournamentRankingAttributes>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: tournamentRanking && {
      place: tournamentRanking.place,
      playerId: tournamentRanking.playerId,
    },
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>順位</DialogTitle>

        <DialogContent>
          {data && data.players.records.length > 0 && (
            <FormControl>
              <InputLabel>プレイヤー</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field} style={{ minWidth: 120 }}>
                    {data &&
                      data.players.records.map(player => (
                        <MenuItem key={player.id} value={player.id}>
                          {player.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
                control={control}
                name="playerId"
                defaultValue={data.players.records[0].id}
              />
            </FormControl>
          )}

          <FormControl>
            <InputLabel>順位</InputLabel>
            <Controller
              render={({ field }) => (
                <Select {...field} style={{ minWidth: 120 }}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              )}
              control={control}
              name="place"
              defaultValue={1}
            />
          </FormControl>
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
